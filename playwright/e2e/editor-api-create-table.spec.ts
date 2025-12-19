/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect } from '@playwright/test'
import { test } from '../support/fixtures/editor-api'

test.describe('createTable API', () => {
	test.beforeEach(async ({ page }) => {
		// Open the files app so we're somewhere with `window.OCA.Text` available
		await page.goto('/apps/files')

		// Load the editor API bundle
		await page.addScriptTag({
			url: '/apps/text/js/text-editor.mjs',
			type: 'module',
		})
	})

	test('renders table editor', async ({ page, createEditor, containerId }) => {
		await createEditor({
			type: 'table',
			content: '| A | B |\n|---|---|\n| 1 | 2 |',
			readOnly: false,
		})

		await expect(page.locator(`#${containerId} table`)).toBeVisible()
		await expect(page.locator(`#${containerId} th`).first()).toContainText('A')
		await expect(page.locator(`#${containerId} td`).first()).toContainText('1')
	})

	test('allows editing when not readonly', async ({
		page,
		createEditor,
		containerId,
	}) => {
		await createEditor({
			type: 'table',
			content: '| A |\n|---|\n| x |',
			readOnly: false,
		})

		const cell = page.locator(`#${containerId} .ProseMirror td`).first()
		await cell.click({ force: true })
		await page.waitForTimeout(100)
		await cell.selectText()
		await page.keyboard.type('edited')

		await expect(cell).toContainText('edited')
	})
	test('prevents editing when readonly', async ({
		page,
		createEditor,
		containerId,
	}) => {
		await createEditor({
			type: 'table',
			content: '| A |\n|---|---|\n| 1 |',
			readOnly: true,
		})

		const editable = page.locator(`#${containerId} [contenteditable]`).first()
		await expect(editable).toHaveAttribute('contenteditable', 'false')
	})
})
