/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import type { Connection } from '../composables/useConnection.js'
import { unref, type ShallowRef } from 'vue'

/**
 * Let Nextcloud know someone was mentioned
 * @param mention user id of the person that was mentioned
 * @param scope scope the user was mentioned in
 * @param options options
 * @param options.connection connection to the text editing session
 */
export function emitMention(
	mention: string,
	scope: object,
	{ connection }: { connection: ShallowRef<Connection> | Connection },
): Promise<void> {
	// TODO: Require actual connection - handle disconnected state early on
	const con = unref(connection)
	if (!con) {
		const err = new Error('Disconnected. Could not notify user about mention.')
		console.warn(err.message, { err, mention })
		return Promise.resolve()
	}
	const url = generateUrl(`apps/text/session/${con.documentId}/mention`)
	return axios.put(url, {
		documentId: con.documentId,
		sessionId: con.sessionId,
		sessionToken: con.sessionToken,
		mention,
		scope,
	})
	// TODO: handle errors:
	// * signal something is wrong with the connection
	// * wait for reconnect and fetch again
}

const USERS_LIST_ENDPOINT_URL = generateUrl('apps/text/api/v1/users')

/**
 * Look up user names to mention
 * @param filter string to look for in the user names
 * @param options options
 * @param options.connection connection to the text editing session
 */
export async function getUsers(
	filter: string,
	{ connection }: { connection: ShallowRef<Connection> },
): Promise<Record<string, string>> {
	// TODO: Require actual connection - handle disconnected state early on
	const con = unref(connection)
	if (!con) {
		const err = new Error('Disconnected. Could not lookup users to mention.')
		console.warn(err.message, { err })
		return Promise.resolve({})
	}
	const response = await axios.post(USERS_LIST_ENDPOINT_URL, { ...con, filter })
	// TODO: handle errors:
	// * signal something is wrong with the connection
	// * wait for reconnect and fetch again
	return JSON.parse(JSON.stringify(response.data))
}
