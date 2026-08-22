/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { ComparisonModelAudit } from '../../comparison/hierarchicalMarkdownComparisonModel.ts'
import type { ComparisonDescriptor, ComparisonSide } from '../../comparison/markdownComparisonTypes.ts'

import { describe, expect, it } from 'vitest'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'
import {
	ComparisonModelLimitError,
	createHierarchicalMarkdownComparisonModel,
	MAX_ALIGNMENT_PRODUCT,
	MAX_INLINE_ENVELOPE_SIZE,
} from '../../comparison/hierarchicalMarkdownComparisonModel.ts'
import {
	ATLAS_CURRENT_CONTENT,
	ATLAS_INITIAL_CONTENT,
	ATLAS_SYNTAX_ONLY_CONTENT,
} from './fixtures/atlasComparison.ts'

function compare(beforeContent: string, afterContent: string, audit?: ComparisonModelAudit) {
	const beforeEditor = createComparisonEditor(beforeContent)
	const afterEditor = createComparisonEditor(afterContent)
	try {
		const before = beforeEditor.state.doc
		const after = afterEditor.state.doc
		return {
			before,
			after,
			model: createHierarchicalMarkdownComparisonModel(before, after, { audit }),
		}
	} finally {
		beforeEditor.destroy()
		afterEditor.destroy()
	}
}

function rangeText(doc: Node, descriptor: ComparisonDescriptor, side: ComparisonSide) {
	const { from, to } = descriptor[side]
	return doc.textBetween(from, to, '\n', '\ufffc')
}

function expectValidRanges(doc: Node, descriptors: readonly ComparisonDescriptor[], side: ComparisonSide) {
	for (const descriptor of descriptors) {
		const range = descriptor[side]
		expect(range.from, `${side} ${descriptor.id} starts before the document`).toBeGreaterThanOrEqual(0)
		expect(range.to, `${side} ${descriptor.id} ends before it starts`).toBeGreaterThanOrEqual(range.from)
		expect(range.to, `${side} ${descriptor.id} ends after the document`).toBeLessThanOrEqual(doc.content.size)
	}
}

function topLevelRanges(doc: Node) {
	const ranges: Array<{ from: number, to: number, text: string }> = []
	doc.forEach((node, from) => ranges.push({
		from,
		to: from + node.nodeSize,
		text: node.textContent,
	}))
	return ranges
}

function touched(range: { from: number, to: number }, block: { from: number, to: number }) {
	return range.from < block.to && range.to > block.from
}

