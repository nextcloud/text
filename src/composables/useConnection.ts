/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { inject, provide, shallowRef, type InjectionKey, type ShallowRef } from 'vue'
import { open, type OpenData } from '../apis/connect'
import type { Document, Session } from '../services/SyncService'

export interface Connection {
	documentId: number
	sessionId: number
	sessionToken: string
	baseVersionEtag: string
	filePath: string
	shareToken?: string
}

export interface InitialData {
	document: Document
	session: Session & { token: string }
	readOnly: boolean
	content: string
	documentState?: string
	lock?: object
	hasOwner: boolean
}

export const connectionKey = Symbol('text:connection') as InjectionKey<
	ShallowRef<Connection | undefined>
>

export const openDataKey = Symbol('text:opendata') as InjectionKey<
	ShallowRef<OpenData | undefined>
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
	let baseVersionEtag: string | undefined
	const connection = shallowRef<Connection | undefined>(undefined)
	const openData = shallowRef<OpenData | undefined>(undefined)
	const openConnection = async () => {
		const guestName = localStorage.getItem('nick') ?? ''
		const { connection: opened, data } =
			openInitialSession(props)
			|| (await open({
				fileId: props.fileId,
				guestName,
				token: props.shareToken,
				filePath: props.relativePath,
				baseVersionEtag,
			}))
		baseVersionEtag = data.document.baseVersionEtag
		connection.value = opened
		openData.value = data
		return data
	}
	provide(connectionKey, connection)
	provide(openDataKey, openData)
	return { connection, openConnection, openData }
}

export const useConnection = () => {
	const connection = inject(connectionKey)
	const openData = inject(openDataKey)
	return { connection, openData }
}

/**
 * Get the connection and additional data from the initial session if available.
 * @param props Props of the editor component
 * @param props.relativePath Relative path to the file.
 * @param props.initialSession Initial session handed to the editor in direct editing
 * @param props.shareToken Share token of the file.
 */
function openInitialSession(props: {
	relativePath: string
	initialSession?: InitialData
	shareToken?: string
}) {
	if (props.initialSession) {
		const { document, session } = props.initialSession
		const connection = {
			documentId: document.id,
			sessionId: session.id,
			sessionToken: session.token,
			baseVersionEtag: document.baseVersionEtag,
			filePath: props.relativePath,
			shareToken: props.shareToken,
		}
		return { connection, data: props.initialSession }
	}
}
