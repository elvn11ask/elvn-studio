import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { Search } from "@/components/search";
import { getProjects } from "@/lib/projects";
export const metadata:Metadata={title:"Search",description:"Search ELVN Studio projects, services, and engineering capabilities.",alternates:{canonical:"/search"}};
const services=[
  ["Product Engineering","Requirement to production ownership","/services",["MVP","SaaS","architecture"]],
  ["B2B Catalog Platforms","Complex product discovery and RFQ workflows","/services",["procurement","industrial","catalog"]],
  ["Technical SEO","Canonical routes, structured data, sitemaps, and crawl control","/services",["search","schema","performance"]],
  ["Production Delivery","Docker, Nginx, TLS, health checks, and rollback","/services",["deployment","recovery","monitoring"]],
] as const;
export default function SearchPage(){const items=[...getProjects().map((project)=>({title:project.title,description:project.summary,href:`/work/${project.slug}`,type:"Case study",terms:[...project.skills,...project.technologies,project.industry]})),...services.map(([title,description,href,terms])=>({title,description,href,type:"Service",terms:[...terms]}))];return <><PageIntro eyebrow="Search" title="Find the closest problem, product, or capability."><p>The index is generated from published project content and core services. No external search provider or unpublished material.</p></PageIntro><section className="section shell"><Search items={items}/></section></>}
