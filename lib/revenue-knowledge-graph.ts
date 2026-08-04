export const graphProduct = {
  name: "Revenue Knowledge Graph",
  tagline: "Know why revenue happened.",
  status: "Design Partner Module",
  description: "An evidence-backed projection across product, RFQ, supplier, quote, order, payment, and margin records—without replacing the systems that own them.",
} as const;

export const graphPrinciples = [
  ["Projection, not replacement", "CRM, ERP, catalog, finance, and Revenue Operations remain authoritative. The graph is rebuilt from versioned events."],
  ["Evidence on every relationship", "Each edge carries source, source record, mapping version, observed time, and fact class."],
  ["Deterministic product identity", "Manufacturer plus exact MPN is the identity boundary; fuzzy model guesses cannot silently merge products."],
  ["Financial precision", "Financial facts require currency and the time at which the amount was observed."],
  ["AI stays optional", "The module works with AI disabled. Recommendations are read-only until a person reviews them."],
] as const;

export const graphLayers = [
  ["Authoritative sources", "Catalogs, websites, CRM, ERP, finance, mail, and Revenue Operations"],
  ["Append-only events", "Idempotent facts with source identity, event time, schema version, and tenant"],
  ["Reproducible projection", "Versioned entities and relationships that can be rebuilt and reconciled"],
  ["Task views", "Operational queues and explanations designed for a decision—not a decorative graph"],
] as const;

export const graphViews = [
  ["Quote Control Tower", "Prioritize quotes blocked by cost, supplier response, approval, customer action, or SLA."],
  ["Revenue attribution", "Trace a paid outcome back through quote, RFQ, product page, and acquisition evidence."],
  ["Supplier evidence", "Compare response, availability, lead-time, validity, and downstream quote outcomes."],
  ["Product enrichment", "Rank verified catalog gaps by observed RFQ and commercial evidence—not invented future revenue."],
  ["Margin explanation", "Connect the accepted quote, cost basis, exchange context, payment, and recorded margin."],
  ["Exception investigation", "Follow delivery failures, sync retries, identity conflicts, and reconciliation gaps."],
  ["Account timeline", "Review the ordered commercial evidence for an account without exposing unrelated tenants."],
] as const;

export const graphPricing = [
  ["Graph readiness assessment", "$5,000–$15,000", "One-time", "Source inventory, identity risks, event coverage, security boundary, and phased roadmap."],
  ["Design partner pilot", "$20,000–$50,000", "One-time implementation", "One representative revenue path, projection, reconciliation, and two task views."],
  ["Business implementation", "$50,000–$150,000", "One-time implementation", "Multiple sources, governed identity, operational views, dashboards, and rollout controls."],
  ["Enterprise program", "$150,000–$500,000+", "One-time implementation", "Multi-company scope, complex ERP/warehouse boundaries, SSO, audit, migration, and support design."],
] as const;

export const graphFaq = [
  ["Is this a new CRM or ERP?", "No. It is a projection and intelligence module. Existing systems remain authoritative for the records they own."],
  ["Is graph software required?", "No. The contract is event and relationship based. Storage is selected during implementation and can start with relational projections."],
  ["Does it need AI?", "No. Ingestion, identity, projection, reconciliation, search, and task views are deterministic. AI is disabled by default."],
  ["Can AI change prices or merge products?", "No. Commercial actions and identity changes require controlled human workflows. Recommendations are stored separately from facts."],
  ["How is tenant data isolated?", "Every event, entity, query, token, and task view is tenant-scoped and protected by role policy."],
  ["Are the published prices annual?", "No. The displayed ranges are one-time assessment or implementation fees. Hosting, support, maintenance, and optional model usage are scoped separately."],
  ["What is public on GitHub?", "Only a safe conceptual package: boundaries, redacted examples, synthetic data, and integration patterns. The production schema and implementation remain private."],
  ["What is the first production gate?", "A source-system inventory followed by a shadow projection whose counts and identities reconcile to authoritative records."],
] as const;
