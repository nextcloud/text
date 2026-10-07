/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { adjustSpacers, pairTopLevelBlocks } from '../../comparison/alignment.ts'
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
		// Measured with the spacer in place, the second pair is 4px off because of a collapsed margin
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
