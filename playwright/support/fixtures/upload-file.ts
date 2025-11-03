/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from './request-token'

interface UploadMdFixture {
	file: {
		fileName: string
		fileId: number
	}
}

/**
 * This test fixture uploads the empty.md file to the user's root directory
 * Note: This fixture requires the page to be authenticated (e.g., by merging with random-user fixture)
 */
export const test = base.extend<UploadMdFixture>({
	file: async ({ page, requestToken }, use) => {
		const fileName = 'empty.md'
		const fileContent = ''

		// Upload file via WebDAV using page.request with requesttoken header
		const response = await page.request.put(
			`/remote.php/webdav/${fileName}`,
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

		await use({ fileName, fileId })
	},
})
