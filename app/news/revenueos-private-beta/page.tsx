import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductSchema } from "@/components/revenueos/product-shell";
import { site } from "@/lib/site";

const title = "Revenue OS private beta is live in production";
const description = "Revenue OS 0.2.0 production verification, rollback evidence, live browser QA and a bounded 95-page engineering baseline.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/news/revenueos-private-beta" },
  openGraph: {
    title,
    description,
    url: "/news/revenueos-private-beta",
    type: "article",
    publishedTime: "2026-08-28T00:00:00.000Z",
    modifiedTime: "2026-08-29T00:00:00.000Z",
    images: ["/revenueos/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/revenueos/og.png"],
  },
};

export default function RevenueOSPrivateBetaNews() {
  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    datePublished: "2026-08-28",
    dateModified: "2026-08-29",
    image: `${site.url}/revenueos/og.png`,
    author: { "@type": "Organization", name: "ELVN Studio" },
    publisher: { "@type": "Organization", name: "ELVN Studio", url: site.url },
    mainEntityOfPage: `${site.url}/news/revenueos-private-beta`,
  };

  return <>
    <article className="shell graph-news">
      <p className="eyebrow">Product news · Published August 28 · Updated August 29, 2026</p>
      <h1>{title}</h1>
      <p className="product-lede">The scanner prototype is now a deployed operational workspace with bounded scans, page inventory, grouped issues, differential history and private reports.</p>
      <Image src="/revenueos/social/2026-08-29/studio-revenueos-desktop.jpg" width={1258} height={720} alt="Live Revenue OS product page on ELVN Studio" priority />
      <div className="prose">
        <h2>Production verification completed</h2>
        <p>Revenue OS 0.2.0 is live with a healthy application and worker, a ready database, an immutable release identity and a verified pre-deploy backup. The application rollback path was rehearsed from the new release to the retained 0.1.0 release and back without a destructive database rollback.</p>
        <h2>What works now</h2>
        <p>Website Guard can monitor an authorized public website without a catalog. Catalog Guard adds product identity and source-to-site coverage. The private workspace supports authorization, bounded scan execution, page inventory, grouped issue evidence, status history, reports, export and manual or recurring schedules.</p>
        <h2>What was measured</h2>
        <p>A bounded engineering validation covered 95 public pages across five first-party production environments. It recorded zero request errors and zero writes or form submissions. Additional authenticated browser QA verified the production workspace on desktop and at 390 pixels. These are engineering facts—not customer count, revenue, ranking or conversion evidence.</p>
        <h2>Commercial starting point</h2>
        <p>The Website Revenue Risk Audit starts at $750. The Catalog Revenue Leak Audit starts at $1,500. A 30-day assisted private beta is scoped at $299–500 for a website or $699–1,000 for a catalog. Final scope records authorization, limits, review effort and exclusions.</p>
        <h2>What it does not do yet</h2>
        <p>Deep rendered-DOM analysis for client-only applications remains a bounded adapter. Migration Guard is a limited pilot. Authenticated sites require a separate agreement. Revenue OS does not make automatic production changes or promise ranking or revenue improvement. Self-service billing and verified email alerts are not available.</p>
        <h2>Who the pilot is for</h2>
        <p>Agencies, commercial websites, B2B catalogs, e-commerce and SaaS teams that need a repeatable way to detect website regressions, prioritize evidence and verify fixes. The next validation milestone is the first paid customer.</p>
        <p><Link className="button" href="/revenueos/audit">Request Revenue Audit <span aria-hidden="true">↗</span></Link></p>
      </div>
    </article>
    <ProductSchema path="/news/revenueos-private-beta" name={title} description={description} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema).replace(/</g, "\\u003c") }} />
  </>;
}
