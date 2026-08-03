import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { site, staticRoutes } from "@/lib/site";
export default function sitemap():MetadataRoute.Sitemap{const now=new Date();return [...staticRoutes.map((route)=>({url:`${site.url}${route}`,lastModified:now,changeFrequency:route===""?"weekly" as const:"monthly" as const,priority:route===""?1:route==="/work"?0.9:0.7})),...getProjects().map((project)=>({url:`${site.url}/work/${project.slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:0.8}))]}
