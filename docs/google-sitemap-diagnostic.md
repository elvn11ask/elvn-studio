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
