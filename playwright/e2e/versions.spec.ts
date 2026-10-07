/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Locator } from '@playwright/test'
import type { EditorSection } from '../support/sections/EditorSection.ts'

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as randomUserTest } from '../support/fixtures/random-user.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

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

		const comparison = page.getByRole('region', { name: 'Version comparison' })
		await expect(comparison.getByRole('tab', { name: 'Full documents' })).toHaveAttribute('aria-selected', 'true')
		const before = comparison.getByRole('article', { name: 'Before' })
		const after = comparison.getByRole('article', { name: 'After' })
		await expect(before.getByRole('heading', { name: 'V1' })).toBeVisible()
		await expect(after.getByRole('heading', { name: 'V3' })).toBeVisible()
		await expect(comparison.locator('.text-comparison-change--current')).toHaveCount(2)
		await expect(comparison).toContainText('Change 1 of 1')
		// The comparison replaces the side-by-side view of the current file
		await expect(page.locator('.ProseMirror[contenteditable="true"]')).toBeHidden()

		await comparison.getByRole('tab', { name: 'Changes' }).click()
		const change = comparison.locator('[data-comparison-select]')
		await expect(change).toHaveCount(1)
		await expect(change).toContainText('Text changed')
		await expect(change.locator('del')).toHaveText('1')
		await expect(change.locator('ins')).toHaveText('3')
		await change.click()
		await expect(comparison.getByRole('tab', { name: 'Full documents' })).toHaveAttribute('aria-selected', 'true')
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
	expect(await versions.getByRole('link')).toHaveCount(3)
	// the oldest version is at the end of the versions list
	await versions.getByRole('link').nth(2).click()
	await expect(editor.getHeading({ name: 'V1' })).toBeVisible()
	await versions.getByRole('link').nth(1).click()
	await expect(editor.getHeading({ name: 'V2' })).toBeVisible()
	// current version
	await versions.getByRole('link').nth(0).click()
	// https://github.com/nextcloud/viewer/issues/3052
	// await expect(editor.getHeading({ name: 'V3' })).toBeVisible()
}
