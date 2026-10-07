/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Mark, Node } from '@tiptap/pm/model'

import { ChangeSet, simplifyChanges } from '@tiptap/pm/changeset'
import { StepMap } from '@tiptap/pm/transform'

export type ChangeOperation = 'insert' | 'delete' | 'replace'
export type ChangeCategory = 'text' | 'formatting' | 'attribute' | 'structure'
export type ChangeAttribute = 'heading-level' | 'task-state' | 'link' | 'image' | 'code-language' | 'list-start' | 'other'

export interface ChangeRange {
	from: number
	to: number
}

export interface Change {
	id: string
	operation: ChangeOperation
	category: ChangeCategory
	/** Which attribute changed, only for the attribute category. */
	attribute?: ChangeAttribute
	/** True when the ranges cover whole nodes, false for inline ranges inside a textblock. */
	block: boolean
	/** Node type name of the changed node or of the textblock containing the inline change. */
	context: string
	/** Positions in the before document; empty for insertions. */
	before: ChangeRange
	/** Positions in the after document; empty for deletions. */
	after: ChangeRange
	preview: { before: string, after: string }
}

type PendingChange = Omit<Change, 'id'>

interface Child {
	node: Node
	from: number
	to: number
}

/** Matched child indexes on both sides. */
interface Match {
	before: number
	after: number
}

const PREVIEW_LENGTH = 80
const LEAF_TEXT = '￼'
/** Blocks less similar than this are reported as removed and added rather than paired. */
const MIN_SIMILARITY = 0.35
/** Gaps with more candidate pairs than this are paired by position instead of similarity. */
const MAX_SCORED_PAIRS = 250_000

const attributeNames: Record<string, ChangeAttribute> = {
	heading: 'heading-level',
	codeBlock: 'code-language',
	orderedList: 'list-start',
	taskItem: 'task-state',
	image: 'image',
	imageInline: 'image',
}

/**
 * Compare two documents and describe the differences in document positions.
 *
 * Sibling nodes are paired by similarity, paired nodes are compared recursively
 * and textblocks are compared inline. Changes are ordered by position.
 *
 * @param before Earlier document.
 * @param after Later document.
 */
export function compareDocuments(before: Node, after: Node): Change[] {
	const changes: PendingChange[] = []
	compareChildren(before, sameSchema(before, after), 0, 0, changes)
	return changes
		.sort((a, b) => a.after.from - b.after.from
			|| Number(a.operation !== 'delete') - Number(b.operation !== 'delete')
			|| a.before.from - b.before.from)
		.map((change, index) => ({ ...change, id: `change-${index}` }))
}

// Node equality requires one schema instance. Rebuilding the after document
// in the before schema keeps all positions.
function sameSchema(before: Node, after: Node) {
	return before.type.schema === after.type.schema
		? after
		: before.type.schema.nodeFromJSON(after.toJSON())
}

function compareChildren(before: Node, after: Node, beforeFrom: number, afterFrom: number, changes: PendingChange[]) {
	const beforeChildren = children(before, beforeFrom)
	const afterChildren = children(after, afterFrom)
	// Unmatched children are reported at the end of the last matched child on the other side
	let next = { before: 0, after: 0 }
	let position = { before: beforeFrom, after: afterFrom }
	for (const match of [...alignChildren(beforeChildren, afterChildren), { before: beforeChildren.length, after: afterChildren.length }]) {
		for (const child of beforeChildren.slice(next.before, match.before)) {
			changes.push(blockChange(child, null, position.after))
		}
		for (const child of afterChildren.slice(next.after, match.after)) {
			changes.push(blockChange(null, child, position.before))
		}
		if (match.before < beforeChildren.length) {
			compareNodes(beforeChildren[match.before]!, afterChildren[match.after]!, changes)
			position = { before: beforeChildren[match.before]!.to, after: afterChildren[match.after]!.to }
		}
		next = { before: match.before + 1, after: match.after + 1 }
	}
}

