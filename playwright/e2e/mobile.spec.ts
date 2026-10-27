/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { devices, expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

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
		await page.setViewportSize({ width: 240, height: 640 })
	})

	test('Insert emoji', async ({ editor }) => {
		await editor.clickMenu('Remain', 'Insert emoji')
		const picker = editor.el.getByRole('dialog', { name: 'Emoji picker' })
		await expect(picker).toBeVisible()
		const search = picker.getByRole('textbox', { name: 'Search' })
		await search.fill('cat')
		await picker.getByLabel('🐱, cat').click()
		await expect(editor.content).toContainText('🐱')
		await expect(editor.content).not.toContainText('undefined')
	})

	test('Insert attachment', async ({ editor }) => {
		await editor.clickMenu('Remain', 'Insert attachment')
		await expect(editor.getMenuItem('Upload from computer')).toBeVisible()
		await expect(editor.getMenuItem('Insert from Files')).toBeVisible()
	})

	test('Insert link', async ({ editor }) => {
		await editor.getMenu('Remain').click()
		// Insert link toggles with the link mark, so depending on the version of
		// @nextcloud/vue it is rendered as a checkbox
		await editor
			.getMenuItem('Insert link')
			.or(editor.el.getByRole('menuitemcheckbox', { name: 'Insert link' }))
			.click()
		await expect(editor.getMenuItem('Link to website')).toBeVisible()
	})
})
