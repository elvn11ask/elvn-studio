import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      disallow: ["/api/contact", "/api/revenueos-assessment", "/api/revenueos-audit"],
    }],
    sitemap: [`${site.url}/sitemap.xml`, `${site.url}/sitemap-google.xml`],
    host: new URL(site.url).hostname,
  };
}
