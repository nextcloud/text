/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect } from '@playwright/test'
import { test as base } from './random-user'
import { File } from './File'

export interface UploadFileFixture {
	file: File
	fileName: string
	fileContent: string
	open: () => Promise<void>
	close: () => Promise<void>
}

/**
 * This test fixture uploads the empty.md file to the user's root directory
 * Note: This fixture requires the page to be authenticated (e.g., by merging with random-user fixture)
 */
export const test = base.extend<UploadFileFixture>({
	file: async ({ fileContent, fileName, user }, use) => {
		const file = await user.uploadFile(fileName, fileContent)
		await use(file)
	},

	open: async ({ file, page }, use) => {
		const open = async () => {
			await page.goto(`f/${file.id}`)
			await expect(page.getByLabel(file.name, { exact: true }))
				.toBeVisible()
		}
		await use(open)
	},

	close: async ({ file, page }, use) => {
		const close = async () => {
			await page.getByRole('button', { name: 'Close', exact: true }).click()
			await page.waitForRequest(/close/)
			await expect(page.getByLabel(file.name, { exact: true }))
				.not.toBeVisible()
		}
		await use(close)
	},

	fileContent: ['', {option: true}],
	fileName: ['empty.md', {option: true}],
})
