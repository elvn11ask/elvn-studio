# Telegram Launch Package

## Primary post

Manufacturer Intelligence now has a customer Control Center.

The dashboard allows an industrial catalog team to:

— connect product data;
— select manufacturers or SKU cohorts;
— launch a bounded scan;
— monitor connector, source and AI usage;
— review official documents and extracted fields;
— separate verified facts from AI suggestions;
— simulate publication;
— approve a small canary or roll it back.

AI remains optional and cannot independently verify or publish product facts.

Private beta:
https://studio.elvn.monster/revenueos/manufacturer-intelligence

#ProductData #IndustrialTech #B2B

## Architecture post

The Control Center is built around authority boundaries rather than an autonomous-agent promise.

Customer browser → authenticated tenant workspace → versioned RevenueOS API → bounded queue/worker → approved manufacturer connector → evidence passport → field-level review → zero-write publication simulation → manually approved canary.

Exact manufacturer and complete MPN remain the orderable identity. Source policy is evaluated before automated access. AI, when enabled, can assist classification or reviewer summaries but remains an inference layer. It cannot verify compliance, merge variants, alter price or inventory, or publish.

ICPROM and ChipFasteners pilot workspaces use synthetic 25-product cohorts, read-only adapters and no public catalog mutation.

## 30-day design-partner plan

Week 1: catalog and source-policy assessment; identity fields and collision risks.

Week 2: read-only connection, mapping, approved connector, bounded synthetic validation.

Week 3: controlled cohort scan, evidence review, conflicts and optional AI review-assist comparison.

Week 4: publication simulation, approval gates, rollback exercise and commercial operating review.

Access remains invitation-only and contract-managed.
