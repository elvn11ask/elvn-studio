import crypto from "node:crypto";
import type { RevenueAssessment } from "@/lib/revenueos-assessment";

export function buildStudioAssessmentGraphEvent(data: RevenueAssessment, leadId: string) {
  const companyId = `company_${crypto.createHash("sha256").update(data.company.trim().toLowerCase()).digest("hex").slice(0, 20)}`;
  const provenance = { adapter: "studio-assessment-v1", source_record_id: leadId };
  return {
    event_type: "assessment_submitted",
    schema_version: "1.0.0",
    occurred_at: new Date().toISOString(),
    tenant_id: "studio",
    correlation_id: leadId,
    lead_id: leadId,
    source_system: "elvn-studio",
    idempotency_key: `studio:assessment:${leadId}`,
    privacy_classification: "personal_commercial",
    provenance,
    payload: {
      entities: [
        { alias: "company", type: "Company", source_record_id: companyId, properties: { country: data.country, team_size: data.teamSize }, provenance },
        { alias: "assessment", type: "RFQ", source_record_id: leadId, properties: { form_type: "revenue_operations_assessment", monthly_rfq_volume: data.monthlyRfqVolume }, provenance },
        { alias: "lead", type: "Lead", source_record_id: leadId, properties: { status: "accepted", deployment: data.deployment, ai_preference: data.aiPreference, timeline: data.timeline, budget_band: data.budget }, provenance },
        { alias: "opportunity", type: "Opportunity", source_record_id: leadId, properties: { stage: "new", next_action: "qualification" }, provenance },
      ],
      relationships: [
        { type: "COMPANY_CREATED_RFQ", from: "company", to: "assessment", provenance },
        { type: "RFQ_CREATED_LEAD", from: "assessment", to: "lead", provenance },
        { type: "LEAD_CREATED_OPPORTUNITY", from: "lead", to: "opportunity", provenance },
      ],
    },
  } as const;
}

export async function deliverStudioAssessmentToRevenueGraph(data: RevenueAssessment, leadId: string) {
  const base = process.env.REVENUE_GRAPH_URL?.replace(/\/$/, "");
  const token = process.env.REVENUE_GRAPH_TOKEN;
  if (!base || !token) return { status: "disabled" as const };
  const response = await fetch(`${base}/api/v1/graph/events`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    body: JSON.stringify(buildStudioAssessmentGraphEvent(data, leadId)),
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Revenue graph rejected the event (${response.status})`);
  return { status: "delivered" as const };
}
