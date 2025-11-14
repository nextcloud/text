/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from './random-user'
import { File } from './File'

interface UploadFileFixture {
	file: File
	fileName: string
	fileContent: string
	source: string
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
	fileContent: ['', {option: true}],
	fileName: ['empty.md', {option: true}],
})
