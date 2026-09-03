/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
/* eslint-disable jsdoc/require-jsdoc */

import type { ReporterDescription } from '@playwright/test'

import { defineConfig, devices } from '@playwright/test'

const COMPARISON_E2E = process.env.TEXT_COMPARISON_E2E === '1'
const COMPARISON_TESTS = /playwright\/comparison\/.*\.spec\.ts/
const COMPARISON_BASE_URL = process.env.TEXT_COMPARISON_BASE_URL || process.env.baseURL || 'http://localhost:8089/index.php/'
const EXTERNAL_COMPARISON_SERVER = Boolean(process.env.TEXT_COMPARISON_BASE_URL || process.env.baseURL)

function comparisonProjects() {
	if (!COMPARISON_E2E) {
		return []
	}
	return [{
		name: 'comparison-chromium',
		testMatch: COMPARISON_TESTS,
		grepInvert: /@memory/,
		use: {
			...devices['Desktop Chrome'],
			baseURL: COMPARISON_BASE_URL,
			ignoreHTTPSErrors: true,
			screenshot: 'only-on-failure' as const,
			trace: 'retain-on-failure' as const,
		},
	}, {
		name: 'comparison-webkit',
		testMatch: COMPARISON_TESTS,
		grepInvert: /@memory/,
		use: {
			...devices['Desktop Safari'],
			baseURL: COMPARISON_BASE_URL,
			ignoreHTTPSErrors: true,
			screenshot: 'only-on-failure' as const,
			trace: 'retain-on-failure' as const,
		},
	}, {
		name: 'comparison-chromium-memory',
		testMatch: COMPARISON_TESTS,
		grep: /@memory/,
		use: {
			...devices['Desktop Chrome'],
			baseURL: COMPARISON_BASE_URL,
			ignoreHTTPSErrors: true,
			screenshot: 'only-on-failure' as const,
			trace: 'retain-on-failure' as const,
		},
	}]
}

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
	reporter: [
		['blob'],
		['json', { outputFile: 'test-results/results.json' }],
		['line'],
		['github'],
	] as ReporterDescription[],
	retries: 1,
	timeout: 45_000,
	// we shard to speed up the tests so no parallelism in workers
	workers: 1,
} as const

function comparisonWebServer() {
	if (EXTERNAL_COMPARISON_SERVER) {
		return undefined
	}
	return {
		command: 'npm run start:nextcloud',
		gracefulShutdown: {
			signal: 'SIGTERM' as const,
			timeout: 10000,
		},
		reuseExistingServer: false,
		stderr: 'pipe' as const,
		stdout: 'pipe' as const,
		timeout: 5 * 60 * 1000,
		wait: {
			stdout: /Nextcloud is now ready to use/,
		},
	}
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './playwright',
	...(process.env.CI ? CI_CONFIG : LOCAL_CONFIG),
	workers: COMPARISON_E2E ? 1 : undefined,
	use: {
		// Base URL to use in actions like `await page.goto('./')`.
		baseURL: COMPARISON_BASE_URL,
		// record traces but only keep them when the test fails
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'chromium',
			testIgnore: COMPARISON_TESTS,
			use: {
				...devices['Desktop Chrome'],
			},
		},
		...comparisonProjects(),
	],

	webServer: comparisonWebServer(),
})
