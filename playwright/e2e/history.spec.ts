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

test.describe('Undo manager', () => {
	test('Can undo first action in empty document', async ({ editor }) => {
		await editor.type('a')
		await expect(editor.content).toContainText('a')

		const undoButton = editor.getMenu('Undo')
		await expect(undoButton).not.toBeDisabled()
		await undoButton.click()

		await expect(editor.content).not.toContainText('a')
	})
})
