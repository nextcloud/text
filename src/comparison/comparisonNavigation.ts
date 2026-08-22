/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonDescriptor } from './markdownComparisonTypes.ts'

export interface ComparisonDescriptorGroup {
	id: string
	descriptors: readonly ComparisonDescriptor[]
}

/**
 * Reader-facing change kinds.
 *
 * `facets` overlap by design, so they cannot be presented as filters directly.
 * These four kinds are assigned by `comparisonChangeKind`, which is total and
 * disjoint: every descriptor resolves to exactly one kind, so kind counts
 * always sum to the descriptor count.
 */
export type ComparisonChangeKind = 'content' | 'formatting' | 'move' | 'other'

/** Stable presentation order for change kinds. */
export const COMPARISON_CHANGE_KINDS: readonly ComparisonChangeKind[] = ['content', 'formatting', 'move', 'other']

/**
 * Check whether a descriptor contains only formatting changes.
 *
 * @param descriptor Semantic comparison descriptor
 */
export function isPureFormatting(descriptor: ComparisonDescriptor) {
	return descriptor.facets.length === 1 && descriptor.facets[0] === 'formatting'
}

/**
 * Resolve the single reader-facing kind of one descriptor.
 *
 * Ordered so that the strongest claim wins: a relocation is a move even when
 * its text also changed, and anything touching words or document structure is
 * content even when it also changed formatting. Everything the reader cannot
 * act on as text — attribute-only edits and unclassified changes — is `other`.
 *
 * @param descriptor Semantic change
 */
export function comparisonChangeKind(descriptor: ComparisonDescriptor): ComparisonChangeKind {
	if (descriptor.operation === 'move') {
		return 'move'
	}
	if (isPureFormatting(descriptor)) {
		return 'formatting'
	}
	if (descriptor.facets.includes('text') || descriptor.facets.includes('structure')) {
		return 'content'
	}
	return 'other'
}

/**
 * Select visible descriptor IDs for the active filter.
 *
 * @param descriptors Semantic comparison descriptors in source order
 * @param hidePureFormatting Whether to omit formatting-only descriptors
 */
export function visibleDescriptorIds(
	descriptors: readonly ComparisonDescriptor[],
	hidePureFormatting: boolean,
) {
	return descriptors
		.filter((descriptor) => !hidePureFormatting || !isPureFormatting(descriptor))
		.map(({ id }) => id)
}

/**
 * Present multiple algorithm ranges in one semantic block as one human edit.
 * Exact moves remain standalone because one move can span several blocks.
 *
 * @param descriptors Visible descriptors in source order
 */
export function groupComparisonDescriptors(descriptors: readonly ComparisonDescriptor[]) {
	const groups: ComparisonDescriptorGroup[] = []
	const groupIndexByContext = new Map<string, number>()
	for (const descriptor of descriptors) {
		const key = descriptor.operation === 'move' ? descriptor.id : descriptorContextKey(descriptor)
		const existingIndex = groupIndexByContext.get(key)
		if (existingIndex !== undefined) {
			const existing = groups[existingIndex]!
			groups[existingIndex] = { ...existing, descriptors: [...existing.descriptors, descriptor] }
		} else {
			const group = { id: descriptor.id, descriptors: [descriptor] }
			groups.push(group)
			groupIndexByContext.set(key, groups.length - 1)
		}
	}
	return groups
}

/** @param descriptor Semantic descriptor */
function descriptorContextKey(descriptor: ComparisonDescriptor) {
	const path = (side: 'before' | 'after') => descriptor.context[side]?.path.join('.') ?? '-'
	return `${path('before')}|${path('after')}`
}

/**
 * Preserve current ID or choose the next, then previous, descriptor in full-model order.
 *
 * @param descriptors Semantic comparison descriptors in source order
 * @param activeIds Visible descriptor IDs
 * @param currentId Selected descriptor ID
 */
export function currentIdAfterFilter(
	descriptors: readonly ComparisonDescriptor[],
	activeIds: readonly string[],
	currentId: string | null,
) {
	const active = new Set(activeIds)
	if (currentId && active.has(currentId)) {
		return currentId
	}
	if (active.size === 0) {
		return null
	}
	const currentIndex = descriptors.findIndex(({ id }) => id === currentId)
	if (currentIndex >= 0) {
		for (let index = currentIndex + 1; index < descriptors.length; index++) {
			if (active.has(descriptors[index]!.id)) {
				return descriptors[index]!.id
			}
		}
		for (let index = currentIndex - 1; index >= 0; index--) {
			if (active.has(descriptors[index]!.id)) {
				return descriptors[index]!.id
			}
		}
	}
	return descriptors.find(({ id }) => active.has(id))?.id ?? null
}

/**
 * Move the current selection through visible descriptor IDs.
 *
 * @param activeIds Visible descriptor IDs
 * @param currentId Selected descriptor ID
 * @param offset Signed navigation offset
 */
export function moveCurrentId(activeIds: readonly string[], currentId: string | null, offset: number) {
	if (activeIds.length === 0) {
		return null
	}
	const current = Math.max(0, activeIds.indexOf(currentId ?? ''))
	const next = ((current + offset) % activeIds.length + activeIds.length) % activeIds.length
	return activeIds[next]!
}

/**
 * Resolve the one-based ordinal of the current descriptor.
 *
 * @param activeIds Visible descriptor IDs
 * @param currentId Selected descriptor ID
 */
export function currentOrdinal(activeIds: readonly string[], currentId: string | null) {
	const index = currentId ? activeIds.indexOf(currentId) : -1
	return index < 0 ? 0 : index + 1
}