function children(parent: Node, contentFrom: number): Child[] {
	const result: Child[] = []
	parent.forEach((node, offset) => {
		const from = contentFrom + offset
		result.push({ node, from, to: from + node.nodeSize })
	})
	return result
}

// Equal children that are unique on both sides anchor the alignment. The children between
// two anchors are paired by similarity, so an edited or split block pairs with its origin
// even among equal-looking siblings.
function alignChildren(before: Child[], after: Child[]): Match[] {
	const matches: Match[] = []
	let start = { before: 0, after: 0 }
	for (const anchor of [...uniqueAnchors(before, after), { before: before.length, after: after.length }]) {
		for (const match of alignGap(before.slice(start.before, anchor.before), after.slice(start.after, anchor.after))) {
			matches.push({ before: start.before + match.before, after: start.after + match.after })
		}
		if (anchor.before < before.length) {
			matches.push(anchor)
		}
		start = { before: anchor.before + 1, after: anchor.after + 1 }
	}
	return matches
}

function uniqueAnchors(before: Child[], after: Child[]): Match[] {
	const beforeIndexes = indexByFingerprint(before)
	const afterIndexes = indexByFingerprint(after)
	const pairs = [...beforeIndexes].flatMap(([key, indexes]) => {
		const afterIndex = afterIndexes.get(key)
		return indexes.length === 1 && afterIndex?.length === 1
			? [{ before: indexes[0]!, after: afterIndex[0]! }]
			: []
	})
	return increasing(pairs.sort((a, b) => a.before - b.before))
}

function indexByFingerprint(items: Child[]) {
	const indexes = new Map<string, number[]>()
	items.forEach(({ node }, index) => {
		const key = fingerprint(node)
		indexes.set(key, [...(indexes.get(key) ?? []), index])
	})
	return indexes
}

// Longest subsequence of pairs that also increases on the after side.
function increasing(pairs: Match[]): Match[] {
	const tails: number[] = []
	const previous: number[] = []
	pairs.forEach((pair, index) => {
		let low = 0
		let high = tails.length
		while (low < high) {
			const middle = (low + high) >> 1
			if (pairs[tails[middle]!]!.after < pair.after) {
				low = middle + 1
			} else {
				high = middle
			}
		}
		previous[index] = low > 0 ? tails[low - 1]! : -1
		tails[low] = index
	})
	const result: Match[] = []
	for (let index = tails.at(-1) ?? -1; index >= 0; index = previous[index]!) {
		result.push(pairs[index]!)
	}
	return result.reverse()
}

// Pair the children of a gap by maximising the summed similarity of the pairs, keeping order.
// A single child on each side is an edit of that child, however different its text.
function alignGap(before: Child[], after: Child[]): Match[] {
	const rows = before.length
	const columns = after.length
	if (rows === 1 && columns === 1) {
		return compatible(before[0]!, after[0]!) ? [{ before: 0, after: 0 }] : []
	}
	if (rows * columns > MAX_SCORED_PAIRS) {
		return Array.from({ length: Math.min(rows, columns) }, (_value, index) => ({ before: index, after: index }))
	}
	const width = columns + 1
	const score = new Float64Array((rows + 1) * width)
	const paired = new Uint8Array((rows + 1) * width)
	for (let row = 1; row <= rows; row++) {
		for (let column = 1; column <= columns; column++) {
			const cell = row * width + column
			const pairScore = similarity(before[row - 1]!, after[column - 1]!)
			const skip = Math.max(score[cell - width]!, score[cell - 1]!)
			const pair = pairScore >= MIN_SIMILARITY ? score[cell - width - 1]! + pairScore : 0
			score[cell] = Math.max(skip, pair)
			paired[cell] = Number(pair > skip)
		}
	}
	const matches: Match[] = []
	for (let row = rows, column = columns; row > 0 && column > 0;) {
		const cell = row * width + column
		if (paired[cell]) {
			matches.push({ before: --row, after: --column })
		} else if (score[cell - width]! >= score[cell - 1]!) {
			row--
		} else {
			column--
		}
	}
	return matches.reverse()
}

