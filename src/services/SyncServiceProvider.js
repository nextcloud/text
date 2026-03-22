/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { logger } from '../helpers/logger.ts'
import initWebSocketPolyfill from './WebSocketPolyfill.ts'
import { WebsocketProvider } from './y-websocket.js'

/**
 *
 * @param {object} options - options for the sync provider
 * @param {object} options.ydoc - the Ydoc
 * @param {object} options.syncService - sync service to build upon
 * @param {number} options.fileId - file id of the file to open
 * @param {number} options.queue - queue for outgoing steps
 * @param {object} options.initialSession - initialSession to start from
 * @param {object} options.awareness - awareness instance for the provider
 * @param {boolean} options.disableBc - disable broadcast channel synchronization
 * @param {string} options.baseVersionEtag - changes when a new editing session starts
 */
export default function createSyncServiceProvider({
	ydoc,
	syncService,
	fileId,
	initialSession,
	queue,
	awareness,
	disableBc,
	baseVersionEtag,
}) {
	if (!fileId) {
		// We need a file id as a unique identifier for y.js as otherwise state might leak between different files
		throw new Error('fileId is required')
	}
	const WebSocketPolyfill = initWebSocketPolyfill(
		syncService,
		fileId,
		initialSession,
		queue,
	)
	const websocketProvider = new WebsocketProvider(
		'ws://localhost:1234',
		'file:' + fileId,
		ydoc,
		{ WebSocketPolyfill, awareness, disableBc },
	)
	websocketProvider.on('status', (event) => logger.debug('status', event))
	return websocketProvider
}
