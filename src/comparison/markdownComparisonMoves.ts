/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { LocatedComparisonNode } from './comparisonDocumentIndex.ts'

import { stableSerialize } from './markdownComparisonClassification.ts'

export type ReservedExactMoveNode = LocatedComparisonNode

export interface ReservedExactMovePair {
	before: ReservedExactMoveNode
	after: ReservedExactMoveNode
	fingerprint: string
}

interface TopLevelBlock {
	index: number
	node: Node
	fingerprint: string
}

/**
 * Reconfirm and group top-level exact pairs reserved by hierarchical alignment.
 *
 * @param before Earlier normalized document
 * @param after Later normalized document
 * @param candidates Reserved exact pairs
 */
export function confirmReservedExactMoves(
	before: Node,
	after: Node,
	candidates: readonly ReservedExactMovePair[],
) {
	if (candidates.length === 0) {
		return { groups: [], rejected: [] }
	}
	const beforeBlocks = topLevelBlocks(before)
	const afterBlocks = topLevelBlocks(after)
	const beforeCounts = documentFingerprintCounts(before)
	const afterCounts = documentFingerprintCounts(after)
	const confirmed: ReservedExactMovePair[] = []
	const rejected: ReservedExactMovePair[] = []

	for (const candidate of candidates) {
		const beforeBlock = beforeBlocks[candidate.before.index]
		const afterBlock = afterBlocks[candidate.after.index]
		const valid = beforeBlock?.fingerprint === candidate.fingerprint
			&& afterBlock?.fingerprint === candidate.fingerprint
			&& beforeCounts.get(candidate.fingerprint) === 1
			&& afterCounts.get(candidate.fingerprint) === 1
			&& beforeBlock.node.eq(afterBlock.node)
		if (valid) {
			confirmed.push(candidate)
		} else {
			rejected.push(candidate)
		}
	}

	const groups: ReservedExactMovePair[][] = []
	for (const pair of confirmed.toSorted((a, b) => (
		a.before.index - b.before.index || a.after.index - b.after.index
	))) {
		const group = groups.at(-1)
		const previous = group?.at(-1)
		if (group && previous
			&& pair.before.index === previous.before.index + 1
			&& pair.after.index === previous.after.index + 1) {
			group.push(pair)
		} else {
			groups.push([pair])
		}
	}
	return { groups, rejected }
}

/** @param doc Complete document */
function topLevelBlocks(doc: Node) {
	const blocks: TopLevelBlock[] = []
	doc.forEach((node, _from, index) => {
		blocks.push({
			index,
			node,
			fingerprint: canonicalFingerprint(node),
		})
	})
	return blocks
}

/** @param doc Complete document */
function documentFingerprintCounts(doc: Node) {
	const counts = new Map<string, number>()
	doc.descendants((node) => {
		const fingerprint = canonicalFingerprint(node)
		counts.set(fingerprint, (counts.get(fingerprint) ?? 0) + 1)
	})
	return counts
}

/** @param node ProseMirror node */
function canonicalFingerprint(node: Node) {
	return stableSerialize(node.toJSON())
}
