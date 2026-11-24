/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * A lock someone else holds on the file, as serialized by the files_lock app
 */
export interface Lock {
	displayName: string
	token: string
}
