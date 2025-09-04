/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

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
}
