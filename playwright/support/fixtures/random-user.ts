/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from '@playwright/test'
import { createRandomUser, login } from '@nextcloud/e2e-test-server/playwright'
import { type User } from '@nextcloud/e2e-test-server'

interface RandomUserFixture {
	user: User
	requestToken: string
}

/**
 * This test fixture ensures a new random user is created and used for the test (current page)
 */
export const test = base.extend<RandomUserFixture>({
	// eslint-disable-next-line no-empty-pattern
	user: async ({ }, use) => {
		const user = await createRandomUser()
		await use(user)
	},
	requestToken: async ({ page }, use) => {
		// Navigate to get the page context and extract request token
		await page.goto('/')

		// Get the request token from the page context
		const token = await page.evaluate(() => {
			// @ts-expect-error - OC is a global variable
			return window.OC?.requestToken || ''
		})

		await use(token)
	},
	page: async ({ browser, baseURL, user }, use) => {
		// Important: make sure we authenticate in a clean environment by unsetting storage state.
		const page = await browser.newPage({
			storageState: undefined,
			baseURL,
		})

		await login(page.request, user)

		await use(page)
		await page.close()
	},
})
