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

test('Editor container grows vertically', async ({ editor }) => {
	await expect(editor.menubar).toBeVisible()
	await expect(editor.content).toBeVisible()

	const editorBox = (await editor.el.boundingBox())!
	const menubarBox = (await editor.menubar.boundingBox())!
	const contentBox = (await editor.content.boundingBox())!
	const suggestionsContainerBox =
		(await editor.suggestionsContainer.boundingBox())!

	const expectedContentHeight =
		editorBox.height - menubarBox.height - suggestionsContainerBox.height

	// Allow up to 2px tolerance for borders etc.
	expect(Math.abs(expectedContentHeight - contentBox.height)).toBeLessThan(2)
})
