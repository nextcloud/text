/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Change } from '../../comparison/compare.ts'

import { describe, expect, it } from 'vitest'
import { compareDocuments } from '../../comparison/compare.ts'
import { createComparisonEditor } from '../../comparison/editor.ts'

function compare(before: string, after: string) {
	const beforeEditor = createComparisonEditor(before)
	const afterEditor = createComparisonEditor(after)
	try {
		return compareDocuments(beforeEditor.state.doc, afterEditor.state.doc)
	} finally {
		beforeEditor.destroy()
		afterEditor.destroy()
	}
}

function summarize({ operation, category, attribute, block, context, preview }: Change) {
	return {
		operation,
		category,
		...(attribute ? { attribute } : {}),
		block,
		context,
		before: preview.before,
		after: preview.after,
	}
}

const cases = [
	{
		name: 'equal documents',
		before: 'Hello world',
		after: 'Hello world',
		expected: [],
	},
	{
		name: 'syntax-only markdown change',
		before: '*emphasis*',
		after: '_emphasis_',
		expected: [],
	},
	{
		name: 'changed word',
		before: 'Hello world',
		after: 'Hello there',
		expected: [
			{ operation: 'replace', category: 'text', block: false, context: 'paragraph', before: 'world', after: 'there' },
		],
	},
	{
		name: 'inserted paragraph',
		before: 'First',
		after: 'First\n\nSecond',
		expected: [
			{ operation: 'insert', category: 'text', block: true, context: 'paragraph', before: '', after: 'Second' },
		],
	},
	{
		name: 'deleted paragraph',
		before: 'First\n\nSecond',
		after: 'First',
		expected: [
			{ operation: 'delete', category: 'text', block: true, context: 'paragraph', before: 'Second', after: '' },
		],
	},
	{
		name: 'changed paragraph between unchanged ones',
		before: 'First\n\nOld middle\n\nLast',
		after: 'First\n\nNew middle\n\nLast',
		expected: [
			{ operation: 'replace', category: 'text', block: false, context: 'paragraph', before: 'Old', after: 'New' },
		],
	},
	{
		name: 'formatting added',
		before: 'Hello world',
		after: 'Hello **world**',
		expected: [
			{ operation: 'replace', category: 'formatting', block: false, context: 'paragraph', before: 'world', after: 'world' },
		],
	},
	{
		name: 'link target changed',
		before: 'See [docs](https://old.example)',
		after: 'See [docs](https://new.example)',
		expected: [
			{ operation: 'replace', category: 'attribute', attribute: 'link', block: false, context: 'paragraph', before: 'docs', after: 'docs' },
		],
	},
	{
		name: 'paragraph turned into heading',
		before: 'Title',
		after: '# Title',
		expected: [
			{ operation: 'replace', category: 'structure', block: true, context: 'heading', before: 'Title', after: 'Title' },
		],
	},
	{
		name: 'heading level changed',
		before: '# Title',
		after: '## Title',
		expected: [
			{ operation: 'replace', category: 'attribute', attribute: 'heading-level', block: true, context: 'heading', before: 'Title', after: 'Title' },
		],
	},
	{
		name: 'task ticked',
		before: '- [ ] Buy milk',
		after: '- [x] Buy milk',
		expected: [
			{ operation: 'replace', category: 'attribute', attribute: 'task-state', block: true, context: 'taskItem', before: 'Buy milk', after: 'Buy milk' },
		],
	},
	{
		name: 'list item added',
		before: '- one\n- two',
		after: '- one\n- two\n- three',
		expected: [
			{ operation: 'insert', category: 'text', block: true, context: 'listItem', before: '', after: 'three' },
		],
	},
	{
		name: 'table cell changed',
		before: '| Name | Value |\n| --- | --- |\n| a | 1 |',
		after: '| Name | Value |\n| --- | --- |\n| a | 2 |',
		expected: [
			{ operation: 'replace', category: 'text', block: false, context: 'paragraph', before: '1', after: '2' },
		],
	},
	{
		name: 'code block language changed',
		before: '```js\nlet x\n```',
		after: '```ts\nlet x\n```',
		expected: [
			{ operation: 'replace', category: 'attribute', attribute: 'code-language', block: true, context: 'codeBlock', before: 'let x', after: 'let x' },
		],
	},
	{
		name: 'image replaced',
		before: '![old](old.png)',
		after: '![new](new.png)',
		expected: [
			{ operation: 'replace', category: 'attribute', attribute: 'image', block: true, context: 'image', before: '', after: '' },
		],
	},
	{
		name: 'text and formatting in one paragraph',
		before: 'Plain start and end',
		after: '**Plain** start and finish',
		expected: [
			{ operation: 'replace', category: 'formatting', block: false, context: 'paragraph', before: 'Plain', after: 'Plain' },
			{ operation: 'replace', category: 'text', block: false, context: 'paragraph', before: 'end', after: 'finish' },
		],
	},
]

describe('compareDocuments', () => {
	it.each(cases)('$name', ({ before, after, expected }) => {
		expect(compare(before, after).map(summarize)).toEqual(expected)
	})

	it('orders changes by position and numbers their ids', () => {
		const changes = compare('a\n\nb\n\nc', 'x\n\nb\n\ny')
		expect(changes.map(({ id }) => id)).toEqual(['change-0', 'change-1'])
		expect(changes[0]!.after.from).toBeLessThan(changes[1]!.after.from)
	})

	it('reports positions that resolve to the changed text', () => {
		const beforeEditor = createComparisonEditor('Hello world')
		const afterEditor = createComparisonEditor('Hello there')
		try {
			const [change] = compareDocuments(beforeEditor.state.doc, afterEditor.state.doc)
			expect(beforeEditor.state.doc.textBetween(change!.before.from, change!.before.to)).toBe('world')
			expect(afterEditor.state.doc.textBetween(change!.after.from, change!.after.to)).toBe('there')
		} finally {
			beforeEditor.destroy()
			afterEditor.destroy()
		}
	})

	it('places an insertion at the matching position of the before document', () => {
		const beforeEditor = createComparisonEditor('First\n\nLast')
		const afterEditor = createComparisonEditor('First\n\nMiddle\n\nLast')
		try {
			const [change] = compareDocuments(beforeEditor.state.doc, afterEditor.state.doc)
			const firstParagraphEnd = beforeEditor.state.doc.child(0).nodeSize
			expect(change!.before).toEqual({ from: firstParagraphEnd, to: firstParagraphEnd })
		} finally {
			beforeEditor.destroy()
			afterEditor.destroy()
		}
	})
})
