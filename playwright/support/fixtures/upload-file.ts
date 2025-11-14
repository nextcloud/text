/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from './request-token'
import { File } from './File'

interface UploadMdFixture {
	file: File
	fileName: string
	fileContent: string
}

/**
 * This test fixture uploads the empty.md file to the user's root directory
 * Note: This fixture requires the page to be authenticated (e.g., by merging with random-user fixture)
 */
export const test = base.extend<UploadMdFixture>({
	file: async ({ fileContent, fileName, page, requestToken }, use) => {
		const file = new File(fileName, page, requestToken)
		await file.upload(fileContent)
		await use(file)
	},
	fileContent: ['', {option: true}],
	fileName: ['empty.md', {option: true}],
})
