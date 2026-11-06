<!--
SPDX-FileCopyrightText: 2026 Nextcloud contributors
SPDX-License-Identifier: AGPL-3.0-or-later
-->
# Experimental native embedding compatibility

This development branch provides compatibility metadata for a bundled native
Text client. It is not a supported public embedding API. The paired native
implementation lives on [the Collectives collaboration branch](https://github.com/juliusknorr/collectives-swiftui/tree/feat/text-collaboration).

After building Text and regenerating its Composer class map, generate metadata:

```sh
python3 tools/native-embedding.py --source-revision "$(git rev-parse HEAD)"
```

Archives without Git metadata must supply the full pinned commit explicitly.
The generated `js/native-embedding.json` is ignored and must be deployed
atomically alongside the corresponding code. Authenticated `GET /embedding`
returns its six fields: format, Text version, source revision, code digest,
session API and update encoding. Missing or invalid metadata, including a
mismatch with `appinfo/info.xml`, yields HTTP 503. Responses use `no-store`.

The digest fingerprints sorted paths and SHA-256 hashes of `.mjs`, `.css`, `.php`
and `.xml` files in `js`, `css`, `lib`, `appinfo` and `composer/composer`. JSON
metadata excludes itself. The native bundle must use exactly the same manifest.
This trusts a coherent server deployment; manually editing same-version code
without regenerating metadata invalidates that guarantee. It avoids hashing
roughly 14 MB of JavaScript on every request.

Session middleware optionally accepts `runtimeDigest`. A supplied incompatible
digest rejects create/sync/push/save with HTTP 412 before session handling. Native
clients always supply it. Browser clients without it retain their existing
behavior. Close remains available for cleanup after an upgrade and does not
prove that the document was saved.

Run the parser and generator tests without a server:

```sh
vendor/bin/phpunit --no-configuration --do-not-cache-result tests/unit/Service/RuntimeManifestTest.php
python3 -m unittest discover -s tests/native_embedding
```

The paired native WebKit smoke suite exercises the authenticated endpoint,
matching and incompatible session operations, collaboration, reconnect and save
confirmation against a real server. Transport injection and a durable editor
drain/save/close contract remain separate follow-up work.
