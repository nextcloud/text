/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ReporterDescription } from '@playwright/test'

import { defineConfig, devices } from '@playwright/test'

/**
 * Used locally - i.e. if `CI` is not set as an environment variable.
 */
const LOCAL_CONFIG = {
	// Just the html report with the traces
	reporter: 'list',
} as const

/**
 * Used on CI - i.e. if `CI` is set as an environment variable.
 */
const CI_CONFIG = {
	// ensure no `test.only` is left in the code causing false positives
	forbidOnly: true,
	// blob (so we can merge reports and download them for inspection),
	// dot (so we have a quick overview in the logs while the tests are running)
	// github (to have annotations in the PR)
	reporter: [['blob'], ['line'], ['github']] as ReporterDescription[],
	retries: 1,
	timeout: 45_000,
	// we shard to speed up the tests so no parallelism in workers
	workers: 1,
} as const

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './playwright',
	...(process.env.CI ? CI_CONFIG : LOCAL_CONFIG),
	use: {
		// Base URL to use in actions like `await page.goto('./')`.
		baseURL: process.env.baseURL ?? 'http://localhost:8089/index.php/',
		// record traces but only keep them when the test fails
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},
	],

	webServer: {
		// Don't set `url` as it would take precedence over `wait.stdout` and tests start too early
		// url: 'http://127.0.0.1:8089',
		// Starts the Nextcloud docker container
		command: 'npm run start:nextcloud',
		// we use sigterm to notify the script to stop the container
		// if it does not respond, we force kill it after 10 seconds
		gracefulShutdown: {
			signal: 'SIGTERM',
			timeout: 10000,
		},
		// `start-nextcloud-server.mjs` only starts the server if not reachable yet.
		reuseExistingServer: false,
		stderr: 'pipe',
		stdout: 'pipe',
		// max. 5 minutes for creating the container
		timeout: 5 * 60 * 1000,
		wait: {
			// we wait for this line to appear in the output of the webserver until consider it done
			stdout: /Nextcloud is now ready to use/,
		},
	},
})
