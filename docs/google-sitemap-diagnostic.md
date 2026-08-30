# Google sitemap diagnostic

The production sitemap is valid and reachable, but the Google Search Console
sitemap report has not scheduled a normal Googlebot fetch. Two deliberately
minimal, framework-independent files isolate the remaining failure modes:

- `/sitemap-google-minimal.xml` — a static XML sitemap containing only the
  canonical home page URL;
- `/sitemap-google-minimal.txt` — the same canonical URL in Google's supported
  plain-text sitemap format.

Neither file is advertised in `robots.txt`. Submit them only through the
verified URL-prefix Search Console property and compare the sitemap report with
the nginx access log.

Interpretation:

- both files are not fetched: Search Console scheduling/property issue;
- text succeeds but XML fails: XML processing issue;
- both succeed while the full sitemap fails: full sitemap content or dynamic
  response issue;
- all files succeed: the earlier report was stale or transient.

Remove the diagnostic files after the cause is established.

## Production result — 2026-08-30

Deployment `9a145e8` exposed both diagnostic files. The public responses were
byte-identical to the repository payloads:

- XML: HTTP 200, `application/xml`, 171 bytes, valid against the sitemap XSD;
- text: HTTP 200, `text/plain; charset=UTF-8`, 29 bytes.

Search Console accepted the full sitemap, the one-URL static XML sitemap, and
the one-URL text sitemap. All three remained in the same `Couldn't fetch`
state, and nginx recorded no normal Googlebot request for any submission.

Live URL Inspection then fetched both diagnostic files from Google-owned
`66.249.79.136` and `66.249.79.137` addresses. Both requests returned HTTP 200,
and Search Console reported `URL is available to Google`.

The domain property's Crawl Stats report showed:

- `studio.elvn.monster`: 622 crawl requests, host status `No problems`;
- 1,411 total requests over 90 days;
- 97% HTTP 200 responses;
- average response time 253 ms.

A separate audit of all 44 URLs in the full sitemap found HTTP 200, indexable
robots directives, and matching canonical URLs. The home page is the only URL
with a syntactic slash normalization (`https://studio.elvn.monster` versus the
network-normalized `https://studio.elvn.monster/`); it does not explain a
missing sitemap HTTP request.

### Conclusion

The remaining condition is outside the serving and parsing path: Search
Console has accepted the submissions but has not scheduled a sitemap fetch.
The UI status is therefore a pending/unprocessed state, not an observed XML or
HTTP failure. Rebuilding or repeatedly resubmitting the sitemap cannot address
that state. Keep the production sitemap stable, monitor for a normal Googlebot
request, and escalate the evidence to Search Console if the state persists.
