/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { type InjectionKey, provide, inject } from 'vue'
import { SaveService } from '../services/SaveService.js'
import type { SyncService } from '../services/SyncService.ts'
import type { Doc } from 'yjs'
import { getDocumentState } from '../helpers/yjs.js'

const saveServiceKey = Symbol('text:save') as InjectionKey<SaveService>

export const provideSaveService = (
	syncService: SyncService,
	serialize: () => string,
	ydoc: Doc,
) => {
	const saveService = new SaveService({
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
