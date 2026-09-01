/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SourceComparisonWorkerRequest } from './markdownSourceComparisonProtocol.ts'

import { compareMarkdownSourceLines } from './markdownSourceComparisonProtocol.ts'

addEventListener('message', ({ data }: MessageEvent<SourceComparisonWorkerRequest>) => {
	postMessage(compareMarkdownSourceLines(data))
})
