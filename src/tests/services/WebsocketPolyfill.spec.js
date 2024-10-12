/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, it, vi, expect } from 'vitest'
import initWebSocketPolyfill from '../../services/WebSocketPolyfill.js'

describe('Init function', () => {

	it('returns a websocket polyfill class', () => {
		const syncService = { on: vi.fn(), open: vi.fn() }
		const Polyfill = initWebSocketPolyfill(syncService)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
	})

	it('registers handlers', () => {
		const syncService = { on: vi.fn(), open: vi.fn() }
		const Polyfill = initWebSocketPolyfill(syncService)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
		expect(syncService.on).toHaveBeenCalled()
	})

	it('opens sync service', () => {
		const syncService = { on: vi.fn(), open: vi.fn() }
		const fileId = 123
		const initialSession = { }
		const Polyfill = initWebSocketPolyfill(syncService, fileId, initialSession)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
		expect(syncService.open).toHaveBeenCalledWith({ fileId, initialSession })
	})

	it('sends steps to sync service', async () => {
		const syncService = {
			on: vi.fn(),
			open: vi.fn(),
			sendSteps: async getData => getData(),
		}
		const queue = ['initial']
		const data = { dummy: 'data' }
		const Polyfill = initWebSocketPolyfill(syncService, null, null, queue)
		const websocket = new Polyfill('url')
		const result = websocket.send(data)
		expect(result).toBeInstanceOf(Promise)
		expect(queue).toEqual(['initial', data])
		const dataSendOut = await result
		expect(queue).toEqual([])
		expect(dataSendOut).toHaveProperty('awareness')
		expect(dataSendOut).toHaveProperty('steps')
		expect(dataSendOut).toHaveProperty('version')
	})

	it('handles early reject', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		const syncService = {
			on: vi.fn(),
			open: vi.fn(),
			sendSteps: vi.fn().mockRejectedValue('error before reading steps in sync service'),
		}
		const queue = ['initial']
		const data = { dummy: 'data' }
		const Polyfill = initWebSocketPolyfill(syncService, null, null, queue)
		const websocket = new Polyfill('url')
		const result = websocket.send(data)
		expect(queue).toEqual(['initial', data])
		expect(result).toBeInstanceOf(Promise)
		const returned = await result
		expect(returned).toBeUndefined()
		expect(queue).toEqual(['initial', data])
	})

	it('handles reject after reading data', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		const syncService = {
			on: vi.fn(),
			open: vi.fn(),
			sendSteps: vi.fn().mockImplementation(async getData => {
				getData()
				throw new Error('error when sending in sync service')
			}),
		}
		const queue = ['initial']
		const data = { dummy: 'data' }
		const Polyfill = initWebSocketPolyfill(syncService, null, null, queue)
		const websocket = new Polyfill('url')
		const result = websocket.send(data)
		expect(queue).toEqual(['initial', data])
		expect(result).toBeInstanceOf(Promise)
		const returned = await result
		expect(returned).toBeUndefined()
		expect(queue).toEqual(['initial', data])
	})

	it('queue survives a close', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		const syncService = {
			on: vi.fn(),
			open: vi.fn(),
			sendSteps: vi.fn().mockImplementation(async getData => {
				getData()
				throw new Error('error when sending in sync service')
			}),
			sendStepsNow: vi.fn().mockImplementation(async getData => {
				getData()
				throw new Error('sendStepsNow error when sending')
			}),
			off: vi.fn(),
			close: vi.fn(async data => data),
		}
		const queue = ['initial']
		const data = { dummy: 'data' }
		const Polyfill = initWebSocketPolyfill(syncService, null, null, queue)
		const websocket = new Polyfill('url')
		websocket.onclose = vi.fn()
		await websocket.send(data)
		const promise = websocket.close()
		expect(queue).toEqual(['initial', data])
		await promise
		expect(queue).toEqual(['initial', data])
	})

})
