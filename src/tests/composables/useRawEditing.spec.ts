/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { RawEditingApi } from '../../composables/useRawEditing.ts'

import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'vue'
import { provideRawEditing } from '../../composables/useRawEditing.ts'

/**
 * Mount a host component that provides the raw editing API and expose it along
 * with the mocked dependencies so tests can drive the state machine directly.
 *
 * @param live markdown returned by `serialize()` when raw editing is left
 */
function setup(live: string) {
	const deps = {
		serialize: vi.fn(() => live),
		setContent: vi.fn(),
		setEditable: vi.fn(),
		save: vi.fn(async () => {}),
		canRawEdit: ref(true),
	}
	let api: RawEditingApi | undefined
	const Host = defineComponent({
		template: '<div />',
		setup() {
			api = provideRawEditing(deps)
			return {}
		},
	})
	mount(Host)
	return { api: api as RawEditingApi, deps }
}

describe('useRawEditing', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('freezes the rich editor when entering raw mode', () => {
		const { api, deps } = setup('# Base')
		deps.serialize.mockReturnValueOnce('# Base')
		api.enterRawEditing()
		expect(api.rawEditing.value).toBe(true)
		expect(api.rawInitialMarkdown.value).toBe('# Base')
		expect(deps.setEditable).toHaveBeenCalledWith(false)
	})

	it('does not enter raw mode when disabled', () => {
		const { api, deps } = setup('# Base')
		deps.canRawEdit.value = false
		api.enterRawEditing()
		expect(api.rawEditing.value).toBe(false)
		expect(deps.setEditable).not.toHaveBeenCalled()
	})

	it('applies raw edits directly when the document did not drift', async () => {
		const { api, deps } = setup('# Base')
		deps.serialize.mockReturnValueOnce('# Base') // fork snapshot on enter
		api.enterRawEditing()
		api.rawMarkdown.value = '# Edited'
		deps.serialize.mockReturnValueOnce('# Base') // live doc unchanged on exit
		await api.exitRawEditing()
		expect(deps.setContent).toHaveBeenCalledWith('# Edited')
		expect(deps.save).toHaveBeenCalled()
		expect(api.rawConflict.value).toBe('')
		expect(api.rawEditing.value).toBe(false)
		expect(deps.setEditable).toHaveBeenLastCalledWith(true)
	})

	it('raises a conflict instead of clobbering concurrent edits', async () => {
		const { api, deps } = setup('# Base')
		deps.serialize.mockReturnValueOnce('# Base') // fork snapshot on enter
		api.enterRawEditing()
		api.rawMarkdown.value = '# Edited'
		deps.serialize.mockReturnValueOnce('# Base\n\nremote change') // drifted
		await api.exitRawEditing()
		expect(deps.setContent).not.toHaveBeenCalled()
		expect(deps.save).not.toHaveBeenCalled()
		expect(api.rawConflict.value).toBe('# Edited')
		expect(api.rawEditing.value).toBe(false)
	})

	it('does nothing when the source was not changed', async () => {
		const { api, deps } = setup('# Base')
		deps.serialize.mockReturnValueOnce('# Base')
		api.enterRawEditing()
		// rawMarkdown left equal to the initial snapshot
		await api.exitRawEditing()
		expect(deps.setContent).not.toHaveBeenCalled()
		expect(deps.save).not.toHaveBeenCalled()
		expect(api.rawConflict.value).toBe('')
	})

	it('discards raw edits without applying them', async () => {
		const { api, deps } = setup('# Base')
		deps.serialize.mockReturnValueOnce('# Base')
		api.enterRawEditing()
		api.rawMarkdown.value = '# Edited'
		await api.exitRawEditing({ discard: true })
		expect(deps.setContent).not.toHaveBeenCalled()
		expect(deps.save).not.toHaveBeenCalled()
		expect(api.rawConflict.value).toBe('')
	})

	it('clears a pending conflict once resolved', async () => {
		const { api, deps } = setup('# Base')
		deps.serialize.mockReturnValueOnce('# Base')
		api.enterRawEditing()
		api.rawMarkdown.value = '# Edited'
		deps.serialize.mockReturnValueOnce('# Drifted')
		await api.exitRawEditing()
		expect(api.rawConflict.value).toBe('# Edited')
		api.resolveRawConflict()
		expect(api.rawConflict.value).toBe('')
	})
})
