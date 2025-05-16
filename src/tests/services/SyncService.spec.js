/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, it, vi, expect } from 'vitest'
import { SyncService } from '../../services/SyncService.js'

describe('Sync service', () => {

	it('opens a connection', async () => {
		const api = mockApi({ hasOwner: true })
		const service = new SyncService({ api, baseVersionEtag: 'abc' })
		await service.open({ fileId: 123 })
		expect(service.hasOwner).toBe(true)
	})

	it('opens a connection to a file without owner', async () => {
		const api = mockApi({ hasOwner: false })
		const service = new SyncService({ api, baseVersionEtag: 'abc' })
		await service.open({ fileId: 123 })
		expect(service.hasOwner).toBe(false)
	})

	it('hasOwner is undefined without connection', async () => {
		const service = new SyncService({})
		expect(service.hasOwner).toBe(undefined)
	})

})

const mockApi = (connectionOptions = {}) => {
	const defaults = { document: { baseVersionEtag: 'abc' } }
	const open = vi.fn().mockResolvedValue({ ...defaults, ...connectionOptions })
	return { open }
}
