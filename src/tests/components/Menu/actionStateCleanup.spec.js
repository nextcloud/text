/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import ActionList from '../../../components/Menu/ActionList.vue'
import { BaseActionEntry } from '../../../components/Menu/BaseActionEntry.js'

afterEach(() => {
	vi.useRealTimers()
})

describe('menu action state cleanup', () => {
	it('cancels pending action state updates before the editor is destroyed', () => {
		vi.useFakeTimers()
		const context = createContext()

		BaseActionEntry.mounted.call(context)
		context.$_updateState()
		BaseActionEntry.beforeUnmount.call(context)
		vi.runAllTimers()

		expect(context.updateState).not.toHaveBeenCalled()
		expect(context.editor.off).toHaveBeenCalledWith('update', context.$_updateState)
		expect(context.editor.off).toHaveBeenCalledWith('selectionUpdate', context.$_updateState)
	})

	it('keeps and clears the list child update independently from the base update', () => {
		vi.useFakeTimers()
		const context = createContext()

		BaseActionEntry.mounted.call(context)
		const updateState = context.$_updateState
		ActionList.mounted.call(context)
		const updateChildrenState = context.$_updateChildrenState
		updateState()
		updateChildrenState()

		ActionList.beforeUnmount.call(context)
		BaseActionEntry.beforeUnmount.call(context)
		vi.runAllTimers()

		expect(updateChildrenState).not.toBe(updateState)
		expect(context.updateState).not.toHaveBeenCalled()
		expect(context.checkStateOfChildren).not.toHaveBeenCalled()
		expect(context.editor.off).toHaveBeenCalledWith('update', updateState)
		expect(context.editor.off).toHaveBeenCalledWith('update', updateChildrenState)
	})
})

function createContext() {
	return {
		actionEntry: {},
		checkStateOfChildren: vi.fn(),
		editor: {
			off: vi.fn(),
			on: vi.fn(),
		},
		setTabIndexOnButton: vi.fn(),
		state: { disabled: false },
		updateState: vi.fn(),
		$emit: vi.fn(),
	}
}
