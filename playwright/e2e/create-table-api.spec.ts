/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as uploadFileTest } from '../support/fixtures/upload-file'
import { test as randomUserTest } from '../support/fixtures/random-user'

const test = mergeTests(uploadFileTest, randomUserTest)

test.describe('createTable API', () => {
	test.beforeEach(async ({ open, page }) => {
		await open()

		// Load the editor API bundle
		await page.evaluate(async () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore - Dynamic import in browser context
			await import('/apps/text/js/text-editor.mjs')
		})
	})

	test('renders table editor', async ({ page }) => {
		await page.evaluate(async () => {
			const container = document.createElement('div')
			container.id = 'test-table'
			document.body.appendChild(container)

			// @ts-expect-error - OCA.Text is a global
			await window.OCA.Text.createTable({
				el: container,
				content: '| A | B |\n|---|---|\n| 1 | 2 |',
				readOnly: false,
			})
		})

		await expect(page.locator('#test-table table')).toBeVisible()
		await expect(page.locator('#test-table th').first()).toContainText('A')
		await expect(page.locator('#test-table td').first()).toContainText('1')
	})

	test('allows editing when not readonly', async ({ page }) => {
		await page.evaluate(async () => {
			const container = document.createElement('div')
			container.id = 'test-editable'
			container.style.position = 'fixed'
			container.style.top = '10px'
			container.style.left = '10px'
			container.style.zIndex = '10000'
			container.style.background = 'white'
			document.body.appendChild(container)

			// @ts-expect-error - OCA.Text is a global
			await window.OCA.Text.createTable({
				el: container,
				content: '| A |\n|---|\n| x |',
				readOnly: false,
			})
		})

		const cell = page.locator('#test-editable .ProseMirror td').first()
		await cell.click({ force: true })
		await page.waitForTimeout(100)
		await cell.selectText()
		await page.keyboard.type('edited')

		await expect(cell).toContainText('edited')
	})

	test('prevents editing when readonly', async ({ page }) => {
		await page.evaluate(async () => {
			const container = document.createElement('div')
			container.id = 'test-readonly'
			document.body.appendChild(container)

			// @ts-expect-error - OCA.Text is a global
			await window.OCA.Text.createTable({
				el: container,
				content: '| A |\n|---|---|\n| 1 |',
				readOnly: true,
			})
		})

		const editable = page.locator('#test-readonly [contenteditable]').first()
		await expect(editable).toHaveAttribute('contenteditable', 'false')
	})
})
