/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Page, Request } from '@playwright/test'
import type { ViewerSection } from '../support/sections/ViewerSection.ts'

import { runOcc } from '@nextcloud/e2e-test-server/docker'
import { createRandomUser, login } from '@nextcloud/e2e-test-server/playwright'
import { expect, mergeTests, request } from '@playwright/test'
import { test as randomUserTest } from '../support/fixtures/random-user.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

const test = mergeTests(randomUserTest, uploadFileTest)

// Core's testing provider answers with this, then the input it got
const SUMMARY = /^This is a fake response message:/
const now = Math.floor(Date.now() / 1000)

async function providerFails(fail: boolean) {
	await runOcc(['config:app:set', 'testing', 'fail-testing-text2textchat', '--type=boolean', `--value=${fail}`])
}

// As an admin does, so the web server sees it at once
async function turnSummaries(enabled: boolean) {
	const admin = await request.newContext({
		baseURL: process.env.baseURL ?? 'http://localhost:8089/index.php/',
		extraHTTPHeaders: { 'OCS-APIRequest': 'true', Authorization: 'Basic ' + btoa('admin:admin') },
	})
	await admin.put('../ocs/v2.php/apps/text/settings/version-summaries', { data: { enabled }, failOnStatusCode: true })
	await admin.dispose()
}

async function processTasks() {
	await runOcc(['taskprocessing:worker', '--timeout=4', '--interval=1'])
}

function countSummaryRequests(page: Page) {
	const requests: string[] = []
	page.on('request', (request: Request) => {
		if (request.url().includes('/apps/text/version-summaries/')) {
			requests.push(request.method())
		}
	})
	return {
		lookups: () => requests.filter((method) => method === 'GET').length,
		starts: () => requests.filter((method) => method === 'POST').length,
	}
}

async function compareToCurrent(page: Page, viewer: ViewerSection, index = 1) {
	const versions = await viewer.openSidebarTab('Versions')
	await versions.getByRole('button').nth(index).click()
	await page.getByRole('menuitem', { name: 'Compare to current version' }).click()
	await expect(page.locator('[data-text-version-summary]')).toBeAttached()
}

const summarize = (page: Page) => page.getByRole('button', { name: 'Summarize changes' })
const summaryText = (page: Page) => page.locator('[data-text-version-summary-text]')
// Beside the button in the header, or below it where the header has no room
const disclosure = (page: Page) => page.getByText('Both complete versions are sent to the AI provider of this Nextcloud.').filter({ visible: true })
const underWay = (page: Page) => page.locator('.text-version-summary__title', { hasText: 'Summarizing changes…' })

test.beforeAll(async () => {
	// More summaries start here in an hour than the default allows
	await runOcc(['config:app:set', 'text', 'version_summaries_hourly_limit', '--type=integer', '--value=1000'])
	await runOcc(['config:app:set', 'text', 'version_summaries_user_hourly_limit', '--type=integer', '--value=1000'])
	await turnSummaries(true)
	await runOcc(['config:app:set', 'core', 'ai.taskprocessing_provider_preferences', '--value={"core:text2text:chat":"testing-text2textchat"}'])
})

test.afterAll(async () => {
	await turnSummaries(false)
	for (const key of ['version_summaries_hourly_limit', 'version_summaries_user_hourly_limit']) {
		await runOcc(['config:app:delete', 'text', key])
	}
	await runOcc(['config:app:delete', 'core', 'ai.taskprocessing_provider_preferences'])
})

test.beforeEach(async () => {
	await providerFails(false)
	await processTasks()
})

