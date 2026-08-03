# ELVN Studio UI system

## Design principles

The interface should feel like a senior engineer’s working surface refined into an editorial portfolio. The project evidence is the visual center. Typography carries hierarchy; motion and decoration stay subordinate.

1. Lead with the business constraint, then reveal technical depth.
2. Use restraint as a trust signal: no fake dashboards, metric theatre, or anonymous logos.
3. Keep every primary path understandable on a 390 px screen.
4. Make production responsibility visible through language and evidence, not infrastructure spectacle.

## Tokens

- Graphite background: `#10110F`
- Raised surface: `#171815`
- Off-white text: `#F4F1E8`
- Secondary text: `#A7A79E`
- Structural line: `#2D2F29`
- Controlled accent: `#C8FF4D`
- Project accents: blue `#8EB8FF`, amber `#FFC968`, rose `#FF9AA8`
- Display and body: Geist
- Technical labels: Geist Mono
- Content maximum: 1280 px
- Card radius: 20 px

Spacing uses an 8 px baseline with larger section intervals between 90 and 130 px. Display headings use tight tracking and line height; body copy never uses display sizing to compensate for weak hierarchy.

## Layout

The desktop grid alternates between 60/40 narrative splits, asymmetrical project features, and structured evidence columns. Mobile collapses in reading order: claim, proof, action, then depth. Essential copy never disappears at a breakpoint.

## Component use

- `Header`: sticky, compact, four navigation choices, one primary conversion.
- `Hero`: specific claim, practical supporting copy, two actions, real project montage.
- `ProjectCard`: screenshot first, business problem before technology, one case-study action.
- `Evidence`: label, contextual detail, and verification note; never a number without method.
- `ServiceBlock`: business situation, audience, delivery, and related proof.
- `ContactForm`: grouped, low-friction fields with direct-email fallback.
- `ConsentControls`: analytics denied by default; equal access to reject.

## Screenshot treatment

Use an unaltered public production page or public project media. Crop only to make the interface legible. Do not add fake browser controls, devices, admin data, analytics, or generated replacement screens. Captions state what is visible rather than making an outcome claim.

## Motion

Hover scale is limited to project imagery and remains under two percent. No scroll hijacking, cursor replacement, autoplay media, parallax dependency, or entrance sequence. `prefers-reduced-motion` removes transitions.

## Accessibility

Maintain semantic landmarks, one logical page heading, visible focus, a skip link, descriptive external links, programmatic labels, inline form errors, non-color state text, and minimum comfortable touch targets. Contrast is checked on the actual token pairs, not assumed from the dark theme.

## Writing and conversion

The primary action is “Discuss a project.” “View selected work” is the main evidence action. Each page uses a concrete headline, a short context paragraph, and one next step. Avoid generic claims such as “innovative solutions,” “cutting-edge,” “world-class,” or “we are passionate.” ELVN Studio is an independent practice; use “I” when responsibility matters.

Correct: “Stable catalog structures are generated ahead of requests to reduce repeated server work.”

Incorrect: “We leverage cutting-edge technology to deliver scalable digital transformation.”
