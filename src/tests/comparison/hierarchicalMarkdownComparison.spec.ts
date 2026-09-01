/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { ComparisonEdit, ComparisonSide } from '../../comparison/markdownComparisonTypes.ts'

import { Schema } from '@tiptap/pm/model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import { describe, expect, it } from 'vitest'
import {
	ComparisonModelLimitError,
	createHierarchicalMarkdownComparisonModel,
	MAX_INLINE_ENVELOPE_SIZE,
	MAX_RENDERED_COMPARISON_DESCRIPTORS,
} from '../../comparison/hierarchicalMarkdownComparisonModel.ts'
import { comparisonTestDocument, createComparisonTestEditor } from './comparisonTestEditor.ts'

function compare(beforeContent: string, afterContent: string) {
	const before = comparisonTestDocument(beforeContent)
	const after = comparisonTestDocument(afterContent)
	return {
		before,
		after,
		model: createHierarchicalMarkdownComparisonModel(before, after),
	}
}

function meaningfulSize(doc: Node) {
	return doc.content.size - (doc.lastChild?.content.size === 0 ? doc.lastChild.nodeSize : 0)
}

function editText(doc: { textBetween: (from: number, to: number, separator: string) => string }) {
	return (edit: ComparisonEdit, side: ComparisonSide) => (
		doc.textBetween(edit.primary[side].from, edit.primary[side].to, '\n')
	)
}

