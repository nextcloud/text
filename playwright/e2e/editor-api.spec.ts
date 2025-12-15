/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Page } from '@playwright/test'
import { expect, mergeTests } from '@playwright/test'
import { test } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const fileTest = mergeTests(uploadFileTest, test)
const containerId = 'test-editor-api'

test.describe('editor API at window.OCA.Text - MarkdownContentEditor.vue without collaboration session', () => {
	const createContentEditor = async (
		page: Page,
		options: {
			content: string,
			readOnly?: boolean,
		 },
	) => {
		await page.evaluate(
			async ({ containerId, content, readOnly }) => {
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
					content,
					readOnly,
				})
			},
			{ containerId, ...options },
		)
	}

	test.beforeEach(async ({ page }) => {
		// Open the files app so we're somewhere with `window.OCA.Text` available
		await page.goto('/apps/files')

		// Load the editor API bundle
		await page.addScriptTag({
			url: '/apps/text/js/text-editor.mjs',
			type: 'module',
		})
	})

	test('opens editor in write mode with predefined content', async ({ page }) => {
		await createContentEditor(page, {
			content: '# heading\n',
		})

		await expect(page.locator(`#${containerId} h1`)).toHaveText('#heading')

		const content = page.locator(`#${containerId} .ProseMirror`)
		await content.click()
		await page.keyboard.type('More text.')
		await expect(content).toContainText('#headingMore text.')
	})

	test('opens editor readonly with predefined content', async ({ page }) => {
		await createContentEditor(page, {
			content: '# heading\n',
			readOnly: true,
		})

		await expect(page.locator(`#${containerId} h1`)).toHaveText('#heading')
		const content = page.locator(`#${containerId} .ProseMirror`)
		await expect(content).toHaveAttribute('contenteditable', 'false')
	})
})

fileTest.describe('editor API at window.OCA.Text - Editor.vue with collaboration session', () => {
	const createFileEditor = async (
		page: Page,
		options: {
			fileId: number,
			readOnly?: boolean,
		 },
	) => {
		await page.evaluate(
			async ({ containerId, fileId, readOnly }) => {
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
					fileId,
					readOnly,
				})
			},
			{ containerId, ...options },
		)
	}

	fileTest.use({ fileContent: 'some content\n' })

	fileTest.beforeEach(async ({ open, page }) => {
		await open()

		// Load the editor API bundle
		await page.addScriptTag({
			url: '/apps/text/js/text-editor.mjs',
			type: 'module',
		})
	})

	fileTest('opens editor with session for existing file', async ({ file, page }) => {
		await createFileEditor(page, {
			fileId: file.id,
			readOnly: true,
		})

		await expect(page.locator(`#${containerId}`)).toContainText('some content')

		const content = page.locator(`#${containerId} .ProseMirror`)
		await content.click()
		await page.keyboard.type('More text.')
		await expect(content).toContainText('More text.')
	})
})
