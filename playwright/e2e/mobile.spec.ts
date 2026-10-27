/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { devices, expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

const test = mergeTests(editorTest, uploadFileTest)

test.use({
	...devices['Moto G4'],
})

test.beforeEach(async ({ open }) => {
	await open()
})

test('Formatting help', async ({ editor }) => {
	await editor.clickMenu('Remain', 'Formatting help')
	await expect(editor.formattingHelp).toBeVisible()
	await editor.formattingHelp.getByLabel('Close').click()
	await expect(editor.formattingHelp).not.toBeVisible()
})

test.describe('Actions with their own menu in remaining actions', () => {
	test.beforeEach(async ({ page }) => {
		// Narrow enough to move link, attachment and emoji into the remaining actions
		await page.setViewportSize({ width: 280, height: 640 })
	})

	test('Insert emoji', async ({ editor }) => {
		await editor.clickMenu('Remain', 'Insert emoji')
		const picker = editor.el.getByRole('dialog', { name: 'Emoji picker' })
		await expect(picker).toBeVisible()
		const search = picker.getByRole('textbox', { name: 'Search' })
		await search.fill('cat')
		await expect(picker.getByLabel('🐱, cat')).toHaveClass(/emoji-mart-emoji-selected/)
		await search.press('Enter')
		await expect(editor.content).toContainText('🐱')
		await expect(editor.content).not.toContainText('undefined')
	})

	test('Insert attachment', async ({ editor }) => {
		await editor.clickMenu('Remain', 'Insert attachment')
		await expect(editor.getMenuItem('Upload from computer')).toBeVisible()
		await expect(editor.getMenuItem('Insert from Files')).toBeVisible()
	})

	test('Insert link', async ({ editor }) => {
		await editor.clickMenu('Remain', 'Insert link')
		await expect(editor.getMenuItem('Link to website')).toBeVisible()
	})
})
