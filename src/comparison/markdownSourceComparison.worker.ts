/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SourceComparisonWorkerRequest, SourceComparisonWorkerResponse } from './markdownSourceComparisonProtocol.ts'

import { compareMarkdownSourceLines } from './markdownSourceComparisonProtocol.ts'

interface SourceComparisonWorkerScope {
	addEventListener: (
		type: 'message',
		listener: (event: MessageEvent<SourceComparisonWorkerRequest>) => void,
	) => void
	postMessage: (message: SourceComparisonWorkerResponse) => void
}

const workerScope = globalThis as unknown as SourceComparisonWorkerScope

workerScope.addEventListener('message', ({ data }) => {
	workerScope.postMessage(compareMarkdownSourceLines(data))
})
