/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { test } from '../support/fixtures/random-user'

test.describe('createTable API', () => {
	const containerId = 'test-table'

	const createTable = async (
		page: Page,
		options: { content: string, readOnly: boolean },
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
				await window.OCA.Text.createTable({
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

	test('renders table editor', async ({ page }) => {
		await createTable(page, {
			content: '| A | B |\n|---|---|\n| 1 | 2 |',
			readOnly: false,
		})

		await expect(page.locator(`#${containerId} table`)).toBeVisible()
		await expect(page.locator(`#${containerId} th`).first()).toContainText('A')
		await expect(page.locator(`#${containerId} td`).first()).toContainText('1')
	})

	test('allows editing when not readonly', async ({ page }) => {
		await createTable(page, {
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

	test('prevents editing when readonly', async ({ page }) => {
		await createTable(page, {
			content: '| A |\n|---|---|\n| 1 |',
			readOnly: true,
		})

		const editable = page.locator(`#${containerId} [contenteditable]`).first()
		await expect(editable).toHaveAttribute('contenteditable', 'false')
	})
})
