/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'
import { CollaborationCaret as TiptapCollaborationCaret } from '@tiptap/extension-collaboration-caret'

export interface AwarenessUser {
	color: string
	name: string
}

/**
 * @param clientId The Yjs client ID
 */
function showCaretLabel(clientId: number) {
	setTimeout(() => {
		const el = document.getElementById(
			`collaboration-carets__label__${clientId}`,
		)
		if (!el) {
			return
		}

		el.classList.add('collaboration-carets__label__active')
		setTimeout(() => {
			el?.classList.remove('collaboration-carets__label__active')
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
 * Render the caret decoration
 *
 * @param user the users awareness data
 * @param clientId not part of the tiptap type signature but provided by y-prosemirror
 */
function render(user: AwarenessUser, clientId?: number): HTMLElement {
	const cursor = document.createElement('span')

	cursor.classList.add('collaboration-carets__caret')
	cursor.setAttribute('style', `border-color: ${user.color}`)

	const label = document.createElement('div')
	label.id = `collaboration-carets__label__${clientId}`

	label.classList.add('collaboration-carets__label')
	label.setAttribute('style', `background-color: ${user.color}`)
	const text = document.createTextNode(user.name || t('text', 'Guest'))
	label.insertBefore(text, null)
	cursor.insertBefore(label, null)

	return cursor
}

const CollaborationCaret = TiptapCollaborationCaret.extend({
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
						if (clientId !== this.options.provider.awareness.clientID) {
							showCaretLabel(clientId)
						}
					}
				}
			},
		)
	},

	// Flag own caret as active on undoable changes to the document state
	onTransaction({ transaction, editor }) {
		const addToHistory = transaction.getMeta('addToHistory') ?? true
		const pointer = transaction.getMeta('pointer')
		const updated = transaction.docChanged
		if (updated && addToHistory && !pointer) {
			editor.commands.updateUser({
				...this.options.provider.awareness.getLocalState().user,
				lastUpdate: getTimestamp(),
			})
		}
	},
})

export default CollaborationCaret
