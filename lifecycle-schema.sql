PRAGMA journal_mode = WAL;
PRAGMA synchronous = FULL;
PRAGMA foreign_keys = ON;
PRAGMA busy_timeout = 5000;

CREATE TABLE IF NOT EXISTS studio_leads (
  lead_id TEXT PRIMARY KEY,
  idempotency_key TEXT NOT NULL UNIQUE,
  form_type TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_company TEXT NOT NULL,
  customer_country TEXT NOT NULL,
  company_website TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  consent_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  owner_id TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  sla_due_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS studio_lead_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL UNIQUE,
  lead_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ok',
  payload_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES studio_leads (lead_id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_studio_lead_events_lead
  ON studio_lead_events (lead_id, created_at);

CREATE TABLE IF NOT EXISTS studio_outbox (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  outbox_id TEXT NOT NULL UNIQUE,
  dedupe_key TEXT NOT NULL UNIQUE,
  lead_id TEXT NOT NULL,
  channel TEXT NOT NULL,
  destination TEXT,
  template TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  attempts INTEGER NOT NULL DEFAULT 0,
  available_at TEXT NOT NULL,
  lease_until TEXT,
  provider_message_id TEXT,
  provider_response TEXT,
  last_error TEXT,
  sent_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES studio_leads (lead_id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_studio_outbox_queue
  ON studio_outbox (status, available_at);
