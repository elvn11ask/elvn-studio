import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnalyticsMeasurement, ConsentControls, GoogleAnalyticsTag } from "@/components/consent";
import { site } from "@/lib/site";
import "./globals.css";
import "./revenueos-v2.css";
import "./manufacturer-intelligence.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "ELVN Studio — Independent Product Engineering", template: "%s — ELVN Studio" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", siteName: site.name, title: "ELVN Studio — Product Engineering", description: site.description, url: "/", images: [{ url: "/og.png", width: 1200, height: 630, alt: "ELVN Studio product engineering" }] },
  twitter: { card: "summary_large_image", site: "@elvn11ask", creator: "@elvn11ask", title: "ELVN Studio — Product Engineering", description: site.description, images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "dark", themeColor: "#10110f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = [
    { "@context": "https://schema.org", "@type": "ProfessionalService", name: site.name, url: site.url, email: site.email, areaServed: "Worldwide", sameAs: Object.values(site.social) },
  ];
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <GoogleAnalyticsTag />
        <ConsentControls />
        <AnalyticsMeasurement />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
