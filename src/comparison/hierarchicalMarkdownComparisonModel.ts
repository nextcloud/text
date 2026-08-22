/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type {
	ComparisonDocumentIndex,
	ComparisonNodeSearchAudit,
	LocatedComparisonNode,
} from './comparisonDocumentIndex.ts'
import type { ReservedExactMovePair } from './markdownComparisonMoves.ts'
import type {
	ComparisonDescriptor,
	ComparisonRange,
	MarkdownComparisonModel,
} from './markdownComparisonTypes.ts'

import { ChangeSet, simplifyChanges } from '@tiptap/pm/changeset'
import { StepMap } from '@tiptap/pm/transform'
import {
	comparisonRangeText,
	createComparisonDocumentIndex,
} from './comparisonDocumentIndex.ts'
import {
	classifyComparisonDescriptor,
	classifyNodeMarkupDescriptor,
	compareCodeUnits,
	deepFreeze,
	semanticTokenEncoder,
	stableSerialize,
} from './markdownComparisonClassification.ts'
import { confirmReservedExactMoves } from './markdownComparisonMoves.ts'

export const MAX_INLINE_ENVELOPE_SIZE = 4500
export const MAX_ALIGNMENT_PRODUCT = 40_000
export const MAX_RENDERED_COMPARISON_DESCRIPTORS = 10_000

export interface ComparisonModelAudit extends ComparisonNodeSearchAudit {
	fingerprintGroupAllocations: number
}

interface ComparisonModelOptions {
	audit?: ComparisonModelAudit
	maximumDescriptors?: number
}

export class ComparisonModelLimitError extends Error {
	constructor() {
		super('Rendered comparison change limit reached')
		this.name = 'ComparisonModelLimitError'
	}
}

const MAX_LINEAR_ALIGNMENT_LOOKAHEAD = 8

const fingerprintCache = new WeakMap<Node, string>()

type ExactPair = ReservedExactMovePair

interface AlignmentStep {
	before: LocatedComparisonNode | null
	after: LocatedComparisonNode | null
}

interface AlignmentWindow {
	before: readonly LocatedComparisonNode[]
	after: readonly LocatedComparisonNode[]
	beforeStart: number
	beforeEnd: number
	afterStart: number
	afterEnd: number
}

interface InlineChangeRange {
	fromA: number
	toA: number
	fromB: number
	toB: number
}

interface ComparisonBuilder {
	originalBefore: Node
	originalAfter: Node
	originalBeforeIndex: ComparisonDocumentIndex
	originalAfterIndex: ComparisonDocumentIndex
	comparisonBefore: Node
	comparisonAfter: Node
	comparisonBeforeIndex: ComparisonDocumentIndex
	comparisonAfterIndex: ComparisonDocumentIndex
	descriptors: ComparisonDescriptor[]
	reservedMoves: ExactPair[]
	audit?: ComparisonModelAudit
	maximumDescriptors: number
}

/**
 * Compare original documents by aligning bounded sibling windows recursively.
 *
 * @param originalBefore Earlier complete document and coordinate owner
 * @param originalAfter Later complete document and coordinate owner
 * @param options Comparison limits and optional structural-test counter
 */
export function createHierarchicalMarkdownComparisonModel(
	originalBefore: Node,
	originalAfter: Node,
	options: ComparisonModelOptions = {},
): MarkdownComparisonModel {
	const { audit } = options
	const normalized = normalizeSchemas(originalBefore, originalAfter)
	const originalBeforeIndex = createComparisonDocumentIndex(originalBefore, audit)
	const originalAfterIndex = createComparisonDocumentIndex(originalAfter, audit)
	const comparisonBeforeIndex = normalized.before === originalBefore
		? originalBeforeIndex
		: createComparisonDocumentIndex(normalized.before, audit)
	const comparisonAfterIndex = normalized.after === originalAfter
		? originalAfterIndex
		: createComparisonDocumentIndex(normalized.after, audit)
	const builder: ComparisonBuilder = {
		originalBefore,
		originalAfter,
		originalBeforeIndex,
		originalAfterIndex,
		comparisonBefore: normalized.before,
		comparisonAfter: normalized.after,
		comparisonBeforeIndex,
		comparisonAfterIndex,
		descriptors: [],
		reservedMoves: [],
		audit,
		maximumDescriptors: options.maximumDescriptors ?? MAX_RENDERED_COMPARISON_DESCRIPTORS,
	}

	compareSiblingNodes(
		builder,
		comparisonBeforeIndex.children,
		comparisonAfterIndex.children,
		0,
		normalized.before.content.size,
		0,
		normalized.after.content.size,
		true,
	)
	emitReservedMoves(builder)

	return deepFreeze({
		descriptors: finalizeDescriptors(builder.descriptors),
	})
}

