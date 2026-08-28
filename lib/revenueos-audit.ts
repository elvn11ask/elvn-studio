import { z } from "zod";

export const auditSiteTypes = [
  "Website / service business",
  "E-commerce",
  "B2B or industrial catalog",
  "SaaS or web application",
  "Agency-managed website",
  "Other",
] as const;

export const auditPageVolumes = ["1–50", "51–250", "251–1,000", "1,001–10,000", "10,000+", "Not sure"] as const;

export const revenueAuditSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().min(2).max(160),
  companyWebsite: z.string().trim().url().max(300),
  siteType: z.enum(auditSiteTypes),
  approximatePages: z.enum(auditPageVolumes),
  mainConcern: z.string().trim().min(20).max(2500),
  consent: z.literal(true),
  website: z.string().max(0),
  token: z.string().min(20).max(500),
  startedAt: z.number().int().positive(),
});

export type RevenueAuditRequest = z.infer<typeof revenueAuditSchema>;

export function auditTimingValid(startedAt: number, now = Date.now()) {
  const elapsed = now - startedAt;
  return elapsed >= 3000 && elapsed <= 2 * 60 * 60 * 1000;
}

export function buildRevenueAuditBrief(data: RevenueAuditRequest, leadId: string) {
  return [
    `Revenue Audit Request ${leadId}`,
    `Name: ${data.name}`,
    `Work email: ${data.email}`,
    `Company: ${data.company}`,
    `Website: ${data.companyWebsite}`,
    `Site type: ${data.siteType}`,
    `Approximate pages or SKUs: ${data.approximatePages}`,
    "",
    `Main concern: ${data.mainConcern}`,
  ].join("\n");
}
