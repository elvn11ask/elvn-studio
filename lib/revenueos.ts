export const revenueOS = {
  name: "Revenue OS",
  workingName: "Revenue OS",
  category: "Website and Catalog Intelligence Platform",
  tagline: "Detect website regressions, work the issue queue, and verify fixes.",
  status: "Private Beta",
  assessmentCta: "Request a bounded audit",
} as const;

export const revenueOSRoutes = [
  "/revenueos",
  "/revenueos/modules",
  "/revenueos/integrations",
  "/revenueos/ai",
  "/revenueos/pricing",
  "/revenueos/implementation",
  "/revenueos/security",
  "/revenueos/industrial-distribution",
  "/revenueos/electronic-components",
  "/revenueos/case-studies",
  "/revenueos/faq",
  "/revenueos/knowledge-graph",
  "/revenueos/knowledge-graph/architecture",
  "/revenueos/knowledge-graph/use-cases",
  "/revenueos/knowledge-graph/ai",
  "/revenueos/knowledge-graph/security",
  "/revenueos/knowledge-graph/pricing",
  "/revenueos/knowledge-graph/faq",
  "/revenueos/manufacturer-intelligence",
  "/news/revenue-knowledge-graph",
  "/news/manufacturer-intelligence",
] as const;

export const revenueOSNavigation = [
  ["Overview", "/revenueos"],
  ["Catalog Guard", "/revenueos/catalog-guard"],
  ["Validation", "/revenueos/validation"],
  ["Modules", "/revenueos/modules"],
  ["Knowledge Graph", "/revenueos/knowledge-graph"],
  ["Manufacturer Intelligence", "/revenueos/manufacturer-intelligence"],
  ["Integrations", "/revenueos/integrations"],
  ["AI", "/revenueos/ai"],
  ["Pricing", "/revenueos/pricing"],
  ["Implementation", "/revenueos/implementation"],
] as const;

export const lifecycle = [
  "Traffic", "Product page", "RFQ", "Lead", "Delivery", "Assignment", "Sourcing",
  "Cost", "Quote", "Negotiation", "Order", "Shipment", "Invoice", "Payment", "Margin",
] as const;

