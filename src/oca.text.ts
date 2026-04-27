/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { loadState } from '@nextcloud/initial-state'

export interface OCA_Text {
	RichWorkspaceEnabled: boolean
	OpenReadOnlyEnabled: boolean
}

/**
 * Initialize the global OCA.Text state
 */
export function initialize() {
	window.OCA.Text = {
		...(window?.OCA?.Text ?? {}),
		RichWorkspaceEnabled: loadState<boolean>('text', 'workspace_available'),
		OpenReadOnlyEnabled: loadState<boolean>('text', 'open_read_only_enabled'),
	}
}
