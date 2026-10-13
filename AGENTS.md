<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
# AGENTS.md

Nextcloud Text - a collaborative rich-text/Markdown editor for Nextcloud. PHP backend (`lib/`) + Vue.js frontend (`src/`). Tiptap 3 + ProseMirror + Yjs (CRDT sync).

---

## Generic notes

In frontend, always generate Typescript files when creating new files.

For new e2e tests, always generate Playwright tests. Where appropriate, suggest to migrate Cypress tests to Playwright. The goal is to migrate completely from Cypress to Playwright in the future.

## Contributions

- Conventional Commits with a scope (e.g. `fix(versions): ...`).
- AI-assisted commits get an `Assisted-by: <Tool>:<model>` trailer.
- Changed or added code needs unit tests: Vitest in `src/tests/`, PHPUnit in `tests/unit/`.
- New files need SPDX headers (REUSE CI enforces this).
- Comments describe the code, not the change that produced it.
- Keep PRs to one concern. Disclose AI use in the PR description (the template has a section for it).

## Commands

### Install

```bash
npm ci                    # JS deps
composer install          # PHP deps (uses platform php=8.2 regardless of local PHP)
```

### Build

```bash
npm run build             # Production (Vite, NODE_ENV=production)
npm run dev               # Dev build
```

### Frontend tests (Vitest, jsdom, no server needed)

```bash
npm run test              # Run all unit tests once
npx vitest run src/tests/markdown.spec.js          # Single file
npx vitest run -t "pattern"                        # Filter by name
```

Unit specs live in `src/tests/**/*.spec.{js,ts}`; E2E specs live in `playwright/e2e/`.

### PHP unit tests (requires full Nextcloud server install — see below)

```bash
composer run test:unit    # phpunit -c tests/phpunit.xml
vendor/bin/phpunit --filter testMethodName tests/unit/Service/DocumentServiceTest.php
```

### Lint / typecheck / format

```bash
npm run lint              # tsc typecheck + ESLint
npm run lint:fix          # ESLint auto-fix
composer run lint         # PHP syntax check (php -l)
composer run cs:check     # PHP code style check (php-cs-fixer --dry-run)
composer run cs:fix       # php-cs-fixer auto-fix
composer run psalm        # Psalm static analysis (level 2, baseline: tests/psalm-baseline.xml)
```

### E2E — Playwright (newer suite, auto-starts Docker)

```bash
npx playwright install chromium --only-shell   # One-time browser install
npx playwright test
npx playwright test playwright/e2e/files.spec.ts
npx playwright test --grep "pattern"
```

- Default URL: `http://localhost:8089/index.php/`. Override with `baseURL` env var.
- CI runs 3 shards; `playwright.config.ts` spins up Nextcloud via Docker if no server is running.
- Overriding `baseURL` alone does not make the suite work against another server:
  `playwright.config.ts` always starts its Docker `webServer`, and the fixtures
  `random-user.ts` and `shared-file.ts` create test users with `createRandomUser()`
  from `@nextcloud/e2e-test-server/playwright`, which runs `occ` inside that container.

#### Optional: running against an existing local Nextcloud instance

Set `baseURL` and `NODE_TLS_REJECT_UNAUTHORIZED=0` to point the suite at it. Build first (`npm run dev`) if not already done, since the instance serves `js/` and `css/`. Run the tests from a scratch copy whose `random-user.ts` and `shared-file.ts` create users via OCS (`POST /ocs/v2.php/cloud/users`, `OCS-APIRequest: true`) instead of `createRandomUser()`.

### E2E — Cypress (deprecated, requires Nextcloud server + `viewer` app)

```bash
npm run test:cypress       # cd cypress && ./runLocal.sh run (starts Docker if no server)
npm run test:cypress:open  # Interactive Cypress UI
npx cypress run --spec "cypress/e2e/files.spec.js"   # Single spec
```

- Default server URL: `http://localhost:8081/index.php`. Override with `CYPRESS_baseUrl`.
- CI uses 11 parallel runners via `cypress-split` (`SPLIT` / `SPLIT_INDEX` env vars).

---

## Architecture notes

- **Multiple Vite entry points** (`vite.config.ts`): `text` (`main.js`), `files.ts`, `public.js/ts`, `viewer.js`, `editor.js`, `init.js` — each produces a separate bundle under `js/`.
- **Do not commit `js/` or `css/`** during development. The `node-dist-unchanged.yml` CI check enforces this. Use `make clean` to remove them, `make clean-git` to restore from git.
- **REUSE compliance required**: every file needs `SPDX-FileCopyrightText` and `SPDX-License-Identifier` headers. License details in `REUSE.toml` and `LICENSES/`. The `reuse.yml` CI check enforces this.
- **Psalm baseline**: known issues are suppressed in `tests/psalm-baseline.xml`. After fixing Psalm errors, regenerate the baseline rather than deleting it.
- **`composer.json` pins `platform.php = "8.2"`**: Composer enforces 8.2 compatibility even if a newer PHP is installed locally.

---

## PHPUnit prerequisites

PHPUnit tests depend on Nextcloud's OCP interfaces; they **cannot run standalone**. The app must live at `apps/text/` inside a full Nextcloud server checkout. CI workflow (`phpunit-sqlite.yml` etc.) shows the exact setup: clone server, checkout app into `apps/text/`, run `php occ maintenance:install`, then run tests.

---

## Cypress prerequisites

- `CYPRESS_INSTALL_BINARY=0` skips binary download when only building (set in CI non-cypress steps).
- CI also enables `assistant` and `whiteboard` apps.
- `offline_readonly_delay` is set to `5000` ms in CI to speed up sync/recovery tests.

---

## Autoloader

After adding new PHP classes, regenerate the Composer autoloader:

```bash
make dump-autoloader      # Uses the separate composer/ setup
```

The `autoloader.yml` CI check verifies it stays up-to-date.
