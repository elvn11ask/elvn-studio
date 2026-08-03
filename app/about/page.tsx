import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "ELVN Studio is an independent product engineering practice with direct responsibility for delivery.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <>
    <PageIntro eyebrow="About" title="Direct responsibility from first constraint to production.">
      <p>ELVN Studio is an independent practice covering senior full-stack development, product engineering, and technical operations.</p>
    </PageIntro>
    <section className="section shell about-grid">
      <div className="founder-card"><div className="founder-monogram" aria-hidden="true">E</div><p className="eyebrow">Independent practice</p><h2>Product engineering<br />Full-stack development<br />Technical operations</h2></div>
      <div className="prose"><h2>One owner across the whole system</h2><p>I work where product decisions, interface quality, application architecture, search visibility, and production operations meet. That means fewer handoffs between defining the problem and taking responsibility when the release goes live.</p><h2>Evidence over theatre</h2><p>Case studies state the exact role, visible product behavior, and verification boundary. The site does not publish invented tenure, client totals, testimonials, or commercial results.</p><h2>Independent, not isolated</h2><p>The studio can work directly with a founder or alongside an existing design, content, or engineering team. Responsibility stays explicit and communication stays close to the work.</p><div className="button-row"><Link className="button" href="/contact">Discuss a project</Link><a className="button-quiet" href={site.social.telegram} target="_blank" rel="noreferrer">Telegram · @elvnask</a></div></div>
    </section>
  </>;
}
