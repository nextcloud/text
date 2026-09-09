/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export const ERROR_TYPE = {
	/**
	 * Failed to save collaborative document due to external change
	 * collision needs to be resolved manually
	 */
	SAVE_COLLISION: 0,
	/**
	 * Failed to push changes for MAX_REBASE_RETRY times
	 */
	PUSH_FAILURE: 1,

	LOAD_ERROR: 2,

	CONNECTION_FAILED: 3,

	SOURCE_NOT_FOUND: 4,

	PUSH_FORBIDDEN: 5,
} as const
export type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE]