/**
 * Rebuild the earlier document with the later schema while preserving positions.
 *
 * @param before Earlier document
 * @param after Later document
 */
function normalizeSchemas(before: Node, after: Node) {
	if (before.type.schema === after.type.schema) {
		return { before, after }
	}
	const rebuilt = after.type.schema.nodeFromJSON(before.toJSON())
	if (rebuilt.nodeSize !== before.nodeSize) {
		throw new Error('Markdown comparison schema normalization changed document positions')
	}
	if (rebuilt.textBetween(0, rebuilt.content.size, '\n', '\ufffc')
		!== before.textBetween(0, before.content.size, '\n', '\ufffc')) {
		throw new Error('Markdown comparison schema normalization changed document content')
	}
	return { before: rebuilt, after }
}

/**
 * Align direct siblings around ordered exact anchors and recurse into pairs.
 *
 * @param builder Comparison state
 * @param before Earlier direct children
 * @param after Later direct children
 * @param beforeStart Earlier parent content start
 * @param beforeEnd Earlier parent content end
 * @param afterStart Later parent content start
 * @param afterEnd Later parent content end
 * @param topLevel Whether these are root children
 */
function compareSiblingNodes(
	builder: ComparisonBuilder,
	before: readonly LocatedComparisonNode[],
	after: readonly LocatedComparisonNode[],
	beforeStart: number,
	beforeEnd: number,
	afterStart: number,
	afterEnd: number,
	topLevel: boolean,
) {
	const exactPairs = findUniqueExactPairs(before, after, builder.audit)
	const anchors = longestIncreasingPairs(exactPairs)
	const anchorKeys = new Set(anchors.map(pairKey))
	const reserved = topLevel ? exactPairs.filter((pair) => !anchorKeys.has(pairKey(pair))) : []
	const reservedBefore = new Set(reserved.map(({ before: node }) => node.index))
	const reservedAfter = new Set(reserved.map(({ after: node }) => node.index))
	builder.reservedMoves.push(...reserved)

	let previousBeforeIndex = -1
	let previousAfterIndex = -1
	for (const anchor of [...anchors, null]) {
		const nextBeforeIndex = anchor?.before.index ?? before.length
		const nextAfterIndex = anchor?.after.index ?? after.length
		const window: AlignmentWindow = {
			before: before
				.slice(previousBeforeIndex + 1, nextBeforeIndex)
				.filter(({ index }) => !reservedBefore.has(index)),
			after: after
				.slice(previousAfterIndex + 1, nextAfterIndex)
				.filter(({ index }) => !reservedAfter.has(index)),
			beforeStart: positionAt(before, previousBeforeIndex + 1, beforeStart, beforeEnd),
			beforeEnd: positionAt(before, nextBeforeIndex, beforeStart, beforeEnd),
			afterStart: positionAt(after, previousAfterIndex + 1, afterStart, afterEnd),
			afterEnd: positionAt(after, nextAfterIndex, afterStart, afterEnd),
		}
		compareAlignmentWindow(builder, window)
		if (anchor) {
			previousBeforeIndex = anchor.before.index
			previousAfterIndex = anchor.after.index
		}
	}
}

/**
 * Find exact sibling pairs whose canonical fingerprints are unique on both sides.
 *
 * @param before Earlier siblings
 * @param after Later siblings
 * @param audit Optional operation counter for structural regression tests
 */
function findUniqueExactPairs(
	before: readonly LocatedComparisonNode[],
	after: readonly LocatedComparisonNode[],
	audit?: ComparisonModelAudit,
) {
	const beforeByFingerprint = groupByFingerprint(before, audit)
	const afterByFingerprint = groupByFingerprint(after, audit)
	const pairs: ExactPair[] = []
	for (const afterNode of after) {
		const fingerprint = fingerprintNode(afterNode.node)
		const beforeMatches = beforeByFingerprint.get(fingerprint)
		const afterMatches = afterByFingerprint.get(fingerprint)
		if (beforeMatches?.length !== 1 || afterMatches?.length !== 1) {
			continue
		}
		const beforeNode = beforeMatches[0]!
		if (beforeNode.node.eq(afterNode.node)) {
			pairs.push({ before: beforeNode, after: afterNode, fingerprint })
		}
	}
	return pairs
}

