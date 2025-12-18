/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from '@playwright/test'

export interface EditorApiFixture {
	createEditor: (options: {
		content?: string,
		fileId?: number,
		readOnly?: boolean,
		containerId?: string,
	}) => Promise<void>
}

/**
 * This test fixture provides a helper to create an editor using the Text API
 * If a `fileId` is passed, an editor with session is created, if `content` is passed,
 * an editor without session is created.
 */
export const test = base.extend<EditorApiFixture>({
	createEditor: async ({ page }, use) => {
		const createEditor = async (
			options: {
				content?: string,
				fileId?: number,
				readOnly?: boolean,
				containerId?: string,
			},
		) => {
			const containerId = options.containerId ?? 'test-editor-api'

			await page.evaluate(
				async ({ containerId, content, fileId, readOnly }) => {
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

					// @ts-expect-error - OCA.Text is a global
					await window.OCA.Text.createEditor({
						el: container,
						...(fileId != null ? { fileId } : { content }),
						readOnly,
					})
				},
				{ containerId, content: options.content, fileId: options.fileId, readOnly: options.readOnly },
			)
		}

		await use(createEditor)
	},
})
