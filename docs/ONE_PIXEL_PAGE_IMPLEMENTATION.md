# ONE PIXEL development page

Route: `/one-pixel`

The page is an honest, spoiler-safe development signal inside the existing ELVN Studio Next.js application. It does not claim release, price, completed gameplay, TestFlight availability, or a date.

## Architecture

- Server-rendered route with route-specific metadata and CSS.
- One small client component, `OnePixelWitness`, for an accessible, time-limited history-scar reveal.
- Semantic sections, real headings, keyboard-operable controls, visible focus, and reduced-motion handling.
- Existing global consent/analytics behavior is unchanged. No additional SDK or personal-data collection was added.
- `/one-pixel` is included in the existing generated sitemap and allowed by the existing robots policy.
- Homepage integration is a clearly labeled `IN DEVELOPMENT` card; the ELVN Studio hero is unchanged.

## REMEMBER ME

The repository has a secure business contact form but no legitimate newsletter/list-management system. `REMEMBER ME` therefore opens a pre-addressed email in the visitor's own client and explicitly says that no address is collected on the page. This is a transparent temporary architecture, not a hidden signup backend. A future mailing provider must add double opt-in, unsubscribe, retention and privacy documentation before replacing it.

## Asset provenance

All page imagery is derived only from owned/generated ONE PIXEL Phase 2A files in the `elvn11ask/one-pixel` repository, branch `story/reboot-master-campaign`:

| Public asset | Source |
| --- | --- |
| `mara-concept.webp` | `Art/Concepts/Characters/character-mara-v1.png` |
| `cael-concept.webp` | `Art/Concepts/Characters/character-cael-v1.png` |
| `witness-concept.webp` | `Art/Concepts/Characters/character-witness-v1.png` |
| `sentence-concept.webp` | `Art/Concepts/TargetSheets/target-sentence-v1.png` |
| `myr-concept.webp` | `Art/Concepts/TargetSheets/target-myr-v1.png` |
| `vesper-concept.webp` | `Art/Concepts/TargetSheets/target-vesper-v2.png` |
| `one-pixel-og.webp` | `Art/Concepts/TargetSheets/target-pixel-v1.png` |

Sources were resized and encoded locally with `cwebp`; no external imagery was scraped. Every concept remains labeled as early visual development or WIP.