export const modules = [
  { name: "RFQ Operations", problem: "Requests arrive through forms, BOM uploads, email, and sales teams without one durable identity.", users: "Sales and operations", tracks: "RFQ source, products, quantities, files, status, and timestamps", outcome: "Every valid request enters a controlled commercial workflow." },
  { name: "Lead Identity and Timeline", problem: "A buyer's product research and later inquiry are separated across tools.", users: "Sales, marketing, and management", tracks: "Session, source, account, contacts, RFQs, ownership, and commercial events", outcome: "One auditable timeline from first touch to payment." },
  { name: "Mail and Delivery Assurance", problem: "A successful form response does not prove that a request reached a working mailbox.", users: "Operations and IT", tracks: "Queueing, delivery, mailbox confirmation, failures, and retries", outcome: "Delivery failures become visible work rather than lost demand." },
  { name: "CRM Outbox and Synchronization", problem: "Synchronous CRM calls make the RFQ path fragile and retries create duplicates.", users: "Sales operations and integrators", tracks: "Payload version, destination, attempt, acknowledgement, and error state", outcome: "Recoverable, idempotent synchronization with the existing CRM." },
  { name: "Assignment and SLA Engine", problem: "New inquiries wait without an owner or next action.", users: "Sales managers and team leads", tracks: "Owner, queue, deadlines, escalation level, and action history", outcome: "Response commitments are explicit and overdue work is escalated." },
  { name: "Sales Pipeline", problem: "Generic deal stages do not describe RFQ, sourcing, cost, and quote dependencies.", users: "Sales teams and directors", tracks: "Controlled stage, owner, value, probability, next action, and blockers", outcome: "A pipeline that reflects industrial selling rather than a generic funnel." },
  { name: "Supplier Sourcing", problem: "Supplier requests and replies live in inboxes and spreadsheets.", users: "Procurement and technical sales", tracks: "Supplier, requested lines, response, availability, lead time, and validity", outcome: "Sourcing evidence stays connected to the customer opportunity." },
  { name: "Cost and Margin Workspace", problem: "Currency, freight, MOQ, and supplier validity make spreadsheet margin unreliable.", users: "Procurement, sales, and finance", tracks: "Unit cost, currency, exchange rate, quantity, landed-cost inputs, and target margin", outcome: "Commercial decisions use traceable cost evidence." },
  { name: "Quote Management", problem: "Quote versions, approvals, and customer status become ambiguous across files and email.", users: "Sales and management", tracks: "Revision, lines, price, cost, margin, terms, approval, send, view, and decision", outcome: "Every quote has a controlled history and commercial owner." },
  { name: "Won/Lost Analytics", problem: "Loss reasons are entered late, inconsistently, or not at all.", users: "Sales leadership and owners", tracks: "Outcome, reason, competitor, timing, products, value, and evidence", outcome: "Pipeline changes can be explained and acted on." },
  { name: "Revenue Attribution", problem: "Traffic reports stop at the form while finance starts at the invoice.", users: "Owners, marketing, and finance", tracks: "Source, campaign, landing page, RFQ, quote, order, invoice, payment, and margin", outcome: "Acquisition work is evaluated against paid commercial outcomes." },
  { name: "SKU and Manufacturer Intelligence", problem: "Demand is hidden when product identity is inconsistent.", users: "Category managers, procurement, and marketing", tracks: "Deterministic SKU/MPN, manufacturer, category, requests, quotes, wins, and losses", outcome: "Teams see which products create qualified demand and margin." },
  { name: "SEO-to-Revenue Attribution", problem: "Ranking and traffic gains are disconnected from commercial value.", users: "SEO leads, owners, and marketing", tracks: "Canonical landing page, query context where available, RFQ, quote, revenue, and margin", outcome: "SEO priorities follow commercial evidence, not traffic alone." },
  { name: "Commercial Trust Analytics", problem: "Missing datasheets, images, evidence, or compliance data can weaken buyer confidence.", users: "Catalog, marketing, and technical teams", tracks: "Product evidence state and downstream RFQ outcomes", outcome: "Catalog trust work can be prioritized by commercial impact." },
  { name: "Alerts and Notifications", problem: "Critical failures compete with ordinary messages.", users: "Sales, operations, and management", tracks: "Severity, owner, channel, acknowledgement, retry, and resolution", outcome: "The right exception reaches the right operator without becoming a second inbox." },
  { name: "Audit Log", problem: "Commercial decisions change without a defensible history.", users: "Management, finance, compliance, and IT", tracks: "Actor, action, entity, before/after reference, time, and reason", outcome: "Sensitive changes remain attributable and reviewable." },
  { name: "API and Webhooks", problem: "Closed tools force manual transfer and brittle database access.", users: "Integrators and internal IT", tracks: "Scoped requests, idempotency, version, delivery, and response", outcome: "Systems exchange commercial events through controlled interfaces." },
  { name: "Integration Adapters", problem: "Every website, CRM, and ERP expresses the same commercial event differently.", users: "Implementation teams", tracks: "Mapping version, source identity, destination identity, and reconciliation state", outcome: "Existing systems can remain in place while the workflow becomes observable." },
  { name: "Optional AI Layer", problem: "Teams need assistance without surrendering commercial authority to a model.", users: "Sales, procurement, and management", tracks: "Provider, input policy, suggestion, approval, and final human action", outcome: "AI reduces review effort while deterministic records remain authoritative." },
  { name: "Self-Hosted and Private Cloud", problem: "Some organizations cannot place commercial data in a shared SaaS environment.", users: "IT, security, and procurement", tracks: "Deployment boundary, version, backup, health, and support state", outcome: "The operating model can fit customer-controlled infrastructure." },
  { name: "Revenue Knowledge Graph", problem: "Operational records explain what changed but not how product, RFQ, supplier, quote, payment, and margin evidence relate.", users: "Revenue operations, sales, procurement, finance, and management", tracks: "Versioned commercial relationships, source provenance, fact class, currency, and event time", outcome: "Teams can explain why revenue happened without replacing authoritative systems." },
] as const;

