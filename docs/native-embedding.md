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

## Small public editor seam

`createCollaborativeEditor({ el, context, sessionTransport })` accepts a per-editor
transport with the existing `openContext`, `sync`, `push`, `save` and `close`
shapes. The default browser transport is unchanged. Injected transports use
in-memory state instead of IndexedDB; the host owns account/file binding,
credentials, storage, request limits and timeouts. Public shares are not supported
by the injected transport yet. Browser sendBeacon never bypasses it.

Two wrapper methods expose the required editor state without component accessors:

```ts
const editor = await createCollaborativeEditor({ el, context, sessionTransport })
const checkpoint = editor.exportState()
const drained = await editor.drain()
```

The snapshot contains a full base64 Yjs update, state vector, Markdown, version,
context and collaboration base ETag, without session credentials. `drain()`
freezes user input, waits for queued/in-flight provider updates, and returns a
snapshot; failures reject. It does not persist, save, or close the session.

The host must persist recovery state, control file-save requests, verify the saved
version, close through its own transport, and fetch canonical DAV Markdown/ETag
before releasing ownership and destroying the editor. Automatic save requests
still go through the injected transport and can be deferred by the host.

`playwright/e2e/embedding.spec.ts` uses the existing Text fixtures to test two
embedded clients, Unicode convergence, valid Yjs export and drain acknowledgements.
The larger demo and checkpoint/save/close coordinator live in the
[native app repository](https://github.com/juliusknorr/collectives-swiftui/tree/feat/text-collaboration/dev/text-collaboration/embedding).
Per-edit durability and cold-restart recovery remain host-side follow-up work.
