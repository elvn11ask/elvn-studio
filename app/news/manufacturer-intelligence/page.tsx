import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const title = "Introducing the Manufacturer Intelligence Control Center";
const description = "A private customer workspace for bounded product-data scans, optional AI providers, evidence review, conflicts, and controlled publication simulation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/news/manufacturer-intelligence" },
  openGraph: { title, description, url: "/news/manufacturer-intelligence", images: [{ url: "/revenueos/og.png", width: 1200, height: 630, alt: "ELVN Manufacturer Intelligence" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/revenueos/og.png"] },
};

export default function ManufacturerIntelligenceNews() {
  const schemas = [
    { "@context": "https://schema.org", "@type": "NewsArticle", headline: title, description, datePublished: "2026-08-10", dateModified: "2026-08-10", image: `${site.url}/manufacturer-intelligence/control-center-overview.png`, author: { "@type": "Organization", name: "ELVN Studio" }, publisher: { "@type": "Organization", name: "ELVN Studio", url: site.url }, mainEntityOfPage: `${site.url}/news/manufacturer-intelligence` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "ELVN Studio", item: site.url }, { "@type": "ListItem", position: 2, name: "News", item: `${site.url}/news` }, { "@type": "ListItem", position: 3, name: title, item: `${site.url}/news/manufacturer-intelligence` }] },
  ];

  return <><article className="shell graph-news"><p className="eyebrow">Product news · August 10, 2026</p><h1>{title}</h1><p className="product-lede">Manufacturer Intelligence now has a customer workspace for running controlled product-data scans, connecting optional AI providers, reviewing evidence and simulating catalog publication.</p><figure className="dashboard-frame"><Image src="/manufacturer-intelligence/control-center-overview.png" alt="Synthetic ELVN Manufacturer Intelligence Control Center workspace" width={1440} height={925} priority /><figcaption>Synthetic private-beta workspace. No customer data is shown.</figcaption></figure><div className="prose"><h2>A usable control surface, not an autonomous agent</h2><p>Industrial catalog teams can connect read-only product data, map manufacturer and exact MPN fields, select bounded cohorts, monitor scan events, and inspect every proposed field with its provenance. The system keeps exact product identity, source evidence and human approval separate from AI suggestions.</p><h2>Bounded discovery and enrichment</h2><p>Every scan has explicit limits for products, requests, documents, runtime, concurrency and optional AI cost. Pause, resume, cancellation and retries remain observable and stop at safe product boundaries. Unknown source policy and invalid product identity fail closed.</p><h2>Evidence controls verification</h2><p>Observed source facts, conflicts, unknowns and AI inference remain separate classes. Reviewers approve or reject individual fields and record a reason for overrides. Family-level information cannot silently become an exact-variant specification.</p><h2>AI remains optional</h2><p>Teams can continue without AI, connect an approved provider, or use a private endpoint. A model may help interpret already approved evidence, but it cannot verify a fact, mark compliance, merge product variants, change stock or price, or publish.</p><h2>Simulation before any catalog change</h2><p>Publication simulation compares current and proposed values while performing zero public writes. Private-beta pilots use read-only adapters, two-person approval and canary-required policy. This lets product teams evaluate workflow and evidence quality without changing public catalog pages.</p><h2>Private Beta and Design Partner access</h2><p>Control Center remains invitation-only and contract-managed while tenant isolation, connector governance, deployment options and publication adapters are validated with design partners.</p><p><Link className="button" href="/contact?interest=manufacturer-intelligence">Request Access <span aria-hidden="true">↗</span></Link></p><p><Link className="text-link" href="/revenueos/manufacturer-intelligence">Explore the Control Center product experience <span aria-hidden="true">↗</span></Link></p></div></article><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\u003c") }} /></>;
}
