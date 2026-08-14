/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonDescriptor } from '../../comparison/markdownComparison.ts'

import { describe, expect, it } from 'vitest'
import {
	COMPARISON_CHANGE_KINDS,
	comparisonChangeKind,
	currentIdAfterFilter,
	currentOrdinal,
	groupComparisonDescriptors,
	moveCurrentId,
	visibleDescriptorIds,
} from '../../comparison/comparisonNavigation.ts'

function descriptor(id: string, facets: ComparisonDescriptor['facets'], operation: ComparisonDescriptor['operation'] = 'replace') {
	return {
		id,
		sourceOrder: Number(id.slice(1)),
		operation,
		detail: 'inline',
		facets,
		before: { from: 0, to: 1 },
		after: { from: 0, to: 1 },
		context: { before: null, after: null },
		preview: { before: null, after: null },
		signals: [],
	} satisfies ComparisonDescriptor
}

function inBlock(value: ComparisonDescriptor, beforePath: number[], afterPath = beforePath) {
	return {
		...value,
		context: {
			before: { code: 'paragraph' as const, path: beforePath, from: 0, to: 10 },
			after: { code: 'paragraph' as const, path: afterPath, from: 0, to: 10 },
		},
	}
}

describe('comparison navigation', () => {
	const descriptors = [
		descriptor('c0', ['text']),
		descriptor('c1', ['formatting']),
		descriptor('c2', ['text', 'formatting']),
		descriptor('c3', ['attribute']),
	]

	it('hides only pure formatting and preserves mixed changes', () => {
		expect(visibleDescriptorIds(descriptors, true)).toEqual(['c0', 'c2', 'c3'])
		expect(visibleDescriptorIds(descriptors, false)).toEqual(['c0', 'c1', 'c2', 'c3'])
	})

	it('preserves a visible selection and falls forward then backward when hidden', () => {
		expect(currentIdAfterFilter(descriptors, ['c0', 'c2', 'c3'], 'c2')).toBe('c2')
		expect(currentIdAfterFilter(descriptors, ['c0', 'c2', 'c3'], 'c1')).toBe('c2')
		expect(currentIdAfterFilter(descriptors, ['c0'], 'c1')).toBe('c0')
		expect(currentIdAfterFilter(descriptors, [], 'c1')).toBeNull()
	})

	it('wraps Previous and Next over active IDs and reports their ordinal', () => {
		const active = ['c0', 'c2', 'c3']
		expect(moveCurrentId(active, 'c0', -1)).toBe('c3')
		expect(moveCurrentId(active, 'c3', 1)).toBe('c0')
		expect(currentOrdinal(active, 'c2')).toBe(2)
		expect(currentOrdinal([], null)).toBe(0)
	})

	it('groups multiple algorithm ranges from one changed block without merging their descriptors', () => {
		const first = inBlock(descriptor('c0', ['text']), [0])
		const second = inBlock(descriptor('c1', ['text']), [0])
		const nextBlock = inBlock(descriptor('c2', ['text']), [1])
		const move = inBlock(descriptor('c3', ['structure'], 'move'), [2])

		expect(groupComparisonDescriptors([first, second, nextBlock, move])).toEqual([
			{ id: 'c0', descriptors: [first, second] },
			{ id: 'c2', descriptors: [nextBlock] },
			{ id: 'c3', descriptors: [move] },
		])
	})
})

describe('comparison change kinds', () => {
	const mixed = [
		descriptor('c0', ['text']),
		descriptor('c1', ['formatting']),
		descriptor('c2', ['text', 'formatting']),
		descriptor('c3', ['attribute']),
		descriptor('c4', ['structure'], 'insert'),
		descriptor('c5', ['text'], 'move'),
		descriptor('c6', ['formatting', 'attribute']),
		descriptor('c7', ['unknown']),
		descriptor('c8', ['structure'], 'move'),
	]

	it('presents the four kinds in one stable order', () => {
		expect(COMPARISON_CHANGE_KINDS).toEqual(['content', 'formatting', 'move', 'other'])
	})

	it('assigns exactly one kind so counts sum to the descriptor count', () => {
		const counts = { content: 0, formatting: 0, move: 0, other: 0 }
		for (const descriptor of mixed) {
			counts[comparisonChangeKind(descriptor)]++
		}
		expect(counts).toEqual({ content: 3, formatting: 1, move: 2, other: 3 })
		expect(counts.content + counts.formatting + counts.move + counts.other).toBe(mixed.length)
	})

	it('lets a move win over its own text and content win over its own formatting', () => {
		expect(comparisonChangeKind(descriptor('c0', ['text'], 'move'))).toBe('move')
		expect(comparisonChangeKind(descriptor('c0', ['formatting'], 'move'))).toBe('move')
		expect(comparisonChangeKind(descriptor('c0', ['formatting']))).toBe('formatting')
		expect(comparisonChangeKind(descriptor('c0', ['text', 'formatting']))).toBe('content')
		expect(comparisonChangeKind(descriptor('c0', ['text']))).toBe('content')
		expect(comparisonChangeKind(descriptor('c0', ['structure'], 'delete'))).toBe('content')
	})

	it('keeps attribute-only, unknown-only, and mixed formatting changes out of the text kinds', () => {
		expect(comparisonChangeKind(descriptor('c0', ['attribute']))).toBe('other')
		expect(comparisonChangeKind(descriptor('c0', ['unknown']))).toBe('other')
		expect(comparisonChangeKind(descriptor('c0', ['attribute', 'unknown']))).toBe('other')
		expect(comparisonChangeKind(descriptor('c0', ['formatting', 'attribute']))).toBe('other')
		expect(comparisonChangeKind(descriptor('c0', []))).toBe('other')
	})
})
