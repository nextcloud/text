/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

const test = mergeTests(editorTest, uploadFileTest)

test.describe('renders footnotes', () => {
	test.use({
		fileContent: 'Foo[^bar] baz\n\n[^bar]: footnote\n',
	})

	test('shows reference and footnote from Markdown', async ({ editor, open }) => {
		await open()
		await expect(editor.getFootnoteReference('bar')).toBeVisible()
		await expect(editor.getFootnoteReference('bar').locator('a')).toHaveText('1')
		await expect(editor.getFootnote('bar')).toContainText('footnote')
	})
})

test('inserts footnote via keyboard shortcut', async ({ editor, open }) => {
	await open()
	await editor.type('Some text')
	await editor.press('ControlOrMeta+Shift+F')
	await expect(editor.getFootnoteReference('1')).toBeVisible()
	await expect(editor.getFootnote('1')).toBeVisible()

	await editor.type('footnote')
	await expect(editor.getFootnote('1')).toContainText('footnote')
})

test('inserts footnote via [^label] input rule', async ({ editor, open }) => {
	await open()
	await editor.type('hello[^bar]')
	await expect(editor.getFootnoteReference('bar')).toBeVisible()
	await expect(editor.getFootnote('bar')).toBeVisible()
})
