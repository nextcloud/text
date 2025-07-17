/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/vue-2'
import { ref } from 'vue'
import type { Awareness } from 'y-protocols/awareness.js'
import { COLLABORATOR_DISCONNECT_TIME } from '../services/SyncService.js'

interface Props {
	awareness: Awareness
}

interface ClientState {
	clientId: number
	name: string
	userId?: string
	color?: string
}

const getLastContact = (client: ClientState, awareness: Awareness) => {
	const timestamp = awareness.meta.get(client.clientId)?.lastUpdated ?? 0
	return timestamp / 1000
}

// In tiptap v3 use editor.storage.users instead of awareness
export const useClients = (props: Props, editor: Editor) => {
	const computeClients = () => {
		const clientsFromAwareness: ClientState[] = Array.from(
			props.awareness
				.getStates()
				.values()
				.map((v) => v.user),
		)
		const activeCollaboratorThreshold =
			Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME
		return clientsFromAwareness
			.map((client) => ({
				...client,
				lastContact: getLastContact(client, props.awareness),
			}))
			.filter(({ lastContact }) => lastContact > activeCollaboratorThreshold)
			.sort((a, b) => a.lastContact - b.lastContact)
	}
	const clients = ref<ClientState[]>(computeClients())

	const computeLocalClient = () => {
		const state = props.awareness.getLocalState()
		if (!state) {
			throw new Error('No local state awareness state set')
		}
		return state.user
	}
	const localClient = ref<ClientState>(computeLocalClient())

	props.awareness.on('update', () => {
		clients.value = computeClients()
		localClient.value = computeLocalClient()
	})

	const setGuestName = (guestName: string) => {
		editor.commands.updateUser({
			...localClient.value,
			name: guestName,
		})
		localStorage.setItem('nick', guestName)
	}

	return { clients, localClient, setGuestName }
}
