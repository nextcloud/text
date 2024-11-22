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

import { logger } from '../helpers/logger.js'
import { decodeArrayBuffer } from '../helpers/base64.js'

/**
 *
 * @param {object} syncService - the sync service to build upon
 * @param {number} fileId - id of the file to open
 * @param {object} initialSession - initial session to open
 */
export default function initWebSocketPolyfill(syncService, fileId, initialSession) {
	return class WebSocketPolyfill {

		#url
		binaryType
		onmessage
		onerror
		onclose
		onopen
		#handlers

		constructor(url) {
			this.url = url
			logger.debug('WebSocketPolyfill#constructor', { url, fileId, initialSession })
			this.#registerHandlers({
				sync: ({ steps, version }) => {
					if (steps) {
						steps.forEach(s => {
							const data = decodeArrayBuffer(s.step)
							this.onmessage({ data })
						})
						logger.debug('synced ', { version, steps })
					}
				},
			})

			syncService.open({ fileId, initialSession }).then((data) => {
				if (syncService.hasActiveConnection) {
					this.onopen?.()
				}
			})
		}

		#registerHandlers(handlers) {
			this.#handlers = handlers
			Object.entries(this.#handlers)
				.forEach(([key, value]) => syncService.on(key, value))
		}

		send(step) {
			// Useful for debugging what steps are sent and how they were initiated
			// logStep(step)
			syncService.sendStep(step)
		}

		async close() {
			Object.entries(this.#handlers)
				.forEach(([key, value]) => syncService.off(key, value))
			this.#handlers = []
			this.onclose()
			logger.debug('Websocket closed')
		}

	}
}