test.describe('Summaries of changes in Files', () => {
	test.use({
		fileName: 'plan.md',
		fileContent: '# Plan\n\nThe pilot runs 3 weeks.',
		oldVersions: [[{ content: '# Plan\n\nThe pilot runs 2 weeks.', mtime: now - 7200 }], { scope: 'test' }],
	})

	test('summarizes the compared versions on request, once', async ({ open, page, viewer }) => {
		const count = countSummaryRequests(page)
		await open()
		await compareToCurrent(page, viewer)
		await expect(summarize(page)).toBeEnabled()
		await expect(disclosure(page)).toBeVisible()
		// Opening asks once and starts nothing
		expect([count.lookups(), count.starts()]).toEqual([1, 0])

		await summarize(page).click()
		await expect(underWay(page)).toBeVisible()
		await expect(summarize(page)).toHaveCount(0)
		await processTasks()
		await expect(summaryText(page)).toHaveText(SUMMARY)
		await expect(page.getByText('AI-generated, may omit or misstate changes')).toBeVisible()
		expect(count.starts()).toBe(1)

		// Switching the view and the filter asks for nothing
		const lookups = count.lookups()
		await page.keyboard.press('d')
		await expect(summaryText(page)).toHaveText(SUMMARY)
		await page.keyboard.press('d')
		await expect(summaryText(page)).toHaveText(SUMMARY)
		await page.waitForTimeout(500)
		expect([count.lookups(), count.starts()]).toEqual([lookups, 1])
	})

	test('collapses the summary and copies it with its label', async ({ open, page, viewer }) => {
		await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
		await open()
		await compareToCurrent(page, viewer)
		await summarize(page).click()
		await processTasks()
		await expect(summaryText(page)).toHaveText(SUMMARY)

		await page.getByRole('button', { name: 'Copy summary' }).click()
		await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible()
		const copied = await page.evaluate(() => navigator.clipboard.readText())
		expect(copied).toMatch(/^AI summary of changes in plan\.md, From .* to the current version \(.*\) \(AI-generated, may omit or misstate changes\):\n\nThis is a fake response message/)

		const toggle = page.locator('.text-version-summary__actions button[aria-expanded]')
		await toggle.focus()
		await page.keyboard.press('Enter')
		await expect(toggle).toHaveAttribute('aria-expanded', 'false')
		await expect(summaryText(page)).toBeHidden()
		await page.keyboard.press('Space')
		await expect(toggle).toHaveAttribute('aria-expanded', 'true')
	})

	test('keeps a summary under way when the comparison closes and opens again', async ({ open, page, viewer }) => {
		const count = countSummaryRequests(page)
		await open()
		await compareToCurrent(page, viewer)
		await summarize(page).click()
		await expect(underWay(page)).toBeVisible()
		await page.locator('.viewer__comparison').locator('xpath=ancestor::*[@role="dialog"][1]').getByRole('button', { name: 'Close', exact: true }).first().click()

		await page.reload()
		await open()
		await compareToCurrent(page, viewer)
		await expect(underWay(page)).toBeVisible()
		await processTasks()
		await expect(summaryText(page)).toHaveText(SUMMARY)
		expect(count.starts()).toBe(1)
	})

	test('says what failed, and tries again on request', async ({ open, page, viewer }) => {
		await providerFails(true)
		await open()
		await compareToCurrent(page, viewer)
		await summarize(page).click()
		await processTasks()
		await expect(page.locator('.text-version-summary__note')).toContainText('The summary could not be created.')
		const tryAgain = page.getByRole('button', { name: 'Try again' })
		await expect(tryAgain).toBeFocused()

		await providerFails(false)
		await tryAgain.click()
		await processTasks()
		await expect(summaryText(page)).toHaveText(SUMMARY)
	})

	test('refuses texts that changed after the comparison opened, and reloads them', async ({ open, page, user, viewer }) => {
		await open()
		await compareToCurrent(page, viewer)
		await user.uploadFile({ name: 'plan.md', content: '# Plan\n\nThe pilot runs 4 weeks.', mtime: now + 10 })

		await summarize(page).click()
		await expect(page.locator('.text-version-summary__note')).toContainText('This file changed after you opened the comparison.')
		await page.getByRole('button', { name: 'Reload comparison' }).click()
		await expect(page.getByRole('article', { name: 'After' }).getByText('4 weeks')).toBeVisible()
		await expect(summarize(page)).toBeEnabled()
	})

	test('shows a stored summary to everyone who can open both versions, at once', async ({ browser, baseURL, open, page, viewer }) => {
		await open()
		await compareToCurrent(page, viewer)
		await summarize(page).click()
		await processTasks()
		await expect(summaryText(page)).toHaveText(SUMMARY)

		const reader = await createRandomUser()
		await page.request.post('/ocs/v2.php/apps/files_sharing/api/v1/shares', {
			data: { path: '/plan.md', shareType: 0, shareWith: reader.userId, permissions: 1 },
			headers: { Accept: 'application/json', 'OCS-APIRequest': 'true' },
			failOnStatusCode: true,
		})
		const readerPage = await browser.newPage({ storageState: undefined, baseURL })
		await login(readerPage.request, reader)
		const count = countSummaryRequests(readerPage)
		await readerPage.goto('apps/files')
		await readerPage.locator('[data-cy-files-list-row-name="plan.md"]').click({ button: 'right' })
		await readerPage.getByRole('menuitem', { name: 'Details' }).click()
		await readerPage.getByRole('tab', { name: 'Versions' }).click()
		await readerPage.getByRole('tabpanel', { name: 'Versions' }).getByRole('button').nth(1).click()
		await readerPage.getByRole('menuitem', { name: 'Compare to current version' }).click()

		await expect(summaryText(readerPage)).toHaveText(SUMMARY)
		expect([count.lookups(), count.starts()]).toEqual([1, 0])
		await readerPage.close()
	})
})

