/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../../support/fixtures/editor'
import { test as folderDescriptionTest } from '../../support/fixtures/folder-description'
import { createFolder } from '../../support/fixtures/Node'

const test = mergeTests(editorTest, folderDescriptionTest)

test.use({
	fileContent: '# Folder description',
})

test('Shows Readme.md', async ({ open, editor }) => {
	await open()
	await expect(editor.getHeading({ name: 'Folder description' })).toBeVisible()
})

test.describe('Scroll reset on blur', () => {
	test.use({
		fileContent:
			'# Title\n\n' + Array(30).fill('A paragraph of text.').join('\n\n'),
	})

	test('Scrolls back to top when focus is lost', async ({
		open,
		page,
		editor,
	}) => {
		await open()
		await editor.el.click()
		const heading = editor.getHeading({ name: 'Title' })
		await expect(page.locator('#rich-workspace')).toHaveClass(/focus/)
		await expect(heading).toBeInViewport()

		// Scroll down withhin the content wrapper
		await page.locator('#rich-workspace .content-wrapper').evaluate((el) => {
			el.scrollTop = 400
		})
		await expect(heading).not.toBeInViewport()

		// Blur by clicking outside the workspace
		await page
			.getByRole('navigation', { name: 'Current directory path' })
			.click()
		await expect(page.locator('#rich-workspace')).not.toHaveClass(/focus/)
		await expect(heading).toBeInViewport()
	})
})

test('Hides in a different folder', async ({ editor, open, page, user }) => {
	await createFolder({ name: 'Other folder', owner: user })
	await open()
	await page.getByRole('button', { name: 'Other folder' }).click()
	await expect(editor.getHeading({ name: 'Folder description' })).not.toBeVisible()
})

test('Hides in a different view', async ({ editor, open, page }) => {
	await open()
	await page.getByRole('link', { name: 'Recent' }).click()
	await expect(editor.getHeading({ name: 'Folder description' })).not.toBeVisible()
})
