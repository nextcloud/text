/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { InjectionKey, ShallowRef } from 'vue'
import type { Doc } from 'yjs'
import type { Document, SyncService } from '../services/SyncService.ts'
import type { Connection } from './useConnection.ts'

import { computed, inject, onUnmounted, provide, ref, watch } from 'vue'
import { getDocumentState } from '../helpers/yjs.ts'
import { SaveService } from '../services/SaveService.ts'

const saveServiceKey = Symbol('text:save') as InjectionKey<SaveService>

/**
 *
 * @param connection to the api
 * @param syncService mostly used for the event bus and events
 * @param serialize to extract the document markdown content
 * @param ydoc to extract the document state from
 * @param setDirty set the dirty state for the editor
 */
export function provideSaveService(
	connection: ShallowRef<Connection | undefined>,
	syncService: SyncService,
	serialize: () => string,
	ydoc: Doc,
	setDirty: (val: boolean) => Promise<never>,
) {
	const document = ref<Document | undefined>()
	const saveService = new SaveService({
		connection,
		document,
		syncService,
		serialize,
		getDocumentState: () => getDocumentState(ydoc),
	})

	syncService.bus.on('changesPushed', saveService.autosave)
	onUnmounted(() => {
		syncService.bus.off('changesPushed', saveService.autosave)
	})

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
	saveService.bus.on('save', updateDocument)
	onUnmounted(() => {
		syncService.bus.off('opened', updateDocument)
		syncService.bus.off('change', updateDocument)
		saveService.bus.off('save', updateDocument)
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

	provide(saveServiceKey, saveService)
	return { document, saveService }
}

/**
 *
 */
export function useSaveService() {
	const saveService = inject(saveServiceKey) as SaveService
	return { saveService }
}
