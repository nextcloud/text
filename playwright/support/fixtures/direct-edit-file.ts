/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect } from '@playwright/test'
import { test as base } from './shared-file.ts'

export interface DirectEditFileFixture {
	directEditing: { url: string }
}

/**
 * This test fixture uploads the file to a user's root directory and shares it.
 */
export const test = base.extend<DirectEditFileFixture>({

	directEditing: async ({ file }, use) => {
		const { url } = await file.createDirectEditingLink()
		await use({ url })
	},

	open: async ({ page, directEditing }, use) => {
		const open = async () => {
			await page.goto(directEditing.url)
			await expect(page.getByRole('toolbar', { name: 'Formatting menu bar' }))
				.toBeVisible()
		}
		await use(open)
	},

})