describe('hierarchical Markdown comparison', () => {
	it('normalizes documents created by separate schema instances before comparing them', () => {
		const { model } = compare('# Heading\n\nSame content', '# Heading\n\nSame content')
		expect(model.descriptors).toEqual([])
	})

	it('detects attrs-only textblock changes before content diffing', () => {
		const { model } = compare('# Title', '## Title')
		expect(model.descriptors).toHaveLength(1)
		expect(model.descriptors[0]).toMatchObject({
			detail: 'block',
			facets: ['attribute'],
			signals: [{ type: 'attribute', attribute: 'heading-level', change: 'changed' }],
		})
	})

	it('keeps unsupported semantic attributes visible without exposing values', () => {
		const { model } = compare('- item', '* item')
		expect(model.descriptors).toHaveLength(1)
		expect(model.descriptors[0]).toMatchObject({
			facets: ['attribute', 'unknown'],
			signals: [{ type: 'attribute', attribute: 'unknown-attribute', change: 'changed' }],
		})
		expect(JSON.stringify(model.descriptors)).not.toContain('bullet')
	})

	it.each([
		['text', 'Before text', 'After text', 'text'],
		['formatting', 'plain text', 'plain **text**', 'bold'],
		['link', 'plain text', '[plain text](https://example.test)', 'link'],
		['list start', '1. item', '3. item', 'list-start'],
		['task state', '- [ ] item', '- [x] item', 'task-state'],
		['code language', '```js\nsame\n```', '```ts\nsame\n```', 'code-language'],
		['callout type', '::: info\nsame\n:::', '::: warn\nsame\n:::', 'callout-type'],
		['image identity', '![Before](before.png)', '![After](after.png)', 'image-target'],
		['mention identity', '@[Jane](mention://user/jane)', '@[John](mention://user/john)', 'mention-identity'],
		['preview target', '[Preview](https://before.test (preview))', '[Preview](https://after.test (preview))', 'preview-target'],
		['mathematics', '$1 + 1 = 2$', '$1 + 2 = 3$', 'mathematics'],
		['footnote identity', 'Text[^before].\n\n[^before]: Same', 'Text[^after].\n\n[^after]: Same', 'footnote-reference'],
	] as const)('classifies supported %s semantics', (_name, before, after, semantic) => {
		const descriptors = compare(before, after).model.descriptors
		expect(descriptors.length).toBeGreaterThan(0)
		const encoded = JSON.stringify(descriptors.flatMap(({ facets, signals }) => [facets, signals]))
		expect(encoded).toContain(semantic)
	})

	it.each([
		['bold', 'plain text', 'plain **text**', { type: 'mark', mark: 'bold', change: 'added' }],
		['italic', 'plain text', 'plain *text*', { type: 'mark', mark: 'italic', change: 'added' }],
		['strike', 'plain text', 'plain ~~text~~', { type: 'mark', mark: 'strike', change: 'added' }],
		['highlight', 'plain text', 'plain ==text==', { type: 'mark', mark: 'highlight', change: 'added' }],
		['inline code', 'plain text', 'plain `text`', { type: 'mark', mark: 'inline-code', change: 'added' }],
		['link added', 'text', '[text](https://example.test)', { type: 'attribute', attribute: 'link', change: 'added' }],
		['link removed', '[text](https://example.test)', 'text', { type: 'attribute', attribute: 'link', change: 'removed' }],
		['link target', '[text](https://before.test)', '[text](https://after.test)', { type: 'attribute', attribute: 'link-target', change: 'changed' }],
		['heading level', '# Heading', '## Heading', { type: 'attribute', attribute: 'heading-level', change: 'changed' }],
		['list start', '1. item', '3. item', { type: 'attribute', attribute: 'list-start', change: 'changed' }],
		['task state', '- [ ] item', '- [x] item', { type: 'attribute', attribute: 'task-state', change: 'changed' }],
		['code language', '```js\nsame\n```', '```ts\nsame\n```', { type: 'attribute', attribute: 'code-language', change: 'changed' }],
		['callout type', '::: info\nsame\n:::', '::: warn\nsame\n:::', { type: 'attribute', attribute: 'callout-type', change: 'changed' }],
		['image description', '![Before](same.png)', '![After](same.png)', { type: 'attribute', attribute: 'image-alt', change: 'changed' }],
		['image target', '![Same](before.png)', '![Same](after.png)', { type: 'attribute', attribute: 'image-target', change: 'changed' }],
		['mention identity', '@[Jane](mention://user/jane)', '@[John](mention://user/john)', { type: 'attribute', attribute: 'mention-identity', change: 'changed' }],
		['mathematics', '$1 + 1 = 2$', '$1 + 2 = 3$', { type: 'attribute', attribute: 'mathematics', change: 'changed' }],
		['preview target', '[Preview](https://before.test (preview))', '[Preview](https://after.test (preview))', { type: 'attribute', attribute: 'preview-target', change: 'changed' }],
		['footnote identity', 'Text[^before].\n\n[^before]: Same', 'Text[^after].\n\n[^after]: Same', { type: 'attribute', attribute: 'footnote-reference', change: 'changed' }],
		['table alignment', '| A |\n|:---|\n| 1 |', '| A |\n|---:|\n| 1 |', { type: 'attribute', attribute: 'table-alignment', change: 'changed' }],
	] as const)('emits the supported %s signal', (_name, before, after, signal) => {
		expect(compare(before, after).model.descriptors.flatMap(({ signals }) => signals)).toContainEqual(signal)
	})

	it('classifies underline marks present in editor documents', () => {
		const editor = createComparisonEditor('plain text')
		try {
			const before = editor.state.doc
			const after = editor.state.tr.addMark(7, 11, editor.schema.marks.underline!.create()).doc
			expect(createHierarchicalMarkdownComparisonModel(before, after).descriptors.flatMap(({ signals }) => signals))
				.toContainEqual({ type: 'mark', mark: 'underline', change: 'added' })
		} finally {
			editor.destroy()
		}
	})

	it('matches nested attributes after an earlier top-level insertion shifts their paths', () => {
		const { model } = compare(
			'Introduction\n\n- [ ] Confirm support coverage',
			'New preface\n\nIntroduction\n\n- [x] Confirm support coverage',
		)
		expect(model.descriptors.flatMap(({ signals }) => signals)).toContainEqual({
			type: 'attribute',
			attribute: 'task-state',
			change: 'changed',
		})
	})

	it('keeps Atlas semantics and conservative exact moves', () => {
		const { model } = compare(ATLAS_INITIAL_CONTENT, ATLAS_CURRENT_CONTENT)
		const signals = model.descriptors.flatMap(({ signals }) => signals)
		const contexts = model.descriptors.flatMap(({ context }) => [context.before?.code, context.after?.code])

		expect(model.descriptors.some(({ operation }) => operation === 'move')).toBe(true)
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
		const trafficChanges = model.descriptors.filter(({ preview }) => (
			preview.before?.kind === 'text'
			&& preview.before.text === 'Pending'
			&& preview.after?.kind === 'text'
			&& preview.after.text === '100%'
		))
		expect(model.descriptors).toHaveLength(35)
		expect(trafficChanges).toHaveLength(1)
		expect(trafficChanges[0]).toMatchObject({ detail: 'inline', facets: ['text'] })
	})

	it('treats syntax-only Markdown differences as the same rendered document', () => {
		expect(compare(ATLAS_INITIAL_CONTENT, ATLAS_SYNTAX_ONLY_CONTENT).model.descriptors).toEqual([])
	})

	it('falls back to one honest block range for a changed token island over the inline budget', () => {
		const stableIsland = ' UNCHANGED ISLAND '
		const before = `prefix ${'a'.repeat(2600)}${stableIsland}${'b'.repeat(2600)} suffix`
		const after = `prefix ${'x'.repeat(2600)}${stableIsland}${'y'.repeat(2600)} suffix`
		const result = compare(before, after)

		expect(result.model.descriptors).toHaveLength(1)
		expect(result.model.descriptors[0]?.detail).toBe('block')
		expect(result.model.descriptors.every(({ detail }) => detail !== 'inline')).toBe(true)
		expect(rangeText(result.before, result.model.descriptors[0]!, 'before')).toContain(stableIsland.trim())
		expect(rangeText(result.after, result.model.descriptors[0]!, 'after')).toContain(stableIsland.trim())
	})

	it.each([
		[MAX_INLINE_ENVELOPE_SIZE - 2, 'inline'],
		[MAX_INLINE_ENVELOPE_SIZE, 'inline'],
		[MAX_INLINE_ENVELOPE_SIZE + 2, 'block'],
	] as const)('bounds a leaf ChangeSet at an envelope of %i', (envelope, detail) => {
		const sideLength = envelope / 2
		const { model } = compare(`prefix${'a'.repeat(sideLength)}suffix`, `prefix${'b'.repeat(sideLength)}suffix`)
		expect(model.descriptors).toHaveLength(1)
		expect(model.descriptors[0]?.detail).toBe(detail)
	})

	it.each([
		['pure insertion overlap clamp', 'aa', 'aaa', 'insert'],
		['pure deletion overlap clamp', 'aaa', 'aa', 'delete'],
		['start insertion', 'middle end', 'start middle end', 'insert'],
		['middle insertion', 'start end', 'start middle end', 'insert'],
		['end insertion', 'start middle', 'start middle end', 'insert'],
		['start deletion', 'start middle end', 'middle end', 'delete'],
		['middle deletion', 'start middle end', 'start end', 'delete'],
		['end deletion', 'start middle end', 'start middle', 'delete'],
	] as const)('keeps a bounded inline %s valid', (_name, before, after, operation) => {
		const result = compare(before, after)
		expect(result.model.descriptors).toHaveLength(1)
		expect(result.model.descriptors[0]).toMatchObject({ detail: 'inline', operation })
		expectValidRanges(result.before, result.model.descriptors, 'before')
		expectValidRanges(result.after, result.model.descriptors, 'after')
	})

	it('keeps a small edit inline inside a very long paragraph', () => {
		const shared = 'same '.repeat(1500)
		const { before, after, model } = compare(`${shared}before ${shared}`, `${shared}after ${shared}`)
		expect(model.descriptors).toHaveLength(1)
		expect(model.descriptors[0]?.detail).toBe('inline')
		expect(rangeText(before, model.descriptors[0]!, 'before')).toBe('before')
		expect(rangeText(after, model.descriptors[0]!, 'after')).toBe('after')
	})

	it('aligns more than 500 siblings around one sparse edit', () => {
		const paragraphs = Array.from({ length: 512 }, (_, index) => `paragraph ${index}`)
		const before = paragraphs.join('\n\n')
		const after = paragraphs.with(256, 'paragraph changed').join('\n\n')
		const { model } = compare(before, after)
		expect(model.descriptors).toHaveLength(1)
		expect(model.descriptors[0]?.detail).toBe('inline')
	})

	it('classifies every block in a large document with more than 500 siblings', () => {
		const before = Array.from({ length: 512 }, (_, index) => `before ${index}`).join('\n\n')
		const after = Array.from({ length: 512 }, (_, index) => `after ${index}`).join('\n\n')
		const result = compare(before, after)
		const beforeBlocks = topLevelRanges(result.before).filter(({ text }) => text)
		const afterBlocks = topLevelRanges(result.after).filter(({ text }) => text)

		expect(result.model.descriptors).toHaveLength(512)
		for (const block of beforeBlocks) {
			expect(result.model.descriptors.some(({ before: range }) => touched(range, block))).toBe(true)
		}
		for (const block of afterBlocks) {
			expect(result.model.descriptors.some(({ after: range }) => touched(range, block))).toBe(true)
		}
	})

	it.each([
		[199, 200, MAX_ALIGNMENT_PRODUCT - 200],
		[200, 200, MAX_ALIGNMENT_PRODUCT],
		[201, 200, MAX_ALIGNMENT_PRODUCT + 200],
	] as const)('keeps sibling alignment bounded for %i by %i nodes', (beforeCount, afterCount, product) => {
		expect(beforeCount * afterCount).toBe(product)
		const before = Array.from({ length: beforeCount }, (_, index) => `before ${index}`).join('\n\n')
		const after = Array.from({ length: afterCount }, (_, index) => `after ${index}`).join('\n\n')
		const result = compare(before, after)
		expectValidRanges(result.before, result.model.descriptors, 'before')
		expectValidRanges(result.after, result.model.descriptors, 'after')
		for (const block of topLevelRanges(result.before).filter(({ text }) => text)) {
			expect(result.model.descriptors.some(({ before: range }) => touched(range, block))).toBe(true)
		}
		for (const block of topLevelRanges(result.after).filter(({ text }) => text)) {
			expect(result.model.descriptors.some(({ after: range }) => touched(range, block))).toBe(true)
		}
	})

	it('keeps inline precision for a global edit plus one added block', () => {
		const before = Array.from({ length: 80 }, (_, index) => `Foo release block ${index}`).join('\n\n')
		const after = [
			...Array.from({ length: 80 }, (_, index) => `Bar release block ${index}`),
			'Appended release block',
		].join('\n\n')
		const { model } = compare(before, after)

		expect(model.descriptors.filter(({ operation }) => operation === 'delete')).toHaveLength(0)
		expect(model.descriptors.filter(({ operation, detail }) => operation === 'insert' && detail === 'block')).toHaveLength(1)
		expect(model.descriptors.filter(({ operation, detail }) => operation === 'replace' && detail === 'inline')).toHaveLength(80)
	})

	it('degrades linearly beyond the alignment ceiling without rewriting the document', () => {
		const beforeBlocks = Array.from({ length: 250 }, (_, index) => `Foo release block ${index}`)
		const afterBlocks = Array.from({ length: 250 }, (_, index) => `Bar release block ${index}`)
		afterBlocks.splice(125, 0, 'Inserted release block')
		const { model } = compare(beforeBlocks.join('\n\n'), afterBlocks.join('\n\n'))

		expect(beforeBlocks.length * afterBlocks.length).toBeGreaterThan(MAX_ALIGNMENT_PRODUCT)
		expect(model.descriptors.filter(({ operation }) => operation === 'delete')).toHaveLength(0)
		expect(model.descriptors.filter(({ operation, detail }) => operation === 'insert' && detail === 'block')).toHaveLength(1)
		expect(model.descriptors.filter(({ operation, detail }) => operation === 'replace' && detail === 'inline')).toHaveLength(250)
	})

	it('isolates one type change beyond the alignment ceiling', () => {
		const before = Array.from({ length: 250 }, (_, index) => `Foo release block ${index}`)
		const after = Array.from({ length: 250 }, (_, index) => `Bar release block ${index}`)
		after[125] = '# Bar release block 125'
		const { model } = compare(before.join('\n\n'), after.join('\n\n'))

		expect(model.descriptors.filter(({ operation }) => operation === 'delete')).toHaveLength(1)
		expect(model.descriptors.filter(({ operation, detail }) => operation === 'insert' && detail === 'block')).toHaveLength(1)
		expect(model.descriptors.filter(({ operation, detail }) => operation === 'replace' && detail === 'inline')).toHaveLength(249)
	})

	it('bounds classification work for dense checklist edits', () => {
		const count = 200
		const audit: ComparisonModelAudit = { examinedNodes: 0, fingerprintGroupAllocations: 0 }
		const result = compare(
			Array.from({ length: count }, () => '- [ ] a x a x a x a x a x a x a x a x').join('\n'),
			Array.from({ length: count }, () => '- [ ] b x b x b x b x b x b x b x b x').join('\n'),
			audit,
		)

		expect(result.model.descriptors).toHaveLength(count * 8)
		expect(audit.examinedNodes).toBeLessThan(result.model.descriptors.length * 50)
	})

	it('stops at the shared descriptor boundary before more classification', () => {
		const before = createComparisonEditor(Array.from({ length: 20 }, () => '- [ ] a x a x a x a x').join('\n'))
		const after = createComparisonEditor(Array.from({ length: 20 }, () => '- [ ] b x b x b x b x').join('\n'))
		const audit: ComparisonModelAudit = { examinedNodes: 0, fingerprintGroupAllocations: 0 }
		try {
			expect(() => createHierarchicalMarkdownComparisonModel(
				before.state.doc,
				after.state.doc,
				{ audit, maximumDescriptors: 10 },
			)).toThrow(ComparisonModelLimitError)
			expect(audit.examinedNodes).toBeLessThan(1000)
		} finally {
			before.destroy()
			after.destroy()
		}
	})

	it.each([
		[
			'interleaved insertions',
			Array.from({ length: 80 }, (_, index) => `- item ${index * 2}`).join('\n'),
			Array.from({ length: 160 }, (_, index) => `- item ${index}`).join('\n'),
		],
		[
			'interleaved deletions',
			Array.from({ length: 160 }, (_, index) => `- item ${index}`).join('\n'),
			Array.from({ length: 80 }, (_, index) => `- item ${index * 2}`).join('\n'),
		],
		[
			'multiple moved groups',
			Array.from({ length: 60 }, (_, index) => `Block ${index}`).join('\n\n'),
			[
				...Array.from({ length: 20 }, (_, index) => `Block ${index + 40}`),
				...Array.from({ length: 20 }, (_, index) => `Block ${index}`),
				...Array.from({ length: 20 }, (_, index) => `Block ${index + 20}`),
			].join('\n\n'),
		],
	] as const)('keeps %s classification output-sensitive', (_name, before, after) => {
		const audit: ComparisonModelAudit = { examinedNodes: 0, fingerprintGroupAllocations: 0 }
		const result = compare(before, after, audit)
		let nodes = 0
		for (const doc of [result.before, result.after]) {
			doc.descendants(() => {
				nodes++
			})
		}

		expect(result.model.descriptors.length).toBeGreaterThan(0)
		expect(audit.examinedNodes).toBeLessThan((nodes + result.model.descriptors.length) * 80)
	})

	it('allocates repeated sibling fingerprint groups by distinct fingerprint', () => {
		const count = 400
		const before = Array.from({ length: count }, () => '- [ ] TODO')
		const after = [...before]
		after[Math.floor(count / 2)] = '- [x] DONE'
		const audit: ComparisonModelAudit = { examinedNodes: 0, fingerprintGroupAllocations: 0 }
		const { model } = compare(before.join('\n'), after.join('\n'), audit)

		expect(model.descriptors.length).toBeGreaterThan(0)
		expect(audit.fingerprintGroupAllocations).toBeLessThan(count / 4)
	})

	it.each([
		['start insertion', 'two\n\nthree', 'one\n\ntwo\n\nthree', 'insert'],
		['middle insertion', 'one\n\nthree', 'one\n\ntwo\n\nthree', 'insert'],
		['end insertion', 'one\n\ntwo', 'one\n\ntwo\n\nthree', 'insert'],
		['start deletion', 'one\n\ntwo\n\nthree', 'two\n\nthree', 'delete'],
		['middle deletion', 'one\n\ntwo\n\nthree', 'one\n\nthree', 'delete'],
		['end deletion', 'one\n\ntwo\n\nthree', 'one\n\ntwo', 'delete'],
	] as const)('represents a block %s', (_name, before, after, operation) => {
		const { model } = compare(before, after)
		expect(model.descriptors).toHaveLength(1)
		expect(model.descriptors[0]).toMatchObject({ operation, detail: 'block' })
	})

	it('pairs the later duplicate on equal alignment scores', () => {
		const { before, model } = compare('Same\n\nSame', 'Same')
		expect(model.descriptors).toHaveLength(1)
		expect(model.descriptors[0]?.operation).toBe('delete')
		const firstBlock = topLevelRanges(before)[0]!
		expect(model.descriptors[0]?.before).toEqual({ from: firstBlock.from, to: firstBlock.to })
	})

	it('uses the same deterministic duplicate convention for list items', () => {
		const { model } = compare('- Same\n- Same', '- Same')
		expect(model.descriptors).toHaveLength(1)
		expect(model.descriptors[0]).toMatchObject({ operation: 'delete', detail: 'block' })
		expect(model.descriptors[0]?.context.before?.code).toBe('list-item')
	})

	it.each([
		['duplicate top-level blocks', 'Same\n\nSame\n\nOther', 'Other\n\nSame\n\nSame'],
		['top-level block duplicated inside a blockquote', 'Moved\n\nAlpha\n\nBravo\n\n> Moved', 'Alpha\n\nBravo\n\nMoved\n\n> Moved'],
		['nested list reorder', '- Alpha\n- Bravo', '- Bravo\n- Alpha'],
	])('does not infer an ambiguous %s move', (_name, before, after) => {
		const { model } = compare(before, after)
		expect(model.descriptors.some(({ operation }) => operation === 'move')).toBe(false)
		expect(model.descriptors.length).toBeGreaterThan(0)
	})

	it.each([
		['heading reorder', '# Alpha\n\n# Bravo\n\n# Charlie', '# Bravo\n\n# Charlie\n\n# Alpha'],
		['section move', '# Alpha\n\nAlpha body\n\n# Bravo\n\nBravo body', '# Bravo\n\nBravo body\n\n# Alpha\n\nAlpha body'],
		['crossing moves', 'Alpha\n\nBravo\n\nCharlie\n\nDelta', 'Charlie\n\nDelta\n\nAlpha\n\nBravo'],
	] as const)('detects a conservative exact %s', (_name, before, after) => {
		const { model } = compare(before, after)
		expect(model.descriptors.some(({ operation }) => operation === 'move')).toBe(true)
		expect(model.descriptors.every(({ operation, detail }) => operation !== 'move' || detail === 'block')).toBe(true)
	})

	it('keeps the exact move separate from the nearby Zed edit reproduction', () => {
		const result = compare(
			['Zed', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'].join('\n\n'),
			['One', 'Two modified', 'Three', 'Four', 'Five', 'Six', 'Zed'].join('\n\n'),
		)
		expect(result.model.descriptors.filter(({ operation }) => operation === 'move')).toHaveLength(1)
		const edit = result.model.descriptors.find(({ detail, operation }) => detail === 'inline' && operation === 'insert')
		expect(edit).toBeDefined()
		expect(rangeText(result.before, edit!, 'before')).toBe('')
		expect(rangeText(result.after, edit!, 'after')).toBe(' modified')
	})

	it('does not label an edited moved block as an exact move', () => {
		const result = compare('Zed\n\nOne\n\nTwo', 'One\n\nTwo\n\nZed modified')
		expect(result.model.descriptors.some(({ operation }) => operation === 'move')).toBe(false)
		expect(result.model.descriptors.some(({ before }) => result.before.textBetween(before.from, before.to).includes('Zed'))).toBe(true)
		expect(result.model.descriptors.some(({ after }) => result.after.textBetween(after.from, after.to).includes('Zed modified'))).toBe(true)
	})

	it.each([
		['front matter', '---\ntitle: Before\n---\n\nBody', '---\ntitle: After\n---\n\nBody', 'front-matter'],
		['nested bullet and ordered lists', '- Parent\n  1. Before', '- Parent\n  1. After', 'list-item'],
		['nested task list', '- [ ] Parent\n  - [ ] Before', '- [x] Parent\n  - [ ] After', 'task'],
		['table text', '| A | B |\n|---|---|\n| 1 | Before |', '| A | B |\n|---|---|\n| 1 | After |', 'table-cell'],
		['table row insertion', '| A |\n|---|\n| 1 |', '| A |\n|---|\n| 1 |\n| 2 |', 'table-cell'],
		['table row deletion', '| A |\n|---|\n| 1 |\n| 2 |', '| A |\n|---|\n| 1 |', 'table-cell'],
		['table cell insertion', '| A |\n|---|\n| 1 |', '| A | B |\n|---|---|\n| 1 | 2 |', 'table-cell'],
		['table cell deletion', '| A | B |\n|---|---|\n| 1 | 2 |', '| A |\n|---|\n| 1 |', 'table-cell'],
		['table alignment', '| A |\n|:---|\n| 1 |', '| A |\n|---:|\n| 1 |', 'table-cell'],
	] as const)('recurses through %s', (_name, before, after, context) => {
		const { model } = compare(before, after)
		expect(model.descriptors.length).toBeGreaterThan(0)
		expect(model.descriptors.some(({ context: descriptorContext }) => (
			descriptorContext.before?.code === context || descriptorContext.after?.code === context
		))).toBe(true)
	})

	it('does not leak a sibling structural edit into an inline text descriptor', () => {
		const result = compare(
			'- Alpha old\n- Bravo',
			'- Alpha new\n- Bravo\n  - Nested',
		)
		const textChange = result.model.descriptors.find(({ preview }) => (
			preview.before?.kind === 'text'
			&& preview.before.text === 'old'
			&& preview.after?.kind === 'text'
			&& preview.after.text === 'new'
		))

		expect(textChange).toMatchObject({ detail: 'inline', facets: ['text'] })
		expect(textChange?.signals).not.toContainEqual(expect.objectContaining({ type: 'node' }))
	})

	it('classifies details state, table span, and explicit direction attributes', () => {
		const editor = createComparisonEditor('<details>\n<summary>Title</summary>\nBody\n</details>\n\n| A |\n|---|\n| 1 |\n\nDirection')
		try {
			const before = editor.state.doc
			let detailsPosition = -1
			let cellPosition = -1
			let paragraphPosition = -1
			before.descendants((node, position) => {
				if (node.type.name === 'details') {
					detailsPosition = position
				}
				if (cellPosition < 0 && node.type.name === 'tableCell') {
					cellPosition = position
				}
				if (node.type.name === 'paragraph' && node.textContent === 'Direction') {
					paragraphPosition = position
				}
			})
			const after = editor.state.tr
				.setNodeAttribute(detailsPosition, 'openDetails', true)
				.setNodeAttribute(cellPosition, 'colspan', 2)
				.setNodeAttribute(paragraphPosition, 'dir', 'rtl')
				.doc
			const signals = createHierarchicalMarkdownComparisonModel(before, after).descriptors.flatMap(({ signals }) => signals)
			expect(signals).toEqual(expect.arrayContaining([
				{ type: 'attribute', attribute: 'details-state', change: 'changed' },
				{ type: 'attribute', attribute: 'table-span', change: 'changed' },
				{ type: 'attribute', attribute: 'text-direction', change: 'changed' },
			]))
		} finally {
			editor.destroy()
		}
	})

	it('keeps ranges valid, anchors unchanged, output deterministic, and swap coverage symmetric', () => {
		for (let seed = 1; seed <= 12; seed++) {
			const unchanged = `anchor ${seed}`
			const beforeContent = [`before ${seed}`, unchanged, `tail ${seed}`].join('\n\n')
			const afterContent = [seed % 2 ? `insert ${seed}` : `after ${seed}`, unchanged, seed % 2 ? `after ${seed}` : `tail ${seed}`].join('\n\n')
			const result = compare(beforeContent, afterContent)
			const repeated = compare(beforeContent, afterContent)
			const swapped = compare(afterContent, beforeContent)

			expect(result.model.descriptors).toEqual(repeated.model.descriptors)
			expectValidRanges(result.before, result.model.descriptors, 'before')
			expectValidRanges(result.after, result.model.descriptors, 'after')
			const beforeAnchor = topLevelRanges(result.before).find(({ text }) => text === unchanged)!
			const afterAnchor = topLevelRanges(result.after).find(({ text }) => text === unchanged)!
			expect(result.model.descriptors.some(({ before }) => touched(before, beforeAnchor))).toBe(false)
			expect(result.model.descriptors.some(({ after }) => touched(after, afterAnchor))).toBe(false)
			const beforeBlocks = topLevelRanges(result.before).filter(({ text }) => text)
			const afterBlocks = topLevelRanges(result.after).filter(({ text }) => text)
			const beforeTexts = new Set(beforeBlocks.map(({ text }) => text))
			const afterTexts = new Set(afterBlocks.map(({ text }) => text))
			for (const block of beforeBlocks.filter(({ text }) => !afterTexts.has(text))) {
				expect(result.model.descriptors.filter(({ before }) => touched(before, block))).toHaveLength(1)
			}
			for (const block of afterBlocks.filter(({ text }) => !beforeTexts.has(text))) {
				expect(result.model.descriptors.filter(({ after }) => touched(after, block))).toHaveLength(1)
			}
			const inserted = result.model.descriptors.filter(({ operation }) => operation === 'insert').length
			const deleted = result.model.descriptors.filter(({ operation }) => operation === 'delete').length
			expect(swapped.model.descriptors.filter(({ operation }) => operation === 'insert')).toHaveLength(deleted)
			expect(swapped.model.descriptors.filter(({ operation }) => operation === 'delete')).toHaveLength(inserted)
			const beforeCoverage = result.model.descriptors.map((descriptor) => rangeText(result.before, descriptor, 'before')).toSorted()
			const swappedAfterCoverage = swapped.model.descriptors.map((descriptor) => rangeText(swapped.after, descriptor, 'after')).toSorted()
			expect(swappedAfterCoverage).toEqual(beforeCoverage)
		}
	})
})
