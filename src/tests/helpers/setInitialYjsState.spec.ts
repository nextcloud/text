/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SyncService } from '../../services/SyncService.ts'

import * as decoding from 'lib0/decoding'
import mitt from 'mitt'
import { describe, expect, it, vi } from 'vitest'
import { applyUpdate, Doc, XmlText } from 'yjs'
import { setInitialYjsState } from '../../helpers/setInitialYjsState.ts'
import initWebSocketPolyfill from '../../services/WebSocketPolyfill.ts'
import { WebsocketProvider } from '../../services/y-websocket.js'

const content = '# Hello world\n\nold line :)\n'

/**
 * Create a provider connected to a sync service that records the sent steps.
 */
async function setupProvider() {
	const ydoc = new Doc()
	const syncService = {
		bus: mitt(),
		open: vi.fn(async () => {}),
		hasActiveConnection: () => true,
		sendStep: vi.fn(),
	}
	const WebSocketPolyfill = initWebSocketPolyfill(syncService as unknown as SyncService)
	const provider = new WebsocketProvider('ws://localhost:1234', 'file:123', ydoc, {
		WebSocketPolyfill: WebSocketPolyfill as unknown as typeof WebSocket,
		disableBc: true,
	})
	await vi.waitUntil(() => provider.wsconnected)
	const sentUpdates = () => syncService.sendStep.mock.calls
		.map(([step]) => decoding.createDecoder(step))
		// sync message containing a sync step 2 or update
		.filter((decoder) => decoding.readVarUint(decoder) === 0 && decoding.readVarUint(decoder) > 0)
		.map((decoder) => decoding.readVarUint8Array(decoder))
	return { ydoc, provider, sentUpdates }
}

describe('setInitialYjsState', () => {
	it('applies the content with the given origin', () => {
		const ydoc = new Doc()
		const origin = {}
		const onUpdate = vi.fn()
		ydoc.on('update', onUpdate)
		setInitialYjsState(ydoc, content, { isRichEditor: true, origin })
		expect(onUpdate).toHaveBeenCalledOnce()
		expect(onUpdate.mock.calls[0][1]).toBe(origin)
		expect(ydoc.getXmlFragment('default').toString()).toContain('old line :)')
	})

	it('is not sent with the sync provider as origin', async () => {
		const { ydoc, provider, sentUpdates } = await setupProvider()
		setInitialYjsState(ydoc, content, { isRichEditor: true, origin: provider })
		expect(sentUpdates()).toHaveLength(0)
		provider.destroy()
	})

	it('is sent along with the first local change', async () => {
		const { ydoc, provider, sentUpdates } = await setupProvider()
		setInitialYjsState(ydoc, content, { isRichEditor: true, origin: provider })
		ydoc.getXmlFragment('default').insert(0, [new XmlText('edit')])
		expect(sentUpdates()).toHaveLength(1)
		const remote = new Doc()
		applyUpdate(remote, sentUpdates()[0])
		expect(remote.getXmlFragment('default').toString())
			.toBe(ydoc.getXmlFragment('default').toString())
		provider.destroy()
	})
})
