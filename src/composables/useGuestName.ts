/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { MaybeRef } from 'vue'

import { toValue } from 'vue'
import { update } from '../apis/connect.ts'
import { logger } from '../helpers/logger.ts'
import { useConnection } from './useConnection.ts'

/**
 * @param editor - the Tiptap editor ref
 */
export function useGuestName(editor: MaybeRef<Editor | null>) {
	const { connection } = useConnection()

	/**
	 * @param name - guest user nick name
	 */
	async function setGuestName(name: string) {
		if (!name.trim() || !connection?.value) {
			return null
		}

		const session = await update(name.trim(), connection.value)
		try {
			localStorage.setItem('nick', session.guestName)
		} catch (e) {
			logger.warn('Could not store guest name in local storage.', { error: e })
		}
		toValue(editor)?.commands.updateUser({
			name: session.guestName,
			color: session.color,
		})
		return session
	}

	return { setGuestName }
}
