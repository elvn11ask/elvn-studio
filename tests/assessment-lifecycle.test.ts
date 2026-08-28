import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { assessmentLifecycleReady, assessmentLifecycleStatus, closeAssessmentLifecycleDatabaseForTests, persistAssessment, persistAudit } from "@/lib/assessment-lifecycle";
import { revenueAssessmentSchema } from "@/lib/revenueos-assessment";
import { revenueAuditSchema } from "@/lib/revenueos-audit";

let directory = "";
const assessment = () => revenueAssessmentSchema.parse({
  name: "Lifecycle Canary",
  email: "canary@example.com",
  company: "ELVN Test",
  companyWebsite: "https://example.com",
  country: "Germany",
  teamSize: "6–20",
  monthlyRfqVolume: "50–250/month",
  currentCrm: "Internal CRM",
  currentErp: "ERP",
  catalogPlatform: "Custom",
  problem: "A controlled lifecycle test with enough context to pass validation safely.",
  integrations: "SMTP and CRM",
  deployment: "Customer private cloud",
  aiPreference: "No AI",
  timeline: "This quarter",
  budget: "$10,000–$25,000 one-time pilot",
  message: "TEST — DO NOT CONTACT",
  consent: true,
  website: "",
  token: "12345678901234567890123456789012",
  startedAt: 1_786_000_000_000,
});

beforeEach(() => {
  directory = fs.mkdtempSync(path.join(os.tmpdir(), "studio-lifecycle-"));
  process.env.STUDIO_LEADS_DB_PATH = path.join(directory, "leads.sqlite");
  process.env.CONTACT_SIGNING_SECRET = "x".repeat(64);
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  delete process.env.REVENUE_GRAPH_URL;
  delete process.env.REVENUE_GRAPH_TOKEN;
});

afterEach(() => {
  closeAssessmentLifecycleDatabaseForTests();
  fs.rmSync(directory, { recursive: true, force: true });
});

describe("Studio assessment lifecycle", () => {
  it("persists lead, owner, SLA, events and notification outbox atomically", () => {
    const result = persistAssessment(assessment(), "ROS-20260805-ABCDEF12");
    expect(result.duplicate).toBe(false);
    expect(assessmentLifecycleReady()).toBe(true);
    const lifecycle = assessmentLifecycleStatus(result.leadId)!;
    expect(lifecycle.lead.owner_id).toBe("elvn-studio");
    expect(lifecycle.lead.sla_due_at).toBeTruthy();
    expect(lifecycle.events.map((event) => event.event_type)).toEqual(expect.arrayContaining(["assessment_started", "assessment_submitted", "validation_passed", "lead_id_created", "lead_persisted", "crm_recorded", "owner_assigned", "sla_started", "outbox_created"]));
    expect(lifecycle.deliveries).toHaveLength(2);
    expect(lifecycle.deliveries.every((delivery) => delivery.status === "queued")).toBe(true);
  });

  it("deduplicates retried submissions under the original Lead ID", () => {
    const first = persistAssessment(assessment(), "ROS-20260805-ABCDEF12");
    const second = persistAssessment(assessment(), "ROS-20260805-FFFFFFFF");
    expect(second).toMatchObject({ leadId: first.leadId, duplicate: true, trackingToken: first.trackingToken });
    expect(assessmentLifecycleStatus(first.leadId)!.deliveries).toHaveLength(2);
  });

  it("persists an audit lead and queues isolated test email deliveries", () => {
    const audit = revenueAuditSchema.parse({ name: "Audit Canary", email: "canary@example.com", company: "ELVN Test", companyWebsite: "https://example.com", siteType: "Website / service business", approximatePages: "51–250", mainConcern: "TEST — verify a bounded website audit without contacting a real recipient.", consent: true, website: "", token: "12345678901234567890123456789012", startedAt: 1_786_000_000_000 });
    const result = persistAudit(audit, "AUD-20260828-ABCDEF12");
    const lifecycle = assessmentLifecycleStatus(result.leadId)!;
    expect(lifecycle.events.map((event) => event.event_type)).toEqual(expect.arrayContaining(["audit_started", "audit_submitted", "outbox_created"]));
    expect(lifecycle.deliveries).toHaveLength(2);
  });
});
