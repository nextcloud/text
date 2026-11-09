/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, type Browser } from '@playwright/test'
import { test as base } from './upload-file'
import { createRandomUser, login } from '@nextcloud/e2e-test-server/playwright'
import { User } from './User'

export interface SharedFileFixture {
	owner: User
	recipient: User
	share: { token: string }
}

/**
 * Create a random user and log in on a new page.
 *
 * @param browser Browser to open the page in
 * @param baseURL Base URL of the page
 */
async function createLoggedInUser(browser: Browser, baseURL: string | undefined): Promise<User> {
	const account = await createRandomUser()
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
	return new User(account, page)
}

/**
 * This test fixture uploads the file to a user's root directory and shares it.
 */
export const test = base.extend<SharedFileFixture>({

	// eslint-disable-next-line no-empty-pattern
	owner: async ({ browser, baseURL }, use) => {
		await use(await createLoggedInUser(browser, baseURL))
	},

	recipient: async ({ browser, baseURL }, use) => {
		await use(await createLoggedInUser(browser, baseURL))
	},

	file: async ({ fileContent, fileName, owner }, use) => {
		const file = await owner.uploadFile({ name: fileName, content: fileContent })
		await use(file)
	},

	share: async ({ file }, use) => {
		const { token } = await file.shareEditableLink()
		await use({ token })
	},

	page: async ({ baseURL, browser }, use) => {
		// Important: make sure we use a clean environment by unsetting storage state.
		const page = await browser.newPage({
			storageState: undefined,
			baseURL,
		})
		await use(page)
	},

	open: async ({ page, share }, use) => {
		const open = async () => {
			await page.goto(`s/${share.token}`)
			await expect(page.getByRole('toolbar', { name: 'Formatting menu bar' }))
				.toBeVisible()
		}
		await use(open)
	},

	close: async ({ page }, use) => {
		const close = async () => {
			await page.getByRole('button', { name: 'Close', exact: true }).click()
			await page.waitForRequest(/close/)
			await expect(page.getByRole('toolbar', { name: 'Formatting menu bar' }))
				.not.toBeVisible()
		}
		await use(close)
	},

})