/**
 * @param nodes Siblings to index
 * @param audit Optional operation counter for structural regression tests
 */
function groupByFingerprint(nodes: readonly LocatedComparisonNode[], audit?: ComparisonModelAudit) {
	const grouped = new Map<string, LocatedComparisonNode[]>()
	for (const node of nodes) {
		const fingerprint = fingerprintNode(node.node)
		const group = grouped.get(fingerprint)
		if (group) {
			group.push(node)
		} else {
			if (audit) {
				audit.fingerprintGroupAllocations++
			}
			grouped.set(fingerprint, [node])
		}
	}
	return grouped
}

/**
 * Select deterministic order-preserving exact anchors in O(n log n).
 *
 * @param pairs Exact pairs in later-document order
 */
function longestIncreasingPairs(pairs: ExactPair[]) {
	if (pairs.length === 0) {
		return []
	}
	const tails: number[] = []
	const previous = new Int32Array(pairs.length).fill(-1)
	for (let candidateIndex = 0; candidateIndex < pairs.length; candidateIndex++) {
		const beforeIndex = pairs[candidateIndex]!.before.index
		let low = 0
		let high = tails.length
		while (low < high) {
			const middle = (low + high) >>> 1
			if (pairs[tails[middle]!]!.before.index < beforeIndex) {
				low = middle + 1
			} else {
				high = middle
			}
		}
		if (low > 0) {
			previous[candidateIndex] = tails[low - 1]!
		}
		tails[low] = candidateIndex
	}

	const selected: ExactPair[] = []
	let candidateIndex = tails.at(-1)!
	while (candidateIndex >= 0) {
		selected.push(pairs[candidateIndex]!)
		candidateIndex = previous[candidateIndex]!
	}
	return selected.reverse()
}

/**
 * @param pair Exact pair
 */
function pairKey(pair: ExactPair) {
	return `${pair.before.index}:${pair.after.index}`
}

/**
 * @param nodes Siblings
 * @param index Child slot
 * @param start Parent content start
 * @param end Parent content end
 */
function positionAt(nodes: readonly LocatedComparisonNode[], index: number, start: number, end: number) {
	return index < 0 ? start : nodes[index]?.from ?? end
}

/**
 * Align one bounded window and compare every resulting pair or unmatched node.
 *
 * @param builder Comparison state
 * @param window Unanchored sibling window
 */
function compareAlignmentWindow(builder: ComparisonBuilder, window: AlignmentWindow) {
	const steps = alignWindow(window.before, window.after)
	for (let index = 0; index < steps.length; index++) {
		const step = steps[index]!
		if (step.before && step.after) {
			comparePairedNodes(builder, step.before, step.after)
		} else if (step.before) {
			const missing = missingLocation(steps, index, 'after', window.afterStart, window.afterEnd)
			emitBlockChange(
				builder,
				step.before,
				null,
				missing.position,
				missing.neighbors,
			)
		} else if (step.after) {
			const missing = missingLocation(steps, index, 'before', window.beforeStart, window.beforeEnd)
			emitBlockChange(
				builder,
				null,
				step.after,
				missing.position,
				missing.neighbors,
			)
		}
	}
}

/**
 * Align a sibling window with bounded dynamic programming or a conservative fallback.
 *
 * @param before Earlier siblings
 * @param after Later siblings
 */
