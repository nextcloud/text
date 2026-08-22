/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { ComparisonChangeKind, ComparisonDescriptorGroup } from './comparisonNavigation.ts'
import type { ComparisonDescriptor } from './markdownComparisonTypes.ts'

import { COMPARISON_CHANGE_KINDS, comparisonChangeKind } from './comparisonNavigation.ts'

export interface ComparisonHeading {
	from: number
	text: string
}

export interface ComparisonSection {
	/** Opaque, stable: the ID of the first group in the section. */
	id: string
	/** Nearest preceding heading, or '' for changes above the first heading. */
	title: string
	groups: readonly ComparisonDescriptorGroup[]
	/** Kinds present in this section, in stable presentation order. */
	kinds: readonly ComparisonChangeKind[]
}

/**
 * Collect every heading in a document, in document order.
 *
 * @param doc Complete document
 */
export function headingLocations(doc: Node): readonly ComparisonHeading[] {
	const headings: ComparisonHeading[] = []
	doc.forEach((node, from) => {
		const text = node.textContent.trim()
		if (node.type.name === 'heading' && text) {
			headings.push({ from, text })
		}
	})
	return headings
}

/**
 * Index of the nearest heading at or before a position, or -1 above them all.
 *
 * Binary search: `headings` must be ordered by `from`, which is what
 * `headingLocations` returns.
 *
 * @param headings Ordered document headings
 * @param position Descriptor position
 */
function nearestHeadingIndex(headings: readonly ComparisonHeading[], position: number) {
	let lower = 0
	let upper = headings.length
	while (lower < upper) {
		const middle = Math.floor((lower + upper) / 2)
		if (headings[middle]!.from <= position) {
			lower = middle + 1
		} else {
			upper = middle
		}
	}
	return lower - 1
}

/**
 * Find the nearest heading at or before a position.
 *
 * @param headings Ordered document headings
 * @param position Descriptor position
 */
export function nearestHeading(headings: readonly ComparisonHeading[], position: number) {
	return headings[nearestHeadingIndex(headings, position)]?.text ?? ''
}

interface HeadingIndex {
	headings: readonly ComparisonHeading[]
	keys: readonly string[]
}

/**
 * @param headings Ordered document headings
 */
function indexByUniqueTitle(headings: readonly ComparisonHeading[]) {
	const indexes = new Map<string, number>()
	const repeated = new Set<string>()
	headings.forEach(({ text }, index) => {
		if (indexes.has(text)) {
			repeated.add(text)
		} else {
			indexes.set(text, index)
		}
	})
	for (const text of repeated) {
		indexes.delete(text)
	}
	return indexes
}

/**
 * Anchor the two heading lists on titles that are unique in both, ordered.
 *
 * The same patience strategy the node alignment uses: match only what is
 * unambiguous, then keep the longest order-preserving run of those matches.
 * O(n log n), so a document with thousands of headings needs no cutoff — and a
 * cutoff here would be worse than slow, since falling back to pairing purely by
 * position reports confident section names that are wrong.
 *
 * @param before Ordered Before headings
 * @param after Ordered After headings
 */
function headingAnchors(before: readonly ComparisonHeading[], after: readonly ComparisonHeading[]) {
	const beforeIndexes = indexByUniqueTitle(before)
	const afterIndexes = indexByUniqueTitle(after)
	const pairs: Array<[number, number]> = []
	after.forEach(({ text }, afterIndex) => {
		const beforeIndex = beforeIndexes.get(text)
		if (beforeIndex !== undefined && afterIndexes.get(text) === afterIndex) {
			pairs.push([beforeIndex, afterIndex])
		}
	})
	return longestIncreasingPairs(pairs)
}

/**
 * Select deterministic order-preserving anchors in O(n log n).
 *
 * @param pairs Candidate pairs in After order
 */
function longestIncreasingPairs(pairs: ReadonlyArray<[number, number]>) {
	if (pairs.length === 0) {
		return []
	}
	const tails: number[] = []
	const previous = new Int32Array(pairs.length).fill(-1)
	for (let candidate = 0; candidate < pairs.length; candidate++) {
		const beforeIndex = pairs[candidate]![0]
		let low = 0
		let high = tails.length
		while (low < high) {
			const middle = (low + high) >>> 1
			if (pairs[tails[middle]!]![0] < beforeIndex) {
				low = middle + 1
			} else {
				high = middle
			}
		}
		if (low > 0) {
			previous[candidate] = tails[low - 1]!
		}
		tails[low] = candidate
	}
	const anchors: Array<[number, number]> = []
	for (let index = tails.at(-1)!; index >= 0; index = previous[index]!) {
		anchors.push(pairs[index]!)
	}
	return anchors.reverse()
}

