import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/projects";

const capabilities = [
  ["Build", "Business websites", "SaaS and MVPs", "Interactive products"],
  ["Scale", "B2B catalogs", "Procurement platforms", "Multilingual systems"],
  ["Improve", "Technical SEO", "Performance", "Production reliability"],
  ["Prepare for AI", "Provider-independent architecture", "Safe workflows", "Integration layers"],
] as const;

export default function Home() {
  const projects = getProjects();
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Independent product engineering studio</p>
          <h1>I build high-performance web products that solve real business problems.</h1>
          <p className="hero-lede">Full-stack development, B2B platforms, AI-ready products, technical SEO, performance engineering, and production delivery.</p>
          <div className="button-row"><Link className="button" href="/work">View selected work <span aria-hidden="true">↗</span></Link><Link className="button-quiet" href="/contact">Discuss a project</Link></div>
          <div className="capability-line"><span>Product Engineering</span><span>B2B Platforms</span><span>Technical SEO</span><span>Production Delivery</span></div>
        </div>
        <div className="hero-montage" aria-label="Selected production work">
          {projects.slice(0, 3).map((project, index) => (
            <Link href={`/work/${project.slug}`} className={`montage-shot shot-${index + 1}`} key={project.slug}>
              <Image src={project.cover} alt={project.coverAlt} fill sizes="(max-width: 800px) 70vw, 32vw" priority={index === 0} />
              <span>{project.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="proof-strip"><div className="shell proof-grid"><span>Direct senior communication</span><span>Architecture before excess</span><span>Measured production work</span><span>Rollback included</span></div></section>

      <section className="section shell studio-product-feature">
        <div><p className="eyebrow">Private Implementation Program</p><h2>ELVN Revenue Operations</h2><p>Revenue operations infrastructure for RFQ-driven industrial sales. Connect product discovery, delivery, ownership, supplier sourcing, cost, quote, order, payment, revenue, and margin without replacing every working CRM or ERP.</p></div>
        <div className="studio-product-flow"><span>Product page</span><span>RFQ</span><span>Supplier</span><span>Quote</span><span>Payment</span><strong>Margin</strong></div>
        <div className="button-row"><Link className="button" href="/revenueos">Explore Revenue Operations <span aria-hidden="true">↗</span></Link><Link className="button-quiet" href="/revenueos/pricing">View engagement ranges</Link></div>
      </section>

      <section className="section shell studio-product-feature">
        <div><p className="eyebrow">Revenue Operations module</p><h2>Manufacturer Intelligence</h2><p>Turn approved manufacturer documentation into evidence-backed product data while preserving exact orderable part identity and keeping publication under human control.</p></div>
        <div className="studio-product-flow"><span>Source policy</span><span>Exact MPN</span><span>Official evidence</span><span>Review</span><span>Simulation</span><strong>Controlled data</strong></div>
        <div className="button-row"><Link className="button" href="/revenueos/manufacturer-intelligence">Explore Manufacturer Intelligence <span aria-hidden="true">↗</span></Link><Link className="button-quiet" href="/news/manufacturer-intelligence">Read the launch note</Link></div>
      </section>

      <section className="section shell">
        <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>Commercial products, handled end to end.</h2></div><p>Each case starts with the business constraint, then shows the technical decisions that made the result reliable.</p></div>
        <div className="project-list"><ProjectCard project={projects[0]} feature />{projects.slice(1, 3).map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
        <div className="section-action"><Link className="text-link" href="/work">See all five case studies <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="section section-contrast"><div className="shell">
        <div className="section-heading"><div><p className="eyebrow">Capabilities</p><h2>Choose the situation, not a stack of buzzwords.</h2></div><p>Technical choices follow the product, operating model, and release risk.</p></div>
        <div className="capability-grid">{capabilities.map(([title, ...items], index) => <article key={title}><span className="index">0{index + 1}</span><h3>{title}</h3>{items.map((item) => <p key={item}>{item}</p>)}</article>)}</div>
      </div></section>

      <section className="section shell split-section">
        <div><p className="eyebrow">Why ELVN Studio</p><h2>One accountable technical owner, from first constraint to stable release.</h2></div>
        <div className="principles">
          <article><h3>Architecture before unnecessary code</h3><p>The smallest reliable system is usually the easiest one to operate, measure, and improve.</p></article>
          <article><h3>Performance and search built in</h3><p>Core Web Vitals, crawl paths, structured data, and response cost are product decisions.</p></article>
          <article><h3>Prototype and production stay distinct</h3><p>Experiments are useful. Claims, launch controls, and operational responsibility still need evidence.</p></article>
        </div>
      </section>

      <section className="section shell process-preview"><div><p className="eyebrow">A practical process</p><h2>Clear decisions at every stage.</h2></div><ol>{["Understand the business problem", "Define the smallest reliable architecture", "Build the critical product path", "Validate usability, performance, and SEO", "Launch with rollback and monitoring", "Improve from real usage"].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol><Link className="text-link" href="/process">See the full process <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
