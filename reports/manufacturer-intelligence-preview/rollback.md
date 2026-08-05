# Rollback Plan

Baseline/rollback commit: `66821bfff972d7bc27d017a741c889e2cc2f340c`.

The normal production workflow deploys immutable commit-addressed images and the server retains release history. If smoke fails, revert the merge commit through a new PR or deploy the recorded baseline through the existing restricted Studio deployment command. Do not rewrite `main`, improvise a second deployment path, or delete release history.

After rollback verify health, homepage, RevenueOS, legacy routes, robots, sitemap and custom 404; confirm both new preview routes no longer resolve if the entire release is reverted.
