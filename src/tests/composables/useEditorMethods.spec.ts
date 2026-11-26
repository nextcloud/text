/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { GuestSession, UserSession } from '../../types/Session.ts'

import { describe, expect, test, vi } from 'vitest'
import { useEditorMethods } from '../../composables/useEditorMethods.ts'

const base = { id: 1, color: '#000', lastAwarenessMessage: '', lastContact: 0, documentId: '1' }
const userSession: UserSession = { ...base, userId: 'alice', displayName: 'Alice' }
const guestSession = { ...base, userId: null, guestName: 'Nick' } as unknown as GuestSession

function createEditor(storage: object = { commentReference: { currentUser: null } }) {
	return { commands: { updateUser: vi.fn() }, storage } as unknown as Editor
}

describe('updateUser', () => {
	test('sets the comment author from a user session', () => {
		const editor = createEditor()
		useEditorMethods(editor).updateUser(userSession)
		expect(editor.storage.commentReference.currentUser).toEqual({ uid: 'alice', displayName: 'Alice' })
		expect(editor.commands.updateUser).toHaveBeenCalledWith({ name: 'Alice', color: '#000' })
	})

	test('clears the comment author for a guest session', () => {
		const editor = createEditor({ commentReference: { currentUser: { uid: 'user1', displayName: 'User 1' } } })
		useEditorMethods(editor).updateUser(guestSession)
		expect(editor.storage.commentReference.currentUser).toBeNull()
		expect(editor.commands.updateUser).toHaveBeenCalledWith({ name: 'Nick', color: '#000' })
	})

	test('works for editors without comments', () => {
		const editor = createEditor({})
		useEditorMethods(editor).updateUser(userSession)
		expect(editor.commands.updateUser).toHaveBeenCalled()
	})
})
