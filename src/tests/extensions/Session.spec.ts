/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, test as baseTest } from 'vitest'
import createCustomEditor from '../testHelpers/createCustomEditor'
import { Session } from '../../extensions/Session'
import type { Editor } from '@tiptap/core'

interface EditorFixture {
	editor: Editor
}

const test = baseTest.extend<EditorFixture>({
	editor: async ({ task: _ }, use) => {
		const editor = createCustomEditor('', [Session])
		await use(editor)
		editor.destroy()
	}
})

test('start with empty session', ({ editor }) => {
	expect(editor.storage.session).toEqual({
		"documentId": 0,
		"sessionId": 0,
		"sessionToken": "",
	})
})

test('set a session', ({ editor }) => {
	editor.commands.setSession({ documentId: 123, id: 456, token: 'myToken'})
	expect(editor.storage.session).toEqual({
		"documentId": 123,
		"sessionId": 456,
		"sessionToken": "myToken",
	})
})

test('clear the session', ({ editor }) => {
	editor.commands.setSession({ documentId: 123, id: 456, token: 'myToken'})
	editor.commands.clearSession()
	expect(editor.storage.session).toEqual({
		"documentId": 0,
		"sessionId": 0,
		"sessionToken": "",
	})
})
