/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import * as connect from '../../apis/connect.ts'
import * as sync from '../../apis/sync.ts'
import { provideConnection } from '../../composables/useConnection.js'
import { SyncService } from '../../services/SyncService.js'

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
	})
})
