/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Route } from '@playwright/test'

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../../support/fixtures/upload-file.ts'

const test = mergeTests(editorTest, uploadFileTest)

const PUSH = /\/apps\/text\/session\/\d+\/push$/
const SESSION_REQUESTS = /\/apps\/text\/session\/\d+\/(sync|push)$/

test.beforeEach(async ({ open }) => {
	await open()
})

test('stays read-only when the session is rejected after a connection issue', async ({
	editor,
	page,
}) => {
	test.slow()
	await page.clock.install()
	const status = page.locator('.document-status')
	const content = editor.el.locator('.ProseMirror')
	await expect(content).toHaveAttribute('contenteditable', 'true')

	// One handler for the whole test, so no request slips through while switching.
	let network: 'online' | 'offline' | 'rejected' = 'online'
	let releaseSyncs = () => {}
	const syncsReleased = new Promise<void>((resolve) => {
		releaseSyncs = resolve
	})
	await page.route(SESSION_REQUESTS, async (route: Route) => {
		if (network === 'online') {
			return route.continue()
		}
		if (network === 'offline') {
			return route.abort('internetdisconnected')
		}
		if (PUSH.test(route.request().url())) {
			// Answer like SessionMiddleware does for a session it no longer knows.
			return route.fulfill({ status: 403, contentType: 'application/json', body: '[]' })
		}
		// Hold the syncs so that only the rejected push changes the state.
		await syncsReleased
		return route.abort('internetdisconnected')
	})

	network = 'offline'
	const failedPush = page.waitForEvent('requestfailed', (request) => PUSH.test(request.url()))
	await editor.type('Hello')
	// The connection issue only starts counting once the push failed.
	await failedPush
	const delay = await page.evaluate(() => window.OCP.InitialState.loadState('text', 'offline_readonly_delay') as number)
	await page.clock.fastForward(delay * 1000 + 1000)
	await expect(status).toContainText('The document could not be loaded.')
	await expect(content).toHaveAttribute('contenteditable', 'false')

	network = 'rejected'
	// The autosave retries the push, which is rejected.
	await page.clock.fastForward(60_000)
	await expect(status).toContainText("You've been disconnected from the server.")
	// Clearing the connection issue takes effect after 200 ms.
	await page.waitForTimeout(1000)
	await expect(content).toHaveAttribute('contenteditable', 'false')

	network = 'online'
	releaseSyncs()
	await status.getByRole('button', { name: 'Reconnect' }).click()
	await expect(status).not.toContainText("You've been disconnected from the server.")
	await expect(content).toHaveAttribute('contenteditable', 'true')
	await expect(editor.content).toContainText('Hello')
})
