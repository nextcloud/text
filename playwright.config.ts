/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineConfig, devices } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './playwright',
	// ensure no `test.only` is left in the code causing false positives
	forbidOnly: !!process.env.CI,
	// retry on CI only
	retries: process.env.CI ? 1 : 0,
	// we shard on CI to speed up the tests so no parallelism in workers
	workers: process.env.CI ? 1 : undefined,
	// on CI we want to have blob (so we can merge reports and download them for inspection),
	// line (so we have a quick overview in the logs while the tests are running)
	// github (to have annotations in the PR)
	// locally we just want the html report with the traces
	reporter: process.env.CI ? [['blob'], ['line'], ['github']] : 'html',
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
		url: 'http://127.0.0.1:8089',
		// Starts the Nextcloud docker container
		command: 'npm run start:nextcloud',
		// we use sigterm to notify the script to stop the container
		// if it does not respond, we force kill it after 10 seconds
		gracefulShutdown: {
			signal: 'SIGTERM',
			timeout: 10000,
		},
		reuseExistingServer: !process.env.CI,
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
