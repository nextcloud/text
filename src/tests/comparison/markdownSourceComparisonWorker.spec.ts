/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SourceComparisonWorkerRequest } from '../../comparison/markdownSourceComparisonProtocol.ts'

import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
	vi.resetModules()
	vi.unstubAllGlobals()
})

describe('Markdown source comparison worker', () => {
	it('delegates ready and limited messages to the shared protocol', async () => {
		let listener: ((event: MessageEvent<SourceComparisonWorkerRequest>) => void) | undefined
		const postMessage = vi.fn()
		vi.stubGlobal('addEventListener', vi.fn((_type, callback) => {
			listener = callback
		}))
		vi.stubGlobal('postMessage', postMessage)
		await import('../../comparison/markdownSourceComparison.worker.ts')
		expect(listener).toBeTypeOf('function')
		listener?.(new MessageEvent('message', { data: { before: 'old\n', after: 'new\n', maximumEditLength: 10, timeoutMilliseconds: 1000 } }))
		expect(postMessage).toHaveBeenLastCalledWith(expect.objectContaining({ status: 'ready' }))
		listener?.(new MessageEvent('message', { data: { before: 'old\n', after: 'new\n', maximumEditLength: 0, timeoutMilliseconds: 1000 } }))
		expect(postMessage).toHaveBeenLastCalledWith({ status: 'limited' })
	})
})
