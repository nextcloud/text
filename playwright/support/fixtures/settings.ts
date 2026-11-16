/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { APIRequestContext } from '@playwright/test'
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

/**
 * Set a server app configuration value as admin.
 *
 * @param request Request context without a user session
 * @param app The app id
 * @param key The setting key to set
 * @param value The value, or null to reset the setting to its default
 */
export async function setAppConfig(request: APIRequestContext, app: string, key: string, value: string | null): Promise<void> {
	const credentials = Buffer.from('admin:admin').toString('base64')
	await request.fetch(`/ocs/v2.php/apps/provisioning_api/api/v1/config/apps/${app}/${key}`, {
		method: value === null ? 'DELETE' : 'POST',
		headers: { 'OCS-APIRequest': 'true', Authorization: `Basic ${credentials}` },
		...(value !== null && { form: { value } }),
		failOnStatusCode: true,
	})
}
