/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { FlatStep, Session, Step } from '../services/SyncService'
import { COLLABORATOR_DISCONNECT_TIME } from '../services/SyncService'

/**
 * Get the recent awareness messages as steps
 * @param sessions to process.
 */
export function awarenessSteps(sessions: Session[]): FlatStep[] {
	const lastContactThreshold = Math.floor(Date.now() / 1000) - COLLABORATOR_DISCONNECT_TIME
	return sessions
		.filter((s) => s.lastContact > lastContactThreshold)
		.filter((s) => Boolean(s.lastAwarenessMessage))
		.map((s) => ({ step: s.lastAwarenessMessage }))
}

/**
 * Flatten the provided steps and assign the version to each of them.
 * @param steps to process.
 */
export function flatSteps(steps: Step[]): FlatStep[] {
	return steps.flatMap(
		(s) => s.data.map(
			(step) => ({ step, version: s.version })
		)
	)
}
