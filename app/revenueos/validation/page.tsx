import type { Metadata } from "next";
import Link from "next/link";
import { ProductHero, ProductSchema } from "@/components/revenueos/product-shell";
import { catalogGuardValidation } from "@/lib/catalog-guard";

export const metadata: Metadata = {
  title: "Catalog Guard Production Validation",
  description: "Public-safe Catalog Guard engineering validation across ICPROM, ChipFasteners, and ARMSENS.",
  alternates: { canonical: "/revenueos/validation" },
};

const environments = ["ICPROM", "ChipFasteners", "ARMSENS"] as const;

export default function ValidationPage() {
  return <>
    <ProductHero eyebrow={`Engineering validation · ${catalogGuardValidation.measuredAt}`} title="Three production environments. One bounded, reproducible scan method." lede="Catalog Guard checked public product pages from ICPROM, ChipFasteners, and ARMSENS using sequential read-only requests and a fixed 25-page limit per environment." actions={false} />

    <section className="section shell"><div className="pricing-preview"><article><h3>Production environments</h3><strong>{catalogGuardValidation.environments}</strong><span>{environments.join(" · ")}</span><p>Internal engineering validation, not paying-customer logos</p></article><article><h3>Product pages checked</h3><strong>{catalogGuardValidation.pages}</strong><span>25 per environment</span><p>{catalogGuardValidation.requestErrors} request errors · HTTP 200 throughout the sample</p></article><article><h3>Checks executed</h3><strong>{catalogGuardValidation.canonicalChecks + catalogGuardValidation.schemaChecks}</strong><span>Canonical + Product schema</span><p>{catalogGuardValidation.publicWrites} production writes</p></article><article><h3>Issues detected</h3><strong>{catalogGuardValidation.issues}</strong><span>{catalogGuardValidation.issueClass}</span><p>Revenue impact: unquantified</p></article></div></section>

    <section className="section section-contrast"><div className="shell content-grid"><aside><p className="eyebrow">What the result means</p><h2>A measured technical exposure—not invented revenue.</h2></aside><div className="prose"><p>All 75 sampled pages returned HTTP 200 and passed the canonical check. The bounded sample found no valid JSON-LD object with <code>@type: Product</code>, producing one medium-severity issue per page.</p><p>This supports a concrete remediation hypothesis: add evidence-backed Product structured data and verify it without inventing availability, price, reviews, or ratings. It does not prove a monetary loss because search demand and conversion evidence were outside this scan.</p><p>Each timestamped private scan artifact records start and end time, request count, errors, HTTP distribution, issue classes, and latency percentiles. The public aggregate excludes page URLs, infrastructure, credentials, logs, and customer data.</p></div></div></section>

    <section className="section shell"><div className="section-heading"><div><p className="eyebrow">Environment results</p><h2>Same boundary, independently measured.</h2></div><p>Each result is a truncated sample from a public product sitemap, not a whole-catalog coverage claim.</p></div><div className="module-preview">{environments.map((name, index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>25 PDPs · 25 HTTP 200 · 0 request errors · 25 canonical checks · 25 Product schema issues · 0 production writes</p></article>)}</div></section>

    <section className="section product-evidence"><div className="shell content-grid"><aside><p className="eyebrow">Disclosure</p><h2>What we are not claiming</h2></aside><div className="prose"><p>These companies are validation environments operated within the same product engineering portfolio. They are not presented as paying Revenue OS customers, independent endorsements, or a representative market benchmark.</p><p>No forms were submitted. No private infrastructure or business data was inspected. No AI diagnosis or revenue estimate was used to produce the issue count.</p><p><Link className="button" href="/revenueos/catalog-guard">Review the $1,500 audit <span aria-hidden="true">↗</span></Link></p></div></div></section>
    <ProductSchema path="/revenueos/validation" name="Catalog Guard Production Validation" description="Bounded public-safe validation across three industrial catalog production environments." />
  </>;
}
