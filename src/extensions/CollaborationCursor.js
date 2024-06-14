/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { CollaborationCursor as TiptapCollaborationCursor } from '@tiptap/extension-collaboration-cursor'

/**
 * @param {number} clientId The Yjs client ID
 */
function showCursorLabel(clientId) {
	setTimeout(() => {
		const el = document.getElementById(`collaboration-cursor__label__${clientId}`)
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

const CollaborationCursor = TiptapCollaborationCursor.extend({
	addOptions() {
		return {
			provider: null,
			user: {
				name: null,
				clientId: null,
				color: null,
				lastUpdate: getTimestamp(),
			},
			render: user => {
				const cursor = document.createElement('span')

				cursor.classList.add('collaboration-cursor__caret')
				cursor.setAttribute('style', `border-color: ${user.color}`)

				const label = document.createElement('div')

				label.classList.add('collaboration-cursor__label')
				label.id = `collaboration-cursor__label__${user.clientId}`
				label.setAttribute('style', `background-color: ${user.color}`)
				label.insertBefore(document.createTextNode(user.name), null)
				cursor.insertBefore(label, null)

				return cursor
			},
		}
	},

	onCreate() {
		this.options.provider.awareness.on('change', ({ added, removed, updated }, origin) => {
			if (origin !== 'local') {
				for (const clientId of [...added, ...updated]) {
					if (clientId !== this.options.user.clientId) {
						showCursorLabel(clientId)
					}
				}
			}
		})
	},

	// Flag own cursor as active on undoable changes to the document state
	onTransaction({ transaction }) {
		const { updated, meta } = transaction
		if (updated && (meta.addToHistory ?? true) && !meta.pointer) {
			this.options.user.lastUpdate = getTimestamp()
			this.options.provider.awareness.setLocalStateField('user', this.options.user)
		}
	},
})

export default CollaborationCursor
