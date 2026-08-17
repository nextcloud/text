/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { InjectionKey, ShallowRef } from 'vue'
import type { OpenData } from '../apis/connect.ts'
import type { Document, Session } from '../services/SyncService.ts'

import { inject, provide, shallowRef } from 'vue'
import * as api from '../apis/connect.ts'

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
 *
 * @param props Props of the editor component.
 * @param props.fileId Fileid of the file.
 * @param props.relativePath Relative path to the file.
 * @param props.initialSession Initial session handed to the editor in direct editing
 * @param props.shareToken Share token of the file.
 * @param getBaseVersionEtag Async getter function for the base version etag.
 * @param setBaseVersionEtag Async setter function for the base version etag.
 */
export function provideConnection(
	props: {
		fileId: number
		relativePath: string
		initialSession?: InitialData
		shareToken?: string
	},
	getBaseVersionEtag: () => Promise<string | undefined>,
	setBaseVersionEtag: (val: string) => Promise<string | undefined>,
) {
	const connection = shallowRef<Connection | undefined>(undefined)
	const openData = shallowRef<OpenData | undefined>(undefined)
	const openConnection = async () => {
		const baseVersionEtag = await getBaseVersionEtag()
		const guestName = localStorage.getItem('nick') ?? ''
		const { connection: opened, data }
			= openInitialSession(props, baseVersionEtag)
				|| await openShare(props, baseVersionEtag, guestName)
				|| await openFile(props, baseVersionEtag)
		await setBaseVersionEtag(data.document.baseVersionEtag)
		connection.value = opened
		openData.value = data
		return data
	}
	provide(connectionKey, connection)
	provide(openDataKey, openData)
	return { connection, openConnection, openData }
}

/**
 *
 */
export function useConnection() {
	const connection = inject(connectionKey)
	const openData = inject(openDataKey)
	return { connection, openData }
}

/**
 * Mimic axios error for a conflict while creating the session.
 *
 * This will be emitted from the SyncService
 * and trigger conflict handling in CollaborativeEditor.vue
 */
class ConflictError extends Error {
	response = { status: 412 }
}

/**
 * Get the connection and additional data from the initial session if available.
 *
 * @param props Props of the editor component
 * @param props.relativePath Relative path to the file.
 * @param props.initialSession Initial session handed to the editor in direct editing
 * @param props.shareToken Share token of the file.
 * @param baseVersionEtag Etag from the last editing session.
 */
function openInitialSession(
	props: {
		relativePath: string
		initialSession?: InitialData
		shareToken?: string
	},
	baseVersionEtag: string | undefined,
) {
	if (props.initialSession) {
		const { document, session } = props.initialSession
		if (baseVersionEtag && baseVersionEtag !== document.baseVersionEtag) {
			throw new ConflictError('Base version etag did not match when opening initial session.')
		}
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

/**
 * Get the connection and additional data from the initial session if available.
 *
 * @param props Props of the editor component
 * @param props.relativePath Relative path to the file.
 * @param props.shareToken Share token of the file.
 * @param props.fileId id of the file
 * @param baseVersionEtag Etag from the last editing session.
 * @param guestName to be shown to other participants.
 */
async function openShare(
	props: {
		fileId: number
		relativePath: string
		shareToken?: string
	},
	baseVersionEtag: string | undefined,
	guestName: string | undefined,
) {
	if (props.shareToken) {
		return api.openShare({
			guestName,
			token: props.shareToken,
			filePath: props.relativePath,
			fileId: props.fileId,
			baseVersionEtag,
		})
	}
}

/**
 * Get the connection and additional data from the initial session if available.
 *
 * @param props Props of the editor component
 * @param props.fileId id of the file
 * @param props.relativePath Relative path to the file.
 * @param baseVersionEtag Etag from the last editing session.
 */
async function openFile(
	props: {
		fileId: number
		relativePath: string
	},
	baseVersionEtag: string | undefined,
) {
	return api.openContext({
		type: 'file',
		id: props.fileId,
		filePath: props.relativePath,
		baseVersionEtag,
	})
}
