/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(randomUserTest, uploadFileTest)

test.beforeEach(async ({ page, file }) => {
	await page.goto(`f/${file.fileId}`)
})

test.describe('Changing mimetype from/to markdown resets document session', () => {
	test('Rename from md to txt', async ({ page, file, requestToken }) => {
		await page.getByRole('textbox').pressSequentially('## Hello world')
		await expect(page.getByRole('heading', { name: 'Hello world' }))
			.toBeVisible()
		await page.getByRole('button', { name: 'Close', exact: true }).click()
		await expect(page.getByRole('button', { name: 'Close', exact: true }))
			.not.toBeVisible()
		const destinationPath = 'test1.txt'
		await page.request.fetch(
			`/remote.php/webdav/${file.fileName}`,
			{
			headers: {
				Destination: `/remote.php/webdav/${destinationPath}`,
				'requesttoken': requestToken,
			},
			method: 'MOVE',
		})
		await page.goto(`f/${file.fileId}`)
		await expect(page.getByRole('textbox'))
			.toBeVisible()
		await expect(page.getByText('## Hello world'))
			.toBeVisible()

	})
})
