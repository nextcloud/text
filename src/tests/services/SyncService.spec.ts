/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, it, vi, expect } from 'vitest'
import { SyncService } from '../../services/SyncService.js'
import { shallowRef } from 'vue'

describe('Sync service', () => {

	it('opens a connection', async () => {
		const initialData = { session: { id: 123 }, hasOwner: true }
		const connection = shallowRef(undefined)
		const openConnection = vi.fn().mockResolvedValue(initialData)
		const openHandler = vi.fn()
		const service = new SyncService({ connection, openConnection })
		service.on('opened', openHandler)
		await service.open()
		expect(openHandler).toHaveBeenCalledWith(expect.objectContaining({ session: initialData.session }))
		expect(service.hasOwner).toBe(true)
	})

})
