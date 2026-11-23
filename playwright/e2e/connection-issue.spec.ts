/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Request, Route } from '@playwright/test'

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, uploadFileTest)

const PUSH = /\/apps\/text\/session\/\d+\/push$/
const SESSION_REQUESTS = /\/apps\/text\/session\/\d+\/(sync|push)$/

// Files were created 10 seconds ago so there's no throttling to begin with.
test.use({ mtime: Date.now() / 1000 - 10 })

test.beforeEach(async ({ open }) => {
	await open()
})

test('becomes editable as soon as the failed push was retried', async ({
	editor,
	page,
}) => {
	test.slow()
	await page.clock.install()
	const content = editor.el.locator('.ProseMirror')
	await editor.typeHeading('Hello')
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)

	let offline = false
	await page.route(SESSION_REQUESTS, (route: Route) =>
		offline ? route.abort('internetdisconnected') : route.continue(),
	)

	offline = true
	// Without document steps, the response to the retried push has no steps
	// and therefore does not trigger another sync.
	await page.waitForEvent('requestfailed', {
		predicate: (request: Request) =>
			PUSH.test(request.url()) && !request.postDataJSON()?.steps?.length,
		timeout: 30_000,
	})
	const delay = await page.evaluate(
		() =>
			window.OCP.InitialState.loadState(
				'text',
				'offline_readonly_delay',
			) as number,
	)
	await page.clock.fastForward(delay * 1000 + 1000)
	await expect(editor.offlineState).toBeVisible()
	await expect(content).toHaveAttribute('contenteditable', 'false')

	offline = false
	// Trigger the next sync right away without firing timers like the autosave retry,
	// which would push before the sync. The sync after that is a full polling interval later.
	const now = await page.evaluate(() => Date.now())
	await page.clock.setSystemTime(now + 30_000)
	await expect(editor.offlineState).not.toBeVisible({ timeout: 3_000 })
	await expect(content).toHaveAttribute('contenteditable', 'true')
})
