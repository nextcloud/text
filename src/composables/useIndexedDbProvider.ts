/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { ref, watch } from 'vue'
import { IndexeddbPersistence } from 'y-indexeddb'
import type { Doc } from 'yjs'

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
	const name = `${props.fileId}`
	const indexedDbProvider = new IndexeddbPersistence(name, ydoc)
	indexedDbProvider.on('synced', (provider: IndexeddbPersistence) => {
		console.info('synced from indexeddb', provider)
	})
	const dirty = ref(false)
	indexedDbProvider.get('dirty').then((val) => {
		dirty.value = Boolean(val)
	})

	watch(dirty, (val) => {
		indexedDbProvider.set('dirty', val ? 1 : 0)
	})

	/**
	 * Get the base version etag the document had when it was edited last.
	 */
	function getBaseVersionEtag(): Promise<string | undefined> {
		return indexedDbProvider.get('baseVersionEtag')
	}

	/**
	 * Set the base version etag for the current connection.
	 * @param val the base version etag as returned by open.
	 */
	function setBaseVersionEtag(val: string) {
		return indexedDbProvider.set('baseVersionEtag', val)
	}

	return {
		dirty,
		getBaseVersionEtag,
		setBaseVersionEtag,
	}
}
