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

test('changes to a file locked by someone else are kept until it is unlocked', async ({ user, file, open, editor, page, close }) => {
	test.slow()
	const lockUrl = `/ocs/v2.php/apps/files_lock/lock/${file.id}`
	const headers = { 'OCS-APIRequest': 'true' }
	const editable = page.locator('.ProseMirror[contenteditable="true"]')
	const syncResponse = (readOnly: boolean) => page.waitForResponse(async (response) => /\/session\/[^/]+\/sync$/.test(response.url())
		&& (await response.json()).readOnly === readOnly, { timeout: 40_000 })
	await open()
	await expect(editor.content).toBeVisible()
	await user.request.put(lockUrl, { headers, failOnStatusCode: true })

	await editor.type('Hello world')

	await expect(page.getByText(/currently locked by/)).toBeVisible()
	await expect(editable).toHaveCount(0)
	expect(await file.getContent()).toBe('')

	const writable = syncResponse(false)
	await user.request.delete(lockUrl, { headers, failOnStatusCode: true })
	await writable
	await expect(page.getByText(/currently locked by/)).not.toBeVisible()
	await expect(editable).toHaveCount(1)
	await close()
	await expect.poll(() => file.getContent()).toContain('Hello world')
})

test('the only editor can delete the file from the viewer', async ({ user, file, open, editor, viewer, page }) => {
	// Pushes still in flight while the file is deleted may fail, saving to the removed session must not
	const failedSaves: string[] = []
	page.on('response', (response) => {
		if (/\/session\/[^/]+\/save$/.test(response.url()) && response.status() >= 400) {
			failedSaves.push(`${response.status()} ${response.url()}`)
		}
	})
	await open()
	await editor.type('Hello world')
	await expect.poll(() => lockEditor(user, file.name)).toBe('text')

	const deleted = page.waitForResponse((response) => response.request().method() === 'DELETE')
	await viewer.clickAction('Delete')

	expect((await deleted).status()).toBe(204)
	await expect(viewer.el).not.toBeVisible()
	await page.waitForLoadState('networkidle')
	expect(failedSaves).toEqual([])
	await expect(page.getByText('Editing session has expired')).not.toBeVisible()
})

test('the only editor can rename the file while editing it', async ({ user, file, open, editor, close }) => {
	await open()
	await editor.type('Hello')
	await expect.poll(() => lockEditor(user, file.name)).toBe('text')

	const moved = await user.request.fetch(`/remote.php/webdav/${file.name}`, {
		method: 'MOVE',
		headers: { Destination: '/remote.php/webdav/renamed.md' },
	})

	expect(moved.status()).toBe(201)
	await editor.type(' world')
	await expect.poll(() => lockEditor(user, 'renamed.md')).toBe('text')
	await close()
	const renamed = await user.request.get('/remote.php/webdav/renamed.md')
	expect(await renamed.text()).toBe('Hello world')
})

test('a move that fails keeps the file locked', async ({ user, file, open, editor }) => {
	await open()
	await editor.type('Hello')
	await expect.poll(() => lockEditor(user, file.name)).toBe('text')
	await user.request.put('/remote.php/webdav/existing.md', { data: 'Existing' })

	const moved = await user.request.fetch(`/remote.php/webdav/${file.name}`, {
		method: 'MOVE',
		headers: { Destination: '/remote.php/webdav/existing.md', Overwrite: 'F' },
	})

	expect(moved.status()).toBe(412)
	expect(await lockEditor(user, file.name)).toBe('text')
})

test('moving the file from the viewer keeps the changes', async ({ user, file, open, editor, viewer, page }) => {
	await user.request.fetch('/remote.php/webdav/folder', { method: 'MKCOL' })
	await open()
	await editor.type('Hello')
	await expect.poll(() => lockEditor(user, file.name)).toBe('text')
	await editor.type(' world')

	const moved = page.waitForResponse((response) => response.request().method() === 'MOVE')
	const closed = page.waitForResponse(/\/session\/[^/]+\/close$/)
	await viewer.clickAction('Move or copy')
	const picker = page.getByRole('dialog', { name: 'Choose destination' })
	await picker.getByRole('row', { name: /^folder/ }).click()
	await picker.getByRole('button', { name: 'Move to folder' }).click()

	expect((await moved).status()).toBe(201)
	expect((await closed).status()).toBe(200)
	const content = await user.request.get(`/remote.php/webdav/folder/${file.name}`)
	expect(await content.text()).toBe('Hello world')
})
