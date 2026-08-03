# RevenueOS public/private boundary

| Area | Public | Private |
|---|---|---|
| Positioning | Category, audience, problem, maturity | Customer pipeline and commercial strategy |
| Architecture | High-level lifecycle and module boundaries | Schemas, internal services, topology, algorithms |
| API | Reduced fictional contracts and SDK interfaces | Full taxonomy, production routes, auth implementation |
| Integrations | Classification and capability | Credentials, mappings, retry policy details, customer adapters |
| AI | Provider boundary and human-control rules | Prompts, orchestration, evaluation data, provider keys |
| Analytics | Dimensions and intended management questions | Attribution implementation and customer metrics |
| Security | Principles and review scope | Controls, vulnerabilities, secrets, network, incident reports |
| Cases | Approved context, constraints, public outcomes | Customer data, RFQ volumes, supplier terms, revenue, private telemetry |
| Code | SDK skeleton, verifier example, synthetic demo | Production core, workflows, adapters, admin, migrations |

Every public release must use fictional customer, supplier, part, price, and event identifiers. Redaction must be reviewed manually; automated secret scanning is necessary but not sufficient.
