/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Connection } from '../../composables/useConnection.ts'

import { describe, expect, it, vi } from 'vitest'
import { ref, shallowRef } from 'vue'
import * as saveApi from '../../apis/save.ts'
import { SaveService } from '../../services/SaveService.ts'
import { ERROR_TYPE } from '../../services/SyncService.ts'

vi.mock('../../apis/save.ts')

const connection = shallowRef<Connection | undefined>({
	documentId: 123,
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
		const saveService = new SaveService({
			connection,
			document: ref(undefined),
			getSaveData,
		})
		const onError = vi.fn()
		saveService.bus.on('error', onError)

		await saveService.save()

		expect(onError).toHaveBeenCalledWith({
			type: ERROR_TYPE.SAVE_COLLISION,
			data: { outsideChange: 'outside content' },
		})
	})
})
