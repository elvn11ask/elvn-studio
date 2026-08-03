import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProductSchema } from "@/components/revenueos/product-shell";
import robots from "@/app/robots";
import { issueContactToken } from "@/lib/contact";
import { assessmentTimingValid, buildRevenueAssessmentBrief, revenueAssessmentSchema } from "@/lib/revenueos-assessment";
import { faqs, modules, revenueOSRoutes } from "@/lib/revenueos";

const validAssessment = {
  name: "Operations owner",
  email: "owner@example.com",
  company: "Example Distribution",
  companyWebsite: "https://example.com",
  country: "Germany",
  teamSize: "21–50",
  monthlyRfqVolume: "251–1,000/month",
  currentCrm: "HubSpot",
  currentErp: "Odoo",
  catalogPlatform: "Custom PHP",
  problem: "RFQs are split across email, CRM, supplier spreadsheets, and quote documents.",
  integrations: "Website, CRM, ERP, Microsoft 365",
  deployment: "Customer private cloud",
  aiPreference: "Bring our own provider",
  timeline: "Pilot this quarter",
  budget: "$25,000–$60,000 professional",
  message: "Start with one catalog and one commercial team.",
  consent: true,
  website: "",
  token: issueContactToken(),
  startedAt: Date.now() - 5000,
} as const;

describe("Revenue Operations product area", () => {
  it("publishes the complete route and module architecture", () => {
    expect(revenueOSRoutes).toHaveLength(11);
    expect(modules).toHaveLength(20);
  });

  it("validates a qualified assessment and rejects bots and rushed submissions", () => {
    expect(revenueAssessmentSchema.safeParse(validAssessment).success).toBe(true);
    expect(revenueAssessmentSchema.safeParse({ ...validAssessment, website: "spam" }).success).toBe(false);
    expect(assessmentTimingValid(Date.now() - 1000)).toBe(false);
    expect(assessmentTimingValid(Date.now() - 5000)).toBe(true);
  });

  it("builds a CRM-compatible assessment brief with an internal lead ID", () => {
    const parsed = revenueAssessmentSchema.parse(validAssessment);
    const brief = buildRevenueAssessmentBrief(parsed, "ROS-20260803-TEST");
    expect(brief).toContain("Revenue Operations Assessment ROS-20260803-TEST");
    expect(brief).toContain("Monthly RFQ volume: 251–1,000/month");
    expect(brief).toContain("Deployment: Customer private cloud");
  });

  it("renders valid Service, Breadcrumb, and FAQ structured data", () => {
    const markup = renderToStaticMarkup(<ProductSchema path="/revenueos/faq" name="RevenueOS FAQ" description="Answers" faq={faqs} />);
    expect(markup).toContain("FAQPage");
    expect(markup).toContain("BreadcrumbList");
    expect(markup).toContain("Service");
  });

  it("keeps lead endpoints out of robots while allowing product pages", () => {
    const config = robots();
    expect(config.rules).toEqual(expect.arrayContaining([expect.objectContaining({ allow: "/" })]));
    expect(JSON.stringify(config.rules)).toContain("/api/revenueos-assessment");
  });
});
