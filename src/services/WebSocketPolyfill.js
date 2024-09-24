/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { logger } from '../helpers/logger.js'
import { decodeArrayBuffer } from '../helpers/base64.ts'
import { getSteps, getAwareness } from '../helpers/yjs.js'
import getNotifyBus from './NotifyService.js'

/**
 *
 * @param {object} syncService - the sync service to build upon
 * @param {number} fileId - id of the file to open
 * @param {object} initialSession - initial session to open
 * @param {object[]} queue - queue for the outgoing steps
 */
export default function initWebSocketPolyfill(syncService, fileId, initialSession, queue) {
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
		#notifyPushBus

		constructor(url) {
			this.#notifyPushBus = getNotifyBus()
			this.#notifyPushBus?.on('notify_push', this.#onNotifyPush.bind(this))
			this.url = url
			logger.debug('WebSocketPolyfill#constructor', { url, fileId, initialSession })
			this.#registerHandlers({
				opened: ({ version, session }) => {
					logger.debug('opened ', { version, session })
					this.#version = version
					this.#session = session
				},
				loaded: ({ version, session, content }) => {
					logger.debug('loaded ', { version, session })
					this.#version = version
					this.#session = session
				},
				sync: ({ steps, version }) => {
					logger.debug('synced ', { version, steps })
					console.debug(JSON.stringify({ synced: { version, steps } }))
					this.#version = version
					if (steps) {
						steps.forEach(s => {
							const data = decodeArrayBuffer(s.step)
							this.onmessage({ data })
						})
					}
				},
			})

			syncService.open({ fileId, initialSession }).then((data) => {
				if (syncService.hasActiveConnection) {
					const { version, session } = data
					this.#version = version
					this.#session = session

					this.onopen?.()
				}
			})
		}

		#registerHandlers(handlers) {
			this.#handlers = handlers
			Object.entries(this.#handlers)
				.forEach(([key, value]) => syncService.on(key, value))
		}

		send(...data) {
			// Useful for debugging what steps are sent and how they were initiated
			// data.forEach(logStep)

			queue.push(...data)
			let outbox = []
			return syncService.sendSteps(() => {
				const data = {
					steps: getSteps(queue),
					awareness: getAwareness(queue),
					version: this.#version,
				}
				outbox = [...queue]
				logger.debug('sending steps ', data)
				return data
			})?.then(ret => {
				// only keep the steps that were not send yet
				queue.splice(0,
					queue.length,
					...queue.filter(s => !outbox.includes(s)),
				)
				return ret
			}, err => {
				logger.error(`Failed to push the queue with ${queue.length} steps to the server`, err)
				this.onerror?.(err)
			})
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
