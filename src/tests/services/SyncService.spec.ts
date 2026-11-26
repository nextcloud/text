/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type PollingBackend from '../../services/PollingBackend.ts'

import { describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import * as connect from '../../apis/connect.ts'
import * as sync from '../../apis/sync.ts'
import { provideConnection } from '../../composables/useConnection.js'
import { IDLE_TIMEOUT, SyncService } from '../../services/SyncService.js'

vi.mock('../../apis/connect')
vi.mock('../../apis/sync')

const connection = {
	documentId: '123',
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
		documentId: '123',
		displayName: 'My Name',
		lastAwarenessMessage: 'hi',
		clientId: 1,
	},
	document: {
		id: '123',
		baseVersionEtag: 'etag',
		initialVersion: 0,
		lastSavedVersion: 345,
		lastSavedVersionTime: Date.now(),
	},
	readOnly: false,
	content: '',
	canAttachFiles: true,
}

const openResult = { connection, data: initialData }

describe('Sync service', () => {
	it('opens a connection', async () => {
		const getBaseVersionEtag = vi.fn()
		const setBaseVersionEtag = vi.fn()
		const { connection, openConnection, openData } = provideConnection(
			{
				context: { type: 'file', id: 123 },
				relativePath: './',
			},
			getBaseVersionEtag,
			setBaseVersionEtag,
		)
		vi.mocked(connect.openContext).mockResolvedValue(openResult)
		const openHandler = vi.fn()
		const service = new SyncService({ connection, openConnection })
		service.bus.on('opened', openHandler)
		await service.open()
		expect(setBaseVersionEtag).toHaveBeenCalledWith('etag')
		expect(openHandler).toHaveBeenCalledWith(expect.objectContaining({ session: initialData.session }))
		expect(openData.value?.canAttachFiles).toBe(true)
	})

	describe('idle', () => {
		const minutes = (count: number) => count * 60 * 1000
		const awarenessOnly = { steps: [], sessions: [initialData.session] }
		const withChanges = { steps: [{ version: 1, data: [], sessionId: 345 }] }

		it('becomes idle after polling without changes for the idle timeout', () => {
			vi.useFakeTimers()
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })
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
				{ context: { type: 'file', id: 123 }, relativePath: './' },
				vi.fn(),
				vi.fn(),
			)
			vi.mocked(connect.openContext).mockResolvedValue(openResult)
			const service = new SyncService({ connection: con, openConnection })
			await service.open()
			vi.advanceTimersByTime(minutes(IDLE_TIMEOUT + 1))
			expect(service.checkIdle()).toBe(true)

			vi.mocked(connect.close).mockResolvedValue({} as Awaited<ReturnType<typeof connect.close>>)
			await service.close()
			await service.open()
			service.receiveSteps(awarenessOnly)

			expect(service.checkIdle()).toBe(false)
			vi.useRealTimers()
		})

		it('stays active while changes arrive', () => {
			vi.useFakeTimers()
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })

			vi.advanceTimersByTime(minutes(IDLE_TIMEOUT - 1))
			service.receiveSteps(withChanges)
			vi.advanceTimersByTime(minutes(IDLE_TIMEOUT - 1))

			expect(service.checkIdle()).toBe(false)
			vi.useRealTimers()
		})
	})

	describe('pending changes', () => {
		// sync message with an empty yjs update
		const update = new Uint8Array([0, 2, 2, 0, 0])

		it('are pending until pushed', async () => {
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })
			const onPendingChanges = vi.fn()
			service.bus.on('pendingChanges', onPendingChanges)
			vi.mocked(sync.push).mockResolvedValue({ data: { steps: [], documentState: '', version: 1 } })
			service.sendStep(update)
			expect(onPendingChanges).toHaveBeenCalledExactlyOnceWith({ pending: true })
			await service.sendStepsNow()
			expect(onPendingChanges).toHaveBeenLastCalledWith({ pending: false })
		})

		it('remain pending if the push fails', async () => {
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })
			const onPendingChanges = vi.fn()
			service.bus.on('pendingChanges', onPendingChanges)
			vi.mocked(sync.push).mockRejectedValue({ code: 'ECONNABORTED' })
			service.sendStep(update)
			await expect(service.sendStepsNow()).rejects.toThrow()
			expect(onPendingChanges).toHaveBeenCalledExactlyOnceWith({ pending: true })
		})

		it('remain pending without a push error if the file is locked', async () => {
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })
			const pollNow = vi.fn()
			service.backend = { pollNow } as unknown as PollingBackend
			const onPendingChanges = vi.fn()
			const onError = vi.fn()
			service.bus.on('pendingChanges', onPendingChanges)
			service.bus.on('error', onError)
			vi.mocked(sync.push).mockRejectedValue({ response: { status: 423, data: { lock: { displayName: 'Jane', token: 'token' } } } })
			service.sendStep(update)
			await expect(service.sendStepsNow()).rejects.toThrow()
			expect(onPendingChanges).toHaveBeenCalledExactlyOnceWith({ pending: true })
			expect(service.pushError).toBe(0)
			expect(onError).not.toHaveBeenCalled()
			expect(pollNow).toHaveBeenCalledOnce()
		})

		it('are pushed once while a push is in flight', async () => {
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })
			vi.mocked(sync.push).mockClear()
			vi.mocked(sync.push).mockResolvedValue({ data: { steps: [], documentState: '', version: 1 } })
			service.sendStep(update)
			await Promise.all([service.sendStepsNow(), service.sendStepsNow()])
			expect(sync.push).toHaveBeenCalledOnce()
		})

		it('stop the send interval once the connection is closed', async () => {
			vi.useFakeTimers()
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })
			vi.mocked(connect.close).mockResolvedValue({} as Awaited<ReturnType<typeof connect.close>>)
			await service.close()
			service.sendStep(update)
			await vi.advanceTimersByTimeAsync(200)
			expect(vi.getTimerCount()).toBe(0)
			vi.useRealTimers()
		})

		it('are pushed again if they remain after a push in flight', async () => {
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })
			vi.mocked(sync.push).mockClear()
			vi.mocked(sync.push)
				.mockRejectedValueOnce({ code: 'ECONNABORTED' })
				.mockResolvedValue({ data: { steps: [], documentState: '', version: 1 } })
			service.sendStep(update)
			const inFlight = service.sendStepsNow()
			await service.sendRemainingSteps()
			await expect(inFlight).rejects.toThrow()
			expect(sync.push).toHaveBeenCalledTimes(2)
		})
	})

	describe('check whether the session was removed', () => {
		it('drops the session the server removed along with the file', async () => {
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })
			vi.mocked(sync.sync).mockRejectedValueOnce({ response: { status: 412 } })
			await service.invalidateSessionIfRemoved()
			expect(service.connection.value).toBeUndefined()
		})

		it('keeps the session of a moved file', async () => {
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })
			vi.mocked(sync.sync).mockResolvedValueOnce({} as Awaited<ReturnType<typeof sync.sync>>)
			await service.invalidateSessionIfRemoved()
			expect(service.connection.value).toEqual(connection)
		})

		it('keeps the session on connection errors', async () => {
			const service = new SyncService({ connection: shallowRef(connection), openConnection: vi.fn() })
			vi.mocked(sync.sync).mockRejectedValueOnce({ code: 'ECONNABORTED' })
			await service.invalidateSessionIfRemoved()
			expect(service.connection.value).toEqual(connection)
		})
	})
})
