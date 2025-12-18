/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test } from '../support/fixtures/editor-api'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const fileTest = mergeTests(uploadFileTest, test)

test.describe('editor API at window.OCA.Text - MarkdownContentEditor.vue without collaboration session', () => {
	test.beforeEach(async ({ page }) => {
		// Open the files app so we're somewhere with `window.OCA.Text` available
		await page.goto('/apps/files')

		// Load the editor API bundle
		await page.addScriptTag({
			url: '/apps/text/js/text-editor.mjs',
			type: 'module',
		})
	})

	test('opens editor in write mode with predefined content', async ({
		page,
		createEditor,
		containerId,
	}) => {
		await createEditor({
			type: 'editor',
			content: '# heading\n',
		})

		await expect(page.locator(`#${containerId} h1`)).toHaveText('#heading')

		const content = page.locator(`#${containerId} .ProseMirror`)
		await content.click()
		await page.keyboard.type('More text.')
		await expect(content).toContainText('#headingMore text.')
	})

	test('opens editor readonly with predefined content', async ({
		page,
		createEditor,
		containerId,
	}) => {
		await createEditor({
			type: 'editor',
			content: '# heading\n',
			readOnly: true,
		})

		await expect(page.locator(`#${containerId} h1`)).toHaveText('#heading')
		const content = page.locator(`#${containerId} .ProseMirror`)
		await expect(content).toHaveAttribute('contenteditable', 'false')
	})
})

fileTest.describe(
	'editor API at window.OCA.Text - Editor.vue with collaboration session',
	() => {
		fileTest.use({ fileContent: 'some content\n' })

		fileTest.beforeEach(async ({ page }) => {
			// Open the files app so we're somewhere with `window.OCA.Text` available
			await page.goto('/apps/files')

			// Load the editor API bundle
			await page.addScriptTag({
				url: '/apps/text/js/text-editor.mjs',
				type: 'module',
			})
		})

		fileTest(
			'opens editor with session for existing file',
			async ({ file, page, createEditor, containerId }) => {
				await createEditor({
					type: 'editor',
					fileId: file.id,
					readOnly: true,
				})

				await expect(page.locator(`#${containerId}`)).toContainText(
					'some content',
				)

				const content = page.locator(`#${containerId} .ProseMirror`)
				await content.click()
				await page.keyboard.type('More text.')
				await expect(content).toContainText('More text.')
			},
		)
	},
)
