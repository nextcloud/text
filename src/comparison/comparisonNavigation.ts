/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonEdit as Edit, ComparisonSide as Side } from './markdownComparisonTypes.ts'

/**
 * Check whether every descriptor changes formatting alone.
 *
 * @param edit Semantic edit to classify.
 */
export function isPureFormatting(edit: Edit) {
	return edit.descriptors.every(({ facets }) => facets.length === 1 && facets[0] === 'formatting')
}

/**
 * Keep the current edit if visible, otherwise prefer the next visible edit, then the previous one.
 *
 * @param edits All edits in navigation order.
 * @param activeIds Visible edit IDs; an empty list clears the selection.
 * @param currentId Previously selected edit, if any.
 */
export function currentIdAfterFilter(
	edits: readonly Edit[],
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
	const currentIndex = edits.findIndex(({ id }) => id === currentId)
	if (currentIndex >= 0) {
		for (let index = currentIndex + 1; index < edits.length; index++) {
			if (active.has(edits[index]!.id)) {
				return edits[index]!.id
			}
		}
		for (let index = currentIndex - 1; index >= 0; index--) {
			if (active.has(edits[index]!.id)) {
				return edits[index]!.id
			}
		}
	}
	return edits.find(({ id }) => active.has(id))?.id ?? null
}

/**
 * Move through visible edits with wraparound, returning null for an empty list.
 *
 * @param activeIds Visible edit IDs in navigation order.
 * @param currentId Selected ID; an absent ID starts from the first edit.
 * @param offset Signed number of edits to move.
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
 * Return a one-based visible ordinal, or zero when no visible edit is selected.
 *
 * @param activeIds Visible edit IDs in navigation order.
 * @param currentId Selected ID, if any.
 */
export function currentOrdinal(activeIds: readonly string[], currentId: string | null) {
	const index = currentId ? activeIds.indexOf(currentId) : -1
	return index < 0 ? 0 : index + 1
}

/**
 * Map arrow, Home and End keys to a side, returning null for other keys.
 *
 * @param key KeyboardEvent key value.
 */
export function comparisonSideForKey(key: string): Side | null {
	if (key === 'ArrowLeft' || key === 'ArrowUp' || key === 'Home') {
		return 'before'
	}
	return key === 'ArrowRight' || key === 'ArrowDown' || key === 'End' ? 'after' : null
}
/**
 * Use immediate scrolling when the reader requests reduced motion.
 */
export function comparisonScrollBehavior(): ScrollBehavior {
	return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

/**
 * Center a change in its pane while preserving horizontal scroll and clamping to the scrollable range.
 * Return false when the pane, scroller or target geometry is unavailable.
 *
 * @param pane Visible pane containing the change decorations.
 * @param scroller Scroll container inside the pane.
 * @param id Descriptor ID to locate.
 * @param behavior Requested browser scroll behavior.
 * @param fallbackRect Geometry for an undecorated range, such as an insertion boundary.
 */
export function locateComparisonTarget(pane: HTMLElement | null, scroller: HTMLElement | null, id: string, behavior: ScrollBehavior, fallbackRect?: () => { top: number, height: number } | null) {
	if (!pane || !scroller || !pane.contains(scroller) || pane.hidden || pane.style.display === 'none') {
		return false
	}
	const target = [...pane.querySelectorAll<HTMLElement>('[data-comparison-change]')]
		.find((element) => element.dataset.comparisonChange === id)
	const targetRect = target?.getBoundingClientRect() ?? fallbackRect?.()
	if (!targetRect) {
		return false
	}
	const scrollerRect = scroller.getBoundingClientRect()
	const centeredTop = scroller.scrollTop + targetRect.top - scrollerRect.top
		- (scroller.clientHeight - targetRect.height) / 2
	const maximumTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight)
	scroller.scrollTo({
		behavior,
		left: scroller.scrollLeft,
		top: Math.min(Math.max(0, centeredTop), maximumTop),
	})
	return true
}
