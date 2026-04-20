/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	computed,
	onMounted,
	onUnmounted,
	readonly,
	ref,
	shallowRef,
	watch,
	type ShallowRef,
} from 'vue'
import type { OpenData } from '../apis/connect'
import {
	COLLABORATOR_DISCONNECT_TIME,
	isGuest,
	SyncService,
	type Session,
} from '../services/SyncService'
import { useConnection } from './useConnection'

/**
 * Get the sessions from the sync service.
 *
 * @param syncService to watch for changes to the sessions.
 */
export function useSessions(syncService: SyncService) {
	const { openData } = useConnection() as {
		openData: ShallowRef<OpenData | undefined>
	}
	const currentSession = ref(openData.value?.session)
	const sessions = shallowRef<Session[]>([])

	watch(openData, (val) => {
		if (val?.session) {
			currentSession.value = val.session
		}
	})

	const currentGuestSession = computed({
		get() {
			if (currentSession.value && isGuest(currentSession.value)) {
				return currentSession.value
			}
		},
		set(newValue) {
			currentSession.value = newValue
		},
	})

	const updateSessions = ({ sessions: updated }: { sessions: Session[] }) => {
		const cutoff = Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME
		sessions.value = updated
			.filter((session) => session.lastContact > cutoff)
			.sort((a, b) => b.lastContact - a.lastContact)
			.filter(uniqueUserId)

		// Make sure we get our own session updated
		const currentUpdatedSession = sessions.value.find(
			(session) => session.id === currentSession.value?.id,
		)
		if (currentUpdatedSession) {
			currentSession.value = currentUpdatedSession
		}
	}
	onMounted(() => {
		syncService.bus.on('change', updateSessions)
	})
	onUnmounted(() => {
		syncService.bus.off('change', updateSessions)
	})
	return {
		currentGuestSession,
		currentSession: readonly(currentSession),
		sessions: readonly(sessions),
	}
}

/**
 * Return true for entries with a unique user id or with no user id (Guests).
 *
 * To be used in filter. Will keep the first entry and remove duplicates.
 *
 * @param val the current value
 * @param idx index of the current value
 * @param arr the entire array
 */
function uniqueUserId(val: Session, idx: number, arr: Session[]): boolean {
	if (!('userId' in val)) {
		return true
	}
	return !arr
		.slice(0, idx)
		.some((session) => 'userId' in session && session.userId === val.userId)
}
