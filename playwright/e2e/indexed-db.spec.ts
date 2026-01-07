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

test.beforeEach(async ({ open }) => {
	await open()
})

test('recovering from indexed db', async ({
	close,
	editor,
	file,
	setOffline,
	setOnline,
}) => {
	await expect(editor.el).toBeVisible()
	await setOffline()
	await editor.typeHeading('Hello world')
	await close()
	await setOnline()
	await file.open()
	await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
	await expect(editor.offlineState).not.toBeVisible()
	await expect(editor.saveIndicator).toHaveAttribute('title', /Unsaved changes/)
})

test('conflict when recovering from indexed db', async ({
	close,
	editor,
	file,
	reader,
	setOffline,
	setOnline,
	user,
}) => {
	await expect(editor.el).toBeVisible()
	await setOffline()
	await editor.typeHeading('Hello world')
	await close()
	await setOnline()
	await user.uploadFile({ name: file.name, content: '## Good bye' })
	await file.open()
	await expect(editor.getHeading({ name: 'Good bye' })).toBeVisible()
	await expect(reader.getHeading({ name: 'Hello world' })).toBeVisible()
	await expect(editor.offlineState).not.toBeVisible()
})
