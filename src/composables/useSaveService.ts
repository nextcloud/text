/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { InjectionKey, ShallowRef } from 'vue'
import type { Doc } from 'yjs'
import type { SyncService } from '../services/SyncService.ts'
import type { Connection } from './useConnection.ts'

import { inject, provide } from 'vue'
import { getDocumentState } from '../helpers/yjs'
import { SaveService } from '../services/SaveService.ts'

const saveServiceKey = Symbol('text:save') as InjectionKey<SaveService>

/**
 *
 * @param connection
 * @param syncService
 * @param serialize
 * @param ydoc
 */
export function provideSaveService(
	connection: ShallowRef<Connection | undefined>,
	syncService: SyncService,
	serialize: () => string,
	ydoc: Doc,
) {
	const saveService = new SaveService({
		connection,
		syncService,
		serialize,
		getDocumentState: () => getDocumentState(ydoc),
	})
	provide(saveServiceKey, saveService)
	return { saveService }
}

/**
 *
 */
export function useSaveService() {
	const saveService = inject(saveServiceKey) as SaveService
	return { saveService }
}
