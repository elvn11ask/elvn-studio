import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ManufacturerIntelligencePage, { metadata as productMetadata } from "@/app/revenueos/manufacturer-intelligence/page";
import ManufacturerIntelligenceNews, { metadata as newsMetadata } from "@/app/news/manufacturer-intelligence/page";
import NewsPage from "@/app/news/page";
import { manufacturerIntelligence } from "@/lib/manufacturer-intelligence";

const h1Count = (markup: string) => (markup.match(/<h1(?:\s|>)/g) || []).length;

describe("Manufacturer Intelligence public preview", () => {
  it("renders one H1, transparent maturity, CTAs, and public schema", () => {
    const markup = renderToStaticMarkup(<ManufacturerIntelligencePage />);
    expect(h1Count(markup)).toBe(1);
    expect(markup).toContain("v0.1.0-preview");
    expect(markup).toContain("Private Implementation Program");
    expect(markup).toContain("Request a Manufacturer Data Assessment");
    expect(markup).toContain("Explore the Architecture");
    expect(markup).toContain("BreadcrumbList");
    expect(markup).toContain("FAQPage");
    expect(markup).toContain("Service");
    expect(markup.match(/Preview · Private Implementation Program/g)).toHaveLength(1);
    expect(markup).not.toContain("general availability");
  });

  it("publishes an honest news article without confidential experiment statistics", () => {
    const markup = renderToStaticMarkup(<ManufacturerIntelligenceNews />);
    expect(h1Count(markup)).toBe(1);
    expect(markup).toContain("NewsArticle");
    expect(markup).toContain("honest preview");
    expect(markup).not.toMatch(/500 products|10 exact|64 review|2% candidate/i);
  });

  it("provides canonical metadata and discovery through the news index", () => {
    const indexMarkup = renderToStaticMarkup(<NewsPage />);
    expect(productMetadata.alternates?.canonical).toBe("/revenueos/manufacturer-intelligence");
    expect(newsMetadata.alternates?.canonical).toBe("/news/manufacturer-intelligence");
    expect(indexMarkup).toContain("/news/manufacturer-intelligence");
    expect(indexMarkup).not.toContain("<main");
    expect(manufacturerIntelligence.version).toBe("v0.1.0-preview");
  });
});
