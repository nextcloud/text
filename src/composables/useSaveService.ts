/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	type InjectionKey,
	type ShallowRef,
	shallowRef,
	provide,
	inject,
	watch,
} from 'vue'
import { SaveService } from '../services/SaveService.js'
import type { SyncService } from '../services/SyncService.ts'
import type { Doc } from 'yjs'
import { getDocumentState } from '../helpers/yjs.js'

const saveServiceKey = Symbol('text:save') as InjectionKey<
	ShallowRef<SaveService | undefined>
>

export const provideSaveService = (
	syncService: ShallowRef<SyncService>,
	serialize: () => string,
	ydoc: Doc,
) => {
	const saveService: ShallowRef<SaveService | undefined> = shallowRef(undefined)

	watch(syncService, (newSyncService) => {
		if (!newSyncService) {
			saveService.value = undefined
			return
		}
		saveService.value = new SaveService({
			syncService: newSyncService,
			serialize,
			getDocumentState: () => getDocumentState(ydoc),
		})
	})

	provide(saveServiceKey, saveService)
	return { saveService }
}

export const useSaveService = () => {
	const saveService = inject(saveServiceKey, shallowRef(undefined))
	return { saveService }
}
