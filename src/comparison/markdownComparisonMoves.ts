/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { LocatedComparisonNode as Location } from './comparisonDocumentIndex.ts'

import { nodeFingerprint as keyFor } from './markdownComparisonClassification.ts'

export interface ReservedExactMovePair {
	before: Location
	after: Location
	fingerprint: string
}
type Pair = ReservedExactMovePair

export function confirmReservedExactMoves(
	before: Node,
	after: Node,
	candidates: readonly Pair[],
) {
	if (candidates.length === 0) {
		return { groups: [] as Pair[][] }
	}
	const beforeCounts = documentFingerprintCounts(before)
	const afterCounts = documentFingerprintCounts(after)
	const confirmed = candidates.filter(({ fingerprint, before: beforeNode, after: afterNode }) => (
		beforeCounts.get(fingerprint) === 1
		&& afterCounts.get(fingerprint) === 1
		&& beforeNode.node.eq(afterNode.node)
	))

	const groups: Pair[][] = []
	for (const pair of confirmed.toSorted((a, b) => (
		a.before.index - b.before.index || a.after.index - b.after.index
	))) {
		const previous = groups.at(-1)?.at(-1)
		if (previous
			&& pair.before.index === previous.before.index + 1
			&& pair.after.index === previous.after.index + 1) {
			groups.at(-1)!.push(pair)
		} else {
			groups.push([pair])
		}
	}
	return { groups }
}

function documentFingerprintCounts(doc: Node) {
	const counts = new Map<string, number>()
	doc.descendants((node) => {
		const fingerprint = keyFor(node)
		counts.set(fingerprint, (counts.get(fingerprint) ?? 0) + 1)
	})
	return counts
}
