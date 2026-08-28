# Repository Before Release

- Public repository: `elvn11ask/elvn-studio`
- Default branch: `main`
- Baseline commit: `66821bfff972d7bc27d017a741c889e2cc2f340c`
- Feature branch: `feature/manufacturer-intelligence-preview`
- Production workflow: `.github/workflows/production.yml`, triggered by pushes to `main`
- Production health before release: `{"status":"ok","service":"elvn-studio"}`
- Sitemap SHA-256 before release: `61db2a1bb414c8ae9d2c41eee099d06c19a1ff33bfdf0dd676a09b8b08b08633`
- Sitemap route count before release: 34 URLs; Manufacturer Intelligence URLs: 0

## Production route baseline

`/`, `/revenueos`, `/revenueos/pricing`, `/revenueos/integrations`, `/revenueos/ai`, `/contact`, `/robots.txt`, and `/sitemap.xml` returned HTTP 200. Both Manufacturer Intelligence routes returned HTTP 404. A custom missing route returned HTTP 404.

## Analytics and consent baseline

The shared layout used the existing Google Analytics and Microsoft Clarity consent implementation. Analytics storage defaults to denied; Clarity and measurement are rendered only after accepted consent. No consent implementation was replaced by this release.

## Working-tree forensic note

The source workspace contained intended Manufacturer Intelligence work plus two unrelated untracked Contra cover assets. Because macOS had offloaded several source files to iCloud, the release was assembled in a fresh clone from the exact public baseline and only reviewed Manufacturer Intelligence files were applied.
