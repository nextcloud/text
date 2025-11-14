/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'
import { loadFixture } from '../support/fixtures/loadFixture'

const test = mergeTests(editorTest, randomUserTest, uploadFileTest)

test.use({ fileContent: loadFixture('print.md') })

test('From viewer', async ({ file, page }) => {
	await file.open()
	await page.emulateMedia({ media: 'print' });
	await expect(page).toHaveScreenshot({ fullPage: true })
})
