/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { logger } from '../helpers/logger.js'
import { decodeArrayBuffer } from '../helpers/base64.ts'
import getNotifyBus from './NotifyService.js'

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
		#notifyPushBus

		constructor(url) {
			this.#notifyPushBus = getNotifyBus()
			this.#notifyPushBus?.on('notify_push', this.#onNotifyPush.bind(this))
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

			this.#notifyPushBus?.off('notify_push', this.#onNotifyPush.bind(this))
			this.onclose()
			logger.debug('Websocket closed')
		}

		#onNotifyPush({ messageType, messageBody }) {
			if (messageBody.documentId !== fileId) {
				return
			}
			messageBody.steps.forEach(step => {
				const data = decodeArrayBuffer(step)
				this.onmessage({ data })
			})
		}

	}
}
