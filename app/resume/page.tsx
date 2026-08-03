import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { PrintButton } from "@/components/print-button";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "ATS-friendly ELVN Studio profile covering product engineering and full-stack delivery.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  const projects = getProjects();
  return <>
    <PageIntro eyebrow="Resume" title="ELVN Studio — Product Engineering Profile">
      <p>Independent full-stack delivery across business websites, B2B platforms, interactive products, technical SEO, and production operations.</p>
      <div className="button-row resume-actions"><PrintButton /><a className="button-quiet" href={`mailto:${site.email}`}>{site.email}</a></div>
    </PageIntro>
    <section className="section shell resume">
      <aside><h2>Contact</h2><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.social.github}>github.com/elvn11ask</a><a href={site.social.x}>x.com/elvn11ask</a><a href={site.social.telegram}>t.me/elvnask</a><h2>Core scope</h2><p>Product engineering</p><p>Full-stack development</p><p>Technical SEO</p><p>Performance engineering</p><p>Docker, Nginx, TLS</p></aside>
      <div><h2>Profile</h2><p>Senior product-minded developer responsible for architecture, implementation, validation, and stable production delivery. Work is presented through verified live products rather than invented employer history or unsupported tenure claims.</p><h2>Selected production work</h2>{projects.map((project) => <article key={project.slug}><h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3><p>{project.eyebrow} · {project.role}</p><p>{project.outcome}</p></article>)}<h2>Working principles</h2><p>Direct communication, lean architecture, measurable validation, semantic public interfaces, documented launch controls, and honest boundaries between prototype and production.</p></div>
    </section>
  </>;
}
