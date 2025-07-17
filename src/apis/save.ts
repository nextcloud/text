/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getRequestToken } from '@nextcloud/auth'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { unref, type ShallowRef } from 'vue'
import type { Connection } from '../composables/useConnection.js'
import type { Document } from '../services/SyncService.js'

interface SaveData {
	version: number
	autosaveContent: string
	documentState: string
	force: boolean
	manualSave: boolean
}

interface SaveResponse {
	data: Document
}

/**
 * Save document
 * @param connection the active connection
 * @param data data save
 */
export function save(
	connection: ShallowRef<Connection> | Connection,
	data: SaveData,
): Promise<SaveResponse> {
	const con = unref(connection)
	const pub = con.shareToken ? '/public' : ''
	const url = generateUrl(`apps/text${pub}/session/${con.documentId}/save`)

	return axios.post(url, {
		documentId: con.documentId,
		sessionId: con.sessionId,
		sessionToken: con.sessionToken,
		token: con.shareToken,
		baseVersionEtag: con.baseVersionEtag,
		filePath: con.filePath,
		version: data.version,
		autosaveContent: data.autosaveContent,
		documentState: data.documentState,
		force: data.force,
		manualSave: data.manualSave,
	})
}

/**
 * Save document via `navigator.sendBeacon()`
 * @param connection the active connection
 * @param data data to save
 */
export function saveViaSendBeacon(
	connection: Connection,
	data: Omit<SaveData, 'force' | 'manualSave'>,
): boolean {
	const con = unref(connection)
	const pub = con.shareToken ? '/public' : ''
	const url = generateUrl(`apps/text${pub}/session/${con.documentId}/save`)

	const blob = new Blob(
		[
			JSON.stringify({
				documentId: con.documentId,
				sessionId: con.sessionId,
				sessionToken: con.sessionToken,
				token: con.shareToken,
				baseVersionEtag: con.baseVersionEtag,
				filePath: con.filePath,
				version: data.version,
				autosaveContent: data.autosaveContent,
				documentState: data.documentState,
				force: false,
				manualSave: true,
				requesttoken: getRequestToken() ?? '',
			}),
		],
		{
			type: 'application/json',
		},
	)
	return navigator.sendBeacon(url, blob)
}
