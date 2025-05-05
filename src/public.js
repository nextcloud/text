/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { loadState } from '@nextcloud/initial-state'

OCA.Text = {
	RichWorkspaceEnabled: loadState('text', 'workspace_available'),
	OpenReadOnlyEnabled: loadState('text', 'open_read_only_enabled'),
}