function alignWindow(before: readonly LocatedComparisonNode[], after: readonly LocatedComparisonNode[]) {
	if (before.length * after.length > MAX_ALIGNMENT_PRODUCT) {
		return alignLargeWindow(before, after)
	}

	const columns = after.length + 1
	const scores = new Float64Array((before.length + 1) * columns)
	const pairScores = new Float64Array(before.length * after.length).fill(-1)
	const scoreAt = (beforeIndex: number, afterIndex: number) => scores[beforeIndex * columns + afterIndex]!
	for (let beforeIndex = 1; beforeIndex <= before.length; beforeIndex++) {
		for (let afterIndex = 1; afterIndex <= after.length; afterIndex++) {
			const pairScore = scoreCompatibleNodes(before[beforeIndex - 1]!.node, after[afterIndex - 1]!.node)
			pairScores[(beforeIndex - 1) * after.length + afterIndex - 1] = pairScore
			const pair = pairScore < 0 ? -1 : scoreAt(beforeIndex - 1, afterIndex - 1) + pairScore
			scores[beforeIndex * columns + afterIndex] = Math.max(
				pair,
				scoreAt(beforeIndex - 1, afterIndex),
				scoreAt(beforeIndex, afterIndex - 1),
			)
		}
	}

	const reversed: AlignmentStep[] = []
	let beforeIndex = before.length
	let afterIndex = after.length
	while (beforeIndex > 0 || afterIndex > 0) {
		const current = scoreAt(beforeIndex, afterIndex)
		const pairScore = beforeIndex > 0 && afterIndex > 0
			? pairScores[(beforeIndex - 1) * after.length + afterIndex - 1]!
			: -1
		if (pairScore >= 0 && current === scoreAt(beforeIndex - 1, afterIndex - 1) + pairScore) {
			reversed.push({ before: before[--beforeIndex]!, after: after[--afterIndex]! })
		} else if (beforeIndex > 0 && current === scoreAt(beforeIndex - 1, afterIndex)) {
			reversed.push({ before: before[--beforeIndex]!, after: null })
		} else {
			reversed.push({ before: null, after: after[--afterIndex]! })
		}
	}
	return reversed.reverse()
}

/**
 * Preserve positional precision beyond the dynamic-programming ceiling.
 * A bounded lookahead consumes small insert/delete runs without allowing
 * alignment work to grow with the sibling product.
 *
 * @param before Earlier siblings
 * @param after Later siblings
 */
function alignLargeWindow(before: readonly LocatedComparisonNode[], after: readonly LocatedComparisonNode[]) {
	const steps: AlignmentStep[] = []
	let beforeIndex = 0
	let afterIndex = 0
	while (beforeIndex < before.length || afterIndex < after.length) {
		if (beforeIndex >= before.length) {
			steps.push({ before: null, after: after[afterIndex++]! })
			continue
		}
		if (afterIndex >= after.length) {
			steps.push({ before: before[beforeIndex++]!, after: null })
			continue
		}

		const beforeNode = before[beforeIndex]!
		const afterNode = after[afterIndex]!
		const directScore = scoreCompatibleNodes(beforeNode.node, afterNode.node)
		const remainingBefore = before.length - beforeIndex
		const remainingAfter = after.length - afterIndex
		if (remainingAfter > remainingBefore) {
			const skip = bestFollowingMatch(
				beforeNode.node,
				after,
				afterIndex,
				Math.min(remainingAfter - remainingBefore, MAX_LINEAR_ALIGNMENT_LOOKAHEAD),
				directScore,
			)
			if (skip > 0) {
				for (let offset = 0; offset < skip; offset++) {
					steps.push({ before: null, after: after[afterIndex++]! })
				}
				continue
			}
		} else if (remainingBefore > remainingAfter) {
			const skip = bestFollowingMatch(
				afterNode.node,
				before,
				beforeIndex,
				Math.min(remainingBefore - remainingAfter, MAX_LINEAR_ALIGNMENT_LOOKAHEAD),
				directScore,
			)
			if (skip > 0) {
				for (let offset = 0; offset < skip; offset++) {
					steps.push({ before: before[beforeIndex++]!, after: null })
				}
				continue
			}
		}

		if (directScore >= 0) {
			steps.push({ before: beforeNode, after: afterNode })
		} else {
			steps.push({ before: beforeNode, after: null })
			steps.push({ before: null, after: afterNode })
		}
		beforeIndex++
		afterIndex++
	}
	return steps
}

/**
 * Find a strictly better compatible node after a short unmatched run.
 *
 * @param target Node on the shorter side
 * @param candidates Nodes on the longer side
 * @param start Current longer-side index
 * @param maximumSkip Maximum unmatched prefix to inspect
 * @param directScore Current positional score
 */
function bestFollowingMatch(
	target: Node,
	candidates: readonly LocatedComparisonNode[],
	start: number,
	maximumSkip: number,
	directScore: number,
) {
	let bestOffset = 0
	let bestScore = directScore
	for (let offset = 1; offset <= maximumSkip && start + offset < candidates.length; offset++) {
		const score = scoreCompatibleNodes(target, candidates[start + offset]!.node)
		if (score > bestScore) {
			bestOffset = offset
			bestScore = score
		}
	}
	return bestOffset
}

