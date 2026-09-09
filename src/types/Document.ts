/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export interface Document {
	id: string
	lastSavedVersion: number
	lastSavedVersionTime: number
	baseVersionEtag: string
	initialVersion: number
}
