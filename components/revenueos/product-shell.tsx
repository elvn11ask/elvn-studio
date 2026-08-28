import Link from "next/link";
import { revenueOS, revenueOSNavigation } from "@/lib/revenueos";
import { site } from "@/lib/site";

export function ProductNav() {
  return <nav className="product-nav shell" aria-label="Revenue Operations product navigation">
    <Link className="product-nav-name" href="/revenueos">ELVN Revenue Operations</Link>
    <div>{revenueOSNavigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>
  </nav>;
}

export function ProductHero({ eyebrow, title, lede, actions = true, status = true }: { eyebrow: string; title: string; lede: string; actions?: boolean; status?: boolean }) {
  return <><ProductNav /><section className="product-hero shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="product-lede">{lede}</p>{actions && <div className="button-row"><Link className="button" href="/revenueos/implementation#assessment">{revenueOS.assessmentCta} <span aria-hidden="true">↗</span></Link><Link className="button-quiet" href="/revenueos/modules">View the system architecture</Link></div>}{status && <p className="product-status"><span className="status-dot" /> {revenueOS.status} · Selected engagements</p>}</section></>;
}

export function ProductCTA({ title = "Start with the commercial workflow, not a software demo." }: { title?: string }) {
  return <section className="section product-final"><div className="shell"><p className="eyebrow">Revenue operations assessment</p><h2>{title}</h2><p>Document the current RFQ path, identify where demand disappears, and define a controlled implementation with measurable acceptance criteria.</p><div className="button-row"><Link className="button" href="/revenueos/implementation#assessment">{revenueOS.assessmentCta} <span aria-hidden="true">↗</span></Link><a className="text-link" href={`mailto:${site.email}`}>{site.email}</a></div></div></section>;
}

export function ProductSchema({ path, name, description, faq }: { path: string; name: string; description: string; faq?: readonly (readonly [string, string])[] }) {
  const items: Record<string, unknown>[] = [
    { "@context": "https://schema.org", "@type": "Service", name, description, url: `${site.url}${path}`, provider: { "@type": "Organization", name: site.name, url: site.url }, areaServed: "Worldwide", serviceType: revenueOS.category },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "ELVN Studio", item: site.url }, { "@type": "ListItem", position: 2, name: "Revenue Operations", item: `${site.url}/revenueos` }, ...(path === "/revenueos" ? [] : [{ "@type": "ListItem", position: 3, name, item: `${site.url}${path}` }])] },
  ];
  if (faq) items.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(items).replace(/</g, "\\u003c") }} />;
}
