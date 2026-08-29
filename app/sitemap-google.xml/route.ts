import sitemap from "@/app/sitemap";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function serializeSitemap(): string {
  const urls = sitemap().map((entry) => {
    const lastModified = entry.lastModified instanceof Date
      ? entry.lastModified.toISOString()
      : entry.lastModified;

    return [
      "<url>",
      `<loc>${escapeXml(entry.url)}</loc>`,
      lastModified ? `<lastmod>${escapeXml(lastModified)}</lastmod>` : "",
      entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : "",
      typeof entry.priority === "number" ? `<priority>${entry.priority}</priority>` : "",
      "</url>",
    ].filter(Boolean).join("");
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`;
}

export function GET(): Response {
  const body = serializeSitemap();

  return new Response(body, {
    headers: {
      "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "content-length": String(Buffer.byteLength(body)),
      "content-type": "application/xml; charset=utf-8",
    },
  });
}
