/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect } from '@playwright/test'
import { createFolder, Node } from '../support/fixtures/Node.ts'
import { setAppConfig } from '../support/fixtures/settings.ts'
import { test } from '../support/fixtures/shared-file.ts'
import { EditorSection } from '../support/sections/EditorSection.ts'
import { ViewerSection } from '../support/sections/ViewerSection.ts'

const downloadDisabled = [{ scope: 'permissions', key: 'download', value: false }]

test.use({
	fileName: 'test.md',
	fileContent: '## Hello world',
})

test.describe('User share with download disabled', () => {
	test('opens the file', async ({ file, recipient }) => {
		await file.shareWithUser(recipient.account.userId, { attributes: downloadDisabled })
		const editor = new EditorSection(recipient.page)
		await new Node({ ...file, page: recipient.page }).open()
		await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
		await expect(editor.getMenu('Bold')).toBeVisible()
	})

	test('shows the folder description', async ({ owner, recipient }) => {
		const folder = await createFolder({ name: 'folder', owner })
		await owner.uploadFile({ name: 'folder/Readme.md', content: '## Folder description' })
		await folder.shareWithUser(recipient.account.userId, { attributes: downloadDisabled })
		const createResponse = recipient.page.waitForResponse(/\/apps\/text\/session\/\d+\/create$/)
		await recipient.page.goto('apps/files/files?dir=/folder')
		expect((await createResponse).status()).toBe(200)
		await expect(new EditorSection(recipient.page).getHeading({ name: 'Folder description' }))
			.toBeVisible()
	})

	test.describe('with viewing without download disallowed', () => {
		test.beforeEach(async ({ request }) => {
			await setAppConfig(request, 'core', 'shareapi_allow_view_without_download', 'no')
		})

		test.afterEach(async ({ request }) => {
			await setAppConfig(request, 'core', 'shareapi_allow_view_without_download', null)
		})

		test('shows an error', async ({ file, recipient }) => {
			await file.shareWithUser(recipient.account.userId, { attributes: downloadDisabled })
			const viewer = new ViewerSection(file.name, recipient.page)
			await new Node({ ...file, page: recipient.page }).open()
			await expect(viewer.el.getByText('This file cannot be displayed as download is disabled by the share'))
				.toBeVisible()
			await expect(new EditorSection(recipient.page).content).not.toBeVisible()
		})
	})
})

test.describe('Link share of a share with download disabled', () => {
	test('opens the file', async ({ file, page, recipient }) => {
		await file.shareWithUser(recipient.account.userId, { attributes: downloadDisabled })
		const { token } = await new Node({ ...file, page: recipient.page }).shareLink()
		await page.goto(`s/${token}`)
		await expect(new EditorSection(page).getHeading({ name: 'Hello world' })).toBeVisible()
	})

	test('shows the folder description', async ({ owner, page, recipient }) => {
		const folder = await createFolder({ name: 'folder', owner })
		await owner.uploadFile({ name: 'folder/Readme.md', content: '## Folder description' })
		await folder.shareWithUser(recipient.account.userId, { attributes: downloadDisabled })
		const { token } = await new Node({ ...folder, page: recipient.page }).shareLink()
		await page.goto(`s/${token}`)
		await expect(new EditorSection(page).getHeading({ name: 'Folder description' })).toBeVisible()
	})

	test.describe('with viewing without download disallowed', () => {
		test.beforeEach(async ({ request }) => {
			await setAppConfig(request, 'core', 'shareapi_allow_view_without_download', 'no')
		})

		test.afterEach(async ({ request }) => {
			await setAppConfig(request, 'core', 'shareapi_allow_view_without_download', null)
		})

		test('shows an error', async ({ file, page, recipient }) => {
			await file.shareWithUser(recipient.account.userId, { attributes: downloadDisabled })
			const { token } = await new Node({ ...file, page: recipient.page }).shareLink()
			const createResponse = page.waitForResponse(/\/apps\/text\/public\/session\/\d+\/create$/)
			await page.goto(`s/${token}`)
			expect((await createResponse).status()).toBe(403)
			await expect(page.getByText('This file cannot be displayed as download is disabled by the share'))
				.toBeVisible()
			await expect(new EditorSection(page).content).not.toBeVisible()
		})

		test('does not show the folder description', async ({ owner, page, recipient }) => {
			const folder = await createFolder({ name: 'folder', owner })
			await owner.uploadFile({ name: 'folder/Readme.md', content: '## Folder description' })
			await folder.shareWithUser(recipient.account.userId, { attributes: downloadDisabled })
			const { token } = await new Node({ ...folder, page: recipient.page }).shareLink()
			const createResponse = page.waitForResponse(/\/apps\/text\/public\/session\/\d+\/create$/)
			await page.goto(`s/${token}`)
			expect((await createResponse).status()).toBe(403)
			await expect(new EditorSection(page).getHeading({ name: 'Folder description' })).not.toBeVisible()
		})
	})
})
