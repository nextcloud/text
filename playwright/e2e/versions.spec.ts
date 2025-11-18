/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests, type Locator } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'
import type { EditorSection } from '../support/sections/EditorSection'

const test = mergeTests(editorTest, randomUserTest, uploadFileTest)

test.use({
	fileName: 'versions.md',
	fileContent: '# V3',
})

test.describe('Versions with close timestamps', () => {
	test.use({
		oldVersions: [
			[
				{ content: '# V1', mtime: 1691420501 },
				{ content: '# V2', mtime: 1691420521 },
			],
			{ scope: 'test' },
		],
	})

	test('Show up separately', async ({ editor, open, viewer }) => {
		await open()
		const versions = await viewer.openSidebarTab('Versions')
		await checkVersions(versions, editor)
	})
})

test.describe('Versions with distant timestamps', () => {
	test.use({
		oldVersions: [
			[
				{ content: '# V1', mtime: 1691420501 },
				{ content: '# V2', mtime: 1691424242 },
			],
			{ scope: 'test' },
		],
	})

	test('Show up', async ({ editor, open, viewer }) => {
		await open()
		const versions = await viewer.openSidebarTab('Versions')
		await checkVersions(versions, editor)
	})

	test('Compare', async ({ open, page, viewer }) => {
		await open()
		const versions = await viewer.openSidebarTab('Versions')
		await versions.getByRole('button').nth(2).click()
		await page
			.getByRole('menuitem', { name: 'Compare to current version' })
			.click()
		const oldVersion = page.getByRole('textbox')
		const current = page.locator(
			'.viewer__content .viewer__file--active .ProseMirror',
		)
		await expect(oldVersion.getByRole('heading', { name: 'V1' })).toBeVisible()
		await expect(current.getByRole('heading', { name: 'V3' })).toBeVisible()
	})
})

/**
 * Go through the different versions and check them in the editor
 *
 * Assumes 3 versions with content `# V1`, `# V2` and `# V3`
 * @param versions Versions tab content
 * @param editor editor section to inspect for headings
 */
async function checkVersions(versions: Locator, editor: EditorSection) {
	expect(await versions.getByRole('link').count()).toBe(3)
	// the oldest version is at the end of the versions list
	await versions.getByRole('link').nth(2).click()
	await expect(editor.getHeading({ name: 'V1' })).toBeVisible()
	await versions.getByRole('link').nth(1).click()
	await expect(editor.getHeading({ name: 'V2' })).toBeVisible()
	// current version
	await versions.getByRole('link').nth(0).click()
	await expect(editor.getHeading({ name: 'V3' })).toBeVisible()
}
