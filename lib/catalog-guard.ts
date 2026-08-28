export const catalogGuardValidation = {
  measuredAt: "August 28, 2026",
  measuredAtUtc: "11:42 UTC",
  environments: 3,
  pages: 75,
  canonicalChecks: 75,
  schemaChecks: 75,
  issues: 75,
  requestErrors: 0,
  publicWrites: 0,
  issueClass: "Missing Product JSON-LD",
  scope: "A bounded live sample of 25 public product pages per validation environment.",
} as const;

export const catalogGuardEnvironments = [
  { name: "ICPROM", pages: 25, errors: 0, issues: 25, p50: 727, p95: 773 },
  { name: "ChipFasteners", pages: 25, errors: 0, issues: 25, p50: 1583, p95: 1715 },
  { name: "ARMSENS", pages: 25, errors: 0, issues: 25, p50: 1438, p95: 1449 },
] as const;

export const revenueLeakAudit = {
  price: "$1,500",
  turnaround: "5 business days",
  continuousPilot: "$699/month",
} as const;
