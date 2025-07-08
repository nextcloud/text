/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import axios from '@nextcloud/axios'
import type { Connection } from '../composables/useConnection.js'
import { unref, type ShallowRef } from 'vue'
import { generateUrl } from '@nextcloud/router'
import type { Step } from '../services/SyncService.js'

interface SyncData {
	version: number
	steps: string[]
	awareness: string
}

interface SyncResponse {
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
	data: SyncData,
): Promise<SyncResponse> {
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
