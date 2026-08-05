import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

const title = "From SKU Search to Manufacturer Intelligence";
const description = "Why industrial catalogs need exact-MPN manufacturer connectors, official-source evidence, optional AI assistance, and controlled publication.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/news/manufacturer-intelligence" },
  openGraph: { title, description, url: "/news/manufacturer-intelligence", images: [{ url: "/revenueos/og.png", width: 1200, height: 630, alt: "ELVN Manufacturer Intelligence" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/revenueos/og.png"] },
};

export default function ManufacturerIntelligenceNews() {
  const schemas = [
    { "@context": "https://schema.org", "@type": "NewsArticle", headline: title, description, datePublished: "2026-08-05", dateModified: "2026-08-05", image: `${site.url}/revenueos/og.png`, author: { "@type": "Organization", name: "ELVN Studio" }, publisher: { "@type": "Organization", name: "ELVN Studio", url: site.url }, mainEntityOfPage: `${site.url}/news/manufacturer-intelligence` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "ELVN Studio", item: site.url }, { "@type": "ListItem", position: 2, name: "News", item: `${site.url}/news` }, { "@type": "ListItem", position: 3, name: title, item: `${site.url}/news/manufacturer-intelligence` }] },
  ];

  return <><article className="shell graph-news"><p className="eyebrow">Product news · August 5, 2026</p><h1>{title}</h1><p className="product-lede">Introducing ELVN Manufacturer Intelligence v0.1.0-preview: a provenance-aware product intelligence module for industrial catalogs that need manufacturer-level scale without losing exact product identity.</p><div className="prose"><h2>Why isolated SKU search does not scale</h2><p>Industrial catalogs contain exact orderable parts, not interchangeable strings. Researching each SKU through generic search repeats the same source discovery work and still leaves package, carrier, temperature, voltage, and lifecycle variants exposed to identity mistakes.</p><h2>What operating work revealed</h2><p>Work across two large B2B catalogs showed that isolated product-by-product discovery is a weak primary architecture. The useful output was evidence for human review—not permission to publish. Customer identities, catalog counts, source locations, connector internals, and operational results remain private.</p><h2>Manufacturer connectors change the unit of work</h2><p>A manufacturer connector begins with an explicit source policy and known product conventions. It can reuse approved discovery, document, package, image, and evidence logic across a bounded manufacturer cohort. The result still belongs to a unique tenant, manufacturer, and exact MPN.</p><h2>Evidence before publication</h2><p>Candidate fields retain an approved source reference, document location, qualifier, extraction method, confidence, conflict state, and review history. Family-level information cannot silently become an exact-variant specification. Publication is a separate simulated and reversible batch, never a side effect of connector output.</p><h2>AI is optional</h2><p>A customer-approved model may assist candidate ranking, document classification, table interpretation, unit suggestions, conflict explanation, or reviewer summaries. It cannot verify a fact, merge variants, infer compliance, or publish. The complete workflow remains operational with AI disabled.</p><h2>Preview availability</h2><p>This is an honest preview, not a general-availability claim. Manufacturer Intelligence is available through selected private Revenue Operations engagements, starting with a source and catalog assessment followed by a bounded connector pilot.</p><p><Link className="button" href="/revenueos/manufacturer-intelligence">Explore Manufacturer Intelligence <span aria-hidden="true">↗</span></Link></p></div></article><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\u003c") }} /></>;
}
