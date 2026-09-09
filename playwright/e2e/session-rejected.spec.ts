/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Route } from '@playwright/test'

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

const test = mergeTests(editorTest, uploadFileTest)

// Only sync and push are rejected. `create` stays reachable so that
// reconnecting can open a fresh session.
const SESSION_REQUESTS = /\/apps\/text\/session\/\d+\/(sync|push)$/

// The awareness heartbeat pushes every 15 seconds.
// Waiting longer than that proves that the client stopped pushing.
const HEARTBEAT_TIMEOUT = 20_000

test.beforeEach(async ({ open }) => {
	await open()
})

test('stops syncing and offers to reconnect once the session is rejected', async ({
	editor,
	page,
}) => {
	test.slow()
	await expect(editor.el).toBeVisible()
	await expect(editor.sessionList).toBeVisible()

	const status = page.locator('.document-status')
	const content = editor.el.locator('.ProseMirror')
	await expect(content).toHaveAttribute('contenteditable', 'true')

	// Answer like SessionMiddleware does for a session it no longer knows.
	let pushCount = 0
	const rejectSession = async (route: Route) => {
		if (route.request().url().endsWith('/push')) {
			pushCount++
		}
		await route.fulfill({
			status: 403,
			contentType: 'application/json',
			body: '[]',
		})
	}

	await page.route(SESSION_REQUESTS, rejectSession)

	// Typing triggers a push right away instead of waiting for the heartbeat.
	await editor.type('Hello')

	await expect(status).toContainText("You've been disconnected from the server.")
	await expect(status.getByRole('button', { name: 'Reconnect' })).toBeVisible()
	await expect(content).toHaveAttribute('contenteditable', 'false')

	const pushesUntilRejected = pushCount
	await new Promise((resolve) => setTimeout(resolve, HEARTBEAT_TIMEOUT))
	expect(pushCount).toBe(pushesUntilRejected)

	await page.unroute(SESSION_REQUESTS, rejectSession)
	const createRequest = page.waitForRequest(/\/apps\/text\/session\/\d+\/create$/)
	await status.getByRole('button', { name: 'Reconnect' }).click()
	await createRequest

	await expect(status).not.toContainText("You've been disconnected from the server.")
	await expect(editor.sessionList).toBeVisible()
	await expect(content).toHaveAttribute('contenteditable', 'true')
	await expect(editor.content).toContainText('Hello')

	await editor.press('Enter')
	await editor.typeHeading('Back again')
})
