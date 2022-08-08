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
		#document
		binaryType
		onmessage
		onerror
		onclose
		onopen

		constructor(url) {
			this.url = url
			logger.debug(url, fileId)
			this.#registerHandlers()
			syncService.open({
				fileId,
				filePath: syncService.options.filePath,
			})
		}

		#registerHandlers() {
			syncService.on('opened', this.onOpened.bind(this))
			syncService.on('loaded', this.onLoaded.bind(this))
			syncService.on('sync', this.onSync.bind(this))
		}

		send(data) {
			logger.debug(data)
			syncService.sendSteps(() => {
				const doc = this.#document
				return {
					version: doc.currentVersion,
					steps: [data],
				}
			})
		}

		onOpened({ document, session }) {
			this.#document = document
			this.#session = session
			this.onopen()
		}

		onLoaded({ document, session, content }) {
			this.#document = document
			this.#session = session
		}

		onSync({ steps, document }) {
			this.#document = document
			if (steps) {
				steps.forEach(s => {
					this.onmessage({ data: s.step })
				})
			}
		}

		close() {
			syncService.off('opened', this.onOpened.bind(this))
			syncService.off('loaded', this.onLoaded.bind(this))
			syncService.off('sync', this.onSync.bind(this))
			syncService.close()
			logger.debug('Websocket closed')
		}

	}
}
