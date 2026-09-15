/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

const test = mergeTests(editorTest, uploadFileTest)

const href = 'https://example.org/'

test.describe('links', () => {
	test.use({ fileContent: `[Example](${href})\n\nsecond paragraph\n` })

	test.beforeEach(async ({ open }) => {
		await open()
	})

	test('click opens the link', async ({ editor, page }) => {
		const popupPromise = page.waitForEvent('popup')
		await editor.content.getByRole('link', { name: 'Example' }).click()
		const popup = await popupPromise
		expect(popup.url()).toBe(href)
		await popup.close()
	})

	test('ctrl-click opens the link', async ({ editor, page }) => {
		const popupPromise = page.waitForEvent('popup')
		await editor.content.getByRole('link', { name: 'Example' })
			.click({ modifiers: ['Control'] })
		const popup = await popupPromise
		expect(popup.url()).toBe(href)
		await popup.close()
	})
})

test.describe('link bubble', () => {
	test.use({ fileContent: `[Example](${href})\n\nsecond paragraph\n` })

	test.beforeEach(async ({ open }) => {
		await open()
	})

	test('hover opens the link bubble', async ({ editor, page }) => {
		await editor.content.getByRole('link', { name: 'Example' }).hover()
		const bubble = page.locator('.link-view-bubble')
		await expect(bubble).toBeVisible()
		await expect(bubble.locator('.link-view-bubble__title')).toContainText(/example/i)
	})

	test('moving the cursor into the link opens the link bubble', async ({ editor, page }) => {
		await editor.content.getByText('second paragraph').click()
		await editor.press('Home')
		await editor.press('ArrowUp')
		await editor.press('ArrowRight')
		await expect(page.locator('.link-view-bubble')).toBeVisible()
	})

	test('pill button opens the link bubble without opening the link', async ({ editor, page }) => {
		let popups = 0
		page.on('popup', () => popups++)
		await editor.content.locator('.link-pill').click()
		await expect(page.locator('.link-view-bubble')).toBeVisible()
		expect(popups).toBe(0)
	})

	test('open button in the link bubble opens the link', async ({ editor, page }) => {
		await editor.content.locator('.link-pill').click()
		const bubble = page.locator('.link-view-bubble')
		const popupPromise = page.waitForEvent('popup')
		await bubble.getByRole('button', { name: 'Open link' }).click()
		const popup = await popupPromise
		expect(popup.url()).toBe(href)
		await popup.close()
	})

	test('edits the hovered link while the cursor is elsewhere', async ({ editor, page }) => {
		await editor.content.getByText('second paragraph').click()
		await editor.content.getByRole('link', { name: 'Example' }).hover()
		const bubble = page.locator('.link-view-bubble')
		await bubble.getByRole('button', { name: 'Edit link' }).click()
		await bubble.getByLabel('URL').fill('https://example.com/')
		await bubble.getByLabel('URL').press('Enter')
		await expect(editor.content.getByRole('link', { name: 'Example' }))
			.toHaveAttribute('href', 'https://example.com/')
		await expect(editor.content.getByRole('link')).toHaveCount(1)
	})

	test('removes the link from the bubble', async ({ editor, page }) => {
		await editor.content.locator('.link-pill').click()
		await page.locator('.link-view-bubble .link-options button').click()
		await page.getByRole('menuitem', { name: 'Remove link' }).click()
		await expect(editor.content.getByRole('link')).toHaveCount(0)
		await expect(editor.content).toContainText('Example')
	})

	test('link typed in markdown syntax gets the link bubble', async ({ editor, page }) => {
		await editor.content.getByText('second paragraph').click()
		await editor.press('End')
		await editor.press('Enter')
		await editor.type('[typed](https://example.com/)')
		const link = editor.content.getByRole('link', { name: 'typed' })
		await expect(link).toHaveAttribute('href', 'https://example.com/')
		await link.hover()
		const bubble = page.locator('.link-view-bubble')
		await expect(bubble).toBeVisible()
		await expect(bubble.locator('.link-view-bubble__title')).toContainText(/example\.com/)
	})

	test('mod-k turns the selection into a link and focuses the URL field', async ({ editor, page }) => {
		await editor.content.getByText('second paragraph').click()
		await editor.press('End')
		await editor.press('Shift+Home')
		await editor.press('Control+k')
		const bubble = page.locator('.link-view-bubble')
		await expect(bubble).toBeVisible()
		await expect(bubble.getByLabel('URL')).toBeFocused()
		await bubble.getByLabel('URL').fill('https://example.com/')
		await bubble.getByLabel('URL').press('Enter')
		await expect(editor.content.getByRole('link', { name: 'second paragraph' }))
			.toHaveAttribute('href', 'https://example.com/')
	})
})

test.describe('links with unsafe protocols', () => {
	test.use({ fileContent: '[text](other://protocol)\n' })

	test('are rendered without href', async ({ editor, open }) => {
		await open()
		await expect(editor.content.getByText('text')).toBeVisible()
		await expect(editor.content.locator('a[href*="other://"]')).toHaveCount(0)
	})
})
