/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { ComparisonEdit } from './markdownComparisonTypes.ts'

import { increasingSubsequence } from './comparisonAlignment.ts'

export interface ComparisonHeading {
	from: number
	text: string
}

export interface ComparisonSection {
	id: string
	title: string
	edits: readonly ComparisonEdit[]
}
type Heading = ComparisonHeading

export function headingLocations(doc: Node): readonly Heading[] {
	const headings: Heading[] = []
	doc.forEach((node, from) => {
		const text = node.textContent.trim()
		if (node.type.name === 'heading' && text) {
			headings.push({ from, text })
		}
	})
	return headings
}

function nearestHeadingIndex(headings: readonly Heading[], position: number) {
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
export function nearestHeading(headings: readonly Heading[], position: number) {
	return headings[nearestHeadingIndex(headings, position)]?.text ?? ''
}

interface HeadingIndex {
	headings: readonly Heading[]
	keys: readonly string[]
}

function indexByUniqueTitle(headings: readonly Heading[]) {
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

function headingAnchors(before: readonly Heading[], after: readonly Heading[]) {
	const beforeIndexes = indexByUniqueTitle(before)
	const afterIndexes = indexByUniqueTitle(after)
	const pairs: Array<readonly [number, number]> = []
	after.forEach(({ text }, afterIndex) => {
		const beforeIndex = beforeIndexes.get(text)
		if (beforeIndex !== undefined && afterIndexes.get(text) === afterIndex) {
			pairs.push([beforeIndex, afterIndex])
		}
	})
	return increasingSubsequence(pairs.map(([index]) => index)).indices.map((index) => pairs[index]!)
}

function correlateHeadings(before: readonly Heading[], after: readonly Heading[]) {
	const beforeKeys: string[] = []
	const afterKeys: string[] = []
	let next = 0
	let row = 0
	let column = 0

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
	return { before: beforeKeys, after: afterKeys }
}

function resolveSection(edit: ComparisonEdit, before: HeadingIndex, after: HeadingIndex) {
	const descriptor = edit.primary
	const deleted = descriptor.operation === 'delete'
	const side = deleted ? before : after
	const position = deleted
		? descriptor.context.before?.from ?? descriptor.before.from
		: descriptor.context.after?.from ?? descriptor.after.from
	return side.keys[nearestHeadingIndex(side.headings, position)] ?? ''
}

export function buildComparisonSections(edits: readonly ComparisonEdit[], beforeDocument: Node, afterDocument: Node): readonly ComparisonSection[] {
	const beforeHeadings = headingLocations(beforeDocument)
	const afterHeadings = headingLocations(afterDocument)
	const correlation = correlateHeadings(beforeHeadings, afterHeadings)
	const before: HeadingIndex = { headings: beforeHeadings, keys: correlation.before }
	const after: HeadingIndex = { headings: afterHeadings, keys: correlation.after }
	const titleByKey = new Map<string, string>()
	beforeHeadings.forEach((heading, index) => titleByKey.set(correlation.before[index]!, heading.text))
	afterHeadings.forEach((heading, index) => titleByKey.set(correlation.after[index]!, heading.text))

	const sections: Array<{ id: string, key: string, title: string, edits: ComparisonEdit[] }> = []
	for (const edit of edits) {
		const key = resolveSection(edit, before, after)
		const title = titleByKey.get(key) ?? ''
		const current = sections.at(-1)
		if (current?.key === key) {
			current.edits.push(edit)
		} else {
			sections.push({ id: edit.id, key, title, edits: [edit] })
		}
	}
	return sections.map(({ id, title, edits: sectionEdits }) => ({
		id,
		title,
		edits: sectionEdits,
	}))
}
