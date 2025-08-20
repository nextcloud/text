/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue, {
	onMounted,
	onUnmounted,
	reactive,
	ref,
	watch,
	type ShallowRef,
} from 'vue'
import type { OpenData } from '../apis/connect.js'
import { SyncService, type Session } from '../services/SyncService.js'
import { useConnection } from './useConnection.js'

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
	const sessions = ref<Session[]>([])
	const filteredSessions = reactive<Record<string, Session>>({})
	watch(openData, (val) => {
		if (val?.session) {
			currentSession.value = val.session
		}
	})
	const updateSessions = ({ sessions: updated }: { sessions: Session[] }) => {
		sessions.value = updated.sort((a, b) => b.lastContact - a.lastContact)

		// Make sure we get our own session updated
		// This should ideally be part of a global store where we can have that updated on the actual name change for guests
		const currentUpdatedSession = sessions.value.find(
			(session) => session.id === currentSession.value?.id,
		)
		currentSession.value = currentUpdatedSession

		const currentSessionIds = sessions.value.map((session) => session.id)

		const removedSessions = Object.keys(filteredSessions).filter(
			(sessionId) => !currentSessionIds.includes(Number(sessionId)),
		)

		for (const id of removedSessions) {
			Vue.delete(filteredSessions, id)
		}
		for (const session of sessions.value) {
			const sessionKey = session.userId || String(session.id)
			if (filteredSessions[sessionKey]) {
				// update timestamp if relevant
				if (filteredSessions[sessionKey].lastContact < session.lastContact) {
					Vue.set(
						filteredSessions[sessionKey],
						'lastContact',
						session.lastContact,
					)
				}
			} else {
				Vue.set(filteredSessions, sessionKey, session)
			}
			if (session.id === currentSession.value?.id) {
				Vue.set(filteredSessions[sessionKey], 'isCurrent', true)
			}
		}
	}
	onMounted(() => {
		syncService.bus.on('change', updateSessions)
	})
	onUnmounted(() => {
		syncService.bus.off('change', updateSessions)
	})
	return { currentSession, filteredSessions, sessions }
}
