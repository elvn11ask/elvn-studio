import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-cta">
        <p className="eyebrow">Start with the real constraint</p>
        <h2>Have a product, platform, or website that needs senior-level ownership?</h2>
        <p>Describe the problem, current state, and target outcome. I’ll respond with the most practical next step.</p>
        <div className="button-row">
          <Link className="button" href="/contact">Discuss a project <span aria-hidden="true">↗</span></Link>
          <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
      <div className="shell footer-grid">
        <div>
          <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">E</span><span>ELVN <em>Studio</em></span></Link>
          <p>Independent product engineering, directly accountable from scope to release.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <Link href="/work">Work</Link><Link href="/services">Services</Link><Link href="/process">Process</Link><Link href="/resume">Resume</Link>
        </div>
        <div>
          <strong>Connect</strong>
          <a href={site.social.x} target="_blank" rel="noreferrer">X · @elvn11ask</a>
          <a href={site.social.telegram} target="_blank" rel="noreferrer">Telegram · @elvnask</a>
          <a href={site.social.github} target="_blank" rel="noreferrer">GitHub · elvn11ask</a>
        </div>
        <div>
          <strong>Legal</strong>
          <Link href="/privacy">Privacy</Link><Link href="/search">Search</Link>
          <span>© {new Date().getFullYear()} ELVN Studio</span>
        </div>
      </div>
    </footer>
  );
}
