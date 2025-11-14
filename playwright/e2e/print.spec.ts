/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { loadFixture } from '../support/fixtures/loadFixture'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as sharedFileTest } from '../support/fixtures/shared-file'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const fileTest = mergeTests(editorTest, randomUserTest, uploadFileTest)
const shareTest = mergeTests(editorTest, randomUserTest, sharedFileTest)

new Map([
	['Own file', fileTest],
	['Shared file', shareTest],
]).forEach((test, name) => {
	test.use({ fileContent: loadFixture('print.md') })
	test(name, async ({ open, page }) => {
		await open()
		await page.emulateMedia({ media: 'print' })
		await expect(page).toHaveScreenshot({ fullPage: true })
	})
})
