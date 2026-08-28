import Link from "next/link";
import { revenueOS } from "@/lib/revenueos";
import { site } from "@/lib/site";

export function ProductNav() {
  const navigation = [["Website Guard", "/revenueos/website-guard"], ["Catalog Guard", "/revenueos/catalog-guard"], ["Migration Guard", "/revenueos/migration-guard"], ["Platforms", "/revenueos/platforms"], ["Validation", "/revenueos/validation"]] as const;
  return <nav className="product-nav shell" aria-label="Revenue Operations product navigation">
    <Link className="product-nav-name" href="/revenueos">Revenue OS</Link>
    <div>{navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>
  </nav>;
}

export function ProductHero({ eyebrow, title, lede, actions = true, status = true, compact = false }: { eyebrow: string; title: string; lede: string; actions?: boolean; status?: boolean; compact?: boolean }) {
  return <><ProductNav /><section className={`product-hero shell${compact ? " compact" : ""}`}><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="product-lede">{lede}</p>{actions && <div className="button-row"><Link className="button" href="/contact?interest=revenue-audit">Request a bounded audit <span aria-hidden="true">↗</span></Link><Link className="button-quiet" href="/revenueos/validation">View measured validation</Link><a className="text-link" href="https://app.elvn.monster/login">Private beta login</a></div>}{status && <p className="product-status"><span className="status-dot" /> {revenueOS.status} · Selected engagements</p>}</section></>;
}

export function ProductCTA({ title = "Start with the commercial workflow, not a software demo." }: { title?: string }) {
  return <section className="section product-final"><div className="shell"><p className="eyebrow">Bounded audit</p><h2>{title}</h2><p>Connect one authorized website, run a read-only baseline, and receive a measured issue queue with evidence and limitations.</p><div className="button-row"><Link className="button" href="/contact?interest=revenue-audit">Request an audit <span aria-hidden="true">↗</span></Link><a className="text-link" href={`mailto:${site.email}`}>{site.email}</a></div></div></section>;
}

export function ProductSchema({ path, name, description, faq }: { path: string; name: string; description: string; faq?: readonly (readonly [string, string])[] }) {
  const items: Record<string, unknown>[] = [
    { "@context": "https://schema.org", "@type": "Service", name, description, url: `${site.url}${path}`, provider: { "@type": "Organization", name: site.name, url: site.url }, areaServed: "Worldwide", serviceType: revenueOS.category },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "ELVN Studio", item: site.url }, { "@type": "ListItem", position: 2, name: "Revenue Operations", item: `${site.url}/revenueos` }, ...(path === "/revenueos" ? [] : [{ "@type": "ListItem", position: 3, name, item: `${site.url}${path}` }])] },
  ];
  if (faq) items.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(items).replace(/</g, "\\u003c") }} />;
}
