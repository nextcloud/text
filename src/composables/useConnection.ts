/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { inject, provide, shallowRef, type InjectionKey, type ShallowRef } from 'vue'
import { open } from '../apis/Connect.js'
import type { Document, Session } from '../services/SyncService.js'

export interface Connection {
	documentId: number
	sessionId: number
	sessionToken: string
}

export interface InitialData {
	document: Document
	session: Session
	readOnly: boolean
	content: string
	documentState?: string
	lock?: object
	hasOwner: boolean
}

export const connectionKey = Symbol('text:connection') as InjectionKey<
	ShallowRef<Connection | undefined>
>

/**
 * Handle the connection to the text api and provide it to child components
 * @param props Props of the editor component.
 * @param props.fileId Fileid of the file.
 * @param props.relativePath Relative path to the file.
 * @param props.initialSession Initial session handed to the editor in direct editing
 * @param props.shareToken Share token of the file.
 */
export function provideConnection(props: {
	fileId: number
	relativePath: string
	initialSession?: InitialData
	shareToken?: string
}) {
	const baseVersionEtag = shallowRef<string | undefined>(undefined)
	const connection = shallowRef<Connection | undefined>(undefined)
	const openConnection = async () => {
		const guestName = localStorage.getItem('nick') ?? ''
		const { connection: opened, data } =
			openInitialSession(props)
			|| (await open({
				fileId: props.fileId,
				guestName,
				token: props.shareToken,
				filePath: props.relativePath,
				baseVersionEtag: baseVersionEtag.value,
			}))
		baseVersionEtag.value = data.document.baseVersionEtag
		connection.value = opened
		return data
	}
	provide(connectionKey, connection)
	return { connection, openConnection, baseVersionEtag }
}

export const useConnection = () => {
	const connection = inject(connectionKey)
	return { connection }
}

/**
 * Get the connection and additional data from the initial session if available.
 * @param props Props of the editor component
 * @param props.initialSession InitialSession to use.
 */
function openInitialSession(props: { initialSession?: InitialData }) {
	if (props.initialSession) {
		const connection = {
			documentId: props.initialSession.document.id,
			sessionId: props.initialSession.session.id,
			sessionToken: props.initialSession.session.token,
		}
		return { connection, data: props.initialSession }
	}
}
