/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/// <reference types="@nextcloud/typings" />

declare global {
	interface Window {
		// Nextcloud Globals
		t: typeof import('@nextcloud/l10n').t
		n: typeof import('@nextcloud/l10n').n
		OCA: Record<string, any>
		OCP: Nextcloud.v29.OCP
	}

	const appVersion: string
}

export {}
