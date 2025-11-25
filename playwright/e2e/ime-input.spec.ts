/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// Ideas taken from https://github.com/microsoft/playwright/issues/5777 and https://github.com/slab/quill/commit/0ea789f95fc4956287b3995f9495aafa367d4190

import { type Locator, expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, uploadFileTest)

test.beforeEach(async ({ open }) => {
	await open()
})

let composingData = ''
const withKeyboardEvents = async (
	el: Locator,
	key: string,
	callback: () => Promise<void>,
) => {
	composingData += key
	await el.dispatchEvent('keydown', { key })
	await callback()
	await el.dispatchEvent('keyup', { key })
}

test('Input Chinese character via IME at beginning of paragraph works', async ({
	browserName,
	editor,
	page,
}) => {
	test.skip(
		browserName !== 'chromium',
		'IME testing is currently only implemented in Chromium API',
	)

	// Get developer tools API
	const client = await page.context().newCDPSession(page)

	await editor.content.focus()

	await withKeyboardEvents(editor.content, 'w', async () => {
		client.send('Input.imeSetComposition', {
			selectionStart: composingData.length,
			selectionEnd: composingData.length,
			text: 'w',
		})
	})
	await withKeyboardEvents(editor.content, 'o', async () => {
		client.send('Input.imeSetComposition', {
			selectionStart: composingData.length,
			selectionEnd: composingData.length,
			text: 'o',
		})
	})
	await withKeyboardEvents(editor.content, 'Space', async () => {
		client.send('Input.insertText', {
			text: '我',
		})
	})

	await expect(editor.content).toHaveText('我')
})
