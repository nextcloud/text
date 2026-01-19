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

test('saves after 30 seconds', async ({ editor, page }) => {
	await page.clock.install()
	await expect(editor.el).toBeVisible()
	await editor.typeHeading('Hello world')
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	await page.clock.fastForward(30_000)
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
	// TODO: Why does this not work? await expect(await file.getContent()).toBe('## Hello world')
})

test('saves after being disconnected for 20 sec.', async ({
	editor,
	page,
	setOffline,
	setOnline,
}) => {
	await page.clock.install()
	await expect(editor.el).toBeVisible()
	await editor.typeHeading('Hello world')
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	setOffline()
	await page.clock.fastForward(20_000)
	setOnline()
	await page.clock.fastForward(20_000)
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
	// TODO: Why does this not work? await expect(await file.getContent()).toBe('## Hello world')
})

test('saves after being disconnected for 2 minutes', async ({
	editor,
	page,
	setOffline,
	setOnline,
}) => {
	await page.clock.install()
	await expect(editor.el).toBeVisible()
	await editor.typeHeading('Hello world')
	await expect(editor.saveIndicator).toHaveAccessibleName(/Unsaved changes/)
	setOffline()
	await page.clock.fastForward(120_000)
	setOnline()
	await page.clock.fastForward(40_000)
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
	// TODO: Why does this not work? await expect(await file.getContent()).toBe('## Hello world')
})
