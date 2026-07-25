/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { InjectionKey, ShallowRef } from 'vue'
import type { Document } from '../services/SyncService.ts'
import type { Connection, InitialData } from './useConnection.ts'

import { inject, onUnmounted, provide, ref } from 'vue'
import { SyncService } from '../services/SyncService.ts'

const syncServiceKey = Symbol('text:sync') as InjectionKey<SyncService>

/**
 * Define a sync service and provide it to child components
 *
 * @param connection Connection to the text api.
 * @param openConnection Function to open the connection.
 */
export function provideSyncService(
	connection: ShallowRef<Connection>,
	openConnection: () => Promise<InitialData>,
) {
	const syncService = new SyncService({
		connection,
		openConnection,
	})
	provide(syncServiceKey, syncService)

	const document = ref<Document | undefined>()
	/**
	 * Update the document ref based on the event provided
	 *
	 * @param event that triggered the update
	 * @param event.document latest state of the document
	 */
	function updateDocument({ document: current }: { document: Document }) {
		document.value = current
	}
	syncService.bus.on('opened', updateDocument)
	syncService.bus.on('change', updateDocument)
	syncService.bus.on('save', updateDocument)
	onUnmounted(() => {
		syncService.bus.off('opened', updateDocument)
		syncService.bus.off('change', updateDocument)
		syncService.bus.off('save', updateDocument)
	})

	return { document, syncService }
}

/**
 *
 */
export function useSyncService() {
	const syncService = inject(syncServiceKey) as SyncService
	return { syncService }
}
