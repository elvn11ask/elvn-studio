import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { site, staticRoutes } from "@/lib/site";
const BASE_UPDATED=new Date("2026-08-03T00:00:00.000Z");
const GRAPH_UPDATED=new Date("2026-08-04T00:00:00.000Z");
export default function sitemap():MetadataRoute.Sitemap{return [...staticRoutes.map((route)=>({url:`${site.url}${route}`,lastModified:route.includes("knowledge-graph")?GRAPH_UPDATED:BASE_UPDATED,changeFrequency:route===""?"weekly" as const:"monthly" as const,priority:route===""?1:route==="/work"?0.9:route==="/revenueos/knowledge-graph"?0.9:0.7})),...getProjects().map((project)=>({url:`${site.url}/work/${project.slug}`,lastModified:BASE_UPDATED,changeFrequency:"monthly" as const,priority:0.8}))]}
