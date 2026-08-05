# Test Report

Environment: Node.js 22.18.0 Alpine with pnpm 10.15.0, matching the production Dockerfile/GitHub major runtime.

- dependency integrity (`pnpm install --frozen-lockfile`): PASS
- ESLint: PASS
- TypeScript: PASS
- Vitest: PASS — 7 files, 17/17 tests
- content validation: PASS — 5 projects
- internal link validation: PASS — 32 static routes and project URLs
- production build: PASS — 44 generated pages; both Manufacturer Intelligence routes static
- local production HTTP smoke: PASS
- Googlebot/Bingbot/YandexBot smoke: PASS
- assessment endpoint validation: PASS — invalid unsigned payload rejected with HTTP 403
- desktop 1440 px QA: PASS — one H1, no horizontal overflow, no missing alt, no unlabeled buttons
- mobile 390 px QA: PASS — one H1, CTA visible, no horizontal overflow
- browser console errors/warnings on news route: none

The existing 13 tests remain passing; four release-specific tests bring the suite to 17.
