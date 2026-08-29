import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProductSchema } from "@/components/revenueos/product-shell";
import robots from "@/app/robots";
import { GET as getGoogleSitemap } from "@/app/sitemap-google.xml/route";
import { issueContactToken } from "@/lib/contact";
import { assessmentTimingValid, buildRevenueAssessmentBrief, revenueAssessmentSchema } from "@/lib/revenueos-assessment";
import { auditTimingValid, buildRevenueAuditBrief, revenueAuditSchema } from "@/lib/revenueos-audit";
import { faqs, integrations, modules, pricing, revenueOSRoutes } from "@/lib/revenueos";

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
  budget: "$25,000–$60,000 one-time implementation",
  message: "Start with one catalog and one commercial team.",
  consent: true,
  website: "",
  token: issueContactToken(),
  startedAt: Date.now() - 5000,
} as const;

describe("Revenue Operations product area", () => {
  it("publishes the complete route and module architecture", () => {
    expect(revenueOSRoutes).toHaveLength(21);
    expect(modules).toHaveLength(21);
  });

  it("publishes only the approved analytics services and states every price basis", () => {
    expect(integrations.filter((item) => item.group === "Analytics").map((item) => item.name)).toEqual([
      "Google Analytics", "Microsoft Clarity", "Search Console", "Bing Webmaster",
      "Power BI", "Looker Studio", "Tableau", "Customer BI", "Custom warehouse",
    ]);
    expect(pricing.every((item) => item.basis && item.recurring)).toBe(true);
    expect(pricing[2].basis).toBe("One-time implementation");
    expect(pricing[2].recurring).toContain("per month");
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

  it("validates the bounded Revenue Audit request and builds a concise proof-safe brief", () => {
    const parsed = revenueAuditSchema.parse({ name: "Audit Owner", email: "owner@example.com", company: "Example Co", companyWebsite: "https://example.com", siteType: "B2B or industrial catalog", approximatePages: "251–1,000", mainConcern: "We cannot verify whether catalog and public product pages still match.", consent: true, website: "", token: issueContactToken(), startedAt: Date.now() - 5000 });
    expect(auditTimingValid(parsed.startedAt)).toBe(true);
    expect(buildRevenueAuditBrief(parsed, "AUD-TEST")).toContain("Approximate pages or SKUs: 251–1,000");
    expect(revenueAuditSchema.safeParse({ ...parsed, website: "spam" }).success).toBe(false);
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
    expect(JSON.stringify(config.rules)).toContain("/api/revenueos-audit");
    expect(config.host).toBe("studio.elvn.monster");
    expect(config.sitemap).toEqual([
      "https://studio.elvn.monster/sitemap.xml",
      "https://studio.elvn.monster/sitemap-google.xml",
    ]);
  });

  it("publishes an independent Google sitemap response with explicit XML headers", async () => {
    const response = getGoogleSitemap();
    const body = await response.text();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/xml; charset=utf-8");
    expect(Number(response.headers.get("content-length"))).toBe(Buffer.byteLength(body));
    expect(body).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(body).toContain("<loc>https://studio.elvn.monster/revenueos</loc>");
    expect(body).toContain("<lastmod>2026-08-29T00:00:00.000Z</lastmod>");
  });
});
