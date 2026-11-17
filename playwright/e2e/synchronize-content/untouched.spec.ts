/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../../support/fixtures/upload-file.ts'

const test = mergeTests(editorTest, uploadFileTest)

test.use({ fileContent: '## Hello world\n' })

test('does not save an untouched file', async ({ close, editor, open, page }) => {
	const saves: string[] = []
	page.on('request', (request) => {
		if (/\/session\/.*\/save/.test(request.url())) {
			saves.push(request.url())
		}
	})
	const push = page.waitForResponse(/\/session\/.*\/push/)
	await open()
	await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
	await push
	await expect(editor.saveIndicator).not.toHaveAccessibleName(/Unsaved changes/)
	await close()
	expect(saves).toEqual([])
})
