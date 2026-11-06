/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SessionTransport } from '../../services/SessionTransport.ts'

import { describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import { SaveService } from '../../services/SaveService.ts'
import { SyncService } from '../../services/SyncService.ts'

const connection = { documentId: 'doc', sessionId: 7, sessionToken: 'host-owned', baseVersionEtag: 'base', filePath: '' }
function transport() {
	return { openContext: vi.fn(), sync: vi.fn(), push: vi.fn(async () => ({ data: { steps: [] } })), save: vi.fn(async () => ({ data: { document: { lastSavedVersion: 3 } } })), close: vi.fn(async () => ({})) }
}

describe('per-editor session transport', () => {
	it('waits for an in-flight push and drains work queued during that push', async () => {
		const host = transport()
		let resolve!: () => void
		host.push.mockImplementationOnce(() => new Promise((done) => {
			resolve = () => done({
				data: {
					steps: [],
				},
			})
		}))
		const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn(), transport: host as unknown as SessionTransport })
		service.sendStep(new Uint8Array([0, 1, 0]))
		const sending = service.sendStepsNow()
		service.sendStep(new Uint8Array([0, 1, 1]))
		const drained = service.drain()
		expect(service.sendStepsNow()).toBe(sending)
		expect(host.push).toHaveBeenCalledTimes(1)
		resolve()
		await drained
		expect(host.push).toHaveBeenCalledTimes(2)
		await service.close()
	})
	it('uses the supplied save transport and never falls back to sendBeacon', async () => {
		const host = transport()
		const beacon = vi.fn()
		Object.defineProperty(navigator, 'sendBeacon', { value: beacon, configurable: true })
		const service = new SaveService({ connection: shallowRef(connection), transport: host as unknown as SessionTransport, getSaveData: () => ({ version: 3, autosaveContent: 'Text', documentState: 'AA==' }) })
		expect(await service.save()).toBe(true)
		expect(host.save).toHaveBeenCalledOnce()
		expect(service.saveViaSendBeacon()).toBe(false)
		expect(beacon).not.toHaveBeenCalled()
	})
})
