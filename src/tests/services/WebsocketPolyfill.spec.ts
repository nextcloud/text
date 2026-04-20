/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import { SyncService } from '../../services/SyncService'
import initWebSocketPolyfill from '../../services/WebSocketPolyfill.js'

describe('Init function', () => {
	vi.mock(import('../../services/SyncService'), () => {
		const SyncService = vi.fn()
		SyncService.prototype.bus = { on: vi.fn() }
		SyncService.prototype.open = vi.fn().mockImplementation(async () => ({}))
		SyncService.prototype.hasActiveConnection = vi.fn()
		return { SyncService }
	})
	const mockSyncService = () =>
		new SyncService({
			connection: shallowRef(undefined),
			openConnection: vi.fn(),
		})

	it('returns a websocket polyfill class', () => {
		const syncService = mockSyncService()
		const Polyfill = initWebSocketPolyfill(syncService, 123)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
	})

	it('registers handlers', () => {
		const syncService = mockSyncService()
		const Polyfill = initWebSocketPolyfill(syncService, 123)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
		expect(syncService.bus.on).toHaveBeenCalled()
	})

	it('opens sync service', () => {
		const syncService = mockSyncService()
		const fileId = 123
		const Polyfill = initWebSocketPolyfill(syncService, fileId)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
		expect(syncService.open).toHaveBeenCalled()
	})
})
