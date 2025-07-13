/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import type { Connection } from '../composables/useConnection.js'
import { unref, type ShallowRef } from 'vue'

/**
 * Upload an attachment to the server.
 * @param connection the active connection.
 * @param file upload this file.
 */
export function uploadAttachment(
	connection: ShallowRef<Connection> | Connection,
	file: string | Blob,
) {
	const {
		documentId,
		sessionId,
		sessionToken,
		shareToken: token,
	} = unref(connection)
	const params = Object.entries({ documentId, sessionId, sessionToken, token })
		.map(([k, v]) => v && [k, v.toString()]) // convert numbers to strings
		.filter((pair) => !!pair) // leave out token if it's undefined.
	const formData = new FormData()
	formData.append('file', file)
	const pub = token ? '/public' : ''
	const url =
		generateUrl(`apps/text${pub}/attachment/upload?`)
		+ new URLSearchParams(params)
	return axios.post(url, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}

/**
 * Create a new attachment based on the given template
 * @param connection the active connection
 * @param template create the attachment based on this
 * @param template.app app to create the attachment with
 * @param template.extension extension to use
 */
export function createAttachment(
	connection: ShallowRef<Connection> | Connection,
	template: { app: string; extension: string },
) {
	const {
		documentId,
		sessionId,
		sessionToken,
		shareToken: token,
	} = unref(connection)
	const pub = token ? '/public' : ''
	const url = generateUrl(`apps/text${pub}/attachment/create`)
	return axios.post(url, {
		documentId,
		sessionId,
		sessionToken,
		fileName: `${template.app}${template.extension}`,
	})
}

/**
 * Create a new attachment based on the given template
 * @param connection the active connection
 * @param filePath path to the file on the server.
 */
export function insertAttachmentFile(
	connection: ShallowRef<Connection> | Connection,
	filePath: string,
) {
	const {
		documentId,
		sessionId,
		sessionToken,
		shareToken: token,
	} = unref(connection)
	const pub = token ? '/public' : ''
	const url = generateUrl(`apps/text${pub}/attachment/filepath`)
	return axios.post(url, {
		documentId,
		sessionId,
		sessionToken,
		filePath,
	})
}
