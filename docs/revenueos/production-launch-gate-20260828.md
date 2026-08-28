# Revenue OS public launch gate — August 28, 2026

## Studio rollback point

The most recent successful GitHub production deployment before this launch is:

```text
ccb9a5ae18805b2a6034fcc8b9054b136408fce6
Production run 31008308559
```

The production workflow builds an immutable SHA-tagged image, deploys through the restricted `/usr/local/sbin/elvn-studio-deploy` command, and retains the previous release symlink and image. The lead-lifecycle volume is retained independently.

The deploy script automatically returns to the current release when candidate health fails. Its verified launch command is:

```sh
sudo /usr/local/sbin/elvn-studio-deploy /tmp/elvn-studio-release.tar.gz <candidate-sha>
```

The repository documents a retained `previous` release, but the restricted script has no operator-invoked rollback mode. An exact non-manual rollback command therefore cannot be verified. The public Studio deployment must not restart or modify the separate ELVN or customer production applications.

## Revenue OS application dependency

The public launch remains blocked until the private application has a verified immutable rollback point and restricted production workflow, and Studio has an operator-invoked rollback command. Studio PR #21 must not be merged as a claimed full production launch while `app.elvn.monster` remains on version 0.1.0.
