/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Doc } from 'yjs'
import { useIndexedDbProvider } from '../../composables/useIndexedDbProvider.ts'

const provider = vi.hoisted(() => ({
	whenSynced: new Promise(() => {}),
	get: vi.fn(async () => undefined),
	set: vi.fn(async () => undefined),
	clearData: vi.fn(async () => undefined),
}))

vi.mock('y-indexeddb', () => ({
	IndexeddbPersistence: class {
		constructor() {
			return provider
		}
	},
}))

/**
 * Set up the composable for a new ydoc.
 */
function setup() {
	const ydoc = new Doc()
	const indexedDb = useIndexedDbProvider({ context: { type: 'file', id: 123 } }, ydoc)
	return { ydoc, ...indexedDb }
}

describe('useIndexedDbProvider', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('stores the dirty state and base version etag', async () => {
		const { setDirty, setBaseVersionEtag, getBaseVersionEtag } = setup()
		await setDirty(true)
		await setBaseVersionEtag('etag')
		await getBaseVersionEtag()
		expect(provider.set).toHaveBeenCalledWith('dirty', 1)
		expect(provider.set).toHaveBeenCalledWith('baseVersionEtag', 'etag')
		expect(provider.get).toHaveBeenCalledWith('baseVersionEtag')
	})

	it('stops using the database once the ydoc is destroyed', async () => {
		const { ydoc, dirty, setDirty, setBaseVersionEtag, getBaseVersionEtag } = setup()
		ydoc.destroy()
		await setDirty(true)
		await setBaseVersionEtag('etag')
		expect(await getBaseVersionEtag()).toBeUndefined()
		expect(dirty.value).toBe(true)
		expect(provider.set).not.toHaveBeenCalled()
		expect(provider.get).not.toHaveBeenCalled()
	})

	it('stops using the database once it was cleared', async () => {
		const { clearIndexedDb, setDirty, setBaseVersionEtag, getBaseVersionEtag } = setup()
		await clearIndexedDb()
		await setDirty(true)
		await setBaseVersionEtag('etag')
		expect(await getBaseVersionEtag()).toBeUndefined()
		expect(provider.clearData).toHaveBeenCalledOnce()
		expect(provider.set).not.toHaveBeenCalled()
		expect(provider.get).not.toHaveBeenCalled()
	})
})
