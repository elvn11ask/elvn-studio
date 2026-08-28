import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("contains canonical project and Revenue Operations routes without duplicates", () => {
    const entries = sitemap();
    const routes = entries.map(({ url }) => url);
    expect(routes).toContain("https://studio.elvn.monster/work/chipfasteners");
    expect(routes).toContain("https://studio.elvn.monster/revenueos");
    expect(routes).toContain("https://studio.elvn.monster/revenueos/implementation");
    expect(routes).toContain("https://studio.elvn.monster/revenueos/knowledge-graph");
    expect(routes).toContain("https://studio.elvn.monster/revenueos/knowledge-graph/faq");
    expect(routes).toContain("https://studio.elvn.monster/news");
    expect(routes).toContain("https://studio.elvn.monster/news/revenue-knowledge-graph");
    expect(new Set(routes).size).toBe(routes.length);
    expect(entries.every(({ lastModified }) => lastModified instanceof Date)).toBe(true);
    expect(new Date(entries[0].lastModified!).toISOString()).toBe("2026-08-03T00:00:00.000Z");
  });

  it("publishes each Manufacturer Intelligence route exactly once with content-derived lastmod", () => {
    const entries = sitemap();
    for (const route of ["/revenueos/manufacturer-intelligence", "/news/manufacturer-intelligence"]) {
      const matches = entries.filter(({ url }) => url === `https://studio.elvn.monster${route}`);
      expect(matches).toHaveLength(1);
      expect(new Date(matches[0].lastModified!).toISOString()).toBe("2026-08-05T00:00:00.000Z");
    }
  });
});
