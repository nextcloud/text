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

test.describe('Changing mimetype from/to markdown resets document session', () => {
	test('Rename from md to txt', async ({ editor, file }) => {
		await editor.typeHeading('Hello world')
		await file.close()
		await file.move('test1.txt')
		await file.open()
		await expect(editor.contentLocator).toHaveText('## Hello world')
		await expect(editor.getHeading()).not.toBeVisible()
	})
})
