/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from '@playwright/test'
import { createRandomUser, login } from '@nextcloud/e2e-test-server/playwright'
import type { User as Account } from '@nextcloud/e2e-test-server'
import { User } from './User'

export interface UserFixture {
	account: Account
	user: User
}

/**
 * This test fixture ensures a new random user is created and used for the test (current page)
 */
export const test = base.extend<UserFixture>({
	// eslint-disable-next-line no-empty-pattern
	account: async ({ }, use) => {
		const account = await createRandomUser()
		await use(account)
	},
	page: async ({ account, browser, baseURL }, use) => {
		// Important: make sure we authenticate in a clean environment by unsetting storage state.
		const page = await browser.newPage({
			storageState: undefined,
			baseURL,
		})

		await login(page.request, account)
		const tokenResponse = await page.request.get('./csrftoken', {
			failOnStatusCode: true,
		})
		const { token } = (await tokenResponse.json()) as { token: string }
		page.context().setExtraHTTPHeaders({ requesttoken: token })

		await use(page)
		await page.close()
	},
	user: async ({ account, page }, use) => {
		const user = new User(account, page)
		await use(user)
	},
})
