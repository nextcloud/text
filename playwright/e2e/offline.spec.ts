/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as offlineTest } from '../support/fixtures/offline'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, offlineTest, uploadFileTest)

// As we switch on and off the network
// we cannot run tests in parallel.
test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ open }) => {
	await open()
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
	const linkToFile = editor.getMenuItem('Link to file or folder')
	await editor.withOpenMenu('Insert link', () => expect(linkToFile).toBeEnabled())
	await expect(editor.getMenu('Insert attachment')).toBeEnabled()

	await setOffline()

	await editor.withOpenMenu('Insert link', () => expect(linkToFile).toBeDisabled())
	await expect(editor.getMenu('Insert attachment')).toBeDisabled()
})

test('typing offline and coming back online', async ({
	editor,
	setOffline,
	setOnline,
}) => {
	await expect(editor.el).toBeVisible()
	await setOffline()
	await editor.typeHeading('Hello world')
	await setOnline()
	await expect(editor.offlineState).not.toBeVisible()
	await expect(editor.saveIndicator).toHaveAttribute('title', /Unsaved changes/)
})
