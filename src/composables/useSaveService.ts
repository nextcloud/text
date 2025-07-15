/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { type InjectionKey, type ShallowRef, inject, provide } from 'vue'
import type { Doc } from 'yjs'
import { getDocumentState } from '../helpers/yjs.js'
import { SaveService } from '../services/SaveService.js'
import type { SyncService } from '../services/SyncService.ts'
import type { Connection } from './useConnection.ts'

const saveServiceKey = Symbol('text:save') as InjectionKey<SaveService>

export const provideSaveService = (
	connection: ShallowRef<Connection | undefined>,
	syncService: SyncService,
	serialize: () => string,
	ydoc: Doc,
) => {
	const saveService = new SaveService({
		connection,
		syncService,
		serialize,
		getDocumentState: () => getDocumentState(ydoc),
	})
	provide(saveServiceKey, saveService)
	return { saveService }
}

export const useSaveService = () => {
	const saveService = inject(saveServiceKey) as SaveService
	return { saveService }
}
