## Business context

ICPROM publishes a structured industrial catalog where category depth and technical navigation matter more than decorative storefront behavior. The public URL system is valuable infrastructure: it supports users, search engines, and established inbound demand.

## Challenge

Repeatedly assembling breadcrumbs, facets, summaries, and page slices during live requests made the runtime do expensive work for information that changed far less often than it was read.

## Solution

I moved stable catalog structures into immutable generated artifacts and kept the request layer focused on small, predictable reads. The approach preserved public routes and taxonomy while reducing the amount of work required to serve them.

## Engineering decisions

The optimization was designed around reversibility. Generated outputs are validated before release, canonical behavior remains explicit, and the existing crawl surface is checked rather than replaced wholesale.

## Validation

Release checks cover critical category and product routes, internal navigation, canonical metadata, server response, and production crawl behavior. This public version omits exact measurements until their source records are ready to publish.

## Current state

The production site remains an industrial catalog, not a technology demo. Architecture is described only where it explains a real business or operational decision.
