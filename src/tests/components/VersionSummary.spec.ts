/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SummaryView } from '../../versionSummary/states.ts'

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref, shallowRef } from 'vue'
import VersionSummary from '../../components/VersionSummary.vue'

const view = shallowRef<SummaryView>({ kind: 'loading' })
const ends = shallowRef({
	from: { id: '1000', mtime: 1000, author: null as { id: string, displayName: string } | null, label: '' },
	to: { id: 'current', mtime: 2000, author: null as { id: string, displayName: string } | null, label: '' },
})
vi.mock('../../versionSummary/summaries.ts', () => ({
	useVersionSummary: () => ({
		view,
		ends,
		fileName: ref('plan.md'),
		connectionLost: ref(false),
		collapsed: ref(false),
		userStarted: ref(true),
		generate: vi.fn(),
		retryNow: vi.fn(),
	}),
}))

const props = {
	ends: { fileId: 7, from: '1000', to: 'current' },
	texts: { fromHash: 'a'.repeat(64), toHash: 'b'.repeat(64), utf8: true, looksSame: false },
	reload: vi.fn(),
}

describe('VersionSummary', () => {
	it('lets the keyboard reach and scroll a long summary', () => {
		view.value = { kind: 'done', summary: 'The pilot runs 3 weeks.' }
		const wrapper = mount(VersionSummary, { props })

		expect(wrapper.find('[data-text-version-summary-text]').attributes('tabindex')).toBe('0')
		wrapper.unmount()
	})

	it('says when starts can be asked for again after many in a short time, without a button that fails meanwhile', () => {
		view.value = { kind: 'rateLimited', retryAfter: 1_000_120 }
		const wrapper = mount(VersionSummary, { props })

		const note = wrapper.find('.text-version-summary__note')
		expect(note.text()).toContain('You asked for several summaries in a short time. Try again after')
		expect(note.find('button').exists()).toBe(false)
		wrapper.unmount()
	})

	it('reloads the comparison from the note that says the file changed', async () => {
		view.value = { kind: 'changed', whileRunning: false }
		const reload = vi.fn()
		const wrapper = mount(VersionSummary, { props: { ...props, reload } })

		await wrapper.find('.text-version-summary__note button').trigger('click')

		expect(reload).toHaveBeenCalledOnce()
		wrapper.unmount()
	})

	it('names the versions as their labels and authors are written', () => {
		ends.value = {
			from: { id: '1000', mtime: 1000, author: { id: 'ann', displayName: 'Ann & Bob <ab@example.com>' }, label: '' },
			to: { id: 'current', mtime: 2000, author: null, label: 'Draft <v2> & final' },
		}
		view.value = { kind: 'done', summary: 'The pilot runs 3 weeks.' }
		const wrapper = mount(VersionSummary, { props })

		const notice = wrapper.find('.text-version-summary__notice').text()
		expect(notice).toContain('Ann & Bob <ab@example.com>')
		expect(notice).toContain('"Draft <v2> & final"')
		wrapper.unmount()
	})

	it('announces a summary under way once, not every move in the queue', async () => {
		view.value = { kind: 'queued', position: 3 }
		const wrapper = mount(VersionSummary, { props })
		const status = () => wrapper.find('[role="status"]').text()
		const first = status()
		expect(wrapper.text()).toContain('Position 3 in the queue')

		view.value = { kind: 'queued', position: 2 }
		await wrapper.vm.$nextTick()

		expect(wrapper.text()).toContain('Position 2 in the queue')
		expect(status()).toBe(first)
		expect(first).not.toContain('Position')
		wrapper.unmount()
	})

	it('fades the end of a summary that scrolls, until it is read to the end', async () => {
		view.value = { kind: 'done', summary: 'The pilot runs 3 weeks.\n\nPlan\n- One\n- Two' }
		const wrapper = mount(VersionSummary, { props })
		const text = wrapper.find('[data-text-version-summary-text]')
		const box = text.element as HTMLElement
		Object.defineProperties(box, { scrollHeight: { value: 500, configurable: true }, clientHeight: { value: 200, configurable: true } })

		box.scrollTop = 0
		await text.trigger('scroll')
		expect(text.classes()).toContain('text-version-summary__text--more')

		box.scrollTop = 300
		await text.trigger('scroll')
		expect(text.classes()).not.toContain('text-version-summary__text--more')
		wrapper.unmount()
	})
})
