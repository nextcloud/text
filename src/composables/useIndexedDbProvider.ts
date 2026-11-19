/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Doc } from 'yjs'
import type { Context } from '../types/Context.ts'

import { inject, readonly, ref } from 'vue'
import { IndexeddbPersistence } from 'y-indexeddb'
import { logger } from '../helpers/logger.js'
import { sessionTransportKey } from '../services/SessionTransport.ts'

/**
 * Initialize a indexed db provider for the given ydoc
 *
 * @param props Props of the editor component.
 * @param props.context Context of the document.
 * @param ydoc Document to sync via the provider
 */
export function useIndexedDbProvider(
	props: {
		context: Context
	},
	ydoc: Doc,
) {
	if (inject(sessionTransportKey, undefined)) {
		// Host transports own account-scoped persistence and recovery.
		const dirty = ref(false)
		let base: string | undefined
		return {
			dirty: readonly(dirty),
			whenSynced: Promise.resolve(),
			getBaseVersionEtag: async () => base,
			setBaseVersionEtag: async (value: string) => {
				base = value
				return base
			},
			setDirty: async (value: boolean) => { dirty.value = value },
			clearIndexedDb: async () => {
				base = undefined
				dirty.value = false
			},
		}
	}
	const name = `text-${props.context.type}-${props.context.id}`
	const indexedDbProvider = new IndexeddbPersistence(name, ydoc)
	const dirty = ref(false)
	let isCleared = false
	// The provider also closes its database when the ydoc is destroyed
	const isClosed = () => isCleared || ydoc.isDestroyed
	const whenSynced: Promise<void> = indexedDbProvider.whenSynced.then(async () => {
		const val = await indexedDbProvider.get('dirty')
		dirty.value = Boolean(val)
		logger.info('synced from indexeddb', {
			dirty: val,
			baseVersionEtag: await getBaseVersionEtag(),
		})
	})

	/**
	 * Set the dirty flag to indicate (no) unsaved changes.
	 *
	 * @param val truethy if there are unsaved changes.
	 */
	function setDirty(val: boolean) {
		dirty.value = Boolean(val)
		if (isClosed()) {
			logger.debug('IndexedDB already destroyed, skipping setDirty')
			return Promise.resolve()
		}
		return indexedDbProvider.set('dirty', val ? 1 : 0)
	}

	/**
	 * Get the base version etag the document had when it was edited last.
	 */
	function getBaseVersionEtag(): Promise<string | undefined> {
		if (isClosed()) {
			logger.debug('IndexedDB already destroyed, skipping getBaseVersionEtag')
			return Promise.resolve(undefined)
		}
		return indexedDbProvider.get('baseVersionEtag')
	}

	/**
	 * Set the base version etag for the current connection.
	 *
	 * @param val the base version etag as returned by open.
	 */
	function setBaseVersionEtag(val: string) {
		if (isClosed()) {
			logger.debug('IndexedDB already destroyed, skipping setBaseVersionEtag')
			return Promise.resolve(undefined)
		}
		return indexedDbProvider.set('baseVersionEtag', val).then(() => val)
	}

	/**
	 * Clear the current document from indexed db.
	 * Used to reset the browser state to load a new editing session.
	 */
	function clearIndexedDb() {
		logger.info('clearing indexeddb')
		isCleared = true
		return indexedDbProvider.clearData()
	}

	return {
		clearIndexedDb,
		dirty: readonly(dirty),
		getBaseVersionEtag,
		setBaseVersionEtag,
		setDirty,
		whenSynced,
	}
}
