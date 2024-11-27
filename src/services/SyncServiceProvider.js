/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { WebsocketProvider } from './y-websocket.js'
import initWebSocketPolyfill from './WebSocketPolyfill.js'
import { logger } from '../helpers/logger.js'

/**
 *
 * @param {object} options - options for the sync provider
 * @param {object} options.ydoc - the Ydoc
 * @param {object} options.syncService - sync service to build upon
 * @param {number} options.fileId - file id of the file to open
 * @param {number} options.queue - queue for outgoing steps
 * @param {object} options.initialSession - initialSession to start from
 * @param {boolean} options.disableBc - disable broadcast channel synchronization (default: disabled in debug mode, enabled otherwise)
 */
export default function createSyncServiceProvider({ ydoc, syncService, fileId, initialSession, queue, disableBc }) {
	if (!fileId) {
		// We need a file id as a unique identifier for y.js as otherwise state might leak between different files
		throw new Error('fileId is required')
	}
	const WebSocketPolyfill = initWebSocketPolyfill(syncService, fileId, initialSession, queue)
	disableBc = disableBc ?? !!window?._oc_debug
	const websocketProvider = new WebsocketProvider(
		'ws://localhost:1234',
		'file:' + fileId,
		ydoc,
		{ WebSocketPolyfill, disableBc },
	)
	websocketProvider.on('status', event => logger.debug('status', event))
	return websocketProvider
}
