/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { readonly, ref } from 'vue'
import { IndexeddbPersistence } from 'y-indexeddb'
import type { Doc } from 'yjs'
import { logger } from '../helpers/logger.js'

/**
 * Initialize a indexed db provider for the given ydoc
 * @param props Props of the editor component.
 * @param props.fileId Fileid of the file.
 * @param ydoc Document to sync via the provider
 */
export function useIndexedDbProvider(
	props: {
		fileId: number
	},
	ydoc: Doc,
) {
	const name = `text-${props.fileId}`
	const indexedDbProvider = new IndexeddbPersistence(name, ydoc)
	const dirty = ref(false)
	let isDestroyed = false
	const whenSynced: Promise<void> = indexedDbProvider.whenSynced.then(async () => {
		const val = await indexedDbProvider.get('dirty')
		dirty.value = Boolean(val)
		logger.info('synced from indexeddb', {
			dirty: val,
			baseVersionEtag: await indexedDbProvider.get('baseVersionEtag'),
		})
	})

	/**
	 * Set the dirty flag to indicate (no) unsaved changes.
	 * @param val truethy if there are unsaved changes.
	 */
	function setDirty(val: boolean) {
		dirty.value = Boolean(val)
		if (isDestroyed) {
			logger.debug('IndexedDB already destroyed, skipping setDirty')
			return Promise.resolve()
		}
		return indexedDbProvider.set('dirty', val ? 1 : 0)
	}

	/**
	 * Get the base version etag the document had when it was edited last.
	 */
	function getBaseVersionEtag(): Promise<string | undefined> {
		if (isDestroyed) {
			logger.debug('IndexedDB already destroyed, skipping getBaseVersionEtag')
			return Promise.resolve(undefined)
		}
		return indexedDbProvider.get('baseVersionEtag')
	}

	/**
	 * Set the base version etag for the current connection.
	 * @param val the base version etag as returned by open.
	 */
	function setBaseVersionEtag(val: string) {
		if (isDestroyed) {
			logger.debug('IndexedDB already destroyed, skipping setBaseVersionEtag')
			return Promise.resolve(undefined)
		}
		return indexedDbProvider.set('baseVersionEtag', val)
	}

	/**
	 * Clear the current document from indexed db.
	 * Used to reset the browser state to load a new editing session.
	 */
	function clearIndexedDb() {
		logger.info('clearing indexeddb')
		isDestroyed = true
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
