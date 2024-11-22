/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import initWebSocketPolyfill from '../../services/WebSocketPolyfill.js'

describe('Init function', () => {

	it('returns a websocket polyfill class', () => {
		const syncService = { on: jest.fn(), open: jest.fn(() => Promise.resolve({ version: 123, session: {} })) }
		const Polyfill = initWebSocketPolyfill(syncService)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
	})

	it('registers handlers', () => {
		const syncService = { on: jest.fn(), open: jest.fn(() => Promise.resolve({ version: 123, session: {} })) }
		const Polyfill = initWebSocketPolyfill(syncService)
		const websocket = new Polyfill('url')
		expect(syncService.on).toHaveBeenCalled()
	})

	it('opens sync service', () => {
		const syncService = { on: jest.fn(), open: jest.fn(() => Promise.resolve({ version: 123, session: {} })) }
		const fileId = 123
		const initialSession = { }
		const Polyfill = initWebSocketPolyfill(syncService, fileId, initialSession)
		const websocket = new Polyfill('url')
		expect(syncService.open).toHaveBeenCalledWith({ fileId, initialSession })
	})

})
