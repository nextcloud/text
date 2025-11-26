/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as folderDescriptionTest } from '../support/fixtures/folder-description'
import { test as sharedFileTest } from '../support/fixtures/shared-file'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const fileTest = mergeTests(editorTest, uploadFileTest)
const shareTest = mergeTests(editorTest, sharedFileTest)
const descriptionTest = mergeTests(editorTest, folderDescriptionTest)

new Map([
	['Own file', fileTest],
	['Shared file', shareTest],
	['Folder description', descriptionTest],
]).forEach((test, name) => {
	test.describe(name, () => {
		test('formats text', async ({ editor, open }) => {
			await open()
			const buttons = {
				Bold: 'strong',
				Italic: 'em',
				Underline: 'u',
				Strikethrough: 's',
			}
			await editor.type('Format me')
			for (const [button] of Object.entries(buttons)) {
				await expect(editor.getMenu(button)).not.toHaveClass('active')
			}
			await editor.content.press('Control+a')
			for (const [button, tag] of Object.entries(buttons)) {
				await editor.getMenu(button).click()
				await expect(editor.el.locator(tag)).toContainText('Format me')
				await editor.getMenu(button).click()
				await expect(editor.el.locator(tag)).not.toBeVisible()
			}
		})
	})
})