/**
 * @param before Earlier node
 * @param after Later node
 */
function scoreCompatibleNodes(before: Node, after: Node) {
	if (!compatibleNodes(before, after)) {
		return -1
	}
	return before.eq(after) ? 3 : 1 + textSimilarity(before.textContent, after.textContent)
}

/**
 * @param before Earlier node
 * @param after Later node
 */
function compatibleNodes(before: Node, after: Node) {
	return before.type === after.type
}

/**
 * Compute the required prefix/non-overlapping-suffix Unicode similarity.
 *
 * @param before Earlier text
 * @param after Later text
 */
function textSimilarity(before: string, after: string) {
	const previous = [...normalizeAlignmentText(before)]
	const next = [...normalizeAlignmentText(after)]
	let prefix = 0
	while (prefix < previous.length && prefix < next.length && previous[prefix] === next[prefix]) {
		prefix++
	}
	let suffix = 0
	const maximumSuffix = Math.min(previous.length, next.length) - prefix
	while (suffix < maximumSuffix
		&& previous[previous.length - suffix - 1] === next[next.length - suffix - 1]) {
		suffix++
	}
	return (prefix + suffix) / Math.max(previous.length, next.length, 1)
}

/**
 * @param value Text used only as an alignment hint
 */
function normalizeAlignmentText(value: string) {
	return value.normalize('NFC').replace(/\s+/gu, ' ').trim()
}

/**
 * Find the closest coordinate on an absent side of one alignment operation.
 *
 * @param steps Ordered alignment operations
 * @param index Current operation
 * @param side Missing side
 * @param start Window start
 * @param end Window end
 */
function missingLocation(
	steps: AlignmentStep[],
	index: number,
	side: 'before' | 'after',
	start: number,
	end: number,
) {
	let previous: LocatedComparisonNode | null = null
	for (let next = index + 1; next < steps.length; next++) {
		const node = steps[next]![side]
		if (node) {
			for (let previousIndex = index - 1; previousIndex >= 0; previousIndex--) {
				previous = steps[previousIndex]![side]
				if (previous) {
					break
				}
			}
			return {
				position: node.from,
				neighbors: previous ? [previous, node] : [node],
			}
		}
	}
	for (let previousIndex = index - 1; previousIndex >= 0; previousIndex--) {
		const node = steps[previousIndex]![side]
		if (node) {
			return { position: node.to, neighbors: [node] }
		}
	}
	return { position: Math.min(Math.max(start, 0), end), neighbors: [] }
}

/**
 * Compare one structurally compatible pair by category.
 *
 * @param builder Comparison state
 * @param before Earlier node
 * @param after Later node
 */
function comparePairedNodes(
	builder: ComparisonBuilder,
	before: LocatedComparisonNode,
	after: LocatedComparisonNode,
) {
	if (before.node.eq(after.node)) {
		return
	}
	if (before.node.isTextblock && after.node.isTextblock) {
		compareTextblocks(builder, before, after)
		return
	}
	if (before.node.isLeaf || after.node.isLeaf || before.node.isAtom || after.node.isAtom) {
		emitBlockChange(builder, before, after)
		return
	}
	if (!before.node.sameMarkup(after.node)) {
		emitMarkupChange(builder, before, after)
	}
	compareSiblingNodes(
		builder,
		before.children,
		after.children,
		before.from + 1,
		before.to - 1,
		after.from + 1,
		after.to - 1,
		false,
	)
}

/**
 * Compare one textblock through a bounded bare-block ChangeSet.
 *
 * @param builder Comparison state
 * @param before Earlier textblock
 * @param after Later textblock
 */
