import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { backup, DatabaseSync } from "node:sqlite";
import nodemailer from "nodemailer";

const dbPath = process.env.STUDIO_LEADS_DB_PATH || "/data/studio-leads.sqlite";
fs.mkdirSync(path.dirname(dbPath), { recursive: true, mode: 0o700 });
const db = new DatabaseSync(dbPath);
db.exec(fs.readFileSync(path.join(process.cwd(), "lifecycle-schema.sql"), "utf8"));
const workerId = `worker-${process.pid}`;
let stopping = false;
let lastBackupCheck = 0;
let lastLeaseRecovery = 0;

const now = () => new Date().toISOString();
const after = (seconds) => new Date(Date.now() + seconds * 1000).toISOString();
const eventId = () => `EVT-${crypto.randomUUID().replaceAll("-", "").toUpperCase()}`;

function recordEvent(leadId, eventType, status, payload = {}) {
  db.prepare("INSERT INTO studio_lead_events (event_id,lead_id,event_type,status,payload_json,created_at) VALUES (?,?,?,?,?,?)").run(eventId(), leadId, eventType, status, JSON.stringify(payload), now());
}

function claim() {
  const timestamp = now();
  if (Date.now() - lastLeaseRecovery >= 60_000) {
    lastLeaseRecovery = Date.now();
    db.prepare("UPDATE studio_outbox SET status='retry',lease_until=NULL,last_error='Recovered stale worker lease',updated_at=? WHERE status='processing' AND lease_until<?").run(timestamp, timestamp);
  }
  const pending = db.prepare("SELECT outbox_id FROM studio_outbox WHERE status IN ('queued','retry') AND available_at<=? ORDER BY id LIMIT 1").get(timestamp);
  if (!pending) return null;
  db.exec("BEGIN IMMEDIATE");
  try {
    const row = db.prepare("SELECT * FROM studio_outbox WHERE outbox_id=? AND status IN ('queued','retry') AND available_at<=?").get(pending.outbox_id, timestamp);
    if (!row) { db.exec("COMMIT"); return null; }
    const updated = db.prepare("UPDATE studio_outbox SET status='processing',attempts=attempts+1,lease_until=?,updated_at=? WHERE outbox_id=? AND status IN ('queued','retry')").run(after(120), timestamp, row.outbox_id);
    db.exec("COMMIT");
    return updated.changes === 1 ? { ...row, attempts: Number(row.attempts) + 1 } : null;
  } catch (error) { db.exec("ROLLBACK"); throw error; }
}

let transporter;
function smtp() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM) throw new Error("SMTP_CONFIG_MISSING");
  const auth = process.env.SMTP_USER && process.env.SMTP_PASSWORD ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined;
  transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: Number(process.env.SMTP_PORT) === 465, auth, pool: true, maxConnections: 2, maxMessages: 50 });
  return transporter;
}

async function deliver(row) {
  const payload = JSON.parse(row.payload_json);
  if (row.channel === "email") {
    const info = await smtp().sendMail({ from: process.env.SMTP_FROM, to: row.destination, replyTo: payload.replyTo, subject: payload.subject, text: payload.text, messageId: `<${row.lead_id}.${row.template}@studio.elvn.monster>` });
    if (!info.accepted?.length) throw new Error("SMTP_NOT_ACCEPTED");
    return { messageId: info.messageId, response: String(info.response || "accepted").slice(0, 500) };
  }
  if (row.channel === "telegram") {
    if (!process.env.TELEGRAM_BOT_TOKEN || !row.destination) throw new Error("TELEGRAM_CONFIG_MISSING");
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ chat_id: row.destination, text: payload.text }), signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`TELEGRAM_${response.status}`);
    const result = await response.json();
    return { messageId: String(result?.result?.message_id || "accepted"), response: "accepted" };
  }
  if (row.channel === "revenue_graph") {
    if (!process.env.REVENUE_GRAPH_URL || !process.env.REVENUE_GRAPH_TOKEN) throw new Error("REVENUE_GRAPH_CONFIG_MISSING");
    const response = await fetch(`${process.env.REVENUE_GRAPH_URL.replace(/\/$/, "")}/api/v1/graph/events`, { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${process.env.REVENUE_GRAPH_TOKEN}` }, body: JSON.stringify(payload), signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`REVENUE_GRAPH_${response.status}`);
    return { messageId: row.lead_id, response: `accepted ${response.status}` };
  }
  throw new Error(`UNSUPPORTED_CHANNEL_${row.channel}`);
}

function markSent(row, result) {
  const timestamp = now();
  db.prepare("UPDATE studio_outbox SET status='sent',lease_until=NULL,provider_message_id=?,provider_response=?,last_error=NULL,sent_at=?,updated_at=? WHERE outbox_id=?").run(result.messageId, result.response, timestamp, timestamp, row.outbox_id);
  recordEvent(row.lead_id, `${row.template}_sent`, "ok", { channel: row.channel, messageId: result.messageId });
  if (row.channel === "email") recordEvent(row.lead_id, "smtp_accepted", "ok", { template: row.template, messageId: result.messageId });
}

function markFailed(row, error) {
  const attempts = Number(row.attempts);
  const terminal = attempts >= 8;
  const delay = Math.min(3600, 30 * (2 ** Math.min(7, attempts)));
  db.prepare("UPDATE studio_outbox SET status=?,available_at=?,lease_until=NULL,last_error=?,updated_at=? WHERE outbox_id=?").run(terminal ? "dead" : "retry", after(delay), String(error?.message || error).slice(0, 500), now(), row.outbox_id);
  recordEvent(row.lead_id, `${row.template}_delivery_failed`, terminal ? "dead" : "retry", { channel: row.channel, attempts, reason: String(error?.message || error).slice(0, 120) });
}

async function tick() {
  const row = claim();
  if (!row) return;
  try { markSent(row, await deliver(row)); } catch (error) { markFailed(row, error); }
}

async function maybeBackup() {
  if (Date.now() - lastBackupCheck < 60 * 60 * 1000) return;
  lastBackupCheck = Date.now();
  const directory = path.join(path.dirname(dbPath), "backups");
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  if (db.prepare("PRAGMA quick_check").get().quick_check !== "ok") throw new Error("SQLITE_INTEGRITY_CHECK_FAILED");
  const hour = new Date().toISOString().slice(0, 13).replace("T", "-");
  const destination = path.join(directory, `studio-leads-${hour}.sqlite`);
  if (!fs.existsSync(destination)) {
    const temporary = `${destination}.tmp`;
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
    await backup(db, temporary);
    fs.renameSync(temporary, destination);
  }
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  for (const file of fs.readdirSync(directory)) {
    const filename = path.join(directory, file);
    if (/^studio-leads-\d{4}-\d{2}-\d{2}-\d{2}\.sqlite$/.test(file) && fs.statSync(filename).mtimeMs < cutoff) fs.unlinkSync(filename);
  }
}

async function main() {
  process.stdout.write(`${workerId} ready\n`);
  while (!stopping) { try { await maybeBackup(); await tick(); } catch (error) { process.stderr.write(`${workerId} ${String(error?.message || error)}\n`); } await new Promise((resolve) => setTimeout(resolve, 2000)); }
  transporter?.close();
  db.close();
}

process.on("SIGTERM", () => { stopping = true; });
process.on("SIGINT", () => { stopping = true; });
await main();
