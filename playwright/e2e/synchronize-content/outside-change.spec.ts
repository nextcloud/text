/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../../support/fixtures/editor.ts'
import { test as randomUserTest } from '../../support/fixtures/random-user.ts'
import { test as uploadFileTest } from '../../support/fixtures/upload-file.ts'

const test = mergeTests(editorTest, randomUserTest, uploadFileTest)

test.beforeEach(async ({ open }) => {
	await open()
})

const resolutionVariants = [
	{
		source: 'local',
		buttonName: /Keep my local changes and overwrite the remote version/,
		headingName: 'Hello world',
	},
	{
		source: 'server',
		buttonName: /Discard my local changes and use the remote version/,
		headingName: 'Good bye',
	},
]

resolutionVariants.forEach(({ source, buttonName, headingName }) => {
	test(`[conflict] saving after the file was changed outside of Nextcloud - resolve with ${source} version`, async ({
		container,
		editor,
		file,
		page,
		reader,
		user,
	}) => {
		await expect(editor.el).toBeVisible()
		const pushPromise = page.waitForRequest(/push/)
		await editor.typeHeading('Hello world')
		await pushPromise
		await user.writeFileOutsideNextcloud({ name: file.name, content: '## Good bye' })
		// Clicking the save indicator would force the save and skip the conflict check.
		await page.keyboard.press('ControlOrMeta+s')

		// Verify both versions are shown
		await expect(reader.getHeading({ name: 'Good bye' })).toBeVisible({
			timeout: 10_000,
		})
		await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()

		// Resolve conflict
		await container.getButton({ name: buttonName }).click()
		await expect(reader.el).not.toBeVisible()
		await expect(editor.getHeading({ name: headingName })).toBeVisible()
		await expect(async () => {
			expect(await file.getContent()).toContain(headingName)
		}).toPass()
	})
})

test('reopening after the file was changed outside of Nextcloud shows the new content', async ({
	close,
	container,
	editor,
	file,
	page,
	reader,
	user,
}) => {
	await expect(editor.el).toBeVisible()
	const pushPromise = page.waitForRequest(/push/)
	await editor.typeHeading('Hello world')
	await pushPromise
	await editor.saveIndicator.click()
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
	await close()

	await user.writeFileOutsideNextcloud({ name: file.name, content: '## Good bye' })
	await file.open()

	await expect(editor.getHeading({ name: 'Good bye' })).toBeVisible({
		timeout: 10_000,
	})
	await expect(editor.getHeading({ name: 'Hello world' })).not.toBeVisible()
	await expect(reader.el).not.toBeVisible()
	await expect(container.getButton({
		name: /Keep my local changes and overwrite the remote version/,
	})).not.toBeVisible()
})
