/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Mock } from 'vitest'

import * as decoding from 'lib0/decoding'
import * as encoding from 'lib0/encoding'
import mitt from 'mitt'
import { describe, expect, it, vi } from 'vitest'
import * as syncProtocol from 'y-protocols/sync'
import * as Y from 'yjs'
import { encodeArrayBuffer } from '../../helpers/base64.ts'
import { setInitialYjsState } from '../../helpers/setInitialYjsState.ts'
import initWebSocketPolyfill from '../../services/WebSocketPolyfill.ts'
import { messageSync, WebsocketProvider } from '../../services/y-websocket.js'

describe('setInitialYjsState', () => {
	it('applies the content to the ydoc', () => {
		const ydoc = new Y.Doc()
		setInitialYjsState(ydoc, '# Hello world', { isRichEditor: true })
		expect(ydoc.getXmlFragment('default').length).toBeGreaterThan(0)
	})

	it('passes the given origin to the update', () => {
		const ydoc = new Y.Doc()
		const origin = { iAmTheOrigin: true }
		const updateHandler = vi.fn()
		ydoc.on('update', updateHandler)
		setInitialYjsState(ydoc, '# Hello world', { isRichEditor: true, origin })
		expect(updateHandler).toHaveBeenCalledTimes(1)
		expect(updateHandler.mock.calls[0][1]).toBe(origin)
	})

	describe('with the sync provider as origin', () => {
		// Sync update messages sort between 'AAE' and 'AQ' in base64,
		// matching the classification in Outbox.storeStep.
		const isSyncUpdate = (step: Uint8Array) => {
			const encoded = encodeArrayBuffer(step)
			return encoded >= 'AAE' && encoded < 'AQ'
		}

		const setupProvider = async (ydoc: Y.Doc) => {
			const syncService = {
				bus: mitt(),
				open: vi.fn(async () => ({})),
				hasActiveConnection: vi.fn(() => true),
				sendStep: vi.fn(),
				version: -1,
			}
			const WebSocketPolyfill = initWebSocketPolyfill(
				syncService as any,
				123,
			)
			const provider = new WebsocketProvider(
				'ws://localhost:1234',
				'file:123',
				ydoc,
				{ WebSocketPolyfill: WebSocketPolyfill as any, disableBc: true },
			)
			// wait for the deferred onopen call of the polyfill
			await vi.waitUntil(() => provider.wsconnected)
			const sentSyncUpdates = () => (syncService.sendStep as Mock).mock.calls
				.map(([step]) => step)
				.filter(isSyncUpdate)
			return { provider, sentSyncUpdates }
		}

		it('does not send the initial state as a step', async () => {
			const ydoc = new Y.Doc()
			const { provider, sentSyncUpdates } = await setupProvider(ydoc)
			setInitialYjsState(ydoc, '# Hello world', {
				isRichEditor: true,
				origin: provider,
			})
			expect(sentSyncUpdates()).toHaveLength(0)
		})

		it('sends the initial state along with later local changes', async () => {
			const ydoc = new Y.Doc()
			const { provider, sentSyncUpdates } = await setupProvider(ydoc)
			setInitialYjsState(ydoc, '# Hello world', {
				isRichEditor: true,
				origin: provider,
			})
			// a local change without origin - as caused by user edits
			const paragraph = new Y.XmlElement('paragraph')
			paragraph.insert(0, [new Y.XmlText('typed later')])
			ydoc.getXmlFragment('default').insert(0, [paragraph])
			const sent = sentSyncUpdates()
			expect(sent).toHaveLength(1)
			// the sent update also contains the initial state
			const receiving = new Y.Doc()
			const decoder = decoding.createDecoder(sent[0])
			expect(decoding.readVarUint(decoder)).toBe(messageSync)
			syncProtocol.readSyncMessage(
				decoder,
				encoding.createEncoder(),
				receiving,
				'test',
			)
			const received = receiving.getXmlFragment('default').toJSON()
			expect(received).toContain('Hello world')
			expect(received).toContain('typed later')
		})

		it('sends the initial state as a step without an origin', async () => {
			const ydoc = new Y.Doc()
			const { sentSyncUpdates } = await setupProvider(ydoc)
			setInitialYjsState(ydoc, '# Hello world', { isRichEditor: true })
			expect(sentSyncUpdates()).toHaveLength(1)
		})
	})
})
