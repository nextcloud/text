/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { Change, ChangeRange } from './compare.ts'
import type { ComparisonSide } from './decorations.ts'

/** Indexes of two top-level blocks that should start at the same vertical offset. */
export interface BlockPair {
	before: number
	after: number
}

/** Spacer heights in pixels by top-level block index, per side. */
export type ComparisonSpacers = Record<ComparisonSide, Map<number, number>>

/**
 * Pair the top-level blocks of both documents.
 *
 * Blocks connected by a change pair through it, all other blocks are unchanged and pair up in order.
 * A block that exists on one side only is left out.
 *
 * @param before Before document.
 * @param after After document.
 * @param changes Changes between the two documents.
 */
export function pairTopLevelBlocks(before: Node, after: Node, changes: readonly Change[]): BlockPair[] {
	const touched: Record<ComparisonSide, Set<number>> = { before: new Set(), after: new Set() }
	const pairs = new Map<number, number>()
	for (const change of changes) {
		const beforeIndex = topLevelIndex(before, change.before)
		const afterIndex = topLevelIndex(after, change.after)
		if (beforeIndex !== null) {
			touched.before.add(beforeIndex)
		}
		if (afterIndex !== null) {
			touched.after.add(afterIndex)
		}
		if (beforeIndex !== null && afterIndex !== null) {
			pairs.set(beforeIndex, afterIndex)
		}
	}
	const unchangedBefore = blockIndexes(before).filter((index) => !touched.before.has(index))
	const unchangedAfter = blockIndexes(after).filter((index) => !touched.after.has(index))
	unchangedBefore.forEach((beforeIndex, position) => {
		const afterIndex = unchangedAfter[position]
		if (afterIndex !== undefined) {
			pairs.set(beforeIndex, afterIndex)
		}
	})
	let lastAfter = -1
	return [...pairs]
		.map(([beforeIndex, afterIndex]) => ({ before: beforeIndex, after: afterIndex }))
		.sort((a, b) => a.before - b.before)
		.filter((pair) => {
			const ordered = pair.after > lastAfter
			lastAfter = ordered ? pair.after : lastAfter
			return ordered
		})
}

/**
 * Adjust the spacers so paired blocks start at the same offset.
 *
 * Offsets are measured with the current spacers in place, so repeated calls
 * converge even when block margins change around a spacer.
 *
 * @param pairs Paired top-level blocks in document order.
 * @param tops Measured block offsets per side, by block index.
 * @param current Spacers that were in place while measuring.
 * @return The adjusted spacers and the largest correction that was applied.
 */
export function adjustSpacers(pairs: readonly BlockPair[], tops: Record<ComparisonSide, readonly number[]>, current: ComparisonSpacers) {
	const spacers: ComparisonSpacers = { before: new Map(current.before), after: new Map(current.after) }
	const shift = { before: 0, after: 0 }
	let largest = 0
	for (const pair of pairs) {
		const difference = (tops.after[pair.after]! + shift.after) - (tops.before[pair.before]! + shift.before)
		if (Math.abs(difference) < 0.5) {
			continue
		}
		largest = Math.max(largest, Math.abs(difference))
		const [side, index, otherSide, otherIndex] = difference > 0
			? ['before', pair.before, 'after', pair.after] as const
			: ['after', pair.after, 'before', pair.before] as const
		// Shrink the spacer on the other side first, so only one side pads a pair
		let remaining = Math.abs(difference)
		const shrinkable = Math.min(spacers[otherSide].get(otherIndex) ?? 0, remaining)
		if (shrinkable > 0) {
			spacers[otherSide].set(otherIndex, spacers[otherSide].get(otherIndex)! - shrinkable)
			shift[otherSide] -= shrinkable
			remaining -= shrinkable
		}
		if (remaining > 0) {
			spacers[side].set(index, (spacers[side].get(index) ?? 0) + remaining)
			shift[side] += remaining
		}
	}
	for (const side of ['before', 'after'] as const) {
		for (const [index, height] of spacers[side]) {
			if (height <= 0) {
				spacers[side].delete(index)
			}
		}
	}
	return { spacers, largest }
}

function topLevelIndex(doc: Node, range: ChangeRange) {
	const $position = doc.resolve(range.from)
	if ($position.depth === 0 && range.from === range.to) {
		return null
	}
	return $position.index(0)
}

function blockIndexes(doc: Node) {
	return Array.from({ length: doc.childCount }, (_value, index) => index)
}
