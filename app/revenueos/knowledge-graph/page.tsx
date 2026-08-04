import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraphCTA, GraphHero } from "@/components/revenueos/graph-shell";
import { ProductSchema } from "@/components/revenueos/product-shell";
import { graphLayers, graphPrinciples, graphProduct, graphViews } from "@/lib/revenue-knowledge-graph";

export const metadata: Metadata = { title: "Revenue Knowledge Graph", description: graphProduct.description, alternates: { canonical: "/revenueos/knowledge-graph" }, openGraph: { title: `ELVN ${graphProduct.name}`, description: graphProduct.tagline, url: "/revenueos/knowledge-graph", images: [{ url: "/revenue-knowledge-graph/og.png", width: 1200, height: 630, alt: "ELVN Revenue Knowledge Graph evidence chain" }] }, twitter: { card: "summary_large_image", images: ["/revenue-knowledge-graph/og.png"] } };

export default function KnowledgeGraphPage() { return <>
  <GraphHero eyebrow="Revenue Operations · Design Partner Module" title="Know why revenue happened." lede={graphProduct.description} />
  <section className="shell graph-visual"><Image src="/revenue-knowledge-graph/og.png" width={1200} height={630} priority alt="Synthetic Product to RFQ, supplier, quote, payment, and margin evidence chain" /></section>
  <section className="section shell"><div className="section-heading"><div><p className="eyebrow">Operating boundary</p><h2>Connect the evidence. Keep each source in charge.</h2></div><p>The module turns append-only commercial events into a reproducible relationship projection. It does not become the hidden master database.</p></div><div className="graph-layers">{graphLayers.map(([name, text], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{text}</p></article>)}</div></section>
  <section className="section section-contrast"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Proof before inference</p><h2>Every relationship must explain where it came from.</h2></div><p>Facts, deterministic derivations, human assertions, and model recommendations remain visibly different.</p></div><div className="module-preview">{graphPrinciples.map(([name, text], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>
  <section className="section shell"><div className="section-heading"><div><p className="eyebrow">Task views</p><h2>A graph earns its place by improving a decision.</h2></div><p>Operators enter focused queues and timelines, not an abstract network canvas.</p></div><div className="security-grid">{graphViews.slice(0, 6).map(([name, text], index) => <article key={name}><span>0{index + 1}</span><h2>{name}</h2><p>{text}</p></article>)}</div><div className="section-action"><Link className="text-link" href="/revenueos/knowledge-graph/use-cases">Explore all use cases <span aria-hidden="true">↗</span></Link></div></section>
  <GraphCTA /><ProductSchema path="/revenueos/knowledge-graph" name="Revenue Knowledge Graph" description={graphProduct.description} />
</> }
