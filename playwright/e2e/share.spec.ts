/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { createFolder, Node } from '../support/fixtures/Node.ts'
import { setAppConfig } from '../support/fixtures/settings.ts'
import { test as sharedFileTest } from '../support/fixtures/shared-file.ts'
import { EditorSection } from '../support/sections/EditorSection.ts'
import { ViewerSection } from '../support/sections/ViewerSection.ts'

const test = mergeTests(editorTest, sharedFileTest)

const downloadDisabled = [{ scope: 'permissions', key: 'download', value: false }]

test.use({
	fileName: 'test.md',
	fileContent: '## Hello world',
})

test.describe('Public link share', () => {
	test('opens a read only file share', async ({ editor, file, page }) => {
		const { token } = await file.shareLink()
		await page.goto(`s/${token}`)
		await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
		await expect(editor.menubar).not.toBeVisible()

		await page.getByRole('dialog').getByRole('button', { name: 'Show outline' }).click()
		await expect(editor.el.locator('[data-text-el="editor-table-of-contents"]'))
			.toBeVisible()
	})

	test('opens an editable file share as logged in user', async ({ owner, share }) => {
		const editor = new EditorSection(owner.page)
		await owner.page.goto(`s/${share.token}`)
		await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
		await expect(editor.getMenu('Undo')).toBeVisible()
		await expect(editor.getMenu('Redo')).toBeVisible()
		await expect(editor.getMenu('Bold')).toBeVisible()
	})

	test('opens an editable file share as guest', async ({ editor, open }) => {
		await open()
		await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
		await expect(editor.getMenu('Undo')).toBeVisible()
		await expect(editor.getMenu('Redo')).toBeVisible()
		await expect(editor.getMenu('Bold')).toBeVisible()
	})

	test('sets a guest name', async ({ open, page }) => {
		await open()
		await page.getByRole('dialog').getByRole('button', { name: 'Active people' }).click()
		await page.getByRole('button', { name: 'edit' }).click()
		const nameInput = page.getByRole('textbox', { name: 'Enter your name' })
		await nameInput.fill('someone')
		await nameInput.press('Enter')
		await expect(page.locator('.session-label.guest')).toHaveText('someone')
	})

	test('opens a file in a read only folder share', async ({ editor, owner, page, viewer }) => {
		const folder = await createFolder({ name: 'folder', owner })
		await owner.uploadFile({ name: 'folder/test.md', content: '## Hello world' })
		const { token } = await folder.shareLink()
		await page.goto(`s/${token}`)
		await page.getByRole('button', { name: 'View: test.md' }).click()
		await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
		await viewer.close()
	})

	test('uses the file id', async ({ file, page, share }) => {
		const createRequest = page.waitForRequest(/\/apps\/text\/public\/session\/\d+\/create$/)
		await page.goto(`s/${share.token}`)
		expect((await createRequest).postDataJSON().fileId).toBe(file.id)
	})
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
		const createResponse = recipient.page.waitForResponse(/\/apps\/text\/session\/file\/\d+\/create$/)
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