test.describe('A file written by another app', () => {
	test.use({
		fileName: 'elsewhere.md',
		// Text saves it without the final line break when its editor closes
		fileContent: '# Plan\n\nThe pilot runs 3 weeks.\n',
		oldVersions: [[{ content: '# Plan\n\nThe pilot runs 2 weeks.\n', mtime: now - 7200 }], { scope: 'test' }],
	})

	test('compares the file as the closing editor saved it', async ({ open, page, viewer }) => {
		await open()
		await expect(viewer.el.locator('.ProseMirror')).toContainText('The pilot runs 3 weeks')
		await compareToCurrent(page, viewer)

		await expect(summarize(page)).toBeEnabled()
		await expect(page.getByText('This file changed after you opened the comparison.')).toHaveCount(0)
	})
})

test.describe('Versions that look the same', () => {
	test.use({
		fileName: 'spacing.md',
		fileContent: '# Plan\n\nThe pilot runs 3 weeks.',
		oldVersions: [[{ content: '# Plan\n\n\nThe pilot runs 3 weeks.\n', mtime: now - 7200 }], { scope: 'test' }],
	})

	test('offers no summary', async ({ open, page, viewer }) => {
		await open()
		await compareToCurrent(page, viewer)

		await expect(page.locator('.text-version-summary__start-note')).toHaveText('The two versions look the same. Only their Markdown source differs.')
		await expect(summarize(page)).toHaveCount(0)
	})
})

test.describe('Summaries of each step', () => {
	test.use({
		fileName: 'steps.md',
		fileContent: '# Plan\n\nThe pilot runs 4 weeks.',
		oldVersions: [[
			{ content: '# Plan\n\nThe pilot runs 2 weeks.', mtime: now - 7200 },
			{ content: '# Plan\n\nThe pilot runs 3 weeks.', mtime: now - 1800 },
		], { scope: 'test' }],
	})

	test('summarizes another pair after changing an end', async ({ open, page, viewer }) => {
		const count = countSummaryRequests(page)
		await open()
		await compareToCurrent(page, viewer, 2)
		await summarize(page).click()
		await processTasks()
		// Core's testing provider answers with the texts it got
		await expect(summaryText(page)).toContainText('The pilot runs 2 weeks.')

		// Changing the pair asks about the new pair and starts nothing
		await page.locator('[data-comparison-picker="from"]').getByRole('button').click()
		await page.getByRole('menuitemradio').nth(1).click()
		await expect(summarize(page)).toBeEnabled()
		expect(count.starts()).toBe(1)
		await summarize(page).click()
		await processTasks()
		await expect(summaryText(page)).toContainText('The pilot runs 3 weeks.')
		await expect(summaryText(page)).not.toContainText('The pilot runs 2 weeks.')
		expect(count.starts()).toBe(2)
	})

	test('summarizes the recent changes from the Files sidebar', async ({ open, page, viewer }) => {
		const count = countSummaryRequests(page)
		await open()
		await viewer.openSidebarTab('Versions')
		await page.locator('.app-sidebar-header').getByRole('button', { name: 'Actions' }).click()
		await page.getByRole('menuitem', { name: 'Summarize recent changes' }).click()

		// From the newest version at least an hour older: the one of two hours ago
		await expect(page.locator('[data-comparison-select]')).toHaveCount(1)
		await expect(page.locator('[data-comparison-select] del')).toHaveText('2')
		await expect(page.locator('[data-comparison-picker="from"]')).toBeVisible()
		// Nothing is sent before the user saw what is sent
		await expect(disclosure(page)).toBeVisible()
		expect(count.starts()).toBe(0)
		await summarize(page).click()
		await processTasks()
		await expect(summaryText(page)).toHaveText(SUMMARY)
		expect(count.starts()).toBe(1)
	})
})