// Similarity between 0 and 1: equal nodes score 1, incompatible nodes 0. Text scores by shared
// words, or by a shared start and end, where a shared start weighs more: a block that keeps its
// beginning is the same block, edited, extended or split.
function similarity(before: Child, after: Child) {
	if (before.node.eq(after.node)) {
		return 1
	}
	if (!compatible(before, after)) {
		return 0
	}
	const a = text(before.node)
	const b = text(after.node)
	if (!a.content && !b.content) {
		return before.node.type.name === after.node.type.name ? 0.5 : 0
	}
	let shared = 0
	for (const [word, count] of a.words) {
		shared += Math.min(count, b.words.get(word) ?? 0)
	}
	const shorter = Math.min(a.content.length, b.content.length)
	let prefix = 0
	while (prefix < shorter && a.content[prefix] === b.content[prefix]) {
		prefix++
	}
	let suffix = 0
	while (suffix < shorter - prefix && a.content.at(-1 - suffix) === b.content.at(-1 - suffix)) {
		suffix++
	}
	return Math.min(1, Math.max(
		(2 * shared) / (a.total + b.total),
		(3 * prefix + suffix) / (a.content.length + b.content.length),
	))
}

function compatible(before: Child, after: Child) {
	return before.node.type.name === after.node.type.name
		|| (before.node.isTextblock && after.node.isTextblock)
}

const textCache = new WeakMap<Node, { content: string, words: Map<string, number>, total: number }>()

function text(node: Node) {
	let entry = textCache.get(node)
	if (!entry) {
		const content = node.textBetween(0, node.content.size, ' ', ' ').trim()
		const words = new Map<string, number>()
		let total = 0
		for (const word of content.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean)) {
			words.set(word, (words.get(word) ?? 0) + 1)
			total++
		}
		entry = { content, words, total }
		textCache.set(node, entry)
	}
	return entry
}

const fingerprints = new WeakMap<Node, string>()

function fingerprint(node: Node) {
	let value = fingerprints.get(node)
	if (value === undefined) {
		value = JSON.stringify(node.toJSON())
		fingerprints.set(node, value)
	}
	return value
}

function compareNodes(before: Child, after: Child, changes: PendingChange[]) {
	if (before.node.eq(after.node)) {
		return
	}
	if (before.node.type.name !== after.node.type.name) {
		changes.push({ ...blockChange(before, after, 0), category: 'structure' })
		return
	}
	if (before.node.isLeaf || !sameAttributes(before.node, after.node)) {
		changes.push({ ...blockChange(before, after, 0), category: 'attribute', attribute: attributeNames[after.node.type.name] ?? 'other' })
	}
	if (before.node.isLeaf || before.node.content.eq(after.node.content)) {
		return
	}
	if (before.node.isTextblock) {
		compareInline(before, after, changes)
	} else {
		compareChildren(before.node, after.node, before.from + 1, after.from + 1, changes)
	}
}

const markTokens = new WeakMap<readonly Mark[], string>()

function encodeMarks(marks: readonly Mark[]) {
	let encoded = markTokens.get(marks)
	if (encoded === undefined) {
		encoded = marks
			.map((mark) => `${mark.type.name}${JSON.stringify(mark.attrs)}`)
			.sort()
			.join('|')
		markTokens.set(marks, encoded)
	}
	return encoded
}

const tokenEncoder = {
	encodeCharacter: (character: number, marks: readonly Mark[]) => `${character}:${encodeMarks(marks)}`,
	encodeNodeStart: (node: Node) => `${node.type.name}:${JSON.stringify(node.attrs)}:${encodeMarks(node.marks)}`,
	encodeNodeEnd: () => 'end',
	compareTokens: (a: string, b: string) => a === b,
}