describe('hierarchical markdown comparison', () => {
	it('A01 emits no edit for two equal documents', () => {
		const { model } = compare('# Title\n\nBody text.\n', '# Title\n\nBody text.\n')

		expect(model.edits).toEqual([])
	})

	it('A02 normalizes separate schema instances without position or content drift', () => {
		const beforeEditor = createComparisonTestEditor('# Title\n\nOriginal body.\n')
		const afterEditor = createComparisonTestEditor('# Title\n\nUpdated body.\n')
		try {
			const before = beforeEditor.state.doc
			const after = afterEditor.state.doc
			expect(before.type.schema).not.toBe(after.type.schema)

			const model = createHierarchicalMarkdownComparisonModel(before, after)

			expect(model.edits).toHaveLength(1)
			const [edit] = model.edits
			expect(before.textBetween(edit!.primary.before.from, edit!.primary.before.to)).toBe('Original')
			expect(after.textBetween(edit!.primary.after.from, edit!.primary.after.to)).toBe('Updated')
		} finally {
			beforeEditor.destroy()
			afterEditor.destroy()
		}
	})

	it('AUD-19 rejects cross-schema normalization that drops node attributes', () => {
		const paragraph = basicSchema.spec.nodes.get('paragraph')!
		const beforeSchema = new Schema({
			nodes: basicSchema.spec.nodes.update('paragraph', { ...paragraph, attrs: { audit: { default: null } } }),
			marks: basicSchema.spec.marks,
		})
		const afterSchema = new Schema({ nodes: basicSchema.spec.nodes, marks: basicSchema.spec.marks })
		const before = beforeSchema.node('doc', null, [beforeSchema.node('paragraph', { audit: 'must-survive' }, beforeSchema.text('same'))])
		const after = afterSchema.node('doc', null, [afterSchema.node('paragraph', null, afterSchema.text('same'))])

		expect(() => createHierarchicalMarkdownComparisonModel(before, after)).toThrow(/schema normalization lost semantics/)
	})

	it('A05 retains the first repeated paragraph and inserts the second copy', () => {
		const { after, model } = compare('Anchor\n\nSame\n', 'Anchor\n\nSame\n\nSame\n')
		const text = editText(after)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]!.primary.operation).toBe('insert')
		expect(text(model.edits[0]!, 'after')).toBe('Same')
		expect(model.edits[0]!.primary.after).toEqual({
			from: after.child(0).nodeSize + after.child(1).nodeSize,
			to: meaningfulSize(after),
		})
	})

	it('A06 retains the first repeated paragraph and deletes the second copy', () => {
		const { before, model } = compare('Anchor\n\nSame\n\nSame\n', 'Anchor\n\nSame\n')

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]!.primary.operation).toBe('delete')
		expect(model.edits[0]!.primary.before).toEqual({
			from: before.child(0).nodeSize + before.child(1).nodeSize,
			to: meaningfulSize(before),
		})
	})

	it.each([
		['insertion', '# Existing\n', '## Added\n\n# Existing\n', 'insert'],
		['deletion', '## Removed\n\n# Existing\n', '# Existing\n', 'delete'],
	] as const)('AUD-12 reports a heading %s as added or removed without adjacent heading attributes', (_name, beforeContent, afterContent, operation) => {
		const { model } = compare(beforeContent, afterContent)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]!.primary.operation).toBe(operation)
		expect(model.edits[0]!.primary.signals).not.toContainEqual(expect.objectContaining({
			type: 'attribute',
			attribute: 'heading-level',
		}))
	})

	it('A07 reports a paragraph turning into a heading as one semantic replacement', () => {
		const { model } = compare('Shared title\n', '# Shared title\n')

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]).toMatchObject({
			kind: 'content',
			primary: {
				detail: 'block',
				operation: 'replace',
				context: { before: { code: 'paragraph' }, after: { code: 'heading' } },
			},
		})
		expect(model.edits[0]!.primary.facets).toContain('structure')
		expect(model.edits[0]!.primary.signals).toContainEqual({
			type: 'attribute',
			attribute: 'heading-level',
			change: 'added',
		})
	})

	it('A08 does not pair incompatible non-text containers', () => {
		const { model } = compare('- Shared item\n', '> Shared item\n')

		expect(model.edits).toHaveLength(2)
		expect(model.edits.map(({ primary }) => primary.operation).toSorted()).toEqual(['delete', 'insert'])
	})

	it.each([
		['section headings', '# Setup\n\n# Usage\n\n# Notes\n', '# Install\n\n# Config\n'],
		['shopping items', 'Buy milk\n\nBuy eggs\n\nBuy rice\n', 'Get bread\n\nGet jam\n'],
	])('A10 coarsens a no-affix %s rewrite', (_name, beforeContent, afterContent) => {
		const { before, after, model } = compare(beforeContent, afterContent)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]!.primary).toMatchObject({
			coarseReason: 'ambiguous-attribution',
			detail: 'block',
			operation: 'replace',
			before: { from: 0, to: meaningfulSize(before) },
			after: { from: 0, to: meaningfulSize(after) },
		})
	})

	it('reports one reordered block as one move edit', () => {
		const { model } = compare(
			'Unique alpha\n\nUnique beta\n\nUnique gamma\n',
			'Unique beta\n\nUnique gamma\n\nUnique alpha\n',
		)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]!.primary).toMatchObject({
			operation: 'move',
			detail: 'block',
			facets: ['structure'],
		})
	})

	it('pairs uniquely compatible changed containers instead of coarsening their shared gap', () => {
		const before = [
			'# Operational notes',
			'',
			'> Draft maintenance window starts at 20:00.',
			'',
			'::: info',
			'The canary is limited to one region.',
			':::',
			'',
			'<details open>',
			'<summary>Draft runbook</summary>',
			'',
			'Rollback after two failed health checks.',
			'',
			'</details>',
			'',
		].join('\n')
		const after = [
			'# Operational notes',
			'',
			'> Approved maintenance window starts at 21:00.',
			'',
			'::: warn',
			'The canary is limited to two regions.',
			':::',
			'',
			'<details>',
			'<summary>Approved runbook</summary>',
			'',
			'Rollback after one failed health check.',
			'',
			'</details>',
			'',
		].join('\n')
		const { model } = compare(before, after)
		const attributes = model.edits.flatMap(({ descriptors }) => descriptors)
			.flatMap(({ signals }) => signals)
			.filter((signal) => signal.type === 'attribute')
			.map(({ attribute }) => attribute)
		const primaryAttributes = model.edits
			.flatMap(({ primary }) => primary.signals)
			.filter((signal) => signal.type === 'attribute')
			.map(({ attribute }) => attribute)

		expect(model.edits.length).toBeGreaterThan(3)
		expect(model.edits.every(({ primary }) => primary.coarseReason === undefined)).toBe(true)
		expect(attributes).toContain('callout-type')
		expect(attributes).toContain('details-state')
		expect(primaryAttributes.filter((attribute) => attribute === 'callout-type')).toHaveLength(1)
		expect(primaryAttributes.filter((attribute) => attribute === 'details-state')).toHaveLength(1)
	})

	it('does not label code content edits as language changes', () => {
		const { model } = compare(
			'```javascript\nconst stage = "draft"\n```\n',
			'```typescript\nconst stage = "ready"\n```\n',
		)
		const languageEdits = model.edits.filter(({ primary }) => primary.signals.some((signal) => (
			signal.type === 'attribute' && signal.attribute === 'code-language'
		)))

		expect(languageEdits).toHaveLength(1)
		expect(model.edits.some(({ primary }) => (
			primary.preview.before?.kind === 'text'
			&& primary.preview.before.text === 'draft'
			&& primary.signals.every((signal) => signal.type !== 'attribute' || signal.attribute !== 'code-language')
		))).toBe(true)
	})

	it('expands front-matter previews to complete changed lines', () => {
		const { model } = compare([
			'---',
			'release: atlas-2.4',
			'status: draft',
			'owner: Maya Chen',
			'tags: [payments, canary]',
			'legacy: true',
			'---',
			'',
			'# Release record',
		].join('\n'), [
			'---',
			'release: atlas-2.4.1',
			'status: approved',
			'owner: Noor Rahman',
			'tags: [payments, canary, customer-visible]',
			'approved-at: 2026-08-30T21:00:00+07:00',
			'---',
			'',
			'# Release record',
		].join('\n'))
		const previews = model.edits
			.filter(({ primary }) => primary.context.before?.code === 'front-matter')
			.map(({ primary }) => [primary.preview.before, primary.preview.after])
			.flat()
			.map((preview) => preview?.kind === 'text' ? preview.text : '')

		expect(previews).toHaveLength(4)
		expect(previews[0]).toMatch(/^release: atlas-2\.4\b/)
		expect(previews[1]).toMatch(/^release: atlas-2\.4\.1\b/)
		expect(previews[2]).toMatch(/^tags: \[payments, canary\]/)
		expect(previews[3]).toMatch(/^tags: \[payments, canary, customer-visible\]/)
	})

	it('moves exact repeated section content with its unique heading anchor', () => {
		const repeated = 'Health check passed.\n\nDeploy the stable build.'
		const before = [
			'# Repeated deployment notes',
			`## Region A\n\n${repeated}`,
			`## Region B\n\n${repeated}`,
			`## Retired region\n\n${repeated}`,
			`## Region C\n\n${repeated}`,
		].join('\n\n')
		const after = [
			'# Repeated deployment notes',
			`## Region C\n\n${repeated}`,
			`## Region A\n\n${repeated}`,
			'## New region\n\nHealth check passed.\n\nDeploy the canary build.',
			`## Region B\n\n${repeated}`,
		].join('\n\n')
		const { before: beforeDoc, after: afterDoc, model } = compare(before, after)
		const moved = model.edits.find(({ primary }) => primary.operation === 'move')!
		const repeatedCopies = model.edits.filter(({ primary }) => primary.operation !== 'move')
			.map((edit) => ({
				operation: edit.primary.operation,
				before: beforeDoc.textBetween(edit.primary.before.from, edit.primary.before.to, '\n'),
				after: afterDoc.textBetween(edit.primary.after.from, edit.primary.after.to, '\n'),
			}))

		expect(model.edits).toHaveLength(7)
		expect(beforeDoc.textBetween(moved.primary.before.from, moved.primary.before.to, '\n'))
			.toBe('Region C\nHealth check passed.\nDeploy the stable build.')
		expect(afterDoc.textBetween(moved.primary.after.from, moved.primary.after.to, '\n'))
			.toBe('Region C\nHealth check passed.\nDeploy the stable build.')
		expect(repeatedCopies.filter(({ before }) => before === 'Health check passed.')).toHaveLength(1)
		expect(repeatedCopies.filter(({ after }) => after === 'Health check passed.')).toHaveLength(1)
	})

	it('F08 keeps a large inline envelope as one rendered block change', () => {
		const shared = 'z'.repeat(MAX_INLINE_ENVELOPE_SIZE)
		const { before, after, model } = compare(`start ${shared}\n`, `${shared} finish\n`)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]!.primary).toMatchObject({
			detail: 'block',
			before: { from: 0, to: meaningfulSize(before) },
			after: { from: 0, to: meaningfulSize(after) },
		})
	})

	it('accepts 10000 descriptors and rejects 10001 at the production default', () => {
		const editor = createComparisonTestEditor('placeholder')
		try {
			const document = (count: number, side: 'before' | 'after') => {
				const nodes = Array.from({ length: count }, (_value, index) => [
					editor.schema.nodes.paragraph!.create(null, editor.schema.text(`${side} ${index}`)),
					editor.schema.nodes.heading!.create({ level: 2 }, editor.schema.text(`Exact anchor ${index}`)),
				]).flat()
				return editor.schema.nodes.doc!.create(null, nodes)
			}
			const before = document(MAX_RENDERED_COMPARISON_DESCRIPTORS + 1, 'before')
			const atLimit = createHierarchicalMarkdownComparisonModel(
				editor.schema.nodes.doc!.create(null, before.content.content.slice(0, -2)),
				document(MAX_RENDERED_COMPARISON_DESCRIPTORS, 'after'),
			)

			expect(MAX_RENDERED_COMPARISON_DESCRIPTORS).toBe(10_000)
			expect(atLimit.edits).toHaveLength(MAX_RENDERED_COMPARISON_DESCRIPTORS)
			expect(() => createHierarchicalMarkdownComparisonModel(
				before,
				document(MAX_RENDERED_COMPARISON_DESCRIPTORS + 1, 'after'),
			)).toThrow(ComparisonModelLimitError)
		} finally {
			editor.destroy()
		}
	})

	it('freezes the model and keeps the primary inside its own descriptors', () => {
		const { model } = compare('one\n\ntwo\n', 'one edited\n\ntwo edited\n')

		expect(Object.isFrozen(model)).toBe(true)
		expect(Object.isFrozen(model.edits)).toBe(true)
		expect(model.edits.every((edit) => edit.descriptors.includes(edit.primary))).toBe(true)
		expect(new Set(model.edits.map(({ id }) => id))).toHaveLength(model.edits.length)
		expect(new Set(model.edits.flatMap(({ descriptors }) => descriptors.map(({ id }) => id))))
			.toHaveLength(model.edits.flatMap(({ descriptors }) => descriptors).length)
	})
})
