/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Browser, Page } from '@playwright/test'
import type { User } from '../support/fixtures/User.ts'

import { expect } from '@playwright/test'
import { Node } from '../support/fixtures/Node.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'
import { EditorSection } from '../support/sections/EditorSection.ts'

type MobileAppWindow = Window & {
	DirectEditingMobileInterface?: { close: () => void }
	directEditingClosed?: boolean
}

/** API of the direct editing page for mobile apps */
type DirectEditingApi = { close: () => Promise<void> }

const ocsHeaders = {
	'OCS-APIRequest': 'true',
	Accept: 'application/json',
}

class DirectEditingPage {
	readonly editor: EditorSection

	private constructor(readonly page: Page) {
		this.editor = new EditorSection(page)
	}

	/**
	 * Open a direct editing url in a fresh browser context without a user session,
	 * pretending to be the mobile app so the close button is shown.
	 *
	 * @param browser to create the context in
	 * @param url the direct editing url
	 */
	static async open(browser: Browser, url: string) {
		const context = await browser.newContext({ storageState: undefined })
		await context.addInitScript(() => {
			const win = window as MobileAppWindow
			win.DirectEditingMobileInterface = {
				close() {
					win.directEditingClosed = true
				},
			}
		})
		const page = await context.newPage()
		await page.goto(url)
		const directEditing = new DirectEditingPage(page)
		await expect(directEditing.editor.content).toBeVisible()
		return directEditing
	}

	/**
	 * Close the editor and wait until it told the mobile app it is done.
	 */
	async close() {
		await this.page.locator('button.icon-close').click()
		await this.page.waitForFunction(() => (window as MobileAppWindow).directEditingClosed)
	}

	/**
	 * Close the editor like a mobile app does from its own close button.
	 *
	 * @return whether the editor told the mobile app it is done by the time the call resolved
	 */
	async closeThroughApi() {
		return this.page.evaluate(async () => {
			const api = window.OCA.Text.DirectEditing as DirectEditingApi
			await api.close()
			return (window as MobileAppWindow).directEditingClosed === true
		})
	}
}

interface DirectEditingFixture {
	openDirectEditing: (url: string) => Promise<DirectEditingPage>
}

const test = uploadFileTest.extend<DirectEditingFixture>({
	openDirectEditing: async ({ browser }, use) => {
		const pages: Page[] = []
		await use(async (url) => {
			const directEditing = await DirectEditingPage.open(browser, url)
			pages.push(directEditing.page)
			return directEditing
		})
		for (const page of pages) {
			await page.context().close()
		}
	},
})

/**
 * Request a direct editing url for an existing file.
 *
 * @param user owning the file
 * @param path of the file
 */
async function createDirectEditingLink(user: User, path: string) {
	const response = await user.request.post('/ocs/v2.php/apps/files/api/v1/directEditing/open', {
		form: { path },
		headers: ocsHeaders,
		failOnStatusCode: true,
	})
	const { ocs } = await response.json() as { ocs: { data: { url: string } } }
	return ocs.data.url
}

/**
 * Request a direct editing url for a new file.
 *
 * @param user to create the file for
 * @param path of the new file
 */
async function createDirectEditingLinkForNewFile(user: User, path: string) {
	const response = await user.request.post('/ocs/v2.php/apps/files/api/v1/directEditing/create', {
		form: { path, editorId: 'text', creatorId: 'textdocument' },
		headers: ocsHeaders,
		failOnStatusCode: true,
	})
	const { ocs } = await response.json() as { ocs: { data: { url: string } } }
	return ocs.data.url
}

/**
 * Enter a headline and a paragraph, then close the editor.
 *
 * @param directEditing the opened direct editing page
 */
async function enterContentAndClose(directEditing: DirectEditingPage) {
	const { editor } = directEditing
	for (const line of ['# This is a headline', 'Some text']) {
		await editor.type(line)
		await editor.press('Enter')
	}
	await expect(editor.content).toContainText('Some text')
	await directEditing.close()
}

test.describe('Direct editing', () => {
	test('Open an existing file, edit it', async ({ user, file, openDirectEditing }) => {
		const url = await createDirectEditingLink(user, file.name)
		await enterContentAndClose(await openDirectEditing(url))
		await expect.poll(() => file.getContent())
			.toBe('# This is a headline\n\nSome text')
	})

	test('Create a file, edit it', async ({ user, page, openDirectEditing }) => {
		const url = await createDirectEditingLinkForNewFile(user, 'newfile.md')
		await enterContentAndClose(await openDirectEditing(url))
		const file = new Node({ id: 0, name: 'newfile.md', page })
		await expect.poll(() => file.getContent())
			.toBe('# This is a headline\n\nSome text')
	})

	test('Close through the API for mobile apps', async ({ user, file, openDirectEditing }) => {
		const url = await createDirectEditingLink(user, file.name)
		const directEditing = await openDirectEditing(url)
		await directEditing.editor.type('Some text')

		expect(await directEditing.closeThroughApi()).toBe(true)
		await expect.poll(() => file.getContent()).toBe('Some text')
	})

	test.describe('plain text', () => {
		test.use({ fileName: 'empty.txt' })

		test('Open an existing plain text file, edit it', async ({ user, file, openDirectEditing }) => {
			const url = await createDirectEditingLink(user, file.name)
			await enterContentAndClose(await openDirectEditing(url))
			await expect.poll(() => file.getContent())
				.toBe('# This is a headline\nSome text\n')
		})
	})
})

test.describe('Direct editing link of an unavailable user', () => {
	const adminHeaders = {
		...ocsHeaders,
		Authorization: `Basic ${Buffer.from('admin:admin').toString('base64')}`,
	}

	test('Cannot open as disabled user', async ({ user, file, request }) => {
		const url = await createDirectEditingLink(user, file.name)
		await request.put(`/ocs/v2.php/cloud/users/${user.account.userId}/disable`, {
			headers: adminHeaders,
			failOnStatusCode: true,
		})
		const response = await request.get(url)
		expect(response.status()).toBe(404)
	})

	test('Cannot open as deleted user', async ({ user, file, request }) => {
		const url = await createDirectEditingLink(user, file.name)
		await request.delete(`/ocs/v2.php/cloud/users/${user.account.userId}`, {
			headers: adminHeaders,
			failOnStatusCode: true,
		})
		const response = await request.get(url)
		expect(response.status()).toBe(404)
	})
})
