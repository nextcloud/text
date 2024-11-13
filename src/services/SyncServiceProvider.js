/*
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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
