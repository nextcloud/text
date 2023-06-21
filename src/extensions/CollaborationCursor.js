import { CollaborationCursor as TiptapCollaborationCursor } from '@tiptap/extension-collaboration-cursor'

/**
 * Show cursor for client ID
 * Wait 50ms for cases where the cursor gets re-rendered
 *
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

const CollaborationCursor = TiptapCollaborationCursor.extend({
	addOptions() {
		return {
			provider: null,
			user: {
				name: null,
				clientId: null,
				color: null,
				lastUpdate: null,
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

	addCommands() {
		return {
			...this.parent(),
			updateSelf: () => ({ editor }) => {
				const attributes = { ...this.options.user, lastUpdate: Date.now() }
				return editor.commands.updateUser(attributes)
			},
		}
	},
})

export default CollaborationCursor
