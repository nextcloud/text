/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { unref, type ShallowRef } from 'vue'
import type { Connection } from '../composables/useConnection.js'
import type { Session, Step } from '../services/SyncService.js'

interface PushData {
	version: number
	steps: string[]
	awareness: string
}

interface PushResponse {
	data: {
		steps: Step[]
		documentState: string
		awareness: Record<string, string>
	}
}

/**
 * Send data to the server
 * @param connection the active connection
 * @param data data to push to the server
 */
export function push(
	connection: ShallowRef<Connection> | Connection,
	data: PushData,
): Promise<PushResponse> {
	const con = unref(connection)
	const pub = con.shareToken ? '/public' : ''
	const url = generateUrl(`apps/text${pub}/session/${con.documentId}/push`)
	return axios.post(url, {
		documentId: con.documentId,
		sessionId: con.sessionId,
		sessionToken: con.sessionToken,
		token: con.shareToken,
		baseVersionEtag: con.baseVersionEtag,
		version: data.version,
		steps: data.steps.filter((s) => s),
		awareness: data.awareness,
	})
}

interface SyncResponse {
	data: {
		steps: Step[]
		documentState: string
		awareness: Record<string, string>
		document: Document
		sessions: Session[]
	}
}

/**
 * Receive updates from the server
 * @param connection the active connection
 * @param data data to push to the server
 * @param data.version Changes up to this version are already known.
 */
export function sync(
	connection: ShallowRef<Connection> | Connection,
	data: { version: number },
): Promise<SyncResponse> {
	const con = unref(connection)
	const pub = con.shareToken ? '/public' : ''
	const url = generateUrl(`apps/text${pub}/session/${con.documentId}/sync`)
	return axios.post(url, {
		documentId: con.documentId,
		sessionId: con.sessionId,
		sessionToken: con.sessionToken,
		token: con.shareToken,
		filePath: con.filePath,
		baseVersionEtag: con.baseVersionEtag,
		version: data.version,
	})
}
