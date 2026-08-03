import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/project-schema";

export function ProjectCard({ project, feature = false }: { project: Project; feature?: boolean }) {
  return (
    <article className={`project-card theme-${project.theme} ${feature ? "project-feature" : ""}`}>
      <Link className="project-image" href={`/work/${project.slug}`} aria-label={`Read the ${project.title} case study`}>
        <Image src={project.cover} alt={project.coverAlt} width={1600} height={1000} sizes={feature ? "(max-width: 800px) 100vw, 65vw" : "(max-width: 800px) 100vw, 45vw"} />
      </Link>
      <div className="project-copy">
        <div className="project-meta"><span>{project.eyebrow}</span><span>{project.role}</span></div>
        <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
        <p><strong>The problem:</strong> {project.problem}</p>
        <p><strong>The response:</strong> {project.solution}</p>
        <div className="tag-row">{project.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div>
        <Link className="text-link" href={`/work/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
