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
	test('Rename from md to txt', async ({ editor, page, file, requestToken }) => {
		await editor.type('## Hello world')
		await expect(editor.getHeading({ name: 'Hello world' }))
			.toBeVisible()
		await page.getByRole('button', { name: 'Close', exact: true }).click()
		await expect(page.getByRole('button', { name: 'Close', exact: true }))
			.not.toBeVisible()
		const destinationPath = 'test1.txt'
		await page.request.fetch(
			`/remote.php/webdav/${file.name}`,
			{
			headers: {
				Destination: `/remote.php/webdav/${destinationPath}`,
				'requesttoken': requestToken,
			},
			method: 'MOVE',
		})
		await file.open()
		await expect(editor.contentLocator)
			.toHaveText('## Hello world')
		await expect(editor.getHeading())
			.not.toBeVisible()
	})
})
