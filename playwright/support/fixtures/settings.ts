/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User } from './User.ts'

/**
 * Set a user-level configuration value for the Text app.
 *
 * @param user The user to do the request
 * @param key The setting key to set
 * @param value The value
 */
export async function setTextSetting(user: User, key: string, value: number | string): Promise<void> {
	await user.request.post('/index.php/apps/text/settings', {
		data: { key, value },
		failOnStatusCode: true,
	})
}
