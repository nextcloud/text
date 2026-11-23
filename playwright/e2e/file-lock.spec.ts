/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User } from '../support/fixtures/User.ts'

import { runOcc } from '@nextcloud/e2e-test-server/docker'
import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'
import { propfindFolder } from '../support/fixtures/webdav.ts'

const test = mergeTests(editorTest, uploadFileTest)

test.beforeAll(async () => {
	await runOcc(['app:enable', 'files_lock'])
})

test.afterAll(async () => {
	await runOcc(['app:disable', 'files_lock'])
})

/**
 * Get the lock editor of the file, empty if it is not locked
 *
 * @param user owning the file
 * @param name of the file
 */
async function lockEditor(user: User, name: string): Promise<string> {
	const [props] = await propfindFolder(user, `/${name}`, 0, ['nc:lock', 'nc:lock-owner-editor'])
	return props?.['nc:lock'] ? (props['nc:lock-owner-editor'] ?? '') : ''
}

test('opening a file does not lock it', async ({ user, file, open, editor }) => {
	await open()
	await expect(editor.content).toBeVisible()

	expect(await lockEditor(user, file.name)).toBe('')
})

test('editing locks the file until the editor is closed', async ({ user, file, open, editor, close }) => {
	await open()
	await editor.type('Hello world')

	await expect.poll(() => lockEditor(user, file.name)).toBe('text')
	await close()
	await expect.poll(() => lockEditor(user, file.name)).toBe('')
})

test('editing a file locked by someone else turns the editor read-only', async ({ user, file, open, editor, page }) => {
	await open()
	await expect(editor.content).toBeVisible()
	await user.request.put(`/ocs/v2.php/apps/files_lock/lock/${file.id}`, {
		headers: { 'OCS-APIRequest': 'true' },
		failOnStatusCode: true,
	})

	const readOnlySync = page.waitForResponse(async (response) => /\/session\/[^/]+\/sync$/.test(response.url())
		&& (await response.json()).readOnly === true)
	await editor.type('Hello world')
	await readOnlySync

	await expect(page.locator('.ProseMirror[contenteditable="true"]')).toHaveCount(0)
	expect(await file.getContent()).toBe('')
})
