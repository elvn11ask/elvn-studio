# Studio Lead Lifecycle

The Revenue Operations assessment uses one immutable `ROS-*` Lead ID across validation, internal CRM persistence, owner assignment, SLA, notification outbox, SMTP and optional Revenue Graph delivery.

## Persistence contract

- `studio_leads`, `studio_lead_events` and `studio_outbox` are committed in one `BEGIN IMMEDIATE` transaction.
- A retry of the same signed form submission returns the original Lead ID and creates no duplicate outbox rows.
- The application returns `202` only after the transaction commits.
- A caller can read only its own non-PII lifecycle state through `/api/revenueos-assessment/status` using the HMAC tracking token returned at submission.
- The application health endpoint fails with `503` if the lifecycle database cannot be opened or queried.

## Delivery contract

`studio-outbox` claims rows with a two-minute lease, records attempts, retries with bounded exponential backoff, recovers stale claims and marks terminal failure after eight attempts. SMTP uses deterministic Message-IDs derived from the Lead ID and template. Telegram and Revenue Graph rows are created only when their production configuration exists.

SMTP acceptance is not mailbox confirmation. Mailbox delivery must be reconciled through the approved mailbox/provider evidence source; it must never be inferred from `sent` alone.

## Storage and backups

The database is stored in the named Docker volume `elvn-studio-lifecycle-data` with a `0700`, UID/GID 1001 data directory. SQLite uses WAL, `synchronous=FULL`, foreign keys and a five-second busy timeout. The worker creates hourly online backups in `/data/backups` and retains 30 days.

The volume is intentionally retained across application rollback. Do not delete it during rollback.

## Required production configuration

The existing `CONTACT_SIGNING_SECRET` remains mandatory. These settings are optional but required to close their corresponding delivery gate:

- SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM`; add `SMTP_USER` and `SMTP_PASSWORD` when the relay requires authentication.
- Revenue Graph: `REVENUE_GRAPH_URL`, `REVENUE_GRAPH_TOKEN`.
- Operations: `STUDIO_LEAD_OWNER_ID`, `STUDIO_LEAD_OWNER_NAME`, `STUDIO_LEAD_SLA_MINUTES`.

If SMTP is not configured, email rows remain auditable as `retry/dead`; Telegram delivery can continue independently. The system does not report them as accepted.

## Rollback

1. Revert the release through the trusted GitHub production workflow.
2. Stop the orphaned `elvn-studio-outbox` container if rolling back to a release whose Compose file predates the worker.
3. Keep `elvn-studio-lifecycle-data` intact.
4. Verify the previous `/api/health`, public routes, sitemap and robots.

The automatic application health rollback may leave the worker container running because the legacy Compose file does not know that service. This is safe for persisted rows but must be cleaned up by the operator as step 2.
