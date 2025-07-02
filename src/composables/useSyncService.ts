/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { type InjectionKey, type ShallowRef, shallowRef, provide, inject } from 'vue'
import { SyncService } from '../services/SyncService.js'

const syncServiceKey = Symbol('text:sync') as InjectionKey<
	ShallowRef<SyncService | undefined>
>

export const provideSyncService = () => {
	const syncService: ShallowRef<SyncService | undefined> = shallowRef(undefined)
	provide(syncServiceKey, syncService)
	return { syncService }
}

export const useSyncService = () => {
	const syncService = inject(syncServiceKey, shallowRef(undefined))
	return { syncService }
}
