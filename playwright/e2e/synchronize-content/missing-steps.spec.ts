/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Page, Request } from '@playwright/test'

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../../support/fixtures/editor.ts'
import { Node } from '../../support/fixtures/Node.ts'
import { newUserPage } from '../../support/fixtures/random-user.ts'
import { test as uploadFileTest } from '../../support/fixtures/upload-file.ts'
import { EditorSection } from '../../support/sections/EditorSection.ts'

const test = mergeTests(editorTest, uploadFileTest)

const SESSION_REQUESTS = /\/apps\/text\/session\/\d+\/(sync|push)$/

/**
 * Whether a request asks the server for the document state to recover from missing steps.
 *
 * @param request sent by the editor
 */
function isRecovery(request: Request): boolean {
	return Boolean(request.postDataJSON()?.recoveryAttempt)
}

/**
 * Hold back the sync and push requests of a page, like for a laptop that is suspended.
 * Once resumed, leave out the older half of the steps it missed
 * like a server that removed them in the meantime.
 *
 * @param page to suspend
 * @return function to resume the page and the number of steps left out so far
 */
async function suspendAndDropSteps(page: Page) {
	let resume = () => {}
	const resumed = new Promise<void>((resolve) => {
		resume = resolve
	})
	let dropUpTo: number | undefined
	let dropped = 0
	await page.route(SESSION_REQUESTS, async (route) => {
		await resumed
		const response = await route.fetch()
		const json = await response.json().catch(() => undefined)
		const steps: { version: number }[] | undefined = json?.steps
		if (!steps?.length || isRecovery(route.request())) {
			await route.fulfill({ response })
			return
		}
		dropUpTo ??= steps[Math.floor(steps.length / 2) - 1]?.version
		const kept = steps.filter((step) => dropUpTo === undefined || step.version > dropUpTo)
		dropped += steps.length - kept.length
		await route.fulfill({ response, json: { ...json, steps: kept } })
	})
	return { resume, dropped: () => dropped }
}

test.beforeEach(async ({ open }) => {
	await open()
})

test('recovers missing steps from the document state', async ({
	account,
	baseURL,
	browser,
	editor,
	file,
}) => {
	await expect(editor.el).toBeVisible()
	const otherPage = await newUserPage(browser, baseURL, account)
	const other = new EditorSection(otherPage)
	await new Node({ id: file.id, name: file.name, page: otherPage }).open()
	await expect(other.el).toBeVisible()

	const { resume, dropped } = await suspendAndDropSteps(otherPage)
	// Pushes are sent at most every 200ms, so every key press is a separate step.
	await editor.content.pressSequentially('abcdefghij', { delay: 300 })

	const recovery = otherPage.waitForRequest((request) => SESSION_REQUESTS.test(request.url()) && isRecovery(request))
	resume()
	await recovery
	expect(dropped()).toBeGreaterThan(0)
	await expect(other.content).toContainText('abcdefghij')

	await other.type('Back. ')
	await expect(editor.content).toContainText('Back.')
	await otherPage.close()
})
