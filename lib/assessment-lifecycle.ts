import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { RevenueAssessment } from "@/lib/revenueos-assessment";
import { buildRevenueAssessmentBrief } from "@/lib/revenueos-assessment";
import { buildStudioAssessmentGraphEvent } from "@/lib/revenue-graph";

type PersistResult = {
  leadId: string;
  duplicate: boolean;
  trackingToken: string;
  deliveryStatus: "queued";
};

type OutboxPlan = {
  channel: "email" | "telegram" | "revenue_graph";
  destination: string | null;
  template: string;
  payload: Record<string, unknown>;
};

let lifecycleDatabase: DatabaseSync | undefined;

function requiredSigningSecret() {
  const secret = process.env.CONTACT_SIGNING_SECRET;
  if (!secret || secret.length < 32) throw new Error("CONTACT_SIGNING_SECRET is not configured");
  return secret;
}

function databasePath() {
  return process.env.STUDIO_LEADS_DB_PATH || (process.env.NODE_ENV === "production" ? "/data/studio-leads.sqlite" : path.join(process.cwd(), ".tmp", "studio-leads.sqlite"));
}

function database() {
  if (lifecycleDatabase) return lifecycleDatabase;
  const filename = databasePath();
  fs.mkdirSync(path.dirname(filename), { recursive: true, mode: 0o700 });
  lifecycleDatabase = new DatabaseSync(filename);
  lifecycleDatabase.exec(fs.readFileSync(path.join(process.cwd(), "lifecycle-schema.sql"), "utf8"));
  return lifecycleDatabase;
}

function now() {
  return new Date().toISOString();
}

function randomId(prefix: string) {
  return `${prefix}-${crypto.randomBytes(12).toString("hex").toUpperCase()}`;
}

function hmac(value: string) {
  return crypto.createHmac("sha256", requiredSigningSecret()).update(value).digest("hex");
}

export function assessmentIdempotencyKey(data: RevenueAssessment) {
  return hmac(["studio-assessment-v2", data.token, data.startedAt, data.email.trim().toLowerCase(), data.company.trim().toLowerCase()].join("|"));
}

export function assessmentTrackingToken(leadId: string) {
  return hmac(`studio-assessment-status|${leadId}`);
}

export function trackingTokenValid(leadId: string, token: string) {
  const expected = Buffer.from(assessmentTrackingToken(leadId), "hex");
  const actual = Buffer.from(token, "hex");
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function outboxPlan(data: RevenueAssessment, leadId: string): OutboxPlan[] {
  const brief = buildRevenueAssessmentBrief(data, leadId);
  const plan: OutboxPlan[] = [
    {
      channel: "email",
      destination: process.env.CONTACT_RECIPIENT || "elvnask@gmail.com",
      template: "assessment_internal",
      payload: {
        subject: `Revenue Operations Assessment — ${data.company} — ${leadId}`,
        text: brief,
        replyTo: data.email,
      },
    },
    {
      channel: "email",
      destination: data.email,
      template: "assessment_confirmation",
      payload: {
        subject: `ELVN Studio received your assessment request — ${leadId}`,
        text: `Hello ${data.name},\n\nELVN Studio received your Revenue Operations Assessment request. The reference is ${leadId}.\n\nThe next reply will focus on the current RFQ workflow, integration boundary, and the most practical discovery scope.\n\nELVN Studio\nelvnask@gmail.com`,
        replyTo: "elvnask@gmail.com",
      },
    },
  ];
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    plan.push({ channel: "telegram", destination: process.env.TELEGRAM_CHAT_ID, template: "assessment_internal", payload: { text: `New ELVN Revenue Operations assessment\n\n${brief}`.slice(0, 3900) } });
  }
  if (process.env.REVENUE_GRAPH_URL && process.env.REVENUE_GRAPH_TOKEN) {
    plan.push({ channel: "revenue_graph", destination: process.env.REVENUE_GRAPH_URL.replace(/\/$/, ""), template: "assessment_submitted", payload: buildStudioAssessmentGraphEvent(data, leadId) });
  }
  return plan;
}

