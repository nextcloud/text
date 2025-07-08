/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import type { Connection } from '../composables/useConnection.js'

export interface OpenParams {
	fileId?: number
	baseVersionEtag?: string
	filePath: string
	token?: string
	guestName?: string
}

export interface OpenData {
	document: { baseVersionEtag: string }
}

/**
 * Open editing connection to the document
 * @param params Parameters identifying the document
 */
export async function open(
	params: OpenParams,
): Promise<{ connection: Connection; data: OpenData }> {
	const _baseUrl = params.token
		? generateUrl('/apps/text/public')
		: generateUrl('/apps/text')
	const url = `${_baseUrl}/session/${params.fileId}/create`
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
 * Close the connection
 * @param connection connection to close
 */
export async function close(connection: Connection) {
	const id = connection.documentId
	const url = generateUrl(`/apps/text/session/${id}/close`)
	const response = await axios.post(url, {
		documentId: connection.documentId,
		sessionId: connection.sessionId,
		sessionToken: connection.sessionToken,
	})
	return response.data
}
