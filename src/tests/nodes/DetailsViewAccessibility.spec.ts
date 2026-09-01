/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import DetailsView from '../../nodes/DetailsView.vue'

function mountDetails(attrs: { open: boolean, openDetails: boolean }, updateAttributes = vi.fn()) {
	return mount(DetailsView, {
		props: { node: { attrs }, updateAttributes },
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
}

describe('DetailsView disclosure control', () => {
	it('names the button and toggles details from the button', async () => {
		const wrapper = mountDetails({ open: false, openDetails: false })
		const button = wrapper.get('button')

		expect(button.attributes('aria-label')).toBe('Expand details')
		expect(button.attributes('aria-expanded')).toBe('false')

		await button.trigger('click')

		expect(button.attributes('aria-label')).toBe('Collapse details')
		expect(button.attributes('aria-expanded')).toBe('true')
	})

	it('opens persisted native details without clearing the stored state', () => {
		const updateAttributes = vi.fn()
		const wrapper = mountDetails({ open: true, openDetails: false }, updateAttributes)

		expect(wrapper.get('button').attributes('aria-label')).toBe('Collapse details')
		expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
		expect(updateAttributes).not.toHaveBeenCalled()
	})
})
