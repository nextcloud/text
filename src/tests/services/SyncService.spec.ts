/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import * as connect from '../../apis/connect'
import { provideConnection } from '../../composables/useConnection.js'
import { IDLE_TIMEOUT, SyncService } from '../../services/SyncService.js'

const connection = {
	documentId: 123,
	sessionId: 345,
	sessionToken: 'sessionToken',
	filePath: './',
	baseVersionEtag: 'etag',
}
const initialData = {
	session: {
		id: 345,
		userId: 'me',
		token: 'shareToken',
		color: '#abcabc',
		lastContact: Date.now(),
		documentId: 123,
		displayName: 'My Name',
		lastAwarenessMessage: 'hi',
		clientId: 1,
	},
	document: {
		id: 123,
		baseVersionEtag: 'etag',
		initialVersion: 0,
		lastSavedVersion: 345,
		lastSavedVersionTime: Date.now(),
	},
	readOnly: false,
	content: '',
	hasOwner: true,
}

const openResult = { connection, data: initialData }

describe('Sync service', () => {
	it('opens a connection', async () => {
		const getBaseVersionEtag = vi.fn()
		const setBaseVersionEtag = vi.fn()
		const { connection, openConnection, openData } = provideConnection(
			{
				fileId: 123,
				relativePath: './',
			},
			getBaseVersionEtag,
			setBaseVersionEtag,
		)
		vi.mock('../../apis/connect')
		vi.mocked(connect.open).mockResolvedValue(openResult)
		const openHandler = vi.fn()
		const service = new SyncService({ connection, openConnection })
		service.bus.on('opened', openHandler)
		await service.open()
		expect(setBaseVersionEtag).toHaveBeenCalledWith('etag')
		expect(openHandler).toHaveBeenCalledWith(
			expect.objectContaining({ session: initialData.session }),
		)
		expect(openData.value?.hasOwner).toBe(true)
	})

	describe('idle', () => {
		const minutes = (count: number) => count * 60 * 1000
		const awarenessOnly = { steps: [], sessions: [initialData.session] }
		const withChanges = { steps: [{ version: 1, data: [], sessionId: 345 }] }

		it('becomes idle after polling without changes for the idle timeout', () => {
			vi.useFakeTimers()
			const service = new SyncService({
				connection: shallowRef(connection),
				openConnection: vi.fn(),
			})
			const onIdle = vi.fn()
			service.bus.on('idle', onIdle)

			for (let elapsed = 0; elapsed <= IDLE_TIMEOUT; elapsed += 60) {
				service.receiveSteps(awarenessOnly)
				vi.advanceTimersByTime(minutes(60))
			}

			expect(service.checkIdle()).toBe(true)
			expect(onIdle).toHaveBeenCalledOnce()
			vi.useRealTimers()
		})

		it('is active again after reconnecting', async () => {
			vi.useFakeTimers()
			const { connection: con, openConnection } = provideConnection(
				{ fileId: 123, relativePath: './' },
				vi.fn(),
				vi.fn(),
			)
			vi.mocked(connect.open).mockResolvedValue(openResult)
			const service = new SyncService({ connection: con, openConnection })
			await service.open()
			vi.advanceTimersByTime(minutes(IDLE_TIMEOUT + 1))
			expect(service.checkIdle()).toBe(true)

			vi.mocked(connect.close).mockResolvedValue(
				{} as Awaited<ReturnType<typeof connect.close>>,
			)
			await service.close()
			await service.open()
			service.receiveSteps(awarenessOnly)

			expect(service.checkIdle()).toBe(false)
			vi.useRealTimers()
		})

		it('stays active while changes arrive', () => {
			vi.useFakeTimers()
			const service = new SyncService({
				connection: shallowRef(connection),
				openConnection: vi.fn(),
			})

			vi.advanceTimersByTime(minutes(IDLE_TIMEOUT - 1))
			service.receiveSteps(withChanges)
			vi.advanceTimersByTime(minutes(IDLE_TIMEOUT - 1))

			expect(service.checkIdle()).toBe(false)
			vi.useRealTimers()
		})
	})
})
