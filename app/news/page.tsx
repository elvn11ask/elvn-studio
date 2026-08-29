import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product News",
  description: "ELVN Studio product engineering updates for industrial revenue operations, commercial evidence, and product data intelligence.",
  alternates: { canonical: "/news" },
};

const articles = [
  {
    href: "/news/revenueos-private-beta",
    date: "Updated August 29, 2026",
    title: "Revenue OS private beta is live in production",
    summary: "The operational workspace, worker, backup and rollback chain are verified; browser QA and the bounded 95-page engineering baseline are published without customer or revenue claims.",
  },
  {
    href: "/news/manufacturer-intelligence",
    date: "August 5, 2026",
    title: "Manufacturer Intelligence moves from preview to a RevenueOS production patch",
    summary: "The private v0.1 patch adds a versioned module boundary, exact-MPN controls, evidence review, reversible publication and controlled rollout gates.",
  },
  {
    href: "/news/revenue-knowledge-graph",
    date: "August 4, 2026",
    title: "Introducing the Revenue Knowledge Graph",
    summary: "An explainable projection layer connecting product, RFQ, supplier, quote, order, payment, and margin evidence.",
  },
] as const;

export default function NewsPage() {
  return <div className="shell graph-news"><p className="eyebrow">ELVN Studio</p><h1>Product news</h1><p className="product-lede">Release notes and field perspectives from our industrial product engineering work.</p><div className="module-catalog">{articles.map((article, index) => <article key={article.href}><span>{String(index + 1).padStart(2, "0")}</span><div><p className="eyebrow">{article.date}</p><h2><Link href={article.href}>{article.title}</Link></h2><p>{article.summary}</p><Link className="text-link" href={article.href}>Read the update <span aria-hidden="true">↗</span></Link></div></article>)}</div></div>;
}
