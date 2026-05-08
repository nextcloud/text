/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, uploadFileTest)

test('applies code mark input rule with preceding character (#5483)', async ({
	editor,
	open,
}) => {
	await open()
	await editor.type('hello inline (`code`)')
	await expect(editor.el.locator('code')).toHaveText('code')
	await expect(editor.el.locator('p').first()).toHaveText('hello inline (code)')
})
