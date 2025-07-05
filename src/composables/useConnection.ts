/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	inject,
	provide,
	shallowRef,
	watch,
	type InjectionKey,
	type ShallowRef,
} from 'vue'
import type { Session, SyncService } from '../services/SyncService.js'

export interface Connection {
	documentId: number
	sessionId: number
	sessionToken: string
}

export const connectionKey = Symbol('text:connection') as InjectionKey<
	ShallowRef<Connection | undefined>
>

export const provideConnection = (
	syncService: ShallowRef<SyncService | undefined>,
) => {
	const connection = shallowRef<Connection | undefined>(undefined)
	const updateConnection = ({ session }: { session: Session }) => {
		connection.value = {
			documentId: session.documentId,
			sessionId: session.id,
			sessionToken: session.token,
		}
	}
	syncService.value?.bus.on('opened', updateConnection)
	watch(
		syncService,
		(newSyncService?: SyncService, oldSyncService?: SyncService) => {
			newSyncService?.bus.on('opened', updateConnection)
			oldSyncService?.bus.off('opened', updateConnection)
			if (!newSyncService) {
				connection.value = undefined
			}
		},
	)
	provide(connectionKey, connection)
	return { connection }
}

export const useConnection = () => {
	const connection = inject(connectionKey)
	return { connection }
}
