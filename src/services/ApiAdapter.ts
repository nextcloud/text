/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import type { SyncData, SyncResponse } from '@nextcloud/y-http'

export interface Connection {
	baseVersionEtag: string
	documentId: number
	sessionId: number
	sessionToken: string
	filePath?: string
	token?: string
}

interface OpenParams {
	fileId?: number
	baseVersionEtag?: string
	filePath: string
	token?: string
}

/**
 * Open editing connection to the document
 * @param params Parameters identifying the document
 */
export async function openConnection(params: OpenParams)
	: Promise<{ connection: Connection, data: object }> {
	const _baseUrl = params.token
		? generateUrl('/apps/text/public')
		: generateUrl('/apps/text')
	const url = `${_baseUrl}/session/${params.fileId}/create`
	const response = await axios.put(url, params)
	const { document, session } = response.data
	const connection = {
		filePath: params.filePath,
		documentId: document.id,
		sessionId: session.id,
		sessionToken: session.token,
		token: params.token,
		baseVersionEtag: document.baseVersionEtag
	}
	return { connection, data: response.data }
}

/**
 * Send data to the server
 * @param connection the active connection
 * @param data data to push to the server
 */
export async function push(connection: Connection, data: SyncData): Promise<SyncResponse> {
	const url = _url(connection, 'push')
	const response = await axios.post(url, {
		...connection,
		version: data.version,
		steps: [ data.sync ].filter(s => s),
		awareness: data.awareness,
	})
	const steps: { data: string[], version: number }[] = response.data.steps
	const version = Math.max(...(steps?.map(s => s.version) ?? []), data.version)
	const sync = steps?.map(s => s.data).flat() ?? []
	return { sync, version, awareness: {} }
}

type ConnectionToClose = Pick<Connection, "documentId" | "sessionId" | "sessionToken" | "token">
/**
 * Close the connection
 * @param connection connection to close
 */
export async function close(connection: ConnectionToClose) {
	const url = _url(connection, 'close')
	const response = await axios.post(url, connection)
	return response.data
}

/**
 * Helper function to build the urls for guests and logged in uses alike
 * @param session - connection to the document or params to the open function
 * @param endpoint - endpoint of the url inside apps/text
 */
function _url(session: Pick<Connection, "token" | "documentId">, endpoint: string) {
	const isPublic = !!session.token
	const id = session.documentId
	const _baseUrl = isPublic
		? generateUrl('/apps/text/public')
		: generateUrl('/apps/text')
	return `${_baseUrl}/session/${id}/${endpoint}`
}
