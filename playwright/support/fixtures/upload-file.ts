/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from './Node.ts'

import { ViewerSection } from '../sections/ViewerSection.ts'
import { test as base } from './random-user.ts'

export interface UploadFileFixture {
	file: Node
	fileName: string
	fileContent: string
	mtime: number
	oldVersions: { content?: string, mtime: number }[]
	open: () => Promise<void>
	close: () => Promise<void>
	viewer: ViewerSection
}

/**
 * This test fixture uploads the empty.md file to the user's root directory
 * Note: This fixture requires the page to be authenticated (e.g., by merging with random-user fixture)
 */
export const test = base.extend<UploadFileFixture>({
	fileContent: ['', { option: true }],
	fileName: ['empty.md', { option: true }],
	mtime: [undefined, { option: true }],
	oldVersions: [[], { option: true }],

	file: async ({ fileContent, fileName, oldVersions, mtime, user }, use) => {
		const uploadVersion
			= (opts: { content?: string, mtime?: number }) => user.uploadFile({ name: fileName, ...opts })
		for (const version of oldVersions) {
			await uploadVersion(version)
		}
		const file = await uploadVersion({ content: fileContent, mtime })
		await use(file)
	},

	open: ({ file }, use) => use(() => file.open()),
	viewer: ({ fileName, page }, use) => use(new ViewerSection(fileName, page)),

})
