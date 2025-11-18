/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, randomUserTest, uploadFileTest)

test.use({
	fileName: 'versions.md',
	oldVersions: [
		[
			{ content: '# V1', mtime: 1691420501 },
			{ content: '# V2', mtime: 1691420521 },
		],
		{ scope: 'test' },
	],
	fileContent: '# V3',
})

test('View versions with close timestamps', async ({ editor, open, viewer }) => {
	await open()
	const versions = await viewer.openSidebarTab('Versions')
	await expect(await versions.getByRole('link').count()).toBe(3)
	// the oldest version is at the end of the versions list
	await versions.getByRole('link').nth(2).click()
	await expect(editor.getHeading({ name: 'V1' })).toBeVisible()
	await versions.getByRole('link').nth(1).click()
	await expect(editor.getHeading({ name: 'V2' })).toBeVisible()
	// current version
	await versions.getByRole('link').nth(0).click()
	await expect(editor.getHeading({ name: 'V3' })).toBeVisible()
})
