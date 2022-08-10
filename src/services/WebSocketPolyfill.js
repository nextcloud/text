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

/**
 *
 * @param {object} syncService - the sync service to build upon
 * @param {number} fileId - id of the file to open
 */
export default function initWebSocketPolyfill(syncService, fileId) {
	return class WebSocketPolyfill {

		#url
		#session
		#version
		binaryType
		onmessage
		onerror
		onclose
		onopen
		#handlers
		#queue

		constructor(url) {
			this.url = url
			this.#queue = []
			logger.debug(url, fileId)
			this.#registerHandlers({
				opened: ({ version, session }) => {
					this.#version = version
					logger.debug('opened ', version, session)
					this.#session = session
					this.onopen()
				},
				loaded: ({ version, session, content }) => {
					logger.debug('loaded ', version, session)
					this.#version = version
					this.#session = session
				},
				sync: ({ steps, version }) => {
					logger.debug('synced ', version, steps)
					this.#version = version
					if (steps) {
						steps.forEach(s => {
							this.onmessage({ data: s.step })
						})
					}
				},
			})
			syncService.open({
				fileId,
				filePath: syncService.options.filePath,
			})
		}

		#registerHandlers(handlers) {
			this.#handlers = handlers
			Object.entries(this.#handlers)
				.forEach(([key, value]) => syncService.on(key, value))
		}

		send(...data) {
			const sending = this.#queue.length > 0
			this.#queue.push(...data)
			if (!sending) {
				this.#initiateSending()
			}
		}

		#initiateSending() {
			let steps
			syncService.sendSteps(() => {
				steps = this.#queue
				this.#queue = []
				logger.debug('sending steps ', this.#version, steps.length, steps)
				return {
					version: this.#version,
					steps,
				}
			})?.catch(() => {
				// try again
				this.send(...steps)
			})
		}

		close() {
			Object.entries(this.#handlers)
				.forEach(([key, value]) => syncService.off(key, value))
			this.#handlers = []
			syncService.close().then(() => {
				this.onclose()
			})
			logger.debug('Websocket closed')
		}

	}
}
