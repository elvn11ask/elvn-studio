import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { site, staticRoutes } from "@/lib/site";

const BASE_UPDATED = new Date("2026-08-03T00:00:00.000Z");
const GRAPH_UPDATED = new Date("2026-08-04T00:00:00.000Z");
const MANUFACTURER_INTELLIGENCE_UPDATED = new Date("2026-08-05T00:00:00.000Z");
const REVENUEOS_LAUNCH_UPDATED = new Date("2026-08-28T00:00:00.000Z");
const REVENUEOS_PRODUCTION_UPDATE = new Date("2026-08-29T00:00:00.000Z");

function lastModifiedFor(route: string): Date {
  if (["/revenueos", "/news", "/news/revenueos-private-beta"].includes(route)) return REVENUEOS_PRODUCTION_UPDATE;
  if (route.includes("manufacturer-intelligence")) return MANUFACTURER_INTELLIGENCE_UPDATED;
  if (route.includes("knowledge-graph")) return GRAPH_UPDATED;
  if (route.startsWith("/revenueos")) return REVENUEOS_LAUNCH_UPDATED;
  return BASE_UPDATED;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: lastModifiedFor(route),
      changeFrequency: route === "" || route === "/news" || route === "/revenueos" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/work" || route === "/revenueos" ? 0.9 : route === "/revenueos/knowledge-graph" || route === "/revenueos/manufacturer-intelligence" ? 0.9 : 0.7,
    })),
    ...getProjects().map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: BASE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
