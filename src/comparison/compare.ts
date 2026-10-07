/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Mark, Node } from '@tiptap/pm/model'

import { ChangeSet, simplifyChanges } from '@tiptap/pm/changeset'
import { StepMap } from '@tiptap/pm/transform'

export type ChangeOperation = 'insert' | 'delete' | 'replace'
/**
 * Kind of difference, used to label and color changes:
 * - text: the text differs, or a whole node was added or removed.
 * - formatting: the text is the same but marks differ, such as bold or italic. Can be hidden.
 * - attribute: same node with different attributes, such as heading level, code language, image source.
 * - structure: a node was replaced by one of another type, like paragraph to heading.
 */
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

/** Range of child indexes */
interface IndexRange {
	start: number
	end: number
}

/**
 * Children between two consecutive matches, or before the first or after the last match.
 * None of them is matched. Either side may be empty.
 */
interface Gap {
	before: IndexRange
	after: IndexRange
}

const PREVIEW_LENGTH = 80
const LEAF_TEXT = '￼'
/**
 * Blocks in a gap less similar than this are reported as a removed and an added block instead
 * of being compared as an edit of the same block.
 */
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
 * Starting with the two documents, the children of each matched pair of nodes are aligned:
 * 1. Anchors: children that are equal and occur once on each side are matched first,
 *    as long as they keep their order.
 * 2. Gaps: the unmatched children between two anchors form a gap. Children in a gap are
 *    matched by similarity.
 * 3. Children still unmatched are reported as removed or added. Matched children are
 *    compared: textblocks character by character, other nodes by aligning their children.
 *
 * Changes are ordered by position.
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

// Each editor brings its own schema instance. To make node types comparable in node
// equality checks, rebuild the after document in the before schema. It keeps all positions.
function sameSchema(before: Node, after: Node) {
	return before.type.schema.nodeFromJSON(after.toJSON())
}

// Align the children of two matching nodes, report unmatched children as removed or added
// and compare matched children recursively. beforeFrom and afterFrom are the document
// positions where each node's content starts.
function compareChildren(before: Node, after: Node, beforeFrom: number, afterFrom: number, changes: PendingChange[]) {
	const beforeChildren = children(before, beforeFrom)
	const afterChildren = children(after, afterFrom)
	const matches = alignChildren(beforeChildren, afterChildren)
	for (const match of matches) {
		compareNodes(beforeChildren[match.before]!, afterChildren[match.after]!, changes)
	}
	for (const gap of gapsBetween(matches, beforeChildren.length, afterChildren.length)) {
		// Unmatched children are reported at the end of the matched child before the gap
		const beforePosition = beforeChildren[gap.before.start - 1]?.to ?? beforeFrom
		const afterPosition = afterChildren[gap.after.start - 1]?.to ?? afterFrom
		for (const child of beforeChildren.slice(gap.before.start, gap.before.end)) {
			changes.push(blockChange(child, null, afterPosition))
		}
		for (const child of afterChildren.slice(gap.after.start, gap.after.end)) {
			changes.push(blockChange(null, child, beforePosition))
		}
	}
}

// Children of a node with their document positions (from, to)
function children(parent: Node, contentFrom: number): Child[] {
	const result: Child[] = []
	parent.forEach((node, offset) => {
		const from = contentFrom + offset
		result.push({ node, from, to: from + node.nodeSize })
	})
	return result
}

// Match children in two steps: children that are equal and unique on both sides become
// anchors, then the children in each gap between anchors are matched by similarity.
function alignChildren(before: Child[], after: Child[]): Match[] {
	const anchors = uniqueAnchors(before, after)
	const gapMatches = gapsBetween(anchors, before.length, after.length)
		.flatMap((gap) => alignGap(before.slice(gap.before.start, gap.before.end), after.slice(gap.after.start, gap.after.end))
			.map((match) => ({ before: gap.before.start + match.before, after: gap.after.start + match.after })))
	return [...anchors, ...gapMatches].sort((a, b) => a.before - b.before)
}

// The gaps around ordered matches: one before each match and one after the last.
function gapsBetween(matches: Match[], beforeCount: number, afterCount: number): Gap[] {
	const gaps: Gap[] = []
	let start = { before: 0, after: 0 }
	// The end of both child lists closes the last gap
	for (const end of [...matches, { before: beforeCount, after: afterCount }]) {
		gaps.push({
			before: { start: start.before, end: end.before },
			after: { start: start.after, end: end.after },
		})
		start = { before: end.before + 1, after: end.after + 1 }
	}
	return gaps
}

