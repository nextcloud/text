/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from './random-user'

const containerId = 'test-editor-api'

export interface EditorApiFixture {
	createEditor: (options: {
		type: 'editor' | 'table',
		content?: string,
		fileId?: number,
		readOnly?: boolean,
	}) => Promise<void>
	containerId: string
}

/**
 * This test fixture provides helpers to create an editor or table using the Text API
 * - createEditor: If a `fileId` is passed, an editor with session is created, if `content` is passed,
 *   an editor without session is created.
 * - createTable: Creates a table editor with the given content
 */
export const test = base.extend<EditorApiFixture>({
	createEditor: async ({ page }, use) => {
		const createEditor = async (
			options: {
				type: 'editor' | 'table',
				content?: string,
				fileId?: number,
				readOnly?: boolean,
			},
		) => {

			await page.evaluate(
				async ({ containerId, type, content, fileId, readOnly }) => {
					const container = document.createElement('div')
					container.id = containerId
					container.style.position = 'fixed'
					container.style.top = '0'
					container.style.left = '0'
					container.style.width = '100%'
					container.style.height = '100%'
					container.style.padding = '50px'
					container.style.zIndex = '10000'
					container.style.background = 'white'
					document.body.appendChild(container)

					const method = type === 'editor' ? 'createEditor' : 'createTable'
					// @ts-expect-error - OCA.Text is a global
					await window.OCA.Text[method]({
						el: container,
						...(fileId != null ? { fileId } : { content }),
						readOnly,
					})
				},
				{ containerId, type: options.type, content: options.content, fileId: options.fileId, readOnly: options.readOnly },
			)
		}

		await use(createEditor)
	},
	containerId,
})
