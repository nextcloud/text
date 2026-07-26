/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { InjectionKey, ShallowRef } from 'vue'
import type { Document } from '../services/SyncService.ts'
import type { Connection, InitialData } from './useConnection.ts'

import { computed, inject, onUnmounted, provide, ref, watch } from 'vue'
import { SyncService } from '../services/SyncService.ts'

const syncServiceKey = Symbol('text:sync') as InjectionKey<SyncService>

/**
 * Define a sync service and provide it to child components
 *
 * @param connection Connection to the text api.
 * @param openConnection Function to open the connection.
 * @param setDirty to udpate the dirty state.
 */
export function provideSyncService(
	connection: ShallowRef<Connection>,
	openConnection: () => Promise<InitialData>,
	setDirty: (val: boolean) => Promise<never>,
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
	function updateDocument(event: { document: Document }) {
		document.value = event.document
	}
	syncService.bus.on('opened', updateDocument)
	syncService.bus.on('change', updateDocument)
	syncService.bus.on('save', updateDocument)
	onUnmounted(() => {
		syncService.bus.off('opened', updateDocument)
		syncService.bus.off('change', updateDocument)
		syncService.bus.off('save', updateDocument)
	})

	const versionWithChanges = ref<number>(0)
	/**
	 * Update the tracked version based on the one in the event
	 *
	 * @param event that triggered the update
	 * @param event.version with changes pushed to the server
	 */
	function updateVersionWithChanges(event: { version: number }) {
		versionWithChanges.value = Math.max(event.version, versionWithChanges.value)
	}
	syncService.bus.on('changesPushed', updateVersionWithChanges)
	onUnmounted(() => {
		syncService.bus.off('changesPushed', updateVersionWithChanges)
	})

	const dirty = computed(() => (document.value?.lastSavedVersion ?? 0) < versionWithChanges.value)
	watch(dirty, setDirty)

	return { dirty, document, syncService }
}

/**
 *
 */
export function useSyncService() {
	const syncService = inject(syncServiceKey) as SyncService
	return { syncService }
}