/**
 * Correlate the two documents' headings.
 *
 * Neither a position nor a title can do this alone: the documents have separate
 * coordinate spaces, and a title can both repeat and change. Anchor on headings
 * whose titles still match in order, then pair whatever is left between two
 * anchors by position only when each gap contains one heading. A heading that
 * was only renamed still occupies that slot. Larger or unequal gaps stay
 * unpaired because insertions and renames have no unambiguous correlation.
 *
 * @param before Ordered Before headings
 * @param after Ordered After headings
 */
function correlateHeadings(before: readonly ComparisonHeading[], after: readonly ComparisonHeading[]) {
	const beforeKeys: string[] = []
	const afterKeys: string[] = []
	let next = 0
	let row = 0
	let column = 0

	/**
	 * @param rowEnd Before index the gap runs to
	 * @param columnEnd After index the gap runs to
	 */
	function pairGap(rowEnd: number, columnEnd: number) {
		const rowCount = rowEnd - row
		const columnCount = columnEnd - column
		if (rowCount !== columnCount || rowCount > 1) {
			while (row < rowEnd) {
				beforeKeys[row++] = `#${next++}`
			}
			while (column < columnEnd) {
				afterKeys[column++] = `#${next++}`
			}
			return
		}
		while (row < rowEnd) {
			const key = `#${next++}`
			beforeKeys[row++] = key
			afterKeys[column++] = key
		}
	}

	for (const [anchorRow, anchorColumn] of headingAnchors(before, after)) {
		pairGap(anchorRow, anchorColumn)
		const key = `#${next++}`
		beforeKeys[row++] = key
		afterKeys[column++] = key
	}
	pairGap(before.length, after.length)
	return { after: afterKeys, before: beforeKeys }
}

/**
 * Resolve the section a group belongs to.
 *
 * @param group Changed semantic block
 * @param before Indexed Before headings
 * @param after Indexed After headings
 */
function resolveSection(group: ComparisonDescriptorGroup, before: HeadingIndex, after: HeadingIndex) {
	const descriptor = group.descriptors[0]!
	// A delete keeps an After context, but it points at the position the content
	// collapsed to rather than anywhere the reader can still find it.
	const deleted = descriptor.operation === 'delete'
	const side = deleted ? before : after
	const position = deleted
		? descriptor.context.before?.from ?? descriptor.before.from
		: descriptor.context.after?.from ?? descriptor.after.from
	// '' above the first heading, which correlates across the two documents too.
	return side.keys[nearestHeadingIndex(side.headings, position)] ?? ''
}

/**
 * Group changes into the document sections they occurred in.
 *
 * Sections are runs, not buckets: a new section starts whenever the resolved
 * heading changes, so groups stay in document order and a heading that repeats
 * far apart in the document produces two sections rather than one merged one.
 *
 * @param groups Visible groups in source order
 * @param beforeDocument Original Before document
 * @param afterDocument Original After document
 */
export function buildComparisonSections(
	groups: readonly ComparisonDescriptorGroup[],
	beforeDocument: Node,
	afterDocument: Node,
): readonly ComparisonSection[] {
	const beforeHeadings = headingLocations(beforeDocument)
	const afterHeadings = headingLocations(afterDocument)
	const correlation = correlateHeadings(beforeHeadings, afterHeadings)
	const before: HeadingIndex = { headings: beforeHeadings, keys: correlation.before }
	const after: HeadingIndex = { headings: afterHeadings, keys: correlation.after }
	// A correlated section is named by the After document, so a rename shows the
	// name the reader will find; one that no longer exists keeps the name it had.
	const titleByKey = new Map<string, string>()
	beforeHeadings.forEach((heading, index) => titleByKey.set(correlation.before[index]!, heading.text))
	afterHeadings.forEach((heading, index) => titleByKey.set(correlation.after[index]!, heading.text))

	const sections: Array<{ id: string, key: string, title: string, groups: ComparisonDescriptorGroup[] }> = []
	for (const group of groups) {
		const key = resolveSection(group, before, after)
		const title = titleByKey.get(key) ?? ''
		const current = sections.at(-1)
		if (current && current.key === key) {
			current.groups.push(group)
		} else {
			sections.push({ id: group.id, key, title, groups: [group] })
		}
	}
	return sections.map((section) => {
		const descriptors = section.groups.flatMap(({ descriptors }) => descriptors)
		return {
			groups: section.groups,
			id: section.id,
			kinds: presentChangeKinds(descriptors),
			title: section.title,
		}
	})
}

/**
 * @param descriptors Semantic changes
 */
function presentChangeKinds(descriptors: readonly ComparisonDescriptor[]) {
	const present = new Set(descriptors.map(comparisonChangeKind))
	return COMPARISON_CHANGE_KINDS.filter((kind) => present.has(kind))
}
