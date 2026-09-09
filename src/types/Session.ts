/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export interface UserSession {
	id: number
	userId: string
	color: string
	lastAwarenessMessage: string
	lastContact: number
	documentId: number
	displayName: string
}

export interface GuestSession {
	id: number
	color: string
	lastAwarenessMessage: string
	lastContact: number
	guestName: string
	documentId: number
}

export type Session = UserSession | GuestSession
