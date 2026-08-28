import type { Metadata } from "next";
import Link from "next/link";
import { ProductSchema } from "@/components/revenueos/product-shell";

export const metadata: Metadata = {
  title: "Revenue OS enters private beta",
  description: "Website Guard, Catalog Guard and a bounded engineering validation across 95 public pages and five first-party environments.",
  alternates: { canonical: "/news/revenueos-private-beta" },
};

export default function RevenueOSPrivateBetaNews() {
  return <><article className="shell graph-news"><p className="eyebrow">Product news · August 28, 2026</p><h1>Revenue OS enters private beta</h1><p className="product-lede">The scanner prototype is now an operational website workspace with bounded scans, page inventory, grouped issues, differential history and private reports.</p><div className="prose"><h2>What works now</h2><p>Website Guard can monitor an authorized public website without a catalog. Catalog Guard adds product identity and source-to-site coverage. The private workspace supports scan creation and execution, page inventory, issue history, reports and recurring schedules.</p><h2>What was measured</h2><p>A bounded engineering validation covered 95 public pages across five first-party production environments. It recorded zero request errors and zero writes or form submissions. This is technical validation—not 95 customers, five customers or a measured revenue outcome.</p><h2>What it does not do yet</h2><p>Deep rendered-DOM analysis for client-only applications remains a bounded adapter. Migration Guard is a limited pilot. Authenticated sites require a separate agreement. Revenue OS does not make automatic production changes or promise ranking or revenue improvement.</p><h2>Who the pilot is for</h2><p>Agencies, commercial websites, B2B catalogs and e-commerce teams that need a repeatable way to detect website regressions, prioritize evidence and verify fixes.</p><p><Link className="button" href="/revenueos/audit">Request Revenue Audit <span aria-hidden="true">↗</span></Link></p></div></article><ProductSchema path="/news/revenueos-private-beta" name="Revenue OS enters private beta" description="An operational private beta for bounded website and catalog regression detection." /></>;
}
