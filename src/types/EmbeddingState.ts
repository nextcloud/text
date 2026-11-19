/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Context } from './Context.ts'

/** A full Yjs update, not a framed wire step. Host credentials are excluded. */
export interface EmbeddingState {
	format: 1
	context: Context
	baseVersionEtag: string
	version: number
	markdown: string
	documentState: string
	stateVector: string
}
