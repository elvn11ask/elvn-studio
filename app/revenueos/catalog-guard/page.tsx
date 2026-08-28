import type { Metadata } from "next";
import Link from "next/link";
import { ProductHero, ProductSchema } from "@/components/revenueos/product-shell";
import { catalogGuardValidation, revenueLeakAudit } from "@/lib/catalog-guard";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catalog Guard — B2B Catalog Revenue Intelligence",
  description: "Find HTTP, sitemap, indexability, canonical, metadata, Product schema, and response-time risks across complex industrial catalogs.",
  alternates: { canonical: "/revenueos/catalog-guard" },
};

const checks = [
  ["HTTP and availability", "Find product URLs that fail, redirect unexpectedly, or cannot be inspected."],
  ["Indexability and sitemap", "Compare public product discovery with robots directives and sitemap presence."],
  ["Canonical identity", "Flag missing or conflicting canonical targets without collapsing exact product variants."],
  ["Product representation", "Check title, H1, and Product JSON-LD while rejecting invented price, stock, or ratings."],
  ["Scan performance", "Record request counts, errors, duration, and P50/P95/P99 response times."],
  ["Fix queue", "Return severity, evidence, affected page, and a concrete recommended action for every issue."],
] as const;

export default function CatalogGuardPage() {
  const auditMail = `mailto:${site.email}?subject=${encodeURIComponent("Revenue Leak Audit — catalog review")}`;
  return <>
    <ProductHero eyebrow="Catalog Guard · Working beta" title="Your products exist. Can buyers and search engines find them?" lede="Catalog Guard turns public catalog failures into an evidence-backed fix queue for industrial distributors and manufacturers with large, exact-MPN catalogs." actions={false} />

    <section className="section shell"><div className="section-heading"><div><p className="eyebrow">Measured validation</p><h2>{catalogGuardValidation.pages} product pages checked across {catalogGuardValidation.environments} production environments.</h2></div><p>{catalogGuardValidation.scope} No forms, authenticated endpoints, customer data, or production writes were used.</p></div><div className="pricing-preview"><article><h3>Pages checked</h3><strong>{catalogGuardValidation.pages}</strong><span>Public PDP sample</span><p>{catalogGuardValidation.requestErrors} request errors</p></article><article><h3>Visibility checks</h3><strong>{catalogGuardValidation.canonicalChecks + catalogGuardValidation.schemaChecks}</strong><span>Canonical + Product schema</span><p>{catalogGuardValidation.issues} evidence-backed issues</p></article><article><h3>Production writes</h3><strong>{catalogGuardValidation.publicWrites}</strong><span>Read-only validation</span><p>Revenue impact unquantified</p></article></div><div className="section-action"><Link className="text-link" href="/revenueos/validation">Read scope and results <span aria-hidden="true">↗</span></Link></div></section>

    <section className="section section-contrast"><div className="shell"><div className="section-heading"><div><p className="eyebrow">What Catalog Guard checks</p><h2>Technical facts translated into commercial work.</h2></div><p>This is not a generic score. Every issue keeps the observed fact, deterministic severity, recommended action, and an explicit evidence boundary.</p></div><div className="module-preview">{checks.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section shell content-grid"><aside><p className="eyebrow">First paid offer</p><h2>Revenue Leak Audit</h2></aside><div className="prose"><h2>{revenueLeakAudit.price} fixed-scope audit</h2><p>Provide a public production website and catalog export with product ID, manufacturer, and exact MPN. Optional Search Console and sanitized RFQ exports improve demand correlation.</p><p>Within {revenueLeakAudit.turnaround}, receive catalog-to-site coverage, technical visibility and product-data gaps, a prioritized issue queue, a private evidence appendix, and a 45-minute findings review.</p><p>No production credentials are required for the base audit. No automatic changes. No invented revenue-loss estimate.</p><div className="button-row"><a className="button" href={auditMail}>Request Revenue Audit <span aria-hidden="true">↗</span></a><Link className="button-quiet" href="/revenueos/validation">Verify the evidence boundary</Link></div></div></section>

    <section className="section product-evidence"><div className="shell content-grid"><aside><p className="eyebrow">After the audit</p><h2>Continuous Revenue Guard</h2></aside><div className="prose"><h2>{revenueLeakAudit.continuousPilot} pilot hypothesis</h2><p>Scheduled bounded scans, history, regression alerts, and a maintained fix queue. SKU limits and integration scope are confirmed during onboarding; Migration Guard, RFQ Intelligence, and demand connectors are not claimed as part of the current Catalog Guard beta.</p></div></div></section>
    <ProductSchema path="/revenueos/catalog-guard" name="Revenue OS Catalog Guard" description="Evidence-backed catalog visibility checks for complex B2B catalogs." />
  </>;
}
