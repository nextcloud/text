/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { devices, expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, randomUserTest, uploadFileTest)

test.use({
	...devices['Moto G4'],
})

test.beforeEach(async ({ file }) => {
	await file.open()
})

test('Formatting help', async ({ editor }) => {
	await editor.clickMenu('remain', 'formatting-help')
	await expect(editor.formattingHelp).toBeVisible()
	await editor.formattingHelp.getByLabel('Close').click()
	await expect(editor.formattingHelp).not.toBeVisible()
})
