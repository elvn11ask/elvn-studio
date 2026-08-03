import { z } from "zod";

export const teamSizes = ["1–5", "6–20", "21–50", "51–200", "201–1,000", "1,000+"] as const;
export const rfqVolumes = ["Under 50/month", "50–250/month", "251–1,000/month", "1,001–5,000/month", "5,000+/month", "Not measured"] as const;
export const deploymentPreferences = ["Managed private cloud", "Customer private cloud", "Self-hosted", "Need guidance"] as const;
export const aiPreferences = ["No AI", "Bring our own provider", "Private/local models", "Managed AI assessment", "Undecided"] as const;
export const assessmentBudgets = ["$2,500–$7,500 one-time audit", "$10,000–$25,000 one-time pilot", "$25,000–$60,000 one-time implementation", "$60,000–$150,000 one-time implementation", "$150,000+ one-time enterprise implementation", "Need discovery"] as const;

export const revenueAssessmentSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().min(2).max(160),
  companyWebsite: z.string().trim().url().max(300),
  country: z.string().trim().min(2).max(100),
  teamSize: z.enum(teamSizes),
  monthlyRfqVolume: z.enum(rfqVolumes),
  currentCrm: z.string().trim().max(160),
  currentErp: z.string().trim().max(160),
  catalogPlatform: z.string().trim().max(160),
  problem: z.string().trim().min(40).max(2500),
  integrations: z.string().trim().min(2).max(1000),
  deployment: z.enum(deploymentPreferences),
  aiPreference: z.enum(aiPreferences),
  timeline: z.string().trim().min(2).max(160),
  budget: z.enum(assessmentBudgets),
  message: z.string().trim().max(2500),
  consent: z.literal(true),
  website: z.string().max(0),
  token: z.string().min(20).max(500),
  startedAt: z.number().int().positive(),
});

export type RevenueAssessment = z.infer<typeof revenueAssessmentSchema>;

export function assessmentTimingValid(startedAt: number, now = Date.now()) {
  const elapsed = now - startedAt;
  return elapsed >= 3000 && elapsed <= 2 * 60 * 60 * 1000;
}

export function buildRevenueAssessmentBrief(data: RevenueAssessment, leadId: string) {
  return [
    `Revenue Operations Assessment ${leadId}`,
    `Name: ${data.name}`,
    `Work email: ${data.email}`,
    `Company: ${data.company}`,
    `Website: ${data.companyWebsite}`,
    `Country: ${data.country}`,
    `Team size: ${data.teamSize}`,
    `Monthly RFQ volume: ${data.monthlyRfqVolume}`,
    `CRM: ${data.currentCrm || "—"}`,
    `ERP: ${data.currentErp || "—"}`,
    `Catalog: ${data.catalogPlatform || "—"}`,
    `Deployment: ${data.deployment}`,
    `AI: ${data.aiPreference}`,
    `Timeline: ${data.timeline}`,
    `Budget: ${data.budget}`,
    `Required integrations: ${data.integrations}`,
    "",
    `Primary problem: ${data.problem}`,
    data.message ? `\nAdditional context: ${data.message}` : "",
  ].filter(Boolean).join("\n");
}