export function persistAssessment(data: RevenueAssessment, candidateLeadId: string): PersistResult {
  const db = database();
  const idempotencyKey = assessmentIdempotencyKey(data);
  const existing = db.prepare("SELECT lead_id FROM studio_leads WHERE idempotency_key = ?").get(idempotencyKey) as { lead_id: string } | undefined;
  if (existing) return { leadId: existing.lead_id, duplicate: true, trackingToken: assessmentTrackingToken(existing.lead_id), deliveryStatus: "queued" };

  const createdAt = now();
  const slaMinutes = Math.max(15, Math.min(1440, Number(process.env.STUDIO_LEAD_SLA_MINUTES || 240)));
  const slaDueAt = new Date(Date.now() + slaMinutes * 60_000).toISOString();
  const ownerId = process.env.STUDIO_LEAD_OWNER_ID || "elvn-studio";
  const ownerName = process.env.STUDIO_LEAD_OWNER_NAME || "ELVN Studio";
  const payload = JSON.stringify({
    teamSize: data.teamSize,
    monthlyRfqVolume: data.monthlyRfqVolume,
    currentCrm: data.currentCrm,
    currentErp: data.currentErp,
    catalogPlatform: data.catalogPlatform,
    problem: data.problem,
    integrations: data.integrations,
    deployment: data.deployment,
    aiPreference: data.aiPreference,
    timeline: data.timeline,
    budget: data.budget,
    message: data.message,
  });
  const plans = outboxPlan(data, candidateLeadId);

  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare(`INSERT INTO studio_leads
      (lead_id,idempotency_key,form_type,customer_name,customer_email,customer_company,customer_country,company_website,payload_json,consent_at,status,owner_id,owner_name,sla_due_at,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(candidateLeadId, idempotencyKey, "revenue_operations_assessment", data.name, data.email, data.company, data.country, data.companyWebsite, payload, createdAt, "new", ownerId, ownerName, slaDueAt, createdAt, createdAt);

    const event = db.prepare("INSERT INTO studio_lead_events (event_id,lead_id,event_type,status,payload_json,created_at) VALUES (?,?,?,?,?,?)");
    for (const [eventType, eventPayload] of [
      ["assessment_started", { startedAt: new Date(data.startedAt).toISOString() }],
      ["assessment_submitted", {}],
      ["validation_passed", {}],
      ["lead_id_created", {}],
      ["lead_persisted", {}],
      ["crm_recorded", { storage: "studio_internal" }],
      ["owner_assigned", { ownerId, ownerName }],
      ["sla_started", { dueAt: slaDueAt, minutes: slaMinutes }],
    ] as const) event.run(randomId("EVT"), candidateLeadId, eventType, "ok", JSON.stringify(eventPayload), createdAt);

    const outbox = db.prepare(`INSERT INTO studio_outbox
      (outbox_id,dedupe_key,lead_id,channel,destination,template,payload_json,status,attempts,available_at,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,'queued',0,?,?,?)`);
    for (const item of plans) outbox.run(randomId("OUT"), `${candidateLeadId}:${item.channel}:${item.template}`, candidateLeadId, item.channel, item.destination, item.template, JSON.stringify(item.payload), createdAt, createdAt, createdAt);
    event.run(randomId("EVT"), candidateLeadId, "outbox_created", "ok", JSON.stringify({ count: plans.length, channels: plans.map(({ channel }) => channel) }), createdAt);
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    const raced = db.prepare("SELECT lead_id FROM studio_leads WHERE idempotency_key = ?").get(idempotencyKey) as { lead_id: string } | undefined;
    if (raced) return { leadId: raced.lead_id, duplicate: true, trackingToken: assessmentTrackingToken(raced.lead_id), deliveryStatus: "queued" };
    throw error;
  }

  return { leadId: candidateLeadId, duplicate: false, trackingToken: assessmentTrackingToken(candidateLeadId), deliveryStatus: "queued" };
}

export function assessmentLifecycleStatus(leadId: string) {
  const db = database();
  const lead = db.prepare("SELECT lead_id,status,owner_id,owner_name,sla_due_at,created_at FROM studio_leads WHERE lead_id = ?").get(leadId) as Record<string, unknown> | undefined;
  if (!lead) return null;
  const events = db.prepare("SELECT event_type,status,created_at FROM studio_lead_events WHERE lead_id = ? ORDER BY id").all(leadId);
  const deliveries = db.prepare("SELECT channel,template,status,attempts,provider_message_id,sent_at,last_error FROM studio_outbox WHERE lead_id = ? ORDER BY id").all(leadId);
  return { lead, events, deliveries };
}

export function assessmentLifecycleReady() {
  const db = database();
  const result = db.prepare("SELECT 1 AS ready").get() as { ready: number };
  return result.ready === 1;
}

export function closeAssessmentLifecycleDatabaseForTests() {
  lifecycleDatabase?.close();
  lifecycleDatabase = undefined;
}
