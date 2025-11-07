/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as offlineTest } from '../support/fixtures/offline'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, offlineTest, randomUserTest, uploadFileTest)

test.beforeEach(async ({ file }) => {
	await file.open()
})

test.describe('Offline', () => {
	test('Offline state indicator', async ({ editor, setOffline }) => {
		await expect(editor.sessionList).toBeVisible()
		await expect(editor.offlineState).not.toBeVisible()

		await setOffline()

		await expect(editor.sessionList).not.toBeVisible()
		await expect(editor.offlineState).toBeVisible()
	})

	test('Disabled upload and link file when offline', async ({
		editor,
		setOffline,
	}) => {
		await editor.getMenu('insert-link').click()
		await expect(editor.getMenu('insert-link-file')).toBeEnabled()
		await editor.getMenu('insert-link').click()
		await expect(editor.getMenu('insert-attachment')).toBeEnabled()

		await setOffline()

		await editor.getMenu('insert-link').click()
		await expect(editor.getMenu('insert-link-file')).toBeDisabled()
		await editor.getMenu('insert-link').click()
		await expect(editor.getMenu('insert-attachment')).toBeDisabled()
	})
})
