export const site = {
  name: "ELVN Studio",
  shortName: "ELVN",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://studio.elvn.monster",
  description:
    "Independent product engineering studio for high-performance websites, B2B platforms, SaaS products, technical SEO, and production delivery.",
  email: "elvnask@gmail.com",
  social: {
    github: "https://github.com/elvn11ask",
    x: "https://x.com/elvn11ask",
    telegram: "https://t.me/elvnask",
  },
} as const;

export const primaryNavigation = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
] as const;

export const staticRoutes = [
  "",
  "/work",
  "/services",
  "/process",
  "/skills",
  "/about",
  "/resume",
  "/contact",
  "/privacy",
  "/search",
] as const;
