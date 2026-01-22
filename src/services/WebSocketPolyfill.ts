/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { OpenData } from '../apis/connect'
import { decodeArrayBuffer, encodeArrayBuffer } from '../helpers/base64'
import { logger } from '../helpers/logger.js'
import { stepsFromOpenData } from '../helpers/yjs'
import getNotifyBus from './NotifyService'
import type { Step, SyncService } from './SyncService'

// Optional debug logging if window.OCA.Text.logWebSocketPolyfill is set.
const debug = (message: string, context?: Record<string, unknown>) => {
	if (window.OCA?.Text?.logWebSocketPolyfill) {
		logger.debug(message, context)
	}
}

/**
 *
 * @param syncService - the sync service to build upon
 * @param fileId - id of the file to open
 */
export default function initWebSocketPolyfill(
	syncService: SyncService,
	fileId: number,
) {
	return class WebSocketPolyfill {
		#url
		binaryType: 'blob' | 'arraybuffer' = 'blob'
		onmessage?: (message: MessageEvent) => void
		onerror?: (error: Event) => void
		onclose?: (event: CloseEvent) => void
		onopen?: () => void
		#notifyPushBus
		#onSync
		#onOpened
		#processingVersion = 0

		constructor(url: string) {
			this.#notifyPushBus = getNotifyBus()
			this.#notifyPushBus?.on('notify_push', this.#onNotifyPush.bind(this))
			this.#url = url
			debug('WebSocketPolyfill#constructor', { url, fileId })

			this.#onOpened = (data: OpenData) => {
				debug('WebSocketPolyfill#onOpen', { data })
				if (syncService.hasActiveConnection()) {
					this.onopen?.()
				}
				this.#processSteps(stepsFromOpenData(data))
			}
			syncService.bus.on('opened', this.#onOpened)

			this.#onSync = ({ steps }: { steps: Step[] }) => {
				debug('WebSocketPolyfill#onSync', { steps })
				if (steps) {
					this.#processSteps(steps)
					debug('synced ', {
						version: syncService.version,
						steps,
					})
				}
			}
			syncService.bus.on('sync', this.#onSync)

			syncService.open()
		}

		/**
		 * Process the given steps, handing them to the onmessage handler
		 *
		 * Set this.#processingVersion for detecting and logging immediate responses in `send()`.
		 *
		 * @param steps steps to process
		 */
		#processSteps(steps: Step[]): void {
			steps.forEach((s) => {
				this.#processingVersion = s.version
				s.data.forEach((singleStep) => {
					const data = decodeArrayBuffer(singleStep)
					this.onmessage?.(new MessageEvent('processing step', { data }))
				})
				syncService.version = Math.max(
					syncService.version,
					this.#processingVersion,
				)
			})
			this.#processingVersion = 0
		}

		send(step: Uint8Array<ArrayBufferLike>) {
			// Useful for debugging what steps are sent and how they were initiated
			// logStep(step)

			const encoded = encodeArrayBuffer(step)
			const isSyncStep1 = encoded < 'AAE'
			if (!this.#processingVersion || !isSyncStep1) {
				syncService.sendStep(step)
				return
			}

			// If `this.#processingVersion` is set, we're in the middle of applying steps of one version.
			// If `isSyncStep1`, Yjs failed to integrate a message due to pending structs.
			// Log and ask for recovery due to a not applied/missing step.
			logger.error(`Failed to process step ${this.#processingVersion}.`, {
				lastSuccessfullyProcessed: syncService.version,
				sendingSyncStep1: step,
			})
			// Do not increase the syncService.version for the current steps
			// as we failed to process them.
			this.#processingVersion = 0
			syncService.sendRecoveryStep(step)
		}

		async close() {
			syncService.bus.off('sync', this.#onSync)
			syncService.bus.off('opened', this.#onOpened)
			this.#notifyPushBus?.off('notify_push', this.#onNotifyPush.bind(this))
			this.onclose?.(new CloseEvent('closing'))
			debug('Websocket closed')
		}

		#onNotifyPush({
			messageBody,
		}: {
			messageBody: { documentId: number; steps: string[] }
		}) {
			debug('WebSocketPolyfill#onNotifyPush', messageBody)
			if (messageBody.documentId !== fileId) {
				return
			}
			messageBody.steps.forEach((step) => {
				const data = decodeArrayBuffer(step)
				this.onmessage?.(new MessageEvent('notify pushed', { data }))
			})
		}
	}
}
