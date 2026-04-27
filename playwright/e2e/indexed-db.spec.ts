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
	page,
	setOffline,
	setOnline,
}) => {
	await expect(editor.el).toBeVisible()
	await setOffline()
	await editor.typeHeading('Hello world')
	await close()
	await setOnline()
	const pushWithSteps = page.waitForRequest(
		(request) => {
			if (!request.url().includes('push')) {
				return false
			}
			const data = request.postDataJSON()
			return data.steps.length > 0
		},
		{ timeout: 10_000 },
	)
	await file.open()
	await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
	await expect(editor.offlineState).not.toBeVisible()
	await pushWithSteps
	await expect(editor.saveIndicator).not.toHaveAttribute(
		'title',
		/Unsaved changes/,
	)
	await expect
		.poll(() => file.getContent(), { timeout: 10_000 })
		.toBe('## Hello world')
})
