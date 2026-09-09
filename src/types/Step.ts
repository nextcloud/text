/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/*
 * Step as what we expect to be returned from the server right now.
 */

export interface Step {
	data: string[]
	version: number
	sessionId: number
}
