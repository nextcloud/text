/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'
import { createMarkdownComparisonModel } from '../../comparison/markdownComparison.ts'
import { stableSerialize } from '../../comparison/markdownComparisonClassification.ts'
import {
	ATLAS_CURRENT_CONTENT,
	ATLAS_INITIAL_CONTENT,
} from './fixtures/atlasComparison.ts'

function compare(beforeContent: string, afterContent: string) {
	const before = createComparisonEditor(beforeContent)
	const after = createComparisonEditor(afterContent)
	try {
		return {
			before: before.state.doc,
			after: after.state.doc,
			model: createMarkdownComparisonModel(before.state.doc, after.state.doc),
		}
	} finally {
		before.destroy()
		after.destroy()
	}
}

describe('semantic Markdown comparison', () => {
	it('serializes object keys by code units rather than locale collation', () => {
		expect(stableSerialize({ ä: 1, z: 2, a: 3 })).toBe('{"a":3,"z":2,"ä":1}')
	})

	it.each([
		['identical documents', '# Heading\n\nText', '# Heading\n\nText'],
		['both empty', '', ''],
		['equivalent heading syntax', '# Heading', '# Heading #'],
	])('finds no semantic change for %s', (_name, before, after) => {
		expect(compare(before, after).model.descriptors).toEqual([])
	})

	it.each([
		['empty to content', '', 'content'],
		['content to empty', 'content', ''],
		['text insertion', 'one', 'one two'],
		['text deletion', 'one two', 'one'],
		['text replacement', 'one two', 'one three'],
		['punctuation-heavy words', 'wait...what?!', 'wait—what?'],
		['semantic whitespace', 'one\ntwo', 'one  \ntwo'],
		['Unicode', 'café', 'cafe'],
		['CJK', '发布计划', '发布方案'],
		['emoji and graphemes', '👩‍💻 e\u0301', '👨‍💻 é'],
		['bidi and RTL', 'English', 'العربية'],
		['bold', 'text', '**text**'],
		['italic', 'text', '*text*'],
		['strike', 'text', '~~text~~'],
		['inline code', 'text', '`text`'],
		['link target', '[text](https://before.example)', '[text](https://after.example)'],
		['heading attribute', '# Heading', '## Heading'],
		['list attribute', '1. item', '3. item'],
		['task attribute', '- [ ] item', '- [x] item'],
		['paragraph and blockquote', 'paragraph', '> paragraph'],
		['code block', '```js\nconst value = 1\n```', '```js\nconst value = 2\n```'],
		['nested list', '- parent\n  - child one', '- parent\n  - child two'],
		['deleted list item', '- one\n- two\n- three', '- one\n- three'],
		['table cell', '| A | B |\n|---|---|\n| 1 | 2 |', '| A | B |\n|---|---|\n| 1 | 3 |'],
		['deleted table row', '| A |\n|---|\n| 1 |\n| 2 |', '| A |\n|---|\n| 1 |'],
		['deleted table cell', '| A | B |\n|---|---|\n| 1 | 2 |', '| A |\n|---|\n| 1 |'],
		['whole table', '| A |\n|---|\n| 1 |', 'No table'],
		['whole list', '- one\n- two', 'No list'],
		['callout', '::: info\nBefore\n:::', '::: info\nAfter\n:::'],
		['details', '<details>\n<summary>Title</summary>\nBefore\n</details>', '<details>\n<summary>Title</summary>\nAfter\n</details>'],
		['mention', '@[Jane](mention://user/jane)', '@[John](mention://user/john)'],
		['preview', '[Before](https://example.test (preview))', '[After](https://example.test (preview))'],
		['image', '![Before](.attachments.1/before.png)', '![After](.attachments.1/after.png)'],
		['missing historical attachment', '![Missing](.attachments.1/missing.png)', 'No image'],
		['mathematics', '$1 + 1 = 2$', '$1 + 2 = 3$'],
		['open cross-parent change', 'one\n\ntwo', '- one\n- two'],
	])('detects %s', (_name, before, after) => {
		expect(compare(before, after).model.descriptors.length).toBeGreaterThan(0)
	})

	it.each([
		['text replacement', 'one two', 'one three', ['text'], []],
		['bold added', 'plain text', 'plain **text**', ['formatting'], [{ type: 'mark', mark: 'bold', change: 'added' }]],
		['bold removed', 'plain **text**', 'plain text', ['formatting'], [{ type: 'mark', mark: 'bold', change: 'removed' }]],
		['italic added', 'plain text', 'plain *text*', ['formatting'], [{ type: 'mark', mark: 'italic', change: 'added' }]],
		['strike added', 'plain text', 'plain ~~text~~', ['formatting'], [{ type: 'mark', mark: 'strike', change: 'added' }]],
		['highlight added', 'plain text', 'plain ==text==', ['formatting'], [{ type: 'mark', mark: 'highlight', change: 'added' }]],
		['mixed text and formatting', 'plain text', 'plain **changed**', ['text', 'formatting'], [{ type: 'mark', mark: 'bold', change: 'added' }]],
		['link added', 'text', '[text](https://example.test)', ['attribute'], [{ type: 'attribute', attribute: 'link', change: 'added' }]],
		['link removed', '[text](https://example.test)', 'text', ['attribute'], [{ type: 'attribute', attribute: 'link', change: 'removed' }]],
		['link target', '[text](https://before.test)', '[text](https://after.test)', ['attribute'], [{ type: 'attribute', attribute: 'link-target', change: 'changed' }]],
		['heading level', '# Heading', '## Heading', ['attribute'], [{ type: 'attribute', attribute: 'heading-level', change: 'changed' }]],
		['list start', '1. item', '3. item', ['attribute'], [{ type: 'attribute', attribute: 'list-start', change: 'changed' }]],
		['task state', '- [ ] item', '- [x] item', ['attribute'], [{ type: 'attribute', attribute: 'task-state', change: 'changed' }]],
		['code language', '```js\nsame\n```', '```ts\nsame\n```', ['attribute'], [{ type: 'attribute', attribute: 'code-language', change: 'changed' }]],
		['image attributes', '![Before](before.png)', '![After](after.png)', ['attribute'], [
			{ type: 'attribute', attribute: 'image-alt', change: 'changed' },
			{ type: 'attribute', attribute: 'image-target', change: 'changed' },
		]],
	] as const)('classifies %s', (_name, before, after, facets, signals) => {
		const descriptors = compare(before, after).model.descriptors
		expect(descriptors).toHaveLength(1)
		expect(descriptors[0]?.facets).toEqual(facets)
		expect(descriptors[0]?.signals).toEqual(signals)
	})

	it.each([
		['front matter', '---\ntitle: Before\n---\n\nBody', '---\ntitle: After\n---\n\nBody', 'front-matter'],
		['nested list', '- parent\n  - before', '- parent\n  - after', 'list-item'],
		['table cell', '| A |\n|---|\n| Before |', '| A |\n|---|\n| After |', 'table-cell'],
		['callout', '::: info\nBefore\n:::', '::: info\nAfter\n:::', 'callout'],
		['details', '<details>\n<summary>Title</summary>\nBefore\n</details>', '<details>\n<summary>Title</summary>\nAfter\n</details>', 'details'],
		['footnote definition', 'Text[^one].\n\n[^one]: Before', 'Text[^one].\n\n[^one]: After', 'footnote'],
	] as const)('uses a meaningful %s context', (_name, before, after, context) => {
		for (const descriptor of compare(before, after).model.descriptors) {
			expect(descriptor.context.before?.code).toBe(context)
			expect(descriptor.context.after?.code).toBe(context)
		}
	})

	it('returns immutable, translation-independent descriptors with safe leaf previews', () => {
		const { model } = compare('![Before](before.png)', '![After](after.png)')
		const descriptor = model.descriptors[0]!
		expect(Object.isFrozen(model)).toBe(true)
		expect(Object.isFrozen(model.descriptors)).toBe(true)
		expect(Object.isFrozen(descriptor.signals)).toBe(true)
		expect(descriptor.preview).toEqual({
			before: { kind: 'node', node: 'image' },
			after: { kind: 'node', node: 'image' },
		})
		expect(JSON.stringify(descriptor)).not.toContain('before.png')
		expect(JSON.stringify(descriptor)).not.toContain('After changed')
	})

	it.each([
		['text replacement', 'one two', 'one three', 'two', 'three'],
		['formatting-only replacement', 'plain text', 'plain **text**', 'text', 'text'],
		['link-target replacement', '[text](https://before.example)', '[text](https://after.example)', 'text', 'text'],
		['table-cell replacement', '| A | B |\n|---|---|\n| 1 | 2 |', '| A | B |\n|---|---|\n| 1 | 3 |', '2', '3'],
	])('keeps %s ranges on the changed content', (_name, beforeContent, afterContent, beforeText, afterText) => {
		const { before, after, model } = compare(beforeContent, afterContent)
		expect(model.descriptors).toHaveLength(1)
		const [change] = model.descriptors
		expect(before.textBetween(change!.before.from, change!.before.to)).toBe(beforeText)
		expect(after.textBetween(change!.after.from, change!.after.to)).toBe(afterText)
	})

	it('detects normalized node attributes without a text change', () => {
		const beforeEditor = createComparisonEditor('same text')
		try {
			const before = beforeEditor.state.doc
			const after = beforeEditor.state.tr.setNodeAttribute(0, 'dir', 'rtl').doc
			expect(createMarkdownComparisonModel(before, after).descriptors).not.toEqual([])
		} finally {
			beforeEditor.destroy()
		}
	})

	it('classifies a normalized text-direction attribute without exposing its raw value', () => {
		const editor = createComparisonEditor('same text')
		try {
			const before = editor.state.doc
			const after = editor.state.tr.setNodeAttribute(0, 'dir', 'rtl').doc
			const descriptor = createMarkdownComparisonModel(before, after).descriptors[0]
			expect(descriptor).toMatchObject({
				facets: ['attribute'],
				signals: [{ type: 'attribute', attribute: 'text-direction', change: 'changed' }],
			})
			expect(JSON.stringify(descriptor)).not.toContain('rtl')
		} finally {
			editor.destroy()
		}
	})

	it('keeps an explicit direction removal on unchanged neutral text', () => {
		const editor = createComparisonEditor('1234')
		try {
			const before = editor.state.tr.setNodeAttribute(0, 'dir', 'rtl').doc
			const after = editor.state.tr.setNodeAttribute(0, 'dir', null).doc
			expect(createMarkdownComparisonModel(before, after).descriptors[0]?.signals)
				.toContainEqual({ type: 'attribute', attribute: 'text-direction', change: 'changed' })
		} finally {
			editor.destroy()
		}
	})

	it('keeps an explicit direction removal when neutral text also changes', () => {
		const beforeEditor = createComparisonEditor('1234')
		const afterEditor = createComparisonEditor('5678')
		try {
			const before = beforeEditor.state.tr.setNodeAttribute(0, 'dir', 'rtl').doc
			const signals = createMarkdownComparisonModel(before, afterEditor.state.doc)
				.descriptors.flatMap(({ signals }) => signals)

			expect(signals)
				.toContainEqual({ type: 'attribute', attribute: 'text-direction', change: 'changed' })
		} finally {
			beforeEditor.destroy()
			afterEditor.destroy()
		}
	})

	it('keeps a small edit in a large document narrow', () => {
		const common = Array.from({ length: 1000 }, (_, index) => `line ${index}`).join('\n\n')
		const { model } = compare(common, common.replace('line 500', 'line changed'))
		expect(model.descriptors).toHaveLength(1)
		const [change] = model.descriptors
		expect(change!.before.to - change!.before.from).toBeLessThan(20)
		expect(change!.after.to - change!.after.from).toBeLessThan(20)
		expect(change!.detail).toBe('inline')
	})

	it('uses honest block detail beyond the bounded inline budget', () => {
		const before = `# Before\n\n${'a'.repeat(6000)}`
		const after = `# After\n\n${'b'.repeat(6000)}`
		const { model } = compare(before, after)
		expect(model.descriptors).toHaveLength(2)
		expect(model.descriptors.map(({ detail }) => detail)).toEqual(['inline', 'block'])
	})

	it('pins the Atlas launch-plan semantic classifications', () => {
		const { model } = compare(ATLAS_INITIAL_CONTENT, ATLAS_CURRENT_CONTENT)
		const signals = model.descriptors.flatMap(({ signals }) => signals)
		const contexts = model.descriptors.flatMap(({ context }) => [
			context.before?.code,
			context.after?.code,
		])

		expect(model.descriptors.filter(({ operation }) => operation === 'move')).toHaveLength(1)
		expect(model.descriptors.filter(({ facets }) => facets.length === 1 && facets[0] === 'formatting'))
			.toHaveLength(2)
		expect(model.descriptors).toContainEqual(expect.objectContaining({ facets: ['text', 'formatting'] }))
		expect(signals).toEqual(expect.arrayContaining([
			{ type: 'mark', mark: 'bold', change: 'added' },
			{ type: 'mark', mark: 'italic', change: 'added' },
			{ type: 'attribute', attribute: 'link', change: 'added' },
			{ type: 'attribute', attribute: 'link', change: 'removed' },
			{ type: 'attribute', attribute: 'link-target', change: 'changed' },
			{ type: 'attribute', attribute: 'task-state', change: 'changed' },
			{ type: 'attribute', attribute: 'callout-type', change: 'changed' },
			{ type: 'attribute', attribute: 'footnote-reference', change: 'changed' },
			{ type: 'attribute', attribute: 'image-alt', change: 'changed' },
		]))
		expect(signals).not.toContainEqual({ type: 'attribute', attribute: 'text-direction', change: 'changed' })
		expect(contexts).toEqual(expect.arrayContaining([
			'front-matter',
			'quote',
			'paragraph',
			'heading',
			'task',
			'table-cell',
			'callout',
			'details',
			'code-block',
			'footnote-reference',
			'image',
			'footnote',
		]))
	})
})
