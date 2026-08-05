# Release Manifest

Every committed file is listed by `git diff --name-only 66821bfff972d7bc27d017a741c889e2cc2f340c` in `SHA256SUMS` after the release commit. The intended areas are:

- `app/manufacturer-intelligence.css`
- `app/news/`
- `app/revenueos/manufacturer-intelligence/`
- contextual edits to `app/page.tsx`, `app/revenueos/*`, `app/layout.tsx`, and `app/sitemap.ts`
- `lib/manufacturer-intelligence.ts`, `lib/revenueos.ts`, `lib/site.ts`
- `tests/manufacturer-intelligence.test.tsx` and related route/sitemap test updates
- `docs/revenueos/public-claims-register.csv`
- `content/manufacturer-intelligence/`
- `reports/manufacturer-intelligence-preview/`

The two excluded Contra assets are absent from this manifest.
