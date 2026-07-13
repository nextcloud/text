/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

const test = mergeTests(editorTest, uploadFileTest)

test('inserts and removes details', async ({ editor, open }) => {
	await open()
	await editor.type('content')
	await editor.content.press('ControlOrMeta+a')

	await editor.clickMenu('Blocks', 'Details')
	await expect(editor.details).toBeVisible()

	await editor.type('summary')
	await expect(editor.details.locator('summary')).toContainText('summary')
	await expect(editor.details.locator('.details-content')).toContainText('content')

	await editor.clickMenu('Blocks', 'Details')
	await expect(editor.details).not.toBeVisible()
	await expect(editor.content).toContainText('content')
})
