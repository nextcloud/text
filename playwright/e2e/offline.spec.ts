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

// As we switch on and off the network
// we cannot run tests in parallel.
test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ file }) => {
	await file.open()
})

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
	const linkToFile = editor.getMenu('insert-link-file')
	await editor.withOpenMenu('insert-link', () => expect(linkToFile).toBeEnabled())
	await expect(editor.getMenu('insert-attachment')).toBeEnabled()

	await setOffline()

	await editor.withOpenMenu('insert-link', () => expect(linkToFile).toBeDisabled())
	await expect(editor.getMenu('insert-attachment')).toBeDisabled()
})

test('typing offline and coming back online', async ({
	editor,
	setOffline,
	setOnline,
}) => {
	await expect(editor.locator).toBeVisible()
	await setOffline()
	await editor.typeHeading('Hello world')
	await setOnline()
	await expect(editor.offlineState).not.toBeVisible()
	await expect(editor.saveIndicator).toHaveAttribute('title', /Unsaved changes/)
})
