import Link from "next/link";
import { ProductHero } from "@/components/revenueos/product-shell";
import { graphProduct } from "@/lib/revenue-knowledge-graph";

export const graphNavigation = [
  ["Overview", "/revenueos/knowledge-graph"], ["Architecture", "/revenueos/knowledge-graph/architecture"],
  ["Use cases", "/revenueos/knowledge-graph/use-cases"], ["AI", "/revenueos/knowledge-graph/ai"],
  ["Security", "/revenueos/knowledge-graph/security"], ["Pricing", "/revenueos/knowledge-graph/pricing"],
  ["FAQ", "/revenueos/knowledge-graph/faq"],
] as const;

export function GraphHero({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return <><nav className="graph-nav shell" aria-label="Revenue Knowledge Graph navigation">{graphNavigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav><ProductHero eyebrow={eyebrow} title={title} lede={lede} /></>;
}

export function GraphCTA() {
  return <section className="section product-final"><div className="shell"><p className="eyebrow">{graphProduct.status}</p><h2>Start with one revenue path you need to explain.</h2><p>Inventory the authoritative sources, define the identity contract, and prove a shadow projection before changing an operational workflow.</p><div className="button-row"><Link className="button" href="/revenueos/implementation#assessment">Request a graph readiness assessment <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/revenueos/knowledge-graph/pricing">Review pricing</Link></div></div></section>;
}
