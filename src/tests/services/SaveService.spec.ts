/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Connection } from '../../types/Connection.ts'

import { describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import * as saveApi from '../../apis/save.ts'
import { SaveService } from '../../services/SaveService.ts'
import { ERROR_TYPE } from '../../types/ErrorType.ts'

vi.mock('../../apis/save.ts')

const connection = shallowRef<Connection | undefined>({
	documentId: '123',
	sessionId: 345,
	sessionToken: 'sessionToken',
	filePath: './',
	baseVersionEtag: 'etag',
})
function getSaveData() {
	return {
		version: 1,
		autosaveContent: 'content',
		documentState: 'state',
	}
}

describe('SaveService', () => {
	it('emits a save collision when the file was changed outside', async () => {
		vi.mocked(saveApi.save).mockRejectedValue({
			response: { status: 409, data: { outsideChange: 'outside content' } },
		})
		const saveService = new SaveService({ connection, getSaveData })
		const onError = vi.fn()
		saveService.bus.on('error', onError)

		await saveService.save()

		expect(onError).toHaveBeenCalledWith({
			type: ERROR_TYPE.SAVE_COLLISION,
			data: { outsideChange: 'outside content' },
		})
	})

	it('does not save if pushing the changes invalidated the session', async () => {
		vi.mocked(saveApi.save).mockClear()
		const sessionConnection = shallowRef(connection.value)
		const saveService = new SaveService({
			connection: sessionConnection,
			getSaveData,
			pushChanges: async () => {
				sessionConnection.value = undefined
			},
		})

		await expect(saveService.save()).resolves.toBeUndefined()

		expect(saveApi.save).not.toHaveBeenCalled()
	})

	it('asks the save beacon to close the session', () => {
		vi.mocked(saveApi.saveViaSendBeacon).mockReturnValue(true)
		const saveService = new SaveService({ connection, getSaveData })

		expect(saveService.saveViaSendBeacon({ close: true })).toBe(true)

		expect(saveApi.saveViaSendBeacon).toHaveBeenCalledWith(connection.value, getSaveData(), true)
	})

	it('reports a save beacon the browser did not queue', () => {
		vi.mocked(saveApi.saveViaSendBeacon).mockReturnValue(false)
		const saveService = new SaveService({ connection, getSaveData })

		expect(saveService.saveViaSendBeacon()).toBe(false)
	})

	it('does not send a save beacon without a connection', () => {
		vi.mocked(saveApi.saveViaSendBeacon).mockClear()
		const saveService = new SaveService({ connection: shallowRef(undefined), getSaveData })

		expect(saveService.saveViaSendBeacon()).toBe(false)
		expect(saveApi.saveViaSendBeacon).not.toHaveBeenCalled()
	})

	it('pushes changes before saving', async () => {
		vi.mocked(saveApi.save).mockResolvedValue({
			data: { document: { lastSavedVersion: 2 } },
		} as Awaited<ReturnType<typeof saveApi.save>>)
		let version = 1
		const pushChanges = vi.fn(async () => {
			version = 2
		})
		const saveService = new SaveService({
			connection,
			getSaveData: () => ({ ...getSaveData(), version }),
			pushChanges,
		})

		expect(await saveService.save()).toBe(true)
		expect(pushChanges).toHaveBeenCalledOnce()
		expect(saveApi.save).toHaveBeenCalledWith(connection.value, expect.objectContaining({ version: 2 }))
	})
})
