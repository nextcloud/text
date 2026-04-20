/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import * as connect from '../../apis/connect'
import { provideConnection } from '../../composables/useConnection.js'
import { SyncService } from '../../services/SyncService.js'

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
		const { connection, openConnection, openData } = provideConnection({
			fileId: 123,
			relativePath: './',
		})
		vi.mock('../../apis/connect')
		vi.mocked(connect.open).mockResolvedValue(openResult)
		const openHandler = vi.fn()
		const service = new SyncService({ connection, openConnection })
		service.bus.on('opened', openHandler)
		await service.open()
		expect(openHandler).toHaveBeenCalledWith(
			expect.objectContaining({ session: initialData.session }),
		)
		expect(openData.value?.hasOwner).toBe(true)
	})
})
