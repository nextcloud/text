/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import initWebSocketPolyfill from '../../services/WebSocketPolyfill.js'

describe('Init function', () => {
	const mockSyncService = (mocked = {}) => {
		return {
			on: vi.fn(),
			open: vi.fn().mockImplementation(async () => ({})),
			...mocked,
		}
	}

	it('returns a websocket polyfill class', () => {
		const syncService = mockSyncService()
		const Polyfill = initWebSocketPolyfill(syncService)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
	})

	it('registers handlers', () => {
		const syncService = mockSyncService()
		const Polyfill = initWebSocketPolyfill(syncService)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
		expect(syncService.on).toHaveBeenCalled()
	})

	it('opens sync service', () => {
		const syncService = mockSyncService()
		const fileId = 123
		const initialSession = {}
		const Polyfill = initWebSocketPolyfill(syncService, fileId, initialSession)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
		expect(syncService.open).toHaveBeenCalledWith({ fileId, initialSession })
	})
})