export type IntegrationClass = "Native adapter" | "Standard API" | "Custom adapter" | "CSV/file bridge" | "Webhook" | "Production candidate" | "Discovery required";

export const integrations: ReadonlyArray<{ group: string; name: string; classification: IntegrationClass; note: string }> = [
  { group: "Knowledge Graph adapters", name: "ICPROM", classification: "Production candidate", note: "Candidate mapping for product, RFQ, and commercial events; live credentials and shadow reconciliation remain release gates." },
  { group: "Knowledge Graph adapters", name: "ChipFasteners", classification: "Production candidate", note: "Candidate RFQ adapter rejects scanner traffic; live human-flow and source reconciliation remain release gates." },
  { group: "Knowledge Graph adapters", name: "ELVN Studio", classification: "Production candidate", note: "Server-side assessment adapter excludes names, email addresses, free-text messages, and integration notes from graph events." },
  ...["Custom PHP", "Next.js", "React"].map((name) => ({ group: "Websites and commerce", name, classification: "Native adapter" as const, note: "First-party event and RFQ adapter pattern; implementation validation required per site." })),
  ...["Magento / Adobe Commerce", "Shopify", "WooCommerce", "OpenCart", "PrestaShop", "BigCommerce", "Custom B2B catalogs"].map((name) => ({ group: "Websites and commerce", name, classification: "Standard API" as const, note: "Platform API, webhook, or customer-controlled adapter after discovery." })),
  ...["HubSpot", "Salesforce", "Pipedrive", "Zoho", "Microsoft Dynamics", "Bitrix24", "Odoo", "Custom CRM"].map((name) => ({ group: "CRM", name, classification: "Standard API" as const, note: "Outbox-based synchronization; scope depends on edition and customer permissions." })),
  ...["Odoo", "NetSuite", "SAP", "Microsoft Dynamics", "Epicor", "Infor", "1C", "Custom ERP"].map((name) => ({ group: "ERP and operations", name, classification: "Discovery required" as const, note: "Customer-controlled integration boundary, data ownership, and reconciliation must be agreed first." })),
  { group: "ERP and operations", name: "Spreadsheets and CSV", classification: "CSV/file bridge", note: "Validated import/export contract with explicit ownership and reconciliation." },
  { group: "ERP and operations", name: "Email-driven legacy workflows", classification: "Custom adapter", note: "Mailbox and message mapping designed around the customer's existing workflow." },
  ...["SMTP", "Microsoft 365", "Gmail / Google Workspace"].map((name) => ({ group: "Communication", name, classification: "Standard API" as const, note: "Delivery and mailbox evidence depend on tenant permissions and provider capabilities." })),
  ...["Telegram", "Slack", "Microsoft Teams", "SMS providers"].map((name) => ({ group: "Communication", name, classification: "Webhook" as const, note: "Notification adapter; not a system of record." })),
  ...["Google Analytics", "Microsoft Clarity", "Search Console", "Bing Webmaster"].map((name) => ({ group: "Analytics", name, classification: "Standard API" as const, note: "Consent, API availability, and attribution limits are documented during implementation." })),
  ...["Power BI", "Looker Studio", "Tableau", "Customer BI", "Custom warehouse"].map((name) => ({ group: "Analytics", name, classification: "Discovery required" as const, note: "Read model or controlled export defined against the customer's reporting boundary." })),
];

export const aiProviders = ["OpenAI", "Anthropic", "Google Gemini", "Azure OpenAI", "DeepSeek", "Mistral", "OpenRouter", "AWS Bedrock", "local Ollama", "vLLM", "private OpenAI-compatible endpoints"] as const;
export const aiCapabilities = ["RFQ summarization", "lead classification", "urgency detection", "duplicate suggestions", "product and MPN extraction", "supplier suggestions", "missing-data detection", "quote drafting", "customer-response drafting", "next-action suggestions", "follow-up reminders", "risk and margin warnings", "lost-reason classification", "pipeline summaries", "multilingual correspondence", "management briefings"] as const;

