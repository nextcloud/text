/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, randomUserTest, uploadFileTest)

test.beforeEach(async ({ file }) => {
	await file.open()
})

test.describe('Changing mimetype from markdown to plaintext', () => {
	test('resets the document session and indexed db', async ({ editor, file }) => {
		await editor.typeHeading('Hello world')
		await file.close()
		await file.move('test.txt')
		await file.open()
		await expect(editor.content).toHaveText('## Hello world')
		await expect(editor.getHeading()).not.toBeVisible()
	})
})

test.describe('Changing mimetype from plain to markdown', () => {
	test.use({ fileName: 'empty.txt' })

	test('resets the document session and indexed db', async ({ editor, file }) => {
		await editor.type('## Hello world')
		await expect(editor.content).toHaveText('## Hello world')
		await file.close()
		await file.move('test.md')
		await file.open()
		await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
	})
})
