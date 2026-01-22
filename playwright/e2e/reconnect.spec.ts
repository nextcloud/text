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

test('opening a file with unsaved changes', async ({
	editor,
	file,
	open,
	close,
	setOffline,
	setOnline,
}) => {
	await expect(editor.el).toBeVisible()
	await setOffline()
	await editor.typeHeading('Hello world')
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	await close()
	await setOnline()
	await expect(await file.getContent()).toBe('')
	await open()
	await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
	await expect(await file.getContent()).toBe('## Hello world')
})