function compareInline(before: Child, after: Child, changes: PendingChange[]) {
	const map = new StepMap([0, before.node.content.size, after.node.content.size])
	const inlineChanges = simplifyChanges(
		ChangeSet.create(before.node, undefined, tokenEncoder)
			.addSteps(after.node, [map], null)
			.changes,
		after.node,
	)
	for (const { fromA, toA, fromB, toB } of inlineChanges) {
		const beforeText = before.node.textBetween(fromA, toA, '', LEAF_TEXT)
		const afterText = after.node.textBetween(fromB, toB, '', LEAF_TEXT)
		changes.push({
			operation: operationFor(fromA < toA, fromB < toB),
			block: false,
			context: after.node.type.name,
			before: { from: before.from + 1 + fromA, to: before.from + 1 + toA },
			after: { from: after.from + 1 + fromB, to: after.from + 1 + toB },
			preview: { before: preview(beforeText), after: preview(afterText) },
			...inlineCategory(before.node, after.node, { from: fromA, to: toA }, { from: fromB, to: toB }, beforeText, afterText),
		})
	}
}

function inlineCategory(before: Node, after: Node, beforeRange: ChangeRange, afterRange: ChangeRange, beforeText: string, afterText: string): Pick<Change, 'category' | 'attribute'> {
	if (beforeText !== afterText) {
		return { category: 'text' }
	}
	const beforeMarks = marksIn(before, beforeRange)
	const afterMarks = marksIn(after, afterRange)
	const differing = [...beforeMarks, ...afterMarks]
		.filter((mark) => !beforeMarks.has(mark) || !afterMarks.has(mark))
	if (differing.length > 0) {
		return differing.some((mark) => mark.startsWith('link:'))
			? { category: 'attribute', attribute: 'link' }
			: { category: 'formatting' }
	}
	const leaf = leafIn(after, afterRange) ?? leafIn(before, beforeRange)
	return { category: 'attribute', attribute: attributeNames[leaf?.type.name ?? ''] ?? 'other' }
}

function marksIn(node: Node, range: ChangeRange) {
	const marks = new Set<string>()
	node.nodesBetween(range.from, range.to, (child) => {
		for (const mark of child.marks) {
			marks.add(mark.type.name === 'link' ? `link:${mark.attrs.href}` : mark.type.name)
		}
	})
	return marks
}

function leafIn(node: Node, range: ChangeRange) {
	let leaf: Node | null = null
	node.nodesBetween(range.from, range.to, (child) => {
		if (!leaf && child.isLeaf && !child.isText) {
			leaf = child
		}
	})
	return leaf as Node | null
}

function blockChange(before: Child | null, after: Child | null, absentPosition: number): PendingChange {
	const node = (after ?? before)!.node
	return {
		operation: operationFor(before !== null, after !== null),
		category: 'text',
		block: true,
		context: node.type.name,
		before: before ? { from: before.from, to: before.to } : { from: absentPosition, to: absentPosition },
		after: after ? { from: after.from, to: after.to } : { from: absentPosition, to: absentPosition },
		preview: {
			before: preview(before?.node.textContent ?? ''),
			after: preview(after?.node.textContent ?? ''),
		},
	}
}

function sameAttributes(before: Node, after: Node) {
	const names = new Set([...Object.keys(before.attrs), ...Object.keys(after.attrs)])
	names.delete('dir')
	return [...names].every((name) => JSON.stringify(before.attrs[name]) === JSON.stringify(after.attrs[name]))
}

function operationFor(hasBefore: boolean, hasAfter: boolean): ChangeOperation {
	return hasBefore && hasAfter ? 'replace' : hasBefore ? 'delete' : 'insert'
}

function preview(text: string) {
	const normalized = text.replaceAll(LEAF_TEXT, '').replace(/\s+/g, ' ').trim()
	return normalized.length > PREVIEW_LENGTH
		? `${normalized.slice(0, PREVIEW_LENGTH)}…`
		: normalized
}
