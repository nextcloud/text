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
	it('handles ready and limited protocol responses', async () => {
		let listener: ((event: MessageEvent<SourceComparisonWorkerRequest>) => void) | undefined
		const addEventListener = vi.fn((type, nextListener) => {
			expect(type).toBe('message')
			listener = nextListener
		})
		const postMessage = vi.fn()
		vi.stubGlobal('addEventListener', addEventListener)
		vi.stubGlobal('postMessage', postMessage)

		await import('../../comparison/markdownSourceComparison.worker.ts')
		expect(addEventListener).toHaveBeenCalledOnce()

		listener?.(new MessageEvent('message', {
			data: {
				after: 'new\n',
				before: 'old\n',
				maximumEditLength: 10,
				timeoutMilliseconds: 1000,
			},
		}))
		expect(postMessage).toHaveBeenLastCalledWith(expect.objectContaining({ status: 'ready' }))

		listener?.(new MessageEvent('message', {
			data: {
				after: 'new\n',
				before: 'old\n',
				maximumEditLength: 0,
				timeoutMilliseconds: 1000,
			},
		}))
		expect(postMessage).toHaveBeenLastCalledWith({ status: 'limited' })
	})
})