function compareTextblocks(
	builder: ComparisonBuilder,
	before: LocatedComparisonNode,
	after: LocatedComparisonNode,
) {
	const start = before.node.content.findDiffStart(after.node.content)
	if (start === null) {
		if (!before.node.sameMarkup(after.node)) {
			emitMarkupChange(builder, before, after)
		}
		return
	}
	const diffEnd = before.node.content.findDiffEnd(after.node.content)
	if (!diffEnd) {
		emitBlockChange(builder, before, after)
		return
	}
	let { a: endA, b: endB } = diffEnd
	if (endA < start) {
		endB += start - endA
		endA = start
	}
	if (endB < start) {
		endA += start - endB
		endB = start
	}
	if ((endA - start) + (endB - start) > MAX_INLINE_ENVELOPE_SIZE) {
		emitBlockChange(builder, before, after)
		return
	}

	const map = new StepMap([0, before.node.content.size, after.node.content.size])
	const changes = simplifyChanges(
		ChangeSet.create(before.node, undefined, semanticTokenEncoder)
			.addSteps(after.node, [map], null)
			.changes,
		after.node,
	)
	if (changes.length === 0 || !changes.every((change) => validInlineChange(builder, before, after, change))) {
		emitBlockChange(builder, before, after)
		return
	}
	if (!before.node.sameMarkup(after.node)) {
		emitMarkupChange(builder, before, after)
	}
	const beforeRoots = originalLocations(builder, 'before', [before])
	const afterRoots = originalLocations(builder, 'after', [after])
	for (const change of changes) {
		pushDescriptor(builder, (sourceOrder) => classifyComparisonDescriptor(
			builder.originalBefore,
			builder.originalAfter,
			{
				from: before.from + 1 + change.fromA,
				to: before.from + 1 + change.toA,
			},
			{
				from: after.from + 1 + change.fromB,
				to: after.from + 1 + change.toB,
			},
			beforeRoots,
			afterRoots,
			sourceOrder,
			'inline',
			{ before: before.path, after: after.path },
			builder.audit,
		))
	}
}

/**
 * Validate a local ChangeSet range and its original-document round trip.
 *
 * @param builder Comparison state
 * @param before Earlier textblock
 * @param after Later textblock
 * @param change Local ChangeSet range
 */
function validInlineChange(
	builder: ComparisonBuilder,
	before: LocatedComparisonNode,
	after: LocatedComparisonNode,
	change: InlineChangeRange,
) {
	if (!validLocalRange(change.fromA, change.toA, before.node.content.size)
		|| !validLocalRange(change.fromB, change.toB, after.node.content.size)) {
		return false
	}
	const beforeLocal = before.node.textBetween(change.fromA, change.toA, '\n', '\ufffc')
	const afterLocal = after.node.textBetween(change.fromB, change.toB, '\n', '\ufffc')
	const beforeAbsolute = comparisonRangeText({
		from: before.from + 1 + change.fromA,
		to: before.from + 1 + change.toA,
	}, [originalLocation(builder, 'before', before)])
	const afterAbsolute = comparisonRangeText({
		from: after.from + 1 + change.fromB,
		to: after.from + 1 + change.toB,
	}, [originalLocation(builder, 'after', after)])
	return beforeLocal === beforeAbsolute && afterLocal === afterAbsolute
}

/**
 * @param from Range start
 * @param to Range end
 * @param maximum Content size
 */
function validLocalRange(from: number, to: number, maximum: number) {
	return Number.isInteger(from) && Number.isInteger(to) && from >= 0 && to >= from && to <= maximum
}

/**
 * Emit a direct node-markup descriptor.
 *
 * @param builder Comparison state
 * @param before Earlier node
 * @param after Later node
 */
function emitMarkupChange(
	builder: ComparisonBuilder,
	before: LocatedComparisonNode,
	after: LocatedComparisonNode,
) {
	const beforeRoot = originalLocation(builder, 'before', before)
	const afterRoot = originalLocation(builder, 'after', after)
	pushDescriptor(builder, (sourceOrder) => classifyNodeMarkupDescriptor(
		builder.originalBefore,
		builder.originalAfter,
		rangeFor(before),
		rangeFor(after),
		beforeRoot.node,
		afterRoot.node,
		[beforeRoot],
		[afterRoot],
		sourceOrder,
		builder.audit,
	))
}

/**
 * Emit one conservative whole-node insert, delete, or replacement.
 *
 * @param builder Comparison state
 * @param before Earlier node, if present
 * @param after Later node, if present
 * @param absentPosition Coordinate on the absent side
 * @param absentNeighbors Adjacent nodes on the absent side
 */
function emitBlockChange(
	builder: ComparisonBuilder,
	before: LocatedComparisonNode | null,
	after: LocatedComparisonNode | null,
	absentPosition = 0,
	absentNeighbors: readonly LocatedComparisonNode[] = [],
) {
	const beforeRange = before ? rangeFor(before) : emptyRange(absentPosition)
	const afterRange = after ? rangeFor(after) : emptyRange(absentPosition)
	const beforeRoots = originalLocations(builder, 'before', before ? [before] : absentNeighbors)
	const afterRoots = originalLocations(builder, 'after', after ? [after] : absentNeighbors)
	pushDescriptor(builder, (sourceOrder) => classifyComparisonDescriptor(
		builder.originalBefore,
		builder.originalAfter,
		beforeRange,
		afterRange,
		beforeRoots,
		afterRoots,
		sourceOrder,
		'block',
		undefined,
		builder.audit,
	))
}

