/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'
import { CollaborationCursor as TiptapCollaborationCursor } from '@tiptap/extension-collaboration-cursor'

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

const CollaborationCursor = TiptapCollaborationCursor.extend({
	addOptions() {
		return {
			...this.parent?.(),
			render: (user) => {
				const cursor = document.createElement('span')
				const name = user.name || user.user_id || t('text', 'Guest')

				cursor.classList.add('collaboration-cursor__caret')
				cursor.setAttribute('style', `border-color: ${user.color}`)

				const label = document.createElement('div')

				label.classList.add('collaboration-cursor__label')
				label.id = `collaboration-cursor__label__${user.clientId}`
				label.setAttribute('style', `background-color: ${user.color}`)
				label.insertBefore(document.createTextNode(name), null)
				cursor.insertBefore(label, null)

				return cursor
			},
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
						if (clientId === this.options.user.clientId) {
							continue
						}
						showCursorLabel(clientId)
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
