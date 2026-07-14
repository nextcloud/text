/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

const test = mergeTests(editorTest, uploadFileTest)

test.describe('Tab navigation inside table cell', () => {
	test('indents list item inside table cell', async ({ editor, open }) => {
		await open()
		await editor.getMenu('Table').click()

		const firstCell = editor.content.locator('table td').first()
		await firstCell.click()
		await editor.type('- one')
		await editor.content.press('Enter')
		await editor.type('two')

		await editor.content.press('Tab')

		const nested = firstCell.locator('ul > li').first().locator('ul > li')
		await expect(nested).toHaveText('two')

		await editor.content.press('Shift+Tab')
		await expect(firstCell.locator('> ul > li')).toHaveCount(2)
		await expect(firstCell.locator('> ul > li > ul')).toHaveCount(0)
	})

	test('navigates cells when caret is not inside a list', async ({
		editor,
		open,
	}) => {
		await open()
		await editor.getMenu('Table').click()

		const header = editor.content.locator('table th').first()
		await header.click()
		await editor.type('h1')
		await editor.content.press('Tab')
		await editor.type('h2')

		const headers = editor.content.locator('table th')
		await expect(headers.nth(0)).toContainText('h1')
		await expect(headers.nth(0)).toContainText('h1')
	})
})
