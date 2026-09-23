/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import DetailsView from '../../nodes/DetailsView.vue'

function mountDetails(attrs: { open: boolean }, selection = { from: 0, to: 0 }) {
	const editor = { on: vi.fn(), off: vi.fn(), state: { selection } }
	const node = { attrs, nodeSize: 8, firstChild: { nodeSize: 2 } }
	const wrapper = mount(DetailsView, {
		props: { editor, node, getPos: () => 10 },
		global: {
			stubs: {
				NodeViewWrapper: { template: '<div><slot /></div>' },
				NodeViewContent: { template: '<div><slot /></div>' },
				NcButton: {
					emits: ['click'],
					template: '<button v-bind="$attrs" @click="$emit(\'click\')"><slot name="icon" /></button>',
				},
				TriangleSmallDownIcon: true,
			},
		},
	})
	return { wrapper, editor }
}

describe('DetailsView disclosure control', () => {
	it('names the button and toggles details from the button', async () => {
		const { wrapper } = mountDetails({ open: false })
		const button = wrapper.get('button')

		expect(button.attributes('aria-label')).toBe('Expand details')
		expect(button.attributes('aria-expanded')).toBe('false')

		await button.trigger('click')

		expect(button.attributes('aria-label')).toBe('Collapse details')
		expect(button.attributes('aria-expanded')).toBe('true')
	})

	it('opens persisted native details', () => {
		const { wrapper } = mountDetails({ open: true })
		expect(wrapper.get('button').attributes('aria-label')).toBe('Collapse details')
		expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
	})

	it('starts open when mounted with the selection inside the node', () => {
		const { wrapper } = mountDetails({ open: false }, { from: 12, to: 12 })
		expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
	})

	it('opens when the selection moves into the content', async () => {
		const { wrapper, editor } = mountDetails({ open: false })
		const onSelectionUpdate = editor.on.mock.calls[0][1]

		editor.state.selection = { from: 12, to: 12 }
		onSelectionUpdate()
		await wrapper.vm.$nextTick()
		expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')

		editor.state.selection = { from: 14, to: 14 }
		onSelectionUpdate()
		await wrapper.vm.$nextTick()
		expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
	})
})
