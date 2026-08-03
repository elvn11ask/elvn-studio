import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Selected Work", description: "Verified case studies across B2B procurement, education, hospitality, technical SEO, and production engineering.", alternates: { canonical: "/work" } };

export default function WorkPage() {
  const projects = getProjects();
  return <><PageIntro eyebrow="Selected work" title="Products built around real operating constraints."><p>Five production case studies. No fake growth numbers, anonymous testimonials, or technology lists standing in for outcomes.</p></PageIntro><section className="section shell"><div className="work-filters" aria-label="Project coverage"><span>B2B</span><span>Education</span><span>Hospitality</span><span>Technical SEO</span><span>Performance</span></div><div className="project-list">{projects.map((project,index)=><ProjectCard project={project} feature={index===0 || index===3} key={project.slug}/>)}</div></section></>;
}
