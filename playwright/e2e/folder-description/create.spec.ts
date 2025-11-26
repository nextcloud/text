/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../../support/fixtures/editor'
import { test as randomUserTest } from '../../support/fixtures/random-user'

const test = mergeTests(editorTest, randomUserTest)

test('from new menu', async ({ page, editor }) => {
	await page.goto('/apps/files')
	await page.getByRole('button', { name: 'New' }).click()
	await page.getByRole('menuitem', { name: 'Add folder description' }).click()
	await editor.content.click()
	await editor.typeHeading('Hello world')
	await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
	await expect(
		page.locator('#rich-workspace .text-editor .text-editor__wrapper'),
	).toBeVisible()
	await expect(
		page
			.locator('[data-cy-files-list-row-name="Readme.md"]')
			.getByLabel('Actions'),
	).toBeVisible()
})
