/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { inject, provide, shallowRef, type InjectionKey, type ShallowRef } from 'vue'

export interface Connection {
	baseVersionEtag: string
	documentId: number
	sessionId: number
	sessionToken: string
	filePath?: string
	token?: string
}

export const connectionKey = Symbol('text:connection') as InjectionKey<
	ShallowRef<Connection | undefined>
>

export const provideConnection = () => {
	const connection = shallowRef<Connection | undefined>(undefined)
	provide(connectionKey, connection)
	return { connection }
}

export const useConnection = () => {
	const connection = inject(connectionKey)
	return { connection }
}