/**
 * Convert reserved unique exact pairs into conservative grouped move descriptors.
 *
 * @param builder Comparison state
 */
function emitReservedMoves(builder: ComparisonBuilder) {
	const { groups, rejected } = confirmReservedExactMoves(
		builder.comparisonBefore,
		builder.comparisonAfter,
		builder.reservedMoves,
	)
	for (const pair of rejected) {
		emitBlockChange(builder, pair.before, null, pair.after.from, [pair.after])
		emitBlockChange(builder, null, pair.after, pair.before.from, [pair.before])
	}

	for (const group of groups) {
		const first = group[0]!
		const last = group.at(-1)!
		const beforeRoots = originalLocations(builder, 'before', group.map(({ before }) => before))
		const afterRoots = originalLocations(builder, 'after', group.map(({ after }) => after))
		pushDescriptor(builder, (sourceOrder) => {
			const descriptor = classifyComparisonDescriptor(
				builder.originalBefore,
				builder.originalAfter,
				{ from: first.before.from, to: last.before.to },
				{ from: first.after.from, to: last.after.to },
				beforeRoots,
				afterRoots,
				sourceOrder,
				'block',
				undefined,
				builder.audit,
			)
			return {
				...descriptor,
				operation: 'move',
				detail: 'block',
				facets: ['structure'],
				signals: [{ type: 'node' }],
			}
		})
	}
}

/**
 * Emit one descriptor through the shared model limit.
 *
 * @param builder Mutable comparison state
 * @param create Descriptor factory
 */
function pushDescriptor(
	builder: ComparisonBuilder,
	create: (sourceOrder: number) => ComparisonDescriptor | null,
) {
	if (builder.descriptors.length >= builder.maximumDescriptors) {
		throw new ComparisonModelLimitError()
	}
	const descriptor = create(builder.descriptors.length)
	if (descriptor) {
		builder.descriptors.push(descriptor)
	}
}

/**
 * Assign stable source order and IDs after moves join recursively emitted changes.
 *
 * @param descriptors Provisional descriptors
 */
function finalizeDescriptors(descriptors: ComparisonDescriptor[]) {
	return descriptors
		.toSorted((a, b) => a.after.from - b.after.from
			|| a.before.from - b.before.from
			|| a.after.to - b.after.to
			|| a.before.to - b.before.to
			|| compareCodeUnits(a.operation, b.operation))
		.map((descriptor, sourceOrder) => ({
			...descriptor,
			id: `${descriptor.operation === 'move' ? 'move' : 'change'}-${sourceOrder.toString(36)}`,
			sourceOrder,
		}))
}

/**
 * Resolve located nodes against an original document.
 *
 * @param builder Mutable comparison state
 * @param side Document side
 * @param locations Located document nodes
 */
function originalLocations(
	builder: ComparisonBuilder,
	side: 'before' | 'after',
	locations: readonly LocatedComparisonNode[],
) {
	return locations.map((location) => originalLocation(builder, side, location))
}

/**
 * Resolve one located node against an original document.
 *
 * @param builder Mutable comparison state
 * @param side Document side
 * @param location Located document node
 */
function originalLocation(
	builder: ComparisonBuilder,
	side: 'before' | 'after',
	location: LocatedComparisonNode,
) {
	return (side === 'before' ? builder.originalBeforeIndex : builder.originalAfterIndex)
		.nodeAtPath(location.path)
}

/**
 * @param node Located node
 */
function rangeFor(node: LocatedComparisonNode): ComparisonRange {
	return { from: node.from, to: node.to }
}

/**
 * @param position Empty-side coordinate
 */
function emptyRange(position: number): ComparisonRange {
	return { from: position, to: position }
}

/**
 * @param node Node to fingerprint
 */
function fingerprintNode(node: Node) {
	const cached = fingerprintCache.get(node)
	if (cached !== undefined) {
		return cached
	}
	const fingerprint = stableSerialize(node.toJSON())
	fingerprintCache.set(node, fingerprint)
	return fingerprint
}
