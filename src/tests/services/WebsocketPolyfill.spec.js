/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import initWebSocketPolyfill from '../../services/WebSocketPolyfill.js'

describe('Init function', () => {

	it('returns a websocket polyfill class', () => {
		const syncService = { on: jest.fn(), open: jest.fn() }
		const Polyfill = initWebSocketPolyfill(syncService)
		const websocket = new Polyfill('url')
		expect(websocket).toBeInstanceOf(Polyfill)
	})

	it('registers handlers', () => {
		const syncService = { on: jest.fn(), open: jest.fn() }
		const Polyfill = initWebSocketPolyfill(syncService)
		const websocket = new Polyfill('url')
		expect(syncService.on).toHaveBeenCalled()
	})

	it('opens sync service', () => {
		const syncService = { on: jest.fn(), open: jest.fn() }
		const fileId = 123
		const initialSession = { }
		const Polyfill = initWebSocketPolyfill(syncService, fileId, initialSession)
		const websocket = new Polyfill('url')
		expect(syncService.open).toHaveBeenCalledWith({ fileId, initialSession })
	})

	it('sends steps to sync service', async () => {
		const syncService = {
			on: jest.fn(),
			open: jest.fn(),
			sendSteps: async getData => getData(),
		}
		const queue = [ 'initial' ]
		const data = { dummy: 'data' }
		const Polyfill = initWebSocketPolyfill(syncService, null, null, queue)
		const websocket = new Polyfill('url')
		const result = websocket.send(data)
		expect(result).toBeInstanceOf(Promise)
		expect(queue).toEqual([ 'initial' , data ])
		const dataSendOut = await result
		expect(queue).toEqual([])
		expect(dataSendOut).toHaveProperty('awareness')
		expect(dataSendOut).toHaveProperty('steps')
		expect(dataSendOut).toHaveProperty('version')
	})

	it('handles early reject', async () => {
		const syncService = {
			on: jest.fn(),
			open: jest.fn(),
			sendSteps: jest.fn().mockRejectedValue('error before reading steps in sync service'),
		}
		const queue = [ 'initial' ]
		const data = { dummy: 'data' }
		const Polyfill = initWebSocketPolyfill(syncService, null, null, queue)
		const websocket = new Polyfill('url')
		const result = websocket.send(data)
		expect(queue).toEqual([ 'initial' , data ])
		expect(result).toBeInstanceOf(Promise)
		const returned = await result
		expect(returned).toBeUndefined()
		expect(queue).toEqual([ 'initial' , data ])
	})

	it('handles reject after reading data', async () => {
		const syncService = {
			on: jest.fn(),
			open: jest.fn(),
			sendSteps: jest.fn().mockImplementation( async getData => {
				getData()
				throw 'error when sending in sync service'
			}),
		}
		const queue = [ 'initial' ]
		const data = { dummy: 'data' }
		const Polyfill = initWebSocketPolyfill(syncService, null, null, queue)
		const websocket = new Polyfill('url')
		const result = websocket.send(data)
		expect(queue).toEqual([ 'initial' , data ])
		expect(result).toBeInstanceOf(Promise)
		const returned = await result
		expect(returned).toBeUndefined()
		expect(queue).toEqual([ 'initial' , data ])
	})

	it('queue survives a close', async () => {
		const syncService = {
			on: jest.fn(),
			open: jest.fn(),
			sendSteps: jest.fn().mockImplementation( async getData => {
				getData()
				throw 'error when sending in sync service'
			}),
			sendStepsNow: jest.fn().mockImplementation( async getData => {
				getData()
				throw 'sendStepsNow error when sending'
			}),
			off: jest.fn(),
			close: jest.fn( async data => data ),
		}
		const queue = [ 'initial' ]
		const data = { dummy: 'data' }
		const Polyfill = initWebSocketPolyfill(syncService, null, null, queue)
		const websocket = new Polyfill('url')
		websocket.onclose = jest.fn()
		await websocket.send(data)
		const promise = websocket.close()
		expect(queue).toEqual([ 'initial' , data ])
		await promise
		expect(queue).toEqual([ 'initial' , data ])
	})

})
