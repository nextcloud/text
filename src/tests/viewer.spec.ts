/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IHandler } from '@nextcloud/viewer'

import { beforeAll, describe, expect, it, vi } from 'vitest'

const registerHandler = vi.hoisted(() => vi.fn())
vi.mock('@nextcloud/viewer', () => ({ registerHandler }))
// The editor itself is not what is tested here, only that it is loaded late
vi.mock('../views/TextViewerWrapper.vue', async () => {
	const { defineComponent } = await import('vue')
	return { default: defineComponent({ render: () => null }) }
})

describe('the text viewer handler', () => {
	let handler: IHandler

	beforeAll(async () => {
		await import('../viewer.js')
		// Read now: the test setup clears mocks between tests
		expect(registerHandler).toHaveBeenCalledTimes(1)
		handler = registerHandler.mock.calls[0][0]
	})

	it('is registered under a tag name starting with the app id', () => {
		expect(handler).toMatchObject({ id: 'text', tagName: 'text-viewer', canCompare: true })
	})

	it.each(['text/markdown', 'text/plain', 'application/json'])('opens %s', (mime) => {
		expect(handler.enabled([{ mime }] as never)).toBe(true)
	})

	it('does not open a picture, nor a mix with one', () => {
		expect(handler.enabled([{ mime: 'image/png' }] as never)).toBe(false)
		expect(handler.enabled([{ mime: 'text/markdown' }, { mime: 'image/png' }] as never)).toBe(false)
	})

	// The registration runs on every page, the editor only once a text file opens
	it('defines its element only in onInit', async () => {
		expect(window.customElements.get('text-viewer')).toBeUndefined()

		await handler.onInit!()
		expect(window.customElements.get('text-viewer')).toBeDefined()

		// A second call, from another copy of the viewer, must not throw
		await expect(handler.onInit!()).resolves.toBeUndefined()
	})
})
