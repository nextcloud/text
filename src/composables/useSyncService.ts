/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { type InjectionKey, type ShallowRef, provide, inject } from 'vue'
import { SyncService } from '../services/SyncService'
import type { Connection, InitialData } from './useConnection.js'

const syncServiceKey = Symbol('text:sync') as InjectionKey<SyncService>

/**
 * Define a sync service and provide it to child components
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
	return { syncService }
}

export const useSyncService = () => {
	const syncService = inject(syncServiceKey) as SyncService
	return { syncService }
}
