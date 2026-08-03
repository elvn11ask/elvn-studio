# RevenueOS website launch rollback

The Studio production workflow deploys immutable image releases and retains the previous release for rollback. The pre-launch reference is the `main` merge immediately before the RevenueOS feature PR and the local backup branch `backup/pre-revenueos-20260803` at commit `ffe8f0b2e531fdf3d67c7444dc7689f397b90f4d`.

If production health, existing routes, analytics consent, contact delivery, sitemap, or RevenueOS routes fail:

1. stop further promotion and IndexNow submission;
2. preserve the failing workflow log and public response evidence;
3. use the server deployment command's retained rollback procedure documented in `docs/DEPLOYMENT.md`;
4. verify `/`, `/work`, `/services`, `/contact`, `/api/health`, `/sitemap.xml`, `/robots.txt`, GA consent behavior, and contact delivery after rollback;
5. create a new fix branch from current `main`; do not force-push `main`;
6. restore the launch only after PR checks and production smoke pass.

Never roll back by deleting the production directory, resetting the repository, or changing DNS.
