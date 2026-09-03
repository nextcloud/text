/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'

import { describe, expect, it } from 'vitest'
import {
	alignComparisonAxis,
	createComparisonWorkLedger,
	DEFAULT_COMPARISON_TOKEN_LEDGER,
} from '../../comparison/comparisonAlignment.ts'
import { createHierarchicalMarkdownComparisonModel } from '../../comparison/hierarchicalMarkdownComparisonModel.ts'
import { prepareComparisonDecorations } from '../../comparison/markdownComparison.ts'
import { createComparisonTestEditor } from './comparisonTestEditor.ts'

interface Item {
	key: string
	profile: readonly string[]
}

function items(count: number, side: string): Item[] {
	return Array.from({ length: count }, (_value, index) => ({
		key: `${side}:${index}`,
		profile: [`item:${index}`, side],
	}))
}

function options(work = createComparisonWorkLedger()) {
	return {
		work,
		fingerprint: ({ key }: Item) => key,
		profile: ({ profile }: Item) => profile,
		compatible: () => true,
	}
}

describe('bounded comparison performance fixtures', () => {
	it('AUD-14 projects near-limit one-sided descriptors within a bounded candidate budget', () => {
		const editor = createComparisonTestEditor('placeholder')
		try {
			const headings = Array.from({ length: 6490 }, (_value, index) => (
				editor.schema.nodes.heading!.create({ level: 1 }, editor.schema.text(`Section ${index}`))
			))
			const populated = editor.schema.nodes.doc!.create(null, headings)
			const empty = editor.schema.nodes.doc!.create()
			const model = createHierarchicalMarkdownComparisonModel(populated, empty)
			const descriptors = model.edits.flatMap(({ descriptors: members }) => members)

			const prepared = prepareComparisonDecorations(populated, descriptors, 'before')

			expect(prepared).toHaveLength(headings.length)
		} finally {
			editor.destroy()
		}
	})

	it('P01 compares a near-6500-line exact-anchor document with negligible weighted work', () => {
		const editor = createComparisonTestEditor('placeholder')
		try {
			const headings = Array.from({ length: 6490 }, (_value, index) => (
				editor.schema.nodes.heading!.create({ level: 1 }, editor.schema.text(`Section ${index}`))
			))
			const before = editor.schema.nodes.doc!.create(null, headings)
			const changedHeading = editor.schema.nodes.heading!.create(
				{ level: 1 },
				editor.schema.text('Section 3245 edited'),
			)
			const after = editor.schema.nodes.doc!.create(null, headings.with(3245, changedHeading))

			const model = createHierarchicalMarkdownComparisonModel(before, after)

			expect(model.edits).toHaveLength(1)

			const work = createComparisonWorkLedger()
			const axis = Array.from({ length: 6490 }, (_value, index) => ({
				key: `anchor:${index}`,
				profile: [`anchor:${index}`],
			}))
			const changed = axis.with(3245, { key: 'changed:3245', profile: ['changed:3245'] })
			alignComparisonAxis(axis, changed, options(work))
			expect(work).toEqual(createComparisonWorkLedger())
		} finally {
			editor.destroy()
		}
	})

	it.each(['insert', 'delete'] as const)('places a near-6500-line one-sided %s axis in linear time', (operation) => {
		const editor = createComparisonTestEditor('placeholder')
		try {
			const headings = Array.from({ length: 6490 }, (_value, index) => (
				editor.schema.nodes.heading!.create({ level: 1 }, editor.schema.text(`Section ${index}`))
			))
			const empty = editor.schema.nodes.doc!.create()
			const populated = editor.schema.nodes.doc!.create(null, headings)
			const model = operation === 'insert'
				? createHierarchicalMarkdownComparisonModel(empty, populated)
				: createHierarchicalMarkdownComparisonModel(populated, empty)

			expect(model.edits).toHaveLength(headings.length)
			expect(model.edits.every(({ primary }) => primary.operation === operation)).toBe(true)
		} finally {
			editor.destroy()
		}
	})

	it('P04 shares the final token ledger across nested production nodes', () => {
		const editor = createComparisonTestEditor('placeholder')
		try {
			const firstBeforeCount = 100
			const firstAfterCount = firstBeforeCount - 1
			const firstProduct = firstBeforeCount * firstAfterCount
			const firstLength = Math.floor(DEFAULT_COMPARISON_TOKEN_LEDGER / (4 * firstProduct))
			const firstCharge = 2 * firstProduct * firstLength
			const secondCount = 100
			const secondLength = Math.floor((DEFAULT_COMPARISON_TOKEN_LEDGER - firstCharge) / (2 * secondCount ** 2)) + 1
			const paragraphs = (count: number, character: string, length: number) => Array.from(
				{ length: count },
				() => editor.schema.nodes.paragraph!.create(null, editor.schema.text(character.repeat(length))),
			)
			const quote = (children: readonly Node[]) => (
				editor.schema.nodes.blockquote!.create(null, children)
			)
			const anchor = editor.schema.nodes.paragraph!.create(null, editor.schema.text('exact nested boundary anchor'))
			const before = editor.schema.nodes.doc!.create(null, [
				quote(paragraphs(firstBeforeCount, 'a', firstLength)),
				anchor,
				quote(paragraphs(secondCount, 'c', secondLength)),
			])
			const after = editor.schema.nodes.doc!.create(null, [
				quote(paragraphs(firstAfterCount, 'b', firstLength)),
				anchor,
				quote(paragraphs(secondCount, 'd', secondLength)),
			])
			const model = createHierarchicalMarkdownComparisonModel(before, after)

			expect(2 * secondCount ** 2 * (secondLength - 1)).toBeLessThanOrEqual(DEFAULT_COMPARISON_TOKEN_LEDGER - firstCharge)
			expect(2 * secondCount ** 2 * secondLength).toBeGreaterThan(DEFAULT_COMPARISON_TOKEN_LEDGER - firstCharge)
			expect(model.edits.map(({ primary }) => primary.coarseReason)).toEqual([
				'ambiguous-attribution',
				'comparison-limit',
			])
		} finally {
			editor.destroy()
		}
	})

	it('P03 bounds many aggregate maximal gaps with one comparison-wide ledger', () => {
		const gapCount = 5
		const gapSize = 200
		const before: Item[] = []
		const after: Item[] = []
		for (let gap = 0; gap < gapCount; gap++) {
			before.push(...items(gapSize, `before-${gap}`))
			after.push(...items(gapSize, `after-${gap}`))
			if (gap < gapCount - 1) {
				const anchor = { key: `anchor-${gap}`, profile: [`anchor-${gap}`] }
				before.push(anchor)
				after.push(anchor)
			}
		}
		const work = createComparisonWorkLedger()

		const result = alignComparisonAxis(before, after, options(work))
		const limited = result.filter((region) => 'coarseReason' in region && region.coarseReason === 'comparison-limit')

		expect(work.remainingCells).toBe(0)
		expect(limited).toHaveLength(gapCount - 1)
	})
})