// Returns pairs of child indexes whose nodes are equal and occur exactly once on each side,
// reduced to those that keep their order on both sides
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

// Returns child indexes grouped by their node's fingerprint (serialized JSON), so equal
// nodes share one entry.
function indexByFingerprint(items: Child[]) {
	const indexes = new Map<string, number[]>()
	items.forEach(({ node }, index) => {
		const key = fingerprint(node)
		indexes.set(key, [...(indexes.get(key) ?? []), index])
	})
	return indexes
}

// Given pairs of matched child indexes sorted by their before index, keep the largest
// subset whose after indexes increase too, so no two pairs cross.
function increasing(pairs: Match[]): Match[] {
	const tails: number[] = []
	const previous: number[] = []
	pairs.forEach((pair, index) => {
		let low = 0
		let high = tails.length
		while (low < high) {
			const middle = Math.floor((low + high) / 2)
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
	const beforeText = text(before.node)
	const afterText = text(after.node)
	if (!beforeText.content && !afterText.content) {
		return before.node.type.name === after.node.type.name ? 0.5 : 0
	}
	return Math.min(1, Math.max(sharedWords(beforeText, afterText), sharedEdges(beforeText.content, afterText.content)))
}

// Share of words both texts contain, from 0 to 1
function sharedWords(before: ReturnType<typeof text>, after: ReturnType<typeof text>) {
	const total = before.total + after.total
	if (total === 0) {
		return 0
	}
	let shared = 0
	for (const [word, count] of before.words) {
		shared += Math.min(count, after.words.get(word) ?? 0)
	}
	return (2 * shared) / total
}

// Share of characters in a common start and end. The start counts three times, so the
// result can exceed 1.
function sharedEdges(before: string, after: string) {
	const shorter = Math.min(before.length, after.length)
	let prefix = 0
	while (prefix < shorter && before[prefix] === after[prefix]) {
		prefix++
	}
	let suffix = 0
	while (suffix < shorter - prefix && before.at(-1 - suffix) === after.at(-1 - suffix)) {
		suffix++
	}
	return (3 * prefix + suffix) / (before.length + after.length)
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

// Serialized JSON of a node, including attributes, marks and content. Equal nodes
// have equal fingerprints, so it works as a map key.
function fingerprint(node: Node) {
	return JSON.stringify(node.toJSON())
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
	const beforeMarks = marksByCharacter(before, beforeRange)
	const afterMarks = marksByCharacter(after, afterRange)
	const differing = new Set<string>()
	for (let index = 0; index < Math.max(beforeMarks.length, afterMarks.length); index++) {
		const was = beforeMarks[index] ?? []
		const is = afterMarks[index] ?? []
		for (const mark of [...was, ...is]) {
			if (!was.includes(mark) || !is.includes(mark)) {
				differing.add(mark)
			}
		}
	}
	if (differing.size > 0) {
		return [...differing].some((mark) => mark.startsWith('link:'))
			? { category: 'attribute', attribute: 'link' }
			: { category: 'formatting' }
	}
	const leaf = leafIn(after, afterRange) ?? leafIn(before, beforeRange)
	return { category: 'attribute', attribute: attributeNames[leaf?.type.name ?? ''] ?? 'other' }
}

function marksByCharacter(node: Node, range: ChangeRange) {
	const characters: string[][] = []
	node.nodesBetween(range.from, range.to, (child, position) => {
		const marks = child.marks.map((mark) => `${mark.type.name}:${JSON.stringify(mark.attrs)}`)
		const from = Math.max(range.from, position)
		const to = Math.min(range.to, position + child.nodeSize)
		for (let index = from; index < to; index++) {
			characters.push(marks)
		}
	})
	return characters
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
			before: preview(before ? before.node.textBetween(0, before.node.content.size, ' ', ' ') : ''),
			after: preview(after ? after.node.textBetween(0, after.node.content.size, ' ', ' ') : ''),
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

/** Symbols that make whitespace visible in the preview of a change of whitespace only. */
const WHITESPACE_SYMBOLS: Record<string, string> = { '\t': '→', '\n': '↵' }

function preview(text: string) {
	const visible = text.replaceAll(LEAF_TEXT, '')
	const normalized = visible.replace(/\s+/g, ' ').trim()
	const shown = normalized || [...visible].map((character) => WHITESPACE_SYMBOLS[character] ?? '·').join('')
	return shown.length > PREVIEW_LENGTH
		? `${shown.slice(0, PREVIEW_LENGTH)}…`
		: shown
}
