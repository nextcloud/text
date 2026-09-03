/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonDescriptor, ComparisonEdit } from '../../comparison/markdownComparisonTypes.ts'

import * as l10n from '@nextcloud/l10n'
import { mount } from '@vue/test-utils'
import { schema } from 'prosemirror-schema-basic'
import { describe, expect, it, vi } from 'vitest'
import ComparisonChangeList from '../../components/ComparisonChangeList.vue'

function descriptor(id: string, text: string, facets: ComparisonDescriptor['facets'] = ['text']): ComparisonDescriptor {
	return {
		id,
		operation: 'replace',
		detail: 'inline',
		facets,
		before: { from: 0, to: 1 },
		after: { from: 0, to: 1 },
		context: { before: null, after: null },
		preview: { before: { kind: 'text', text }, after: { kind: 'text', text } },
		signals: [],
	}
}

const document = schema.node('doc', null, [schema.node('paragraph', null, schema.text('Body'))])

describe('ComparisonChangeList', () => {
	it('AUD-14 renders only the bounded page containing a high-cardinality current edit', () => {
		const edits = Array.from({ length: 10_000 }, (_value, index): ComparisonEdit => {
			const primary = descriptor(`member-${index}`, `preview-${index}`)
			return { id: `edit-${index}`, kind: 'content', primary, descriptors: [primary] }
		})
		const wrapper = mount(ComparisonChangeList, {
			props: { edits, currentId: 'edit-9999', beforeDocument: document, afterDocument: document },
		})
		const rows = wrapper.findAll('[data-comparison-select]')

		expect(rows).toHaveLength(80)
		expect(rows[0]!.attributes('data-comparison-select')).toBe('edit-9920')
		expect(rows.at(-1)!.attributes('data-comparison-select')).toBe('edit-9999')
		expect(wrapper.find('[data-comparison-select="edit-9999"]').attributes('aria-current')).toBe('true')
	})

	it('preserves the current change label when paging away from its row', async () => {
		const edits = Array.from({ length: 160 }, (_value, index): ComparisonEdit => {
			const primary = descriptor(`member-${index}`, `preview-${index}`)
			return { id: `edit-${index}`, kind: 'content', primary, descriptors: [primary] }
		})
		const wrapper = mount(ComparisonChangeList, {
			props: { edits, currentId: 'edit-159', beforeDocument: document, afterDocument: document },
		})
		const initialLabel = wrapper.emitted('currentLabel')!.at(-1)![0]

		await wrapper.findAll('.text-comparison__change-pages button')[0]!.trigger('click')

		expect(wrapper.findAll('[data-comparison-select]')[0]!.attributes('data-comparison-select')).toBe('edit-0')
		expect(wrapper.find('[aria-current="true"]').exists()).toBe(false)
		expect(wrapper.emitted('currentLabel')!.at(-1)![0]).toBe(initialLabel)
		expect(initialLabel).not.toBe('')
	})

	it('AUD-14 unmounts records in collapsed sections', async () => {
		const primary = descriptor('member', 'preview')
		const edit: ComparisonEdit = { id: 'edit', kind: 'content', primary, descriptors: [primary] }
		const wrapper = mount(ComparisonChangeList, {
			props: { edits: [edit], beforeDocument: document, afterDocument: document },
		})

		await wrapper.get('.text-comparison__section-toggle').trigger('click')

		expect(wrapper.findAll('[data-comparison-select]')).toHaveLength(0)
	})

	it('translates only the selected lookup entry for each record', () => {
		const translate = vi.spyOn(l10n, 't')
		const primary: ComparisonDescriptor = {
			...descriptor('member', 'preview', ['attribute']),
			signals: [{ type: 'attribute', attribute: 'link', change: 'changed' }],
		}
		const edit: ComparisonEdit = { id: 'edit', kind: 'content', primary, descriptors: [primary] }

		mount(ComparisonChangeList, {
			props: { edits: [edit], beforeDocument: document, afterDocument: document },
		})

		const messages = translate.mock.calls.map(([, message]) => message)
		expect(messages).toContain('Link changed')
		expect(messages).not.toContain('Heading level changed')
		translate.mockRestore()
	})

	it('V01 renders one row per first-class edit using explicit primary and all member descriptors', async () => {
		const first = descriptor('member-first', 'wrong', ['formatting'])
		const primary = descriptor('member-primary', 'primary')
		const edit: ComparisonEdit = { id: 'edit-row', kind: 'content', primary, descriptors: [first, primary] }
		const wrapper = mount(ComparisonChangeList, {
			props: { edits: [edit], currentId: 'edit-row', beforeDocument: document, afterDocument: document },
		})
		const rows = wrapper.findAll('[data-comparison-select]')
		expect(rows).toHaveLength(1)
		expect(rows[0]!.attributes('data-comparison-select')).toBe('edit-row')
		expect(rows[0]!.find('.text-comparison__change-item-content').exists()).toBe(true)
		expect(rows[0]!.text()).toContain('primary')
		expect(rows[0]!.text()).toContain('2 edits')
		await rows[0]!.trigger('click')
		expect(wrapper.emitted('select')).toEqual([['edit-row']])
	})

	it('renders explicit before and after previews for a replacement', () => {
		const primary: ComparisonDescriptor = {
			...descriptor('member', 'unused'),
			preview: {
				before: { kind: 'text', text: 'before text' },
				after: { kind: 'text', text: 'after text' },
			},
		}
		const edit: ComparisonEdit = { id: 'edit', kind: 'content', primary, descriptors: [primary] }
		const wrapper = mount(ComparisonChangeList, {
			props: { edits: [edit], beforeDocument: document, afterDocument: document },
		})

		expect(wrapper.get('del.text-comparison__preview-before').text()).toBe('before text')
		expect(wrapper.get('ins.text-comparison__preview-after').text()).toBe('after text')
	})

	it('labels a coarse composite change by its structural scope instead of an incidental task attribute', () => {
		const primary: ComparisonDescriptor = {
			...descriptor('member', 'nested content', ['text', 'attribute', 'structure']),
			coarseReason: 'ambiguous-attribution',
			signals: [
				{ type: 'attribute', attribute: 'task-state', change: 'changed' },
				{ type: 'node' },
			],
		}
		const edit: ComparisonEdit = { id: 'edit', kind: 'content', primary, descriptors: [primary] }
		const wrapper = mount(ComparisonChangeList, {
			props: { edits: [edit], beforeDocument: document, afterDocument: document },
		})

		expect(wrapper.get('[data-comparison-select]').text()).toContain('Structure changed')
		expect(wrapper.get('[data-comparison-select]').text()).not.toContain('Task state changed')
	})

	it.each([
		['insert', 'inline', 'Paragraph changed', 'Paragraph added'],
		['delete', 'inline', 'Paragraph changed', 'Paragraph removed'],
		['insert', 'block', 'Paragraph added', 'Paragraph changed'],
		['delete', 'block', 'Paragraph removed', 'Paragraph changed'],
	] as const)('labels a %s %s operation at the correct altitude', (operation, detail, expected, rejected) => {
		const primary: ComparisonDescriptor = {
			...descriptor('member', 's'),
			operation,
			detail,
			context: {
				before: { code: 'paragraph', path: [], from: 0, to: 1 },
				after: { code: 'paragraph', path: [], from: 0, to: 1 },
			},
			preview: operation === 'insert'
				? { before: null, after: { kind: 'text', text: 's' } }
				: { before: { kind: 'text', text: 's' }, after: null },
		}
		const edit: ComparisonEdit = { id: 'edit', kind: 'content', primary, descriptors: [primary] }
		const wrapper = mount(ComparisonChangeList, {
			props: { edits: [edit], beforeDocument: document, afterDocument: document },
		})

		expect(wrapper.get('[data-comparison-select]').text()).toContain(expected)
		expect(wrapper.get('[data-comparison-select]').text()).not.toContain(rejected)
	})
})
