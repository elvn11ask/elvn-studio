# RevenueOS integration strategy

## Classification

- **Native adapter** — a first-party adapter pattern exists, but each target still requires environment validation.
- **Standard API integration** — the target exposes an appropriate supported API; edition, tenant permissions, quotas, and data quality remain discovery items.
- **Custom adapter** — customer-specific mapping or legacy behavior must be implemented.
- **CSV/file bridge** — a versioned file contract with reconciliation and ownership.
- **Webhook** — event delivery to or from a supported endpoint with signature, retry, and idempotency controls.
- **Implementation discovery required** — no production claim until the customer's system and responsibility boundary are reviewed.

## Website and commerce

Custom PHP, Next.js, and React use a native same-origin and server adapter pattern. Magento/Adobe Commerce, Shopify, WooCommerce, OpenCart, PrestaShop, BigCommerce, and custom catalogs use platform APIs, webhooks, or a custom adapter based on the deployed version and RFQ implementation.

## CRM

HubSpot, Salesforce, Pipedrive, Zoho, Microsoft Dynamics, Bitrix24, Odoo, and custom CRM targets use outbox-based synchronization. A successful storefront submission must not depend on CRM uptime. Mapping includes stable external lead identity, retries, acknowledgement, and reconciliation.

## ERP and operations

Odoo, NetSuite, SAP, Microsoft Dynamics, Epicor, Infor, 1C, and custom ERP integrations always require discovery. ERP authority over products, stock, orders, invoices, and payment must be documented. 1C work is performed only through a customer-controlled integration boundary.

CSV and spreadsheet bridges are allowed when version, ownership, encoding, validation, rejection, and reconciliation are explicit. Email-driven workflows use a customer-specific mailbox adapter.

## Communication

SMTP, Microsoft 365, and Gmail/Google Workspace require tenant and delivery discovery. Telegram, Slack, Microsoft Teams, webhooks, and SMS are notification channels, not systems of record.

## Analytics

Google Analytics, Microsoft Clarity, Search Console, Bing Webmaster, Power BI, Looker Studio, Tableau, custom BI, and data warehouses operate within their consent, API, retention, and aggregation limits. Browser analytics is supporting evidence; commercial events and paid outcomes remain server-side records.

## Acceptance gates

1. customer authorizes credentials and scope;
2. source and destination ownership are documented;
3. data mapping and idempotency are reviewed;
4. failure, retry, and dead-letter behavior is tested;
5. reconciliation proves record counts and key fields;
6. access, logging, retention, and secret rotation are accepted;
7. rollback and reprocessing are rehearsed.
