/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Connection } from '../composables/useConnection.ts'
import type { Document, GuestSession, Session } from '../services/SyncService.ts'

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

export interface OpenContextParams {
	type: string
	id: number
	filePath: string // not send to the api but included in the connection
	baseVersionEtag?: string
}

export interface OpenShareParams {
	token: string
	fileId: number
	filePath: string
	baseVersionEtag?: string
	guestName?: string
}

export interface OpenData {
	document: Document
	session: Session
	readOnly: boolean
	content: string
	documentState?: string
	lock?: object
	hasOwner: boolean
}

/**
 * Open editing connection to a file when logged in
 *
 * @param params Parameters identifying the document
 */
export async function openContext(params: OpenContextParams): Promise<{ connection: Connection, data: OpenData }> {
	const { type, id, baseVersionEtag } = params
	const url = generateUrl(`/apps/text/session/${type}/${id}/create`)
	const response = await axios.put(url, { baseVersionEtag })
	const { document, session } = response.data
	const connection = {
		documentId: document.id,
		sessionId: session.id,
		sessionToken: session.token,
		baseVersionEtag: document.baseVersionEtag,
		filePath: params.filePath,
	}
	return { connection, data: response.data }
}

/**
 * Open editing connection to the document
 *
 * @param params Parameters identifying the document
 */
export async function openShare(params: OpenShareParams): Promise<{ connection: Connection, data: OpenData }> {
	const url = generateUrl('/apps/text/public/session/123/create')
	const response = await axios.put(url, params)
	const { document, session } = response.data
	const connection = {
		documentId: document.id,
		sessionId: session.id,
		sessionToken: session.token,
		baseVersionEtag: document.baseVersionEtag,
		filePath: params.filePath,
		shareToken: params.token,
	}
	return { connection, data: response.data }
}

/**
 * Update the guest name
 *
 * @param guestName the name to use for the local user
 * @param connection connection to update the guest name for
 */
export async function update(
	guestName: string,
	connection: Connection,
): Promise<GuestSession> {
	if (!connection.shareToken) {
		throw new Error('Cannot set guest name without a share token!')
	}
	const id = connection.documentId
	const url = generateUrl(`/apps/text/public/session/${id}/session`)
	const response = await axios.post(url, {
		documentId: connection.documentId,
		sessionId: connection.sessionId,
		sessionToken: connection.sessionToken,
		token: connection.shareToken,
		guestName,
	})
	return response.data
}

/**
 * Close the connection
 *
 * @param connection connection to close
 */
export async function close(connection: Connection) {
	const id = connection.documentId
	const url = connection.shareToken
		? generateUrl(`/apps/text/public/session/${id}/close`)
		: generateUrl(`/apps/text/session/${id}/close`)
	const response = await axios.post(url, {
		documentId: connection.documentId,
		sessionId: connection.sessionId,
		sessionToken: connection.sessionToken,
		token: connection.shareToken,
	})
	return response.data
}
