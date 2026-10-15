/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { adjustSpacers, pairTopLevelBlocks, spacerMargins } from '../../comparison/alignment.ts'
import { compareDocuments } from '../../comparison/compare.ts'
import { createComparisonEditor } from '../../comparison/editor.ts'

function pairs(before: string, after: string) {
	const beforeEditor = createComparisonEditor(before)
	const afterEditor = createComparisonEditor(after)
	try {
		const changes = compareDocuments(beforeEditor.state.doc, afterEditor.state.doc)
		return pairTopLevelBlocks(beforeEditor.state.doc, afterEditor.state.doc, changes)
	} finally {
		beforeEditor.destroy()
		afterEditor.destroy()
	}
}

describe('pairTopLevelBlocks', () => {
	it('pairs unchanged blocks around an inserted and a removed block', () => {
		// Each document ends with an empty paragraph added by the editor
		expect(pairs('A\n\nRemoved\n\nB\n\nC', 'A\n\nB\n\nAdded\n\nC')).toEqual([
			{ before: 0, after: 0 },
			{ before: 2, after: 1 },
			{ before: 3, after: 3 },
			{ before: 4, after: 4 },
		])
	})

	it('pairs edited blocks without words', () => {
		expect(pairs('Intro\n\n🎉🎉\n\n✓ ✓\n\nOutro', 'Intro\n\n🎉🎉🎉\n\n✓ ✓ ✓\n\nOutro')).toEqual([
			{ before: 0, after: 0 },
			{ before: 1, after: 1 },
			{ before: 2, after: 2 },
			{ before: 3, after: 3 },
			{ before: 4, after: 4 },
		])
	})

	it('pairs changed blocks through their changes', () => {
		expect(pairs('Old text\n\n- one\n\nEnd', 'New text\n\n- one\n- two\n\nEnd')).toEqual([
			{ before: 0, after: 0 },
			{ before: 1, after: 1 },
			{ before: 2, after: 2 },
			{ before: 3, after: 3 },
		])
	})
})

describe('adjustSpacers', () => {
	const blockPairs = [{ before: 0, after: 0 }, { before: 1, after: 2 }, { before: 2, after: 3 }]
	const empty = () => ({ before: new Map<number, number>(), after: new Map<number, number>() })

	it('pads the side whose paired block sits higher', () => {
		// The after document has an extra 40px block before its second pair
		const { spacers, largest } = adjustSpacers(blockPairs, {
			before: [0, 20, 40],
			after: [0, 20, 60, 80],
		}, empty())

		expect([...spacers.before]).toEqual([[1, 40]])
		expect(spacers.after.size).toBe(0)
		expect(largest).toBe(40)
	})

	it('accounts for spacers already in place and corrects residual differences', () => {
		const current = { before: new Map([[1, 40]]), after: new Map<number, number>() }
		// Measured with the spacer in place, the second pair is still 4px off, e.g. once an image above it has loaded
		const { spacers, largest } = adjustSpacers(blockPairs, {
			before: [0, 60, 80],
			after: [0, 20, 64, 84],
		}, current)

		expect([...spacers.before]).toEqual([[1, 44]])
		expect(largest).toBe(4)
		expect(adjustSpacers(blockPairs, { before: [0, 64, 84], after: [0, 20, 64, 84] }, spacers).largest).toBe(0)
	})

	it('shrinks a spacer on the opposite side before adding one', () => {
		const current = { before: new Map<number, number>(), after: new Map([[2, 30]]) }
		const { spacers } = adjustSpacers(blockPairs, {
			before: [0, 20, 40],
			after: [0, 20, 30, 50],
		}, current)

		expect([...spacers.after]).toEqual([[2, 20]])
		expect(spacers.before.size).toBe(0)
	})
})

describe('spacerMargins', () => {
	it('sets the top margin to the gap above the block plus its spacer', () => {
		const margins = spacerMargins([0, 15, 24], new Map(), new Map([[2, 10]]))

		expect([...margins]).toEqual([[2, 34]])
	})

	it('takes the spacer already in place out of the measured gap', () => {
		const margins = spacerMargins([0, 15, 34], new Map([[2, 10]]), new Map([[2, 4]]))

		expect([...margins]).toEqual([[2, 28]])
	})
})

describe('aligning blocks with collapsing margins', () => {
	interface Block { height: number, marginTop: number, marginBottom: number }

	/**
	 * Lay out blocks the way CSS does: the gap between two blocks is the larger
	 * of the upper block's bottom margin and the lower block's top margin.
	 *
	 * @param blocks The blocks, top to bottom.
	 * @param margins Top margins set on blocks, by index.
	 */
	function layout(blocks: Block[], margins: ReadonlyMap<number, number>) {
		const tops: number[] = []
		const gaps: number[] = []
		let bottom = 0
		let marginBottom = 0
		blocks.forEach((block, index) => {
			const gap = Math.max(marginBottom, margins.get(index) ?? block.marginTop)
			tops.push(bottom + gap)
			gaps.push(gap)
			bottom += gap + block.height
			marginBottom = block.marginBottom
		})
		return { tops, gaps }
	}

	it('lines up a heading below paragraphs of different heights, and keeps it there', () => {
		const paragraph = (height: number) => ({ height, marginTop: 0, marginBottom: 15 })
		const heading = { height: 30, marginTop: 24, marginBottom: 12 }
		const blocks = { before: [paragraph(20), heading], after: [paragraph(25), heading] }
		const blockPairs = [{ before: 0, after: 0 }, { before: 1, after: 1 }]
		let spacers = { before: new Map<number, number>(), after: new Map<number, number>() }
		const margins = { before: new Map<number, number>(), after: new Map<number, number>() }
		const measure = () => ({ before: layout(blocks.before, margins.before), after: layout(blocks.after, margins.after) })

		for (let round = 0; round < 3; round++) {
			const measured = measure()
			const adjusted = adjustSpacers(blockPairs, { before: measured.before.tops, after: measured.after.tops }, spacers)
			for (const side of ['before', 'after'] as const) {
				margins[side] = spacerMargins(measured[side].gaps, spacers[side], adjusted.spacers[side])
			}
			spacers = adjusted.spacers
		}

		const { before, after } = measure()
		expect(before.tops[1]).toBe(after.tops[1])
		expect([...spacers.before]).toEqual([[1, 5]])
		expect(spacers.after.size).toBe(0)
	})
})
