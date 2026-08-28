# Deployment Report

- Release PR: https://github.com/elvn11ask/elvn-studio/pull/13
- Release merge/tag commit: `620fd423e109841d4c734433a7d4a7e24f9df012`
- Release production workflow: https://github.com/elvn11ask/elvn-studio/actions/runs/30982366145 — SUCCESS in 2m5s
- Semantic QA follow-up: https://github.com/elvn11ask/elvn-studio/pull/14
- Final deployed commit: `64f895a3dd1c64ea0aed0344afa2e52160571073`
- Final production workflow: https://github.com/elvn11ask/elvn-studio/actions/runs/30982985428 — SUCCESS in 2m2s
- Quality workflow on `main`: https://github.com/elvn11ask/elvn-studio/actions/runs/30982365771 — SUCCESS
- Immutable image loaded with the final deployed commit tag
- Existing restricted `/usr/local/sbin/elvn-studio-deploy` path used
- Container recreated and started; rollback history retained by the deploy step
- Workflow public health and legacy route smoke: PASS
- IndexNow: accepted 37 URLs with HTTP 200

One transient connection reset occurred while the recreated container was starting; the restricted deploy verification retried, the container became healthy, and all subsequent workflow and independent checks passed. No second deployment path was used.
