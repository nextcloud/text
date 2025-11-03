/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Page } from '@playwright/test'
import { test as base } from './request-token'

interface UploadMdFixture {
	file: File
}

/**
 * This test fixture uploads the empty.md file to the user's root directory
 * Note: This fixture requires the page to be authenticated (e.g., by merging with random-user fixture)
 */
export const test = base.extend<UploadMdFixture>({
	file: async ({ page, requestToken }, use) => {
		const file = new File('empty.md', page)
		const fileContent = ''
		await file.upload(fileContent, requestToken)
		await use(file)
	},
})

class File {
	name: string
	page: Page
	id?: number

	constructor(name: string, page: Page) {
		this.name = name
		this.page = page
	}

	async upload(fileContent: string, requestToken: string) {

		// Upload file via WebDAV using page.request with requesttoken header
		const response = await this.page.request.put(
			`/remote.php/webdav/${this.name}`,
			{
				data: fileContent,
				headers: {
					'Content-Type': 'text/markdown',
					'requesttoken': requestToken,
				},
			},
		)

		if (!response.ok()) {
			throw new Error(`Failed to upload file: ${response.status()} ${response.statusText()}`)
		}

		// Extract file ID from response headers
		const ocFileId = response.headers()['oc-fileid']
		const fileId = ocFileId ? Number(ocFileId.split('oc')?.[0]) : 0
		this.id = fileId
	}

}
