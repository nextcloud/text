/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { type InjectionKey, type ShallowRef, shallowRef, provide, inject } from 'vue'
import { SyncService } from '../services/SyncService.js'
import SessionApi from '../services/SessionApi.js'

const syncServiceKey = Symbol('text:sync') as InjectionKey<
	ShallowRef<SyncService | undefined>
>

/**
 * Define a sync service and provide it to child components
 * @param props Props of the editor component.
 * @param props.relativePath Relative path to the file.
 * @param props.shareToken Share token of the file.
 */
export function provideSyncService(props: {
	relativePath: string
	shareToken?: string
}) {
	const syncService: ShallowRef<SyncService | undefined> = shallowRef(undefined)
	const baseVersionEtag = shallowRef(undefined)
	provide(syncServiceKey, syncService)
	const connectSyncService = () => {
		const guestName = localStorage.getItem('nick') ?? ''
		const api = new SessionApi({
			guestName,
			shareToken: props.shareToken,
			filePath: props.relativePath,
		})
		syncService.value = new SyncService({
			api,
			baseVersionEtag: baseVersionEtag.value,
		})
	}

	return { baseVersionEtag, connectSyncService, syncService }
}

export const useSyncService = () => {
	const syncService = inject(syncServiceKey, shallowRef(undefined))
	return { syncService }
}
