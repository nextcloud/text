/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Change } from 'diff'

import { diffLines } from 'diff'

export interface SourceComparisonWorkerRequest {
	before: string
	after: string
	maximumEditLength: number
	timeoutMilliseconds: number
}

export type SourceComparisonWorkerResponse = { status: 'ready', changes: Change[] } | { status: 'limited' }

export function compareMarkdownSourceLines(request: SourceComparisonWorkerRequest): SourceComparisonWorkerResponse {
	const changes = diffLines(request.before, request.after, {
		stripTrailingCr: false,
		maxEditLength: request.maximumEditLength,
		timeout: request.timeoutMilliseconds,
	})
	return changes ? { status: 'ready', changes } : { status: 'limited' }
}
