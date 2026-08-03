import crypto from "node:crypto";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().max(120).optional().default(""),
  projectType: z.enum(["Business website","B2B platform","SaaS or MVP","Performance and SEO","Production recovery","Other"]),
  budget: z.enum(["Under $2,500","$2,500–$5,000","$5,000–$10,000","$10,000–$25,000","$25,000+","Not sure yet"]).optional().default("Not sure yet"),
  launchDate: z.string().trim().max(80).optional().default(""),
  description: z.string().trim().min(40).max(4000),
  consent: z.literal(true),
  website: z.string().max(0),
  token: z.string().min(20).max(500),
});

const windowMs = 15 * 60 * 1000;
const requestLog = new Map<string, number[]>();

export function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter((time) => now - time < windowMs);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > 5;
}

function secret() {
  return process.env.CONTACT_SIGNING_SECRET || "local-development-signing-secret-change-in-production";
}

export function issueContactToken() {
  const payload = `${Date.now()}.${crypto.randomBytes(16).toString("hex")}`;
  const signature = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyContactToken(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
  const provided = parts[2];
  if (expected.length !== provided.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(provided))) return false;
  const issuedAt = Number(parts[0]);
  return Number.isFinite(issuedAt) && Date.now() - issuedAt < 60 * 60 * 1000;
}
