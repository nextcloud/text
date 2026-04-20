/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { devices, expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, uploadFileTest)

test.use({
	...devices['Moto G4'],
})

test.beforeEach(async ({ open }) => {
	await open()
})

test('Formatting help', async ({ editor }) => {
	await editor.clickMenu('Remain', 'Formatting help')
	await expect(editor.formattingHelp).toBeVisible()
	await editor.formattingHelp.getByLabel('Close').click()
	await expect(editor.formattingHelp).not.toBeVisible()
})
