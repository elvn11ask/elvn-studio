export const manufacturerIntelligence = {
  name: "Manufacturer Intelligence",
  version: "v0.1.0-preview",
  category: "AI-Assisted Manufacturer Intelligence for Industrial Catalogs",
  tagline: "Turn official manufacturer documentation into evidence-backed product data.",
  description: "Manufacturer Intelligence connects approved manufacturer sources, datasheets, and optional AI-assisted extraction to enrich industrial catalogs without merging variants or publishing unsupported specifications.",
  status: "Preview · Private Implementation Program",
} as const;

export const manufacturerFlow = [
  "Manufacturer policy",
  "Exact product identity",
  "Official source",
  "Field evidence",
  "Human review",
  "Controlled publication",
] as const;

export const manufacturerCapabilities = [
  ["Exact MPN preservation", "Manufacturer, tenant, and the complete orderable part number remain the product identity. Package, carrier, grade, and suffix variants are never silently merged."],
  ["Reusable connectors", "A governed connector can resolve approved product pages, documents, images, and package evidence across a selected manufacturer cohort."],
  ["Datasheet intelligence", "Technical values retain their source, document location, qualifier, extraction method, and review state rather than becoming unattributed copy."],
  ["Evidence passports", "Each candidate field can be inspected with its identity, provenance, confidence, conflict state, and revalidation date."],
  ["Optional private AI", "Customer-approved models may assist discovery, classification, extraction, and reviewer summaries. The deterministic system works without AI."],
  ["Controlled publication", "Only approved fields enter a simulated, reversible publication batch. Connector output and model output cannot publish directly."],
] as const;

export const manufacturerControls = [
  "Unknown source policy fails closed; access is never bypassed.",
  "Family-level facts cannot leak into an exact orderable variant.",
  "Lifecycle, compliance, dimensions, and package are never inferred without evidence.",
  "AI output is labelled as inference and cannot declare evidence verified.",
  "Review and publication actions are tenant-scoped and append-only audited.",
  "All collection and extraction work runs outside public catalog requests.",
] as const;

export const manufacturerPricing = [
  ["Manufacturer Data Assessment", "$5,000–$15,000", "Manufacturer and source audit, catalog coverage, connector feasibility, data-quality gaps, and an implementation roadmap."],
  ["Connector Pilot", "$15,000–$40,000", "Three to five manufacturers, bounded SKU cohorts, source policies, extraction, review workflow, and publication simulation."],
  ["Business Implementation", "$40,000–$150,000", "Ten to thirty connectors, catalog integration, controlled publication, reporting, and optional customer-approved AI."],
  ["Enterprise / Private", "$150,000–$500,000+", "Private cloud or self-hosted deployment, custom manufacturers, PIM/ERP integration, tenant policy, support, and SLA."],
] as const;

export const manufacturerPricingFactors = [
  "Number of manufacturers and bounded SKU cohorts",
  "Source permissions, formats, and access constraints",
  "Connector complexity and document variation",
  "Review roles and controlled publication workflow",
  "Catalog, PIM, ERP, or commerce integration",
  "Deployment boundary and optional customer-approved AI",
  "Refresh frequency, monitoring, support, and SLA",
] as const;

export const manufacturerFaq = [
  ["Is Manufacturer Intelligence a generic web scraper?", "No. It is a source-policy-aware product intelligence system. Each connector is bounded to approved sources and fails closed when access or usage rights are unclear."],
  ["Does it merge similar part numbers?", "No. The complete exact MPN remains part of product identity. Normalization can assist search, but it cannot replace identity or collapse orderable variants."],
  ["Does the module require AI?", "No. Deterministic connectors, evidence storage, review, and publication control work with AI disabled."],
  ["Can AI publish technical specifications?", "No. AI suggestions remain a separate inference class. Verified source evidence and an approved review workflow control publication."],
  ["Can it work with an existing catalog or PIM?", "Yes, after an adapter and ownership boundary are defined. The module is designed to complement the current catalog, ERP, PIM, or commerce platform rather than silently replace it."],
  ["What is the first engagement?", "A Manufacturer Data Assessment identifies the highest-value manufacturers, source permissions, exact-identity risks, schema gaps, and the smallest viable connector pilot."],
] as const;
