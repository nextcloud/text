/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SummaryView } from '../../versionSummary/states.ts'

import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import VersionSummaryStart from '../../components/VersionSummaryStart.vue'

const view = shallowRef<SummaryView>({ kind: 'ready' })
const generate = vi.fn()
vi.mock('../../versionSummary/summaries.ts', () => ({ useVersionSummary: () => ({ view, generate }) }))

const props = {
	ends: { fileId: 7, from: '1000', to: 'current' },
	texts: { fromHash: 'a'.repeat(64), toHash: 'b'.repeat(64), utf8: true, looksSame: false },
}

describe('VersionSummaryStart', () => {
	it('tells screen readers what the button sends, or why it is off', async () => {
		view.value = { kind: 'ready' }
		const wrapper = mount(VersionSummaryStart, { props, attachTo: document.body })
		await flushPromises()

		const button = wrapper.find('button')
		const note = wrapper.find('.text-version-summary-start__note')
		expect(note.text()).toBe('Both complete versions are sent to the AI provider of this Nextcloud.')
		expect(button.attributes('aria-describedby')).toBe(note.attributes('id'))

		view.value = { kind: 'unavailable', reason: 'user_cap', retryAfter: null }
		await flushPromises()
		expect(wrapper.find('button').attributes('disabled')).toBeDefined()
		expect(wrapper.find('button').attributes('aria-describedby')).toBe(wrapper.find('.text-version-summary-start__note').attributes('id'))
		wrapper.unmount()
	})

	it('starts a summary and says whether the keyboard was on the button', async () => {
		view.value = { kind: 'ready' }
		const wrapper = mount(VersionSummaryStart, { props, attachTo: document.body })
		await flushPromises()
		const button = wrapper.find('button')
		;(button.element as HTMLElement).focus()

		await button.trigger('click')

		expect(generate).toHaveBeenCalledOnce()
		expect(wrapper.emitted('started')).toEqual([[true]])
		wrapper.unmount()
	})
})
