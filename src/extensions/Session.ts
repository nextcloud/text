/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		session: {
			setSession: (session: {
				documentId: number
				id: number
				token: string
			}) => ReturnType
			clearSession: () => ReturnType
		}
	}
}

interface StoredSession {
	documentId: number
	sessionId: number
	sessionToken: string
}

const emptySession = {
	documentId: 0,
	sessionId: 0,
	sessionToken: '',
}

export const Session = Extension.create({
	name: 'session',

	addStorage(): StoredSession {
		return { ...emptySession }
	},

	addCommands() {
		return {
			setSession: (session) => () => {
				this.storage.documentId = session.documentId
				this.storage.sessionId = session.id
				this.storage.sessionToken = session.token
				return true
			},
			clearSession:
				() =>
				({ commands }) => {
					return commands.setSession({ documentId: 0, id: 0, token: '' })
				},
		}
	},
})
