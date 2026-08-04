# ELVN Revenue Knowledge Graph — public architecture package

This package explains the safe integration boundary of a private ELVN Revenue Operations module. It is not the production graph schema or a self-service product release.

## Contract

1. Authoritative systems keep ownership of their records.
2. Adapters produce idempotent, versioned, append-only events.
3. Every relationship has provenance and a fact class.
4. Product identity uses manufacturer plus exact MPN.
5. Financial facts include currency and observed time.
6. Tenant and role checks apply at ingestion and query.
7. Projection state can be replayed and reconciled.
8. AI recommendations remain separate from facts and require review.

See `examples/graph-event.json` and `synthetic/revenue-path.json`. All names and identifiers are fictional.

Copyright © 2026 ELVN Studio. Documentation and examples are provided for evaluation; the private implementation and production schemas are not licensed by this package.
