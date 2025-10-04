/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { decodeArrayBuffer } from '../helpers/base64.js'
import { logger } from '../helpers/logger.js'
import getNotifyBus from './NotifyService'
import type { FlatStep, SyncService } from './SyncService.js'

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
		#processingVersion = 0
		#onSync

		constructor(url: string) {
			this.#notifyPushBus = getNotifyBus()
			this.#notifyPushBus?.on('notify_push', this.#onNotifyPush.bind(this))
			this.#url = url
			logger.debug('WebSocketPolyfill#constructor', { url, fileId })

			this.#onSync = ({ steps }: { steps: FlatStep[] }) => {
				if (steps) {
					steps.forEach((s) => this.#processStep(s))
					syncService.version = Math.max(
						syncService.version,
						this.#processingVersion,
					)
					logger.debug('synced ', {
						version: this.#processingVersion,
						steps,
					})
					this.#processingVersion = 0
				}
			}

			syncService.bus.on('sync', this.#onSync)

			syncService.open().then(() => {
				if (syncService.hasActiveConnection()) {
					this.onopen?.()
				}
			})
		}

		send(step: ArrayBuffer) {
			// Useful for debugging what steps are sent and how they were initiated
			// logStep(step)
			if (this.#processingVersion) {
				// this is a direct response while processing the step
				console.warn(`Failed to process step ${this.#processingVersion}.`, {
					step,
				})
				this.#processingVersion = 0
			}
			syncService.sendStep(step)
		}

		async close() {
			syncService.bus.off('sync', this.#onSync)
			this.#notifyPushBus?.off('notify_push', this.#onNotifyPush.bind(this))
			this.onclose?.(new CloseEvent('closing'))
			logger.debug('Websocket closed')
		}

		#onNotifyPush({
			messageBody,
		}: {
			messageBody: { documentId: number; steps: string[] }
		}) {
			if (messageBody.documentId !== fileId) {
				return
			}
			messageBody.steps.forEach((step) => {
				const data = decodeArrayBuffer(step)
				this.onmessage?.(new MessageEvent('notify pushed', { data }))
			})
		}

		#processStep({ step, version }: { step: string; version: number }) {
			// done processing the previous version
			if ((version ?? 0) > this.#processingVersion) {
				syncService.version = Math.max(
					syncService.version,
					this.#processingVersion,
				)
			}
			this.#processingVersion = version
			const data = decodeArrayBuffer(step)
			this.onmessage?.(new MessageEvent('processing step', { data }))
		}
	}
}
