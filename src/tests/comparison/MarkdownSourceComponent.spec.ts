/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { createSourceComparison } = vi.hoisted(() => ({
	createSourceComparison: vi.fn(),
}))

vi.mock('../../comparison/markdownSourceComparison.ts', () => ({
	createMarkdownSourceComparison: createSourceComparison,
}))

import MarkdownSourceComparison from '../../components/MarkdownSourceComparison.vue'

const readyModel = {
	status: 'ready' as const,
	hunks: [
		{ id: 'source-hunk-0', beforeStart: 1, afterStart: 1, before: [], after: [] },
		{ id: 'source-hunk-1', beforeStart: 8, afterStart: 8, before: [], after: [] },
	],
	gaps: [],
	lineEndingChange: null,
}

function sourceLine(number: number, text: string) {
	return {
		number,
		text,
		eol: 'lf' as const,
		changed: false,
		eolChanged: false,
		segments: [{ text, changed: false }],
		hasTab: false,
		hasTrailingWhitespace: false,
		hasZeroWidth: false,
		missingFinalNewline: false,
	}
}

describe('MarkdownSourceComparison', () => {
	beforeEach(() => {
		createSourceComparison.mockReset()
	})

	it('loads once and keeps source navigation local to the source model', async () => {
		createSourceComparison.mockResolvedValue(readyModel)
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'Before', afterContent: 'After', layoutMode: 'paired' },
		})

		await vi.waitFor(() => expect(wrapper.findAll('[data-source-hunk]')).toHaveLength(2))
		expect(createSourceComparison).toHaveBeenCalledOnce()
		expect(wrapper.find('[data-source-hunk="source-hunk-0"] button').attributes('aria-current')).toBe('true')

		await wrapper.find('button[aria-label="Next source change"]').trigger('click')
		expect(wrapper.find('[data-source-hunk="source-hunk-1"] button').attributes('aria-current')).toBe('true')
		expect(createSourceComparison).toHaveBeenCalledOnce()
		wrapper.unmount()
	})

	it('keeps source lines exposed outside the native hunk button', async () => {
		createSourceComparison.mockResolvedValue({
			...readyModel,
			hunks: [{
				...readyModel.hunks[0],
				before: [sourceLine(1, 'Readable before')],
				after: [sourceLine(1, 'Readable after')],
			}],
		})
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'Before', afterContent: 'After', layoutMode: 'paired' },
		})

		await vi.waitFor(() => expect(wrapper.find('[data-source-hunk]').exists()).toBe(true))
		const hunk = wrapper.find('[data-source-hunk]')
		expect(hunk.attributes('role')).toBeUndefined()
		expect(hunk.find('h3 button').exists()).toBe(true)
		expect(hunk.findAll('code').map((line) => line.text()))
			.toEqual(['Readable before', 'Readable after'])

		wrapper.unmount()
	})

	it('names added and removed source lines for assistive technology', async () => {
		createSourceComparison.mockResolvedValue({
			...readyModel,
			hunks: [{
				...readyModel.hunks[0],
				before: [{ ...sourceLine(4, 'Old'), changed: true }],
				after: [{ ...sourceLine(5, 'New'), changed: true }],
			}],
		})
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'Old', afterContent: 'New', layoutMode: 'paired' },
		})

		await vi.waitFor(() => expect(wrapper.find('[data-source-hunk]').exists()).toBe(true))
		expect(wrapper.findAll('.text-source-comparison__sr-only').map((label) => label.text()))
			.toEqual(['Removed line 4', 'Added line 5'])
		wrapper.unmount()
	})

	it.each([
		['inserted', [sourceLine(1, 'one'), sourceLine(2, 'three')], [
			sourceLine(1, 'one'),
			{ ...sourceLine(2, 'two'), changed: true },
			sourceLine(3, 'three'),
		], 'added'],
		['deleted', [
			sourceLine(1, 'one'),
			{ ...sourceLine(2, 'two'), changed: true },
			sourceLine(3, 'three'),
		], [sourceLine(1, 'one'), sourceLine(2, 'three')], 'removed'],
	] as const)('aligns an %s source line without shifting unchanged context', async (_name, before, after, operation) => {
		createSourceComparison.mockResolvedValue({
			...readyModel,
			hunks: [{
				...readyModel.hunks[0],
				before,
				after,
			}],
		})
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'one\nthree', afterContent: 'one\ntwo\nthree', layoutMode: 'paired' },
		})

		await vi.waitFor(() => expect(wrapper.find('[data-source-hunk]').exists()).toBe(true))
		const rows = wrapper.findAll('[data-source-hunk] .text-source-comparison__row')
		expect(rows).toHaveLength(3)
		expect(rows[0]!.findAll('code').map((line) => line.text())).toEqual(['one', 'one'])
		expect(rows[1]!.find('.text-source-comparison__line--empty').exists()).toBe(true)
		expect(rows[1]!.find(`.text-source-comparison__line--${operation}`).exists()).toBe(true)
		expect(rows[1]!.findAll('code').map((line) => line.text())).toEqual(['two'])
		expect(rows[2]!.findAll('code').map((line) => line.text())).toEqual(['three', 'three'])
		wrapper.unmount()
	})

	it('renders and expands leading and trailing source gaps in document order', async () => {
		createSourceComparison.mockResolvedValue({
			...readyModel,
			hunks: [readyModel.hunks[0]],
			gaps: [{
				id: 'source-gap-0',
				slot: 0,
				before: [sourceLine(1, 'Leading before')],
				after: [sourceLine(1, 'Leading after')],
				count: 1,
			}, {
				id: 'source-gap-1',
				slot: 1,
				before: [sourceLine(8, 'Trailing before')],
				after: [sourceLine(8, 'Trailing after')],
				count: 1,
			}],
		})
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'Before', afterContent: 'After', layoutMode: 'paired' },
		})

		await vi.waitFor(() => expect(wrapper.findAll('.text-source-comparison__gap')).toHaveLength(2))
		expect(wrapper.find<HTMLButtonElement>('button[aria-label="Previous source change"]').element.disabled).toBe(true)
		expect(wrapper.find<HTMLButtonElement>('button[aria-label="Next source change"]').element.disabled).toBe(true)
		const flow = wrapper.find('.text-source-comparison__hunks').element.children
		expect(flow[0]?.classList).toContain('text-source-comparison__gap')
		expect(flow[1]?.classList).toContain('text-source-comparison__hunk')
		expect(flow[2]?.classList).toContain('text-source-comparison__gap')
		const leadingGap = wrapper.find('.text-source-comparison__gap button')
		expect(leadingGap.attributes('data-source-gap')).toBe('source-gap-0')
		expect(leadingGap.attributes('aria-expanded')).toBe('false')
		await leadingGap.trigger('click')
		expect(leadingGap.attributes('aria-expanded')).toBe('true')
		expect(wrapper.text()).toContain('Leading before')
		expect(wrapper.text()).toContain('Leading after')
		const trailingGap = wrapper.findAll('.text-source-comparison__gap button')[1]!
		await trailingGap.trigger('click')
		expect(leadingGap.attributes('aria-expanded')).toBe('false')
		expect(trailingGap.attributes('aria-expanded')).toBe('true')
		wrapper.unmount()
	})

	it('does not offer to render an unsafe number of unchanged source rows', async () => {
		createSourceComparison.mockResolvedValue({
			...readyModel,
			hunks: [readyModel.hunks[0]],
			gaps: [{
				id: 'source-gap-0',
				slot: 0,
				before: [sourceLine(1, 'Leading before')],
				after: [sourceLine(1, 'Leading after')],
				count: 2001,
			}],
		})
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'Before', afterContent: 'After', layoutMode: 'paired' },
		})

		await vi.waitFor(() => expect(wrapper.find('.text-source-comparison__gap').exists()).toBe(true))
		expect(wrapper.find('.text-source-comparison__gap button').exists()).toBe(false)
		expect(wrapper.find('.text-source-comparison__gap').text()).toContain('2001 unchanged lines hidden')
		wrapper.unmount()
	})

	it('shows an error and retries without retaining partial source state', async () => {
		createSourceComparison
			.mockRejectedValueOnce(new Error('source failed'))
			.mockResolvedValueOnce(readyModel)
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'Before', afterContent: 'After', layoutMode: 'paired' },
		})

		await vi.waitFor(() => expect(wrapper.find('[role="alert"]').exists()).toBe(true))
		expect(wrapper.find('[data-source-hunk]').exists()).toBe(false)
		const retry = wrapper.findAll('button').find((button) => button.text().includes('Retry'))
		expect(retry).toBeDefined()
		await retry!.trigger('click')
		await vi.waitFor(() => expect(wrapper.findAll('[data-source-hunk]')).toHaveLength(2))
		expect(createSourceComparison).toHaveBeenCalledTimes(2)
		wrapper.unmount()
	})

	it('aborts and ignores a pending result after destroy', async () => {
		let resolve!: (value: typeof readyModel) => void
		let signal: AbortSignal | undefined
		createSourceComparison.mockImplementation((_before, _after, requestSignal) => {
			signal = requestSignal
			return new Promise<typeof readyModel>((done) => {
				resolve = done
			})
		})
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'Before', afterContent: 'After', layoutMode: 'paired' },
		})
		await vi.waitFor(() => expect(signal).toBeDefined())

		wrapper.unmount()
		expect(signal?.aborted).toBe(true)
		resolve(readyModel)
		await Promise.resolve()
		expect(wrapper.exists()).toBe(false)
	})

	it('renders the explicit safe-limit state', async () => {
		createSourceComparison.mockResolvedValue({ status: 'limited', reason: 'complexity' })
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'Before', afterContent: 'After', layoutMode: 'single' },
		})

		await vi.waitFor(() => expect(wrapper.text()).toContain('safe processing limit'))
		expect(wrapper.find('[role="status"]').exists()).toBe(true)
		wrapper.unmount()
	})

	it('associates the single-pane tabs with their panel', async () => {
		createSourceComparison.mockResolvedValue(readyModel)
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'Before', afterContent: 'After', layoutMode: 'single' },
		})

		await vi.waitFor(() => expect(wrapper.findAll('[role="tab"]')).toHaveLength(2))
		const [before, after] = wrapper.findAll('[role="tab"]')
		const panel = wrapper.find('[role="tabpanel"]')
		expect(before!.attributes('aria-controls')).toBe(panel.attributes('id'))
		expect(after!.attributes('aria-controls')).toBe(panel.attributes('id'))
		expect(panel.attributes('aria-labelledby')).toBe(before!.attributes('id'))

		await after!.trigger('click')
		expect(panel.attributes('aria-labelledby')).toBe(after!.attributes('id'))
		wrapper.unmount()
	})

	it('summarizes line endings and keeps very long source lines unwrapped', async () => {
		const longLine = sourceLine(1, 'x'.repeat(2001))
		createSourceComparison.mockResolvedValue({
			...readyModel,
			hunks: [{
				...readyModel.hunks[0],
				before: [longLine],
				after: [longLine],
			}],
			lineEndingChange: { before: 'lf', after: 'mixed' },
		})
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'Before', afterContent: 'After', layoutMode: 'paired' },
		})

		await vi.waitFor(() => expect(wrapper.find('[data-source-line-ending-change]').exists()).toBe(true))
		expect(wrapper.find('[data-source-line-ending-change]').text()).toContain('LF → Mixed')
		expect(wrapper.findAll('.text-source-comparison__line-code--long')).toHaveLength(2)
		wrapper.unmount()
	})
})
