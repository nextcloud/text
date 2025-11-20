/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'
import { createFolder } from '../support/fixtures/Node'

const test = mergeTests(editorTest, randomUserTest, uploadFileTest)

test.describe('Existing folder description', () => {
	test.use({
		fileName: 'Readme.md',
		fileContent: '# Folder description'
	})

	test.beforeEach(async ({ file, page, user }) => {
		await createFolder({ name: 'Other folder', owner: user })
		// Make sure file is initialized.
		expect(file.name).toBe('Readme.md')
		await page.goto('/apps/files')
	})

	test('Shows Readme.md', async ({ editor }) => {
		await expect(editor.getHeading({ name: 'Folder description' }))
			.toBeVisible()
	})

	test('Hides in a different folder', async ({ editor, page }) => {
		await page.getByRole('button', { name: 'Other folder' }).click()
		await expect(editor.getHeading({ name: 'Folder description' }))
			.not.toBeVisible()
	})

	test('Hides in a different view', async ({ editor, page }) => {
		await page.getByRole('link', { name: 'Recent' }).click()
		await expect(editor.getHeading({ name: 'Folder description' }))
			.not.toBeVisible()
	})
})
