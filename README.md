# ELVN Studio

Production portfolio and commercial site for the independent ELVN Studio practice. It presents verified product-engineering work, services, process, a professional profile, and a privacy-conscious project inquiry flow at [studio.elvn.monster](https://studio.elvn.monster).

## What is included

- Content-driven project pages built from validated YAML and Markdown
- Five case studies with real production media and evidence notes
- Responsive homepage, work, services, process, skills, about, resume, contact, privacy, search, and 404 pages
- Generated sitemap, robots policy, canonical metadata, OpenGraph/X cards, and JSON-LD
- Build-time local search data with no external search service
- Signed contact submissions, origin checks, length limits, honeypot, rate limiting, and safe test mode
- Consent-first analytics preparation; analytics remain disabled until configured
- Revenue Operations product area with the Revenue Knowledge Graph design-partner module, public architecture, use cases, security, AI controls, pricing, FAQ, and launch package
- [Manufacturer Intelligence](https://studio.elvn.monster/revenueos/manufacturer-intelligence), a Production Patch Preview available through selected implementation engagements
- Standalone Next.js container, isolated Nginx configuration, health check, and rollback-oriented release structure

## Architecture

Next.js App Router and TypeScript render public pages on the server. Project metadata lives under `content/projects/<slug>/project.yaml`; narrative content lives beside it in `case-study.md`. The build validates schema, unique slugs and titles, image paths, evidence notes, and public URLs. Adding one valid published directory automatically creates the case-study route, project cards, search entry, sitemap URL, OpenGraph metadata, JSON-LD, and related-work links.

The production image uses the Next.js standalone output and a non-root runtime user. Nginx terminates TLS and proxies only to a loopback-bound container port. ELVN Studio has a separate application directory, container, environment file, network, logs, health route, and release history from the existing ELVN application.

## Local development

Requirements: Node.js 22 and pnpm 10.

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

`CONTACT_MODE=test` is the default. A successful local form submission validates the complete request but does not send email or Telegram messages.

## Content authoring

1. Copy `content/templates/project.yaml` into a new slug-named project directory.
2. Add `case-study.md` with only supported sections and facts.
3. Add an accurate production cover under `public/projects/<slug>/`.
4. Add a verification note for every evidence item.
5. Keep `published: false` until review is complete.
6. Run `pnpm validate:content` and `pnpm build`.

Never publish customer records, admin screens, private analytics, credentials, unsupported metrics, or an AI capability that is only a prepared integration path.

The public Knowledge Graph examples under `public-package/revenue-knowledge-graph` are intentionally synthetic and redacted. The production schema, source mappings, scoring rules, and private Revenue Operations implementation are not part of this repository.

## Validation

```bash
pnpm check
```

This runs linting, TypeScript, unit tests, content validation, route/link validation, and the production build. The pull-request workflow repeats the same checks and adds secret scanning and dependency review where GitHub permits it.

## Environment variables

All names are documented in `.env.example`. Values belong in local secrets, GitHub Environment secrets, or `/srv/elvn-studio/shared/studio.env` on the server. Never commit `.env` files.

- `NEXT_PUBLIC_SITE_URL`: canonical public origin
- `CONTACT_MODE`: `test` or `live`
- `CONTACT_SIGNING_SECRET`: long random HMAC secret
- `CONTACT_RECIPIENT`: destination mailbox
- `SMTP_*`: private email delivery settings
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`: optional private notification
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`: blank until real values exist
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`: blank and inactive at launch
- `REVENUE_GRAPH_URL`, `REVENUE_GRAPH_TOKEN`: optional server-only Studio assessment projection; both must be configured or delivery stays disabled

## Deployment and rollback

Production releases are immutable directories under `/srv/elvn-studio/releases`. A candidate container starts on the dedicated loopback port and must pass `/api/health` plus critical-route checks before Nginx is changed. The previous image and configuration remain available.

Rollback procedure:

1. Point `/srv/elvn-studio/current` to the previous retained release.
2. Start its versioned image with the same isolated Compose project.
3. Verify the local health route.
4. Run `nginx -t` before reloading Nginx only if the server block changed.
5. Verify the canonical HTTPS home page and critical routes.

The existing `elvn.monster` container and configuration must not be restarted or modified during an ELVN Studio release.

## Security notes

- Contact requests are normalized and strictly limited server-side.
- The anti-CSRF token is signed and expires after one hour.
- Rate limiting exists in the application and at Nginx.
- The runtime is non-root, read-only, capability-free, and loopback-only.
- Application logs do not intentionally contain inquiry bodies or raw IP addresses.
- Analytics scripts are not implemented or loaded before consent.
- No SSH keys, server addresses, passwords, tokens, or environment values belong in Git history.

## Public contacts

- Email: [elvnask@gmail.com](mailto:elvnask@gmail.com)
- X: [@elvn11ask](https://x.com/elvn11ask)
- Telegram: [@elvnask](https://t.me/elvnask)
- GitHub: [elvn11ask](https://github.com/elvn11ask)

## License

Source code is provided for this repository and portfolio. Project screenshots, client brands, case-study text, and ELVN identity assets are not licensed for reuse without permission.
