/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export interface Connection {
	documentId: string
	sessionId: number
	sessionToken: string
	baseVersionEtag: string
	filePath: string
	shareToken?: string
}
