/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { OpenData } from '../../apis/connect.ts'
import type { SyncService } from '../../services/SyncService.ts'
import type { Connection } from '../../types/Connection.ts'
import type { Lock } from '../../types/Lock.ts'

import mitt from 'mitt'
import { describe, expect, it, vi } from 'vitest'
import PollingBackend from '../../services/PollingBackend.ts'

const lock: Lock = { displayName: 'Jane', token: 'token' }

/**
 * Create a polling backend and record the events it emits
 *
 * @param openData state when the document was opened
 */
function createBackend(openData: Partial<OpenData>) {
	const bus = mitt()
	const events: [string, unknown][] = []
	bus.on('*', (type, data) => events.push([type as string, data]))
	const syncService = { bus, receiveSteps: vi.fn(), checkIdle: () => false, version: 0 }
	const backend = new PollingBackend(
		syncService as unknown as SyncService,
		{} as Connection,
		{ readOnly: false, lock: null, ...openData } as OpenData,
	)
	const respond = (data: { readOnly?: boolean, lock?: Lock | null }) => backend._handleResponse({
		data: { document: {} as OpenData['document'], sessions: [], steps: [], ...data },
	})
	const emitted = (type: string) => events.filter(([eventType]) => eventType === type).map(([, data]) => data)
	return { respond, emitted }
}

describe('Polling backend', () => {
	it('reports a new lock along with the read only state', () => {
		const { respond, emitted } = createBackend({ readOnly: false })
		respond({ readOnly: true, lock })
		expect(emitted('permissionChange')).toEqual([{ readOnly: true, lock }])
		expect(emitted('lock')).toEqual([])
	})

	it('reports a removed lock along with the read only state', () => {
		const { respond, emitted } = createBackend({ readOnly: true, lock })
		respond({ readOnly: false, lock: null })
		expect(emitted('permissionChange')).toEqual([{ readOnly: false, lock: null }])
	})

	it('reports a lock of a document that is read only anyway', () => {
		const { respond, emitted } = createBackend({ readOnly: true })
		respond({ readOnly: true, lock })
		expect(emitted('permissionChange')).toEqual([])
		expect(emitted('lock')).toEqual([{ lock }])
	})

	it('keeps the lock if the response has no lock information', () => {
		const { respond, emitted } = createBackend({ readOnly: true, lock })
		respond({ readOnly: true })
		expect(emitted('lock')).toEqual([])
	})
})