test.describe('A file without older versions', () => {
	test.use({ fileName: 'new.md', fileContent: '# New' })

	test('says there is nothing to summarize yet', async ({ open, page, viewer }) => {
		await open()
		await viewer.openSidebarTab('Versions')
		await page.locator('.app-sidebar-header').getByRole('button', { name: 'Actions' }).click()
		await page.getByRole('menuitem', { name: 'Summarize recent changes' }).click()

		await expect(page.getByText('This file has no earlier versions yet.').first()).toBeVisible()
	})
})

test.describe('On a phone', () => {
	test.use({
		viewport: { width: 390, height: 844 },
		fileName: 'phone.md',
		fileContent: '# Plan\n\nThe pilot runs 3 weeks.',
		oldVersions: [[{ content: '# Plan\n\nThe pilot runs 2 weeks.', mtime: now - 7200 }], { scope: 'test' }],
	})

	test('summarizes the recent changes from the Files sidebar', async ({ file, page }) => {
		await page.goto('apps/files')
		await page.locator(`[data-cy-files-list-row-name="${file.name}"]`).getByRole('button', { name: 'Actions' }).click()
		await page.getByRole('menuitem', { name: 'Details' }).click()
		await page.locator('.app-sidebar-header').getByRole('button', { name: 'Actions' }).click()
		await page.getByRole('menuitem', { name: 'Summarize recent changes' }).click()

		await expect(page.locator('[data-comparison-picker]')).toHaveCount(2)
		await summarize(page).click()
		await processTasks()
		await expect(summaryText(page)).toHaveText(SUMMARY)
		await expect(summaryText(page)).toBeInViewport()
	})
})

test.describe('Without a chat provider', () => {
	test.use({
		fileName: 'plan.md',
		fileContent: '# Plan\n\nThe pilot runs 3 weeks.',
		oldVersions: [[{ content: '# Plan\n\nThe pilot runs 2 weeks.', mtime: now - 7200 }], { scope: 'test' }],
	})
	test.afterEach(async () => {
		await runOcc(['app:enable', 'testing'])
	})

	test('says why summaries cannot be made', async ({ open, page, viewer }) => {
		await runOcc(['app:disable', 'testing'])
		await open()
		await compareToCurrent(page, viewer)
		await expect(summarize(page)).toBeDisabled()
		await expect(page.locator('.text-version-summary__start-note')).toHaveText('Summaries are not available: no AI provider is set up. Ask your administrator.')
	})
})

test.describe('With summaries turned off', () => {
	test.use({
		fileName: 'off.md',
		fileContent: '# Plan\n\nThe pilot runs 3 weeks.',
		oldVersions: [[{ content: '# Plan\n\nThe pilot runs 2 weeks.', mtime: now - 7200 }], { scope: 'test' }],
	})

	test.afterEach(async () => {
		await turnSummaries(true)
	})

	test('loads and asks for nothing', async ({ open, page, viewer }) => {
		await turnSummaries(false)
		const loaded: string[] = []
		page.on('request', (request) => loaded.push(request.url()))
		await open()
		const versions = await viewer.openSidebarTab('Versions')
		await versions.getByRole('button').nth(1).click()
		await page.getByRole('menuitem', { name: 'Compare to current version' }).click()
		await expect(page.getByRole('article', { name: 'After' })).toBeVisible()

		expect(loaded.filter((url) => url.includes('VersionSummary') || url.includes('version-summaries')).map((url) => url.split('/').pop())).toEqual([])
		await expect(page.locator('[data-text-version-summary]')).toHaveCount(0)
		await page.locator('.app-sidebar-header').getByRole('button', { name: 'Actions' }).click()
		await expect(page.getByRole('menuitem', { name: 'Summarize recent changes' })).toHaveCount(0)
	})
})
