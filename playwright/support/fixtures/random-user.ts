/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User as Account } from '@nextcloud/e2e-test-server'
import type { Browser, Page } from '@playwright/test'

import { createRandomUser, login } from '@nextcloud/e2e-test-server/playwright'
import { test as base } from '@playwright/test'
import { User } from './User.ts'

export interface UserFixture {
	account: Account
	user: User
}

/**
 * Open a new page that is logged in as the given account.
 *
 * @param browser to open the page in
 * @param baseURL of the Nextcloud instance
 * @param account to log in with
 */
export async function newUserPage(browser: Browser, baseURL: string | undefined, account: Account): Promise<Page> {
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
	return page
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
		const page = await newUserPage(browser, baseURL, account)
		await use(page)
		await page.close()
	},
	user: async ({ account, page }, use) => {
		const user = new User(account, page)
		await use(user)
	},
})
