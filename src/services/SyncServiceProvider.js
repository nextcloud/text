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
 * @param {object} options.context - file id of the file to open
 * @param {object} options.awareness - awareness instance for the provider
 * @param {boolean} options.disableBc - disable broadcast channel synchronization
 */
export default function createSyncServiceProvider({
	ydoc,
	syncService,
	context,
	awareness,
	disableBc,
}) {
	if (!context) {
		// We need a file id as a unique identifier for y.js as otherwise state might leak between different files
		throw new Error('fileId is required')
	}
	const WebSocketPolyfill = initWebSocketPolyfill(syncService)
	const websocketProvider = new WebsocketProvider(
		'ws://localhost:1234',
		'file:' + context.type + '/' + context.id,
		ydoc,
		{ WebSocketPolyfill, awareness, disableBc },
	)
	websocketProvider.on('status', (event) => logger.debug('status', event))
	return websocketProvider
}
