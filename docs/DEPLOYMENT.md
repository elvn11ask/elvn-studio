# Production deployment

ELVN Studio must use a dedicated server surface under `/srv/elvn-studio`. The existing ELVN application under `/srv/elvn` is outside this deployment’s scope.

## One-time server preparation

1. Create the application, `shared`, and `releases` directories with ownership limited to the studio deploy account.
2. Install Docker Compose v2. Compose v1 is not compatible with modern Docker Engine container metadata during recreation.
3. Create `shared/studio.env` from the documented variable names and `shared/runtime.env` containing the selected loopback port. Keep both outside the repository.
4. Install `deploy/elvn-studio-deploy` as `/usr/local/sbin/elvn-studio-deploy`, owned by root and not writable by the deploy account.
5. Permit the restricted deploy account to run only that script with the two required arguments.
6. Install the Nginx server block after replacing `__STUDIO_PORT__`, validate with `nginx -t`, and create a rollback copy before reloading.
7. Confirm DNS, issue the certificate once, and validate renewal.
8. Create the GitHub `production` Environment and add only the documented deployment secrets.

## Release behavior

The workflow validates source, builds a commit-tagged image, uploads one archive, starts the isolated candidate, waits for its loopback health endpoint, records the deployed commit, and retains the previous release symlink. Public traffic is verified only after the restricted server script succeeds.

## Rollback

Use the retained `previous` release and its commit-tagged image. Verify loopback health before reloading shared Nginx. A rollback must not restart the `elvn` container.

## Current prerequisite

The available VPS key is restricted to the existing ELVN deploy command. Production launch requires a separately authorized `elvn-studio-deploy` command and the dedicated directory/environment setup above. Do not broaden the existing command silently.
