# ONE PIXEL development page

Route: `/one-pixel`

The page is the project’s spoiler-safe game-company development hub. It contains a page-only sticky navigation, real playable-build evidence, character/world art, a dated news column, gated roadmap, honest status and follow links. It does not announce price, release date, preorder, TestFlight or commercial-demo PASS.

## Current evidence boundary

- `dock-nine-live-simulator.png` is a lossless rotated frame from Dock Nine 0.2.1 in iPhone Simulator, launched at a deterministic dialogue beat. It is runtime output, not a cinematic composite.
- Mara, Cael, Witness and Tavi imagery remains labeled concept/WIP.
- `core-party-target-sheet.png` remains a silhouette/palette target, not a final sprite claim.
- The public status states that post-rescue uncoached physical-iPhone validation is pending.

## Architecture

- Server-rendered Next.js route with route-specific metadata and CSS.
- `OnePixelWitness` is the only page-specific client interaction.
- Semantic headings, figures, list/roadmap structures, keyboard controls, focus states and reduced-motion support.
- No new analytics SDK, account system or data collection.
- `/one-pixel` remains in generated sitemap/robots surfaces; `/news` links to its devlog.

Social copy, URLs and image ALT are maintained in `content/one-pixel/social/dock-nine-rescue-2026-09-01.md`.
