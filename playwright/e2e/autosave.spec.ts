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

// Files were created 10 seconds ago so there's no throttling to begin with.
test.use({ mtime: Date.now() / 1000 - 10 })

test.beforeEach(async ({ open }) => {
	await open()
})

test('saves after 1 second', async ({ editor }) => {
	await expect(editor.el).toBeVisible()
	await editor.typeHeading('Hello world')
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
	// TODO: Why does this not work? await expect(await file.getContent()).toBe('## Hello world')
})

/*
 *  1 second autosave debounce
 * 10 seconds waiting for server to be ready again
 *  1 second for the save request
 */
test('saves again within 12 seconds', async ({ editor }) => {
	test.slow()
	await expect(editor.el).toBeVisible()
	await editor.typeHeading('Hello')
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
	await editor.type(' again')
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/, { timeout: 12_000 })
})

test('saves after being disconnected for 5 sec.', async ({
	editor,
	setOffline,
	setOnline,
}) => {
	await expect(editor.el).toBeVisible()
	await editor.typeHeading('Hello')
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
	await editor.type(' again')
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	await setOffline()
	await new Promise((resolve) => setTimeout(resolve, 5_000))
	await setOnline()
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/, { timeout: 10_000 })
})

test('saves after being disconnected for 2 minutes.', async ({
	editor,
	page,
	setOffline,
	setOnline,
}) => {
	await page.clock.install()
	await expect(editor.el).toBeVisible()
	await editor.typeHeading('Hello')
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
	await editor.type(' again')
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	await setOffline()
	await new Promise((resolve) => setTimeout(resolve, 5_000))
	await page.clock.fastForward(110_000)
	await setOnline()
	await new Promise((resolve) => setTimeout(resolve, 5_000))
	await page.clock.fastForward(5_000)
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
})