export const pricing = [
  { name: "Revenue Operations Audit", range: "$2,500–$7,500", basis: "One-time fixed fee", recurring: "No recurring platform fee", summary: "Workflow audit, RFQ loss analysis, integration inventory, tracking gaps, target architecture, and implementation roadmap." },
  { name: "RevenueOS Pilot", range: "$10,000–$25,000", basis: "One-time implementation", recurring: "Ongoing service is scoped after the pilot", summary: "One site and RFQ source, lead identity, delivery assurance, assignment, basic SLA, pipeline, dashboard, and one integration." },
  { name: "Professional", range: "$25,000–$60,000", basis: "One-time implementation", recurring: "$750–$1,500 per month platform and support", summary: "Multiple RFQ paths, supplier and quote workflow, attribution, API, dashboards, several integrations, and optional BYO AI." },
  { name: "Business", range: "$60,000–$150,000", basis: "One-time implementation", recurring: "$2,000–$5,000 per month platform and support", summary: "Multi-team operations, CRM/ERP integration, sourcing, quote lifecycle, escalation, roles, and private-cloud option." },
  { name: "Enterprise", range: "$150,000–$500,000+", basis: "One-time implementation", recurring: "Custom annual platform and support agreement", summary: "Multi-company or regional deployment, SSO, advanced audit, complex ERP, warehouse, migration, SLA, and dedicated support." },
  { name: "Self-hosted first year", range: "$40,000–$250,000+", basis: "First-year total", recurring: "Annual license and support renew after year one", summary: "Includes implementation, the first annual license, and mandatory first-year support for a customer-controlled deployment." },
] as const;

export const implementationSteps = [
  ["01", "Revenue operations assessment", "Map RFQ sources, handoffs, failure modes, data ownership, and measurable acceptance criteria."],
  ["02", "Controlled architecture", "Define the smallest useful module set, integration contracts, security boundary, and rollback plan."],
  ["03", "Pilot implementation", "Connect one representative RFQ path and run it beside the current workflow without replacing the source of truth."],
  ["04", "Shadow reconciliation", "Compare source RFQs, deliveries, assignments, quotes, and outcomes until mismatches are explained."],
  ["05", "Operational launch", "Enable owned workflows, dashboards, escalation, backups, monitoring, and documented support."],
  ["06", "Measured expansion", "Add teams, integrations, attribution, or optional AI only after the core event chain is reliable."],
] as const;

export const faqs = [
  ["Is RevenueOS AI a generic CRM?", "No. It is an RFQ and quote operations layer for industrial sales. It can work above an existing CRM or replace fragmented spreadsheet and email workflows where that is the better scope."],
  ["Is it available as self-service SaaS?", "No. It is currently offered through selected private implementation engagements. Scope, data boundaries, and integrations are agreed before deployment."],
  ["Does it replace our ERP?", "Usually not. ERP remains authoritative for inventory, accounting, invoicing, or fulfillment when it already performs those jobs well."],
  ["Does the core platform require AI?", "No. RFQ identity, workflow, SLA, sourcing, quotes, attribution, and audit work without an AI provider."],
  ["Can we use our own model provider?", "Yes, where the selected provider and data policy pass implementation discovery. Local and private OpenAI-compatible endpoints can also be assessed."],
  ["Can AI change prices or select suppliers automatically?", "Not silently. Suggestions that affect product identity, pricing, supplier choice, compliance, quote terms, or customer communication require an explicit human-controlled workflow."],
  ["Can it integrate with our current website and CRM?", "Most implementations start that way. The integration method depends on platform APIs, tenant permissions, data quality, and the reliability requirements of the RFQ path."],
  ["How long does implementation take?", "A focused pilot commonly targets 6–12 weeks after discovery. Multi-team ERP programs are phased and typically take longer."],
  ["What determines price?", "RFQ volume, users, integration count, workflow complexity, migration, deployment model, security, customization, and support obligations."],
  ["Can it be self-hosted?", "Yes, subject to infrastructure, security, backup, upgrade, and support discovery. A self-hosted license is annual; implementation is priced separately."],
  ["Are AI provider charges included?", "No, unless a managed AI arrangement is explicitly contracted. BYO AI usage is paid directly by the customer."],
  ["What is the first step?", "A fixed-scope Revenue Operations Assessment that documents the current workflow, loss points, integration inventory, target architecture, and implementation roadmap."],
] as const;
