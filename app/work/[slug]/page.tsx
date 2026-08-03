import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getProject, getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export function generateStaticParams(){return getProjects().map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const project=getProject(slug);if(!project)return{};return{title:`${project.title} Case Study`,description:project.summary,alternates:{canonical:`/work/${slug}`},openGraph:{type:"article",title:`${project.title} — ELVN Studio`,description:project.summary,url:`/work/${slug}`,images:[{url:project.cover,alt:project.coverAlt}]}};}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const project=getProject(slug);if(!project)notFound();
  const related=getProjects().filter((item)=>item.slug!==slug).slice(0,2);
  const jsonLd={"@context":"https://schema.org","@type":"CreativeWork",name:project.title,description:project.summary,url:`${site.url}/work/${project.slug}`,image:`${site.url}${project.cover}`,creator:{"@type":"Organization",name:site.name},sameAs:project.liveUrl};
  return <>
    <article>
      <header className={`case-hero theme-${project.theme}`}><div className="shell"><p className="eyebrow">{project.eyebrow}</p><div className="case-title"><h1>{project.title}</h1><p>{project.outcome}</p></div><div className="case-actions"><a className="button" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project <span aria-hidden="true">↗</span></a><Link className="button-quiet" href="/contact">Discuss a similar project</Link></div><div className="case-image"><Image src={project.cover} alt={project.coverAlt} width={1800} height={1125} priority /></div></div></header>
      <section className="case-facts shell"><div><span>Industry</span><strong>{project.industry}</strong></div><div><span>Role</span><strong>{project.role}</strong></div><div><span>Platform</span><strong>{project.platform}</strong></div><div><span>Scope</span><strong>{project.skills.slice(0,2).join(" · ")}</strong></div></section>
      <section className="section shell content-grid"><aside className="content-aside"><p className="eyebrow">Verified evidence</p>{project.evidence.map((item)=><article className="evidence" key={item.label}><h3>{item.label}</h3><p>{item.detail}</p><small>{item.note}</small></article>)}</aside><div className="prose"><ReactMarkdown>{project.body}</ReactMarkdown><h2>Skills and technology</h2><div className="tag-row">{[...project.skills,...project.technologies].map((item)=><span key={item}>{item}</span>)}</div><h2>Verification notes</h2><p>Public statements are limited to production behavior, implementation records, or direct review. Unsupported revenue, conversion, customer-count, and benchmark claims are intentionally excluded.</p></div></section>
    </article>
    <section className="section section-contrast"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Related work</p><h2>Different products. The same operational discipline.</h2></div></div><div className="related-grid">{related.map((item)=><Link href={`/work/${item.slug}`} key={item.slug}><span>{item.eyebrow}</span><strong>{item.title}</strong><p>{item.summary}</p></Link>)}</div></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/>
  </>;
}
