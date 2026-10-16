/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as directEditFileTest } from '../support/fixtures/direct-edit-file.ts'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as randomUserTest } from '../support/fixtures/random-user.ts'

const test = mergeTests(editorTest, randomUserTest, directEditFileTest)

test.use({
	fileName: 'initial.md',
	fileContent: '# Initial File',
})

test.describe('Direct editing', () => {
	test('opens once', async ({ editor, open }) => {
		await open()
		await expect(editor.getHeading({ name: 'Initial File' })).toBeVisible()
	})

	test('opens next file', async ({ editor, open, owner, page }) => {
		const secondFile = await owner.uploadFile({ name: 'second.md', content: '# Second file' })
		const { url } = await secondFile.createDirectEditingLink()
		await open()
		await expect(editor.getHeading({ name: 'Initial File' })).toBeVisible()
		await page.evaluate((url) => {
			window.OCA.Text.openDirectEditing(url)
		}, url)
		await expect(editor.getHeading({ name: 'Second File' })).toBeVisible()
	})
})
