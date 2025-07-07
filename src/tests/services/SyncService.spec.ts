/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, it, vi, expect } from 'vitest'
import { SyncService } from '../../services/SyncService.js'
import { provideConnection } from '../../composables/useConnection.js'
import * as connect from '../../apis/Connect'

const connection = { documentId: 123, sessionId: 345, sessionToken: 'sessionToken', filePath: './', baseVersionEtag: 'etag'}
const initialData = { session: { id: 345 }, document: { id: 123, baseVersionEtag: 'etag' }, readOnly: false, content: '', hasOwner: true }

const openData = { connection, data: initialData }

describe('Sync service', () => {
	it('opens a connection', async () => {
		const { connection, openConnection } = provideConnection({ fileId: 123, relativePath: './', })
		vi.mock('../../apis/Connect.ts')
		vi.mocked(connect.open).mockResolvedValue(openData)
		const openHandler = vi.fn()
		const service = new SyncService({ connection, openConnection })
		service.on('opened', openHandler)
		await service.open()
		expect(openHandler).toHaveBeenCalledWith(expect.objectContaining({ session: initialData.session }))
		expect(service.hasOwner).toBe(true)
	})

})
