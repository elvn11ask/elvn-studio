import type { Metadata } from "next";
import { RevenueAuditForm } from "@/components/revenueos/audit-form";
import { ProductHero, ProductSchema } from "@/components/revenueos/product-shell";

export const metadata: Metadata = {
  title: "Revenue Audit — Website & Catalog Risk",
  description: "Request a bounded, read-only Website Revenue Risk Audit or Catalog Revenue Leak Audit from ELVN Studio.",
  alternates: { canonical: "/revenueos/audit" },
  openGraph: {
    title: "Revenue Audit — Website & Catalog Risk",
    description: "Request a bounded, read-only Website Revenue Risk Audit or Catalog Revenue Leak Audit from ELVN Studio.",
    url: "/revenueos/audit",
    type: "website",
    images: ["/revenueos/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revenue Audit — Website & Catalog Risk",
    description: "Bounded, read-only website and catalog risk audits from ELVN Studio.",
    images: ["/revenueos/og.png"],
  },
};

const questions = [
  ["What do you inspect?", "Public HTTP responses, redirects, indexability, canonical signals, metadata, headings, structured data, important links, response timing and recurring page patterns. Catalog audits add source-to-site coverage and exact product identity."],
  ["What do I provide?", "A public website, written authorization for a bounded read-only scan, approximate page or SKU volume, and the main concern. A catalog audit also needs a structured export containing product ID, manufacturer and exact MPN."],
  ["What do I receive?", "A private evidence report, grouped and prioritized issue queue, affected-page samples, limitations, remediation order and a 45-minute findings review."],
  ["How long does it take?", "The target is five business days after valid inputs and authorization are received. Very large or authenticated scopes are quoted separately."],
  ["What does it cost?", "Website Revenue Risk Audit starts at $750. Catalog Revenue Leak Audit starts at $1,500. Final fixed scope is confirmed before work begins."],
  ["What access do you need?", "The base audit needs no credentials and reads only approved public URLs. Authenticated or staging environments require a separate access and data-handling agreement."],
  ["Will you change my site?", "No. The audit submits no forms, places no orders, changes no content and performs no automatic remediation."],
  ["What happens afterward?", "You can implement the plan internally, commission a fixed remediation scope, or start a 30-day continuous guard pilot. There is no required subscription."],
] as const;

export default function RevenueAuditPage() {
  return <>
    <ProductHero eyebrow="First commercial offer · Fixed scope" title="Find the website risks you can verify—not a revenue number someone invented." lede="A bounded engineering audit for commercial websites and product catalogs. Read-only by default, evidence attached, limitations stated." actions={false} compact />
    <section className="section shell"><div className="ros-module-grid"><article><span>WEBSITE REVENUE RISK AUDIT</span><h3>From $750</h3><p>Public website baseline, grouped visibility and technical risks, private report, remediation order and findings review.</p></article><article><span>CATALOG REVENUE LEAK AUDIT</span><h3>From $1,500</h3><p>Website baseline plus catalog import, source-to-site coverage, exact identity checks and prioritized product-page gaps.</p></article><article><span>30-DAY CONTINUOUS GUARD</span><h3>From $299 website / $699 catalog</h3><p>Recurring bounded scans, regression tracking, issue history and verification. Offered after scope and authorization review.</p></article></div></section>
    <section className="section section-contrast"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Clear boundary</p><h2>What happens before, during and after the audit.</h2></div><p>No revenue increase is promised. Technical findings are not represented as commercial impact without customer evidence.</p></div><div className="faq-list">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className="section shell assessment-layout" id="request"><aside><p className="eyebrow">Request an audit</p><h2>Seven fields. One bounded next step.</h2><p>The server validates every request, applies a signed token, timing check, honeypot and rate limit, then records a private lead and queues email delivery. Telegram notification is used only when separately configured.</p><p>QA does not send fake submissions to real recipients.</p></aside><RevenueAuditForm /></section>
    <ProductSchema path="/revenueos/audit" name="Website and Catalog Revenue Audit" description="Bounded read-only website and catalog risk audits from ELVN Studio." faq={questions} />
  </>;
}
