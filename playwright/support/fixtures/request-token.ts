/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from '@playwright/test'

export interface RequestTokenFixture {
	requestToken: string
}

/**
 * This test fixture ensures a new random user is created and used for the test (current page)
 */
export const test = base.extend<RequestTokenFixture>({
	requestToken: async ({ page }, use) => {
		const tokenResponse = await page.request.get('./csrftoken', {
			failOnStatusCode: true,
		})
		const token = (await tokenResponse.json()).token

		await use(token)
	},
})
