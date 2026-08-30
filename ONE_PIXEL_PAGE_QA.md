# ONE PIXEL page QA

Local implementation status: **PASS**. Production deployment and live verification: **PASS**.

## Required checks

- [x] `pnpm check` — lint, typecheck, 24 tests, content, links and production build pass
- [x] direct `/one-pixel` request and refresh — HTTP 200, statically prerendered
- [x] desktop layout — 1280px visual review, no horizontal overflow
- [x] iPhone 390px layout and overflow — 390×844 browser viewport, no horizontal overflow
- [x] all images and alt text — six page images loaded at responsive widths; non-empty contextual alt text
- [x] Witness mouse/touch/keyboard interaction — semantic button, `aria-pressed`, visible revealed state and timed release
- [x] reduced-motion behavior — media query removes reveal transitions
- [x] title, description, canonical, Open Graph and X metadata
- [x] sitemap and robots inclusion — route is in `staticRoutes`; existing robots allows it
- [x] REMEMBER ME disclosure and mailto target — transparent temporary mailto, no page-side collection
- [x] homepage card — labeled `Original game · In development`, route verified
- [x] no console errors — desktop/mobile interaction review returned none
- [x] existing critical routes remain in production build and link validation
- [ ] real iPhone Safari — unavailable in this environment
- [x] live deployment verified — HTTP/2 200 plus desktop and 390×844 interactive review

## Deployment status

`DEPLOYED` — merge commit `13cccea2d2fab0fffd78f6e833f895a3eabd3fed` completed Production workflow run `33302773010`, including immutable image build, rollback-aware deploy, public smoke test and IndexNow notification.

Live URL: `https://studio.elvn.monster/one-pixel`

## Evidence summary

- Local URL: `http://127.0.0.1:3000/one-pixel`
- Canonical emitted: `https://studio.elvn.monster/one-pixel`
- Mobile viewport: 390×844; `scrollWidth === clientWidth === 390`
- Images: 3 character and 3 journey images load successfully after entering their lazy-load region
- Console: no warnings or errors recorded during the final mobile pass
- Build route: `/one-pixel` reported as static (`○`) by Next.js 16.2.12
- Live response: HTTP/2 200 with the expected canonical, HSTS and existing security headers
- Live mobile interaction: 390×844, no horizontal overflow, Witness `aria-pressed=true` and visible history-scar state
