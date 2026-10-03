/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Session } from '../types/Session.ts'
import type { Step } from '../types/Step.ts'

import { COLLABORATOR_DISCONNECT_TIME } from '../services/SyncService.ts'

/**
 * Get the recent awareness messages as steps
 *
 * @param sessions to process.
 */
export function awarenessSteps(sessions: Session[]): Step[] {
	const lastContactThreshold
		= Math.floor(Date.now() / 1000) - COLLABORATOR_DISCONNECT_TIME
	return sessions
		.filter((s) => s.lastContact > lastContactThreshold)
		.filter((s) => Boolean(s.lastAwarenessMessage))
		.map((s) => ({
			data: [s.lastAwarenessMessage],
			sessionId: s.id,
			version: 0,
		}))
}
