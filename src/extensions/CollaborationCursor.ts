/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { CollaborationCursor as TiptapCollaborationCursor } from '@tiptap/extension-collaboration-cursor'

interface AwarenessUser {
	color: string
	name: string
}

/**
 * @param clientId The Yjs client ID
 */
function showCursorLabel(clientId: number) {
	setTimeout(() => {
		const el = document.getElementById(
			`collaboration-cursor__label__${clientId}`,
		)
		if (!el) {
			return
		}

		el.classList.add('collaboration-cursor__label__active')
		setTimeout(() => {
			el?.classList.remove('collaboration-cursor__label__active')
		}, 50)
	}, 50)
}

/**
 * Unix timestamp in seconds.
 */
function getTimestamp() {
	return Math.floor(Date.now() / 1000)
}

/**
 * Render the cursor decoration
 *
 * @param user the users awareness data
 * @param clientId not part of the tiptap type signature but provided by y-prosemirror
 */
function render(user: AwarenessUser, clientId?: number): HTMLElement {
	const cursor = document.createElement('span')
	cursor.classList.add('collaboration-cursor__caret')
	cursor.setAttribute('style', `border-color: ${user.color}`)
	const label = document.createElement('div')
	label.classList.add('collaboration-cursor__label')
	label.id = `collaboration-cursor__label__${clientId}`
	label.setAttribute('style', `background-color: ${user.color}`)
	label.insertBefore(document.createTextNode(user.name), null)
	cursor.insertBefore(label, null)
	return cursor
}

const CollaborationCursor = TiptapCollaborationCursor.extend({
	addOptions() {
		return {
			...this.parent?.(),
			render,
		}
	},

	onCreate() {
		this.options.provider.awareness.on(
			'change',
			(
				{ added, updated }: { added: number[]; updated: number[] },
				origin: unknown,
			) => {
				if (origin !== 'local') {
					for (const clientId of [...added, ...updated]) {
						if (clientId !== this.options.user.clientId) {
							showCursorLabel(clientId)
						}
					}
				}
			},
		)
	},

	// Flag own cursor as active on undoable changes to the document state
	onTransaction({ transaction, editor }) {
		const addToHistory = transaction.getMeta('addToHistory') ?? true
		const pointer = transaction.getMeta('pointer')
		const updated = transaction.docChanged
		if (updated && addToHistory && !pointer) {
			editor.commands.updateUser({
				...this.options.user,
				lastUpdate: getTimestamp(),
			})
		}
	},
})

export default CollaborationCursor
