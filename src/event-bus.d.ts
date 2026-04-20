/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare module '@nextcloud/event-bus' {
	interface NextcloudEvents {
		'text:editor:full-width': { value: boolean }
	}
}

export {}
