/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, uploadFileTest)

test.beforeEach(async ({ open }) => {
	await open()
})

test.describe('Changing mimetype from markdown to plaintext', () => {
	test('resets the document session and indexed db', async ({
		editor,
		file,
		viewer,
	}) => {
		await editor.typeHeading('Hello world')
		await viewer.close()
		const plaintext = await file.move('test.txt')
		await plaintext.open()
		await expect(editor.content).toHaveText('## Hello world')
		await expect(editor.getHeading()).not.toBeVisible()
	})
})

test.describe('Changing mimetype from plain to markdown', () => {
	test.use({ fileName: 'empty.txt' })

	test('resets the document session and indexed db', async ({
		editor,
		file,
		viewer,
	}) => {
		await editor.type('## Hello world')
		await expect(editor.content).toHaveText('## Hello world')
		await viewer.close()
		const markdown = await file.move('test.md')
		await markdown.open()
		await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
	})
})
