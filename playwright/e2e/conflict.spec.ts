/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as offlineTest } from '../support/fixtures/offline'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, offlineTest, randomUserTest, uploadFileTest)

// As we switch on and off the network
// we cannot run tests in parallel.
test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ open }) => {
	await open()
})

const resolutionVariants = [
	{
		source: 'local',
		buttonName: /Overwrite the file and save /,
		headingName: 'Hello world',
	},
	{
		source: 'server',
		buttonName: /Discard the changes and edit /,
		headingName: 'Good bye',
	},
]

resolutionVariants.forEach(({ source, buttonName, headingName }) => {
	test(`[conflict] manual resolution after typing while offline - resolve with ${source} version`, async ({
		container,
		editor,
		file,
		reader,
		setOffline,
		setOnline,
		user,
	}) => {
		await expect(editor.el).toBeVisible()
		await setOffline()
		await editor.typeHeading('Hello world')
		await setOnline()
		await user.uploadFile({ name: file.name, content: '## Good bye' })

		// Verify both verisons are shown
		await expect(editor.getHeading({ name: 'Good bye' })).toBeVisible()
		await expect(reader.getHeading({ name: 'Hello world' })).toBeVisible()

		// Resolve conflict
		await container.getButton({ name: buttonName }).click()
		await expect(reader.el).not.toBeVisible()
		await expect(editor.getHeading({ name: headingName })).toBeVisible()
	})
})

resolutionVariants.forEach(({ source, buttonName, headingName }) => {
	test(`[conflict] manual resolution after typing while offline and reopening editor - resolve with ${source} version`, async ({
		close,
		container,
		editor,
		file,
		reader,
		setOffline,
		setOnline,
		user,
	}) => {
		await expect(editor.el).toBeVisible()
		await setOffline()
		await editor.typeHeading('Hello world')
		await close()
		await setOnline()
		await user.uploadFile({ name: file.name, content: '## Good bye' })
		await file.open()

		// Verify both verisons are shown
		await expect(editor.getHeading({ name: 'Good bye' })).toBeVisible()
		await expect(reader.getHeading({ name: 'Hello world' })).toBeVisible()

		// Resolve conflict
		await container.getButton({ name: buttonName }).click()
		await expect(reader.el).not.toBeVisible()
		await expect(editor.getHeading({ name: headingName })).toBeVisible()
	})
})

resolutionVariants.forEach(({ source, buttonName, headingName }) => {
	test(`[conflict] manual resolution after typing while online - resolve with ${source} version`, async ({
		container,
		editor,
		file,
		reader,
		user,
	}) => {
		await expect(editor.el).toBeVisible()
		await editor.typeHeading('Hello world')
		await user.uploadFile({ name: file.name, content: '## Good bye' })

		// Verify both verisons are shown
		await expect(editor.getHeading({ name: 'Good bye' })).toBeVisible()
		await expect(reader.getHeading({ name: 'Hello world' })).toBeVisible()

		// Resolve conflict
		await container.getButton({ name: buttonName }).click()
		await expect(reader.el).not.toBeVisible()
		await expect(editor.getHeading({ name: headingName })).toBeVisible()
	})
})

test.describe('Plaintext conflict resolution', () => {
	test.use({ fileName: 'empty.txt' })
	const plaintextResolutionVariants = [
		{
			source: 'local',
			buttonName: /Overwrite the file and save /,
			content: 'Hello world',
		},
		{
			source: 'server',
			buttonName: /Discard the changes and edit /,
			content: 'Good bye',
		},
	]

	plaintextResolutionVariants.forEach(({ source, buttonName, content }) => {
		test(`[conflict, plaintext] manual resolution after typing while online - resolve with ${source} version`, async ({
			container,
			editor,
			file,
			reader,
			user,
		}) => {
			await expect(editor.el).toBeVisible()
			await editor.type('Hello world')
			await user.uploadFile({ name: file.name, content: 'Good bye' })

			// Verify both verisons are shown
			await expect(editor.content).toHaveText('Good bye')
			await expect(reader.content).toHaveText('Hello world')

			// Resolve conflict
			await container.getButton({ name: buttonName }).click()
			await expect(reader.el).not.toBeVisible()
			await expect(editor.content).toHaveText(content)
		})
	})
})

test('[conflict] automatic resolution if no unsaved changes', async ({
	container,
	editor,
	file,
	page,
	reader,
	user,
}) => {
	await expect(editor.el).toBeVisible()
	await editor.typeHeading('Hello world')
	const requestPromise = page.waitForRequest(/save/)
	await editor.saveIndicator.click()
	await requestPromise
	await page.waitForTimeout(500) // More robust against 423 Locked

	await user.uploadFile({ name: file.name, content: '## Good bye' })

	// Should show latest content, no conflict dialog
	await expect(editor.getHeading({ name: 'Good bye' })).toBeVisible()
	await expect(reader.content).not.toBeVisible()
	await expect(container.getButton({ name: /Overwrite/ })).not.toBeVisible()
})

test('readonly session hides conflict dialog', async ({
	container,
	close,
	editor,
	file,
	page,
	setOffline,
	setOnline,
	user,
}) => {
	await expect(editor.el).toBeVisible()
	await setOffline()
	await editor.typeHeading('Hello world')
	await close()

	await setOnline()
	await user.uploadFile({ name: file.name, content: '## Good bye' })

	// Share file and open as guest (read-only)
	const { token } = await file.shareLink()
	await page.goto(`/s/${token}`)

	// Should show latest content, no conflict dialog

	await expect(editor.getHeading({ name: 'Good bye' })).toBeVisible()
	await expect(container.getButton({ name: /Overwrite/ })).not.toBeVisible()
})

test.skip('no conflict when uploading identical content', async ({
	close,
	container,
	editor,
	file,
	reader,
	setOffline,
	setOnline,
	user,
}) => {
	await expect(editor.el).toBeVisible()
	await setOffline()
	await editor.typeHeading('Hello world')
	await close()

	await setOnline()
	await user.uploadFile({ name: file.name, content: '## Hello world' })

	await file.open()

	await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
	await expect(reader.getHeading({ name: 'Hello world' })).toBeVisible()
	await expect(container.getButton({ name: /Overwrite/ })).not.toBeVisible()
	await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
})

test('conflict dialog is sticky when scrolling', async ({
	close,
	container,
	file,
	editor,
	page,
	reader,
	setOffline,
	setOnline,
	user,
}) => {
	await expect(editor.el).toBeVisible()
	await editor.typeHeading('Long content\n')
	await setOffline()

	for (let i = 1; i < 8; i++) {
		await editor.typeHeading(`Section ${i}`)
		await editor.type('\n\nLorem ipsum dolor sit amet.\n\n')
	}
	await close()

	await setOnline()
	await user.uploadFile({ name: file.name, content: '## Different content' })
	await file.open()

	await expect(editor.getHeading({ name: 'Different content' })).toBeVisible()
	await expect(reader.getHeading({ name: 'Long content' })).toBeVisible()

	// Scroll down
	await reader.getHeading({ name: 'Section 7' }).scrollIntoViewIfNeeded()

	await expect(container.getButton({ name: /Overwrite/ })).toBeVisible()
	await expect(page.locator('.document-status')).toBeVisible()
})
