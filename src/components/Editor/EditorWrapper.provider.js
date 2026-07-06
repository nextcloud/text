/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export const READ_ONLY_ACTIONS = Symbol('wrapper:read-only-actions')

export const useReadOnlyActions = {
	inject: {
		$readOnlyActions: {
			from: READ_ONLY_ACTIONS,
			default: {
				toggle: () => {},
			},
		},
	},
}
