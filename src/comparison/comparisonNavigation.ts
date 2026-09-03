/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonEdit as Edit, ComparisonSide as Side } from './markdownComparisonTypes.ts'

export function isPureFormatting(edit: Edit) {
	return edit.descriptors.every(({ facets }) => facets.length === 1 && facets[0] === 'formatting')
}

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

export function moveCurrentId(activeIds: readonly string[], currentId: string | null, offset: number) {
	if (activeIds.length === 0) {
		return null
	}
	const current = Math.max(0, activeIds.indexOf(currentId ?? ''))
	const next = ((current + offset) % activeIds.length + activeIds.length) % activeIds.length
	return activeIds[next]!
}

export function currentOrdinal(activeIds: readonly string[], currentId: string | null) {
	const index = currentId ? activeIds.indexOf(currentId) : -1
	return index < 0 ? 0 : index + 1
}

export function comparisonSideForKey(key: string): Side | null {
	if (key === 'ArrowLeft' || key === 'ArrowUp' || key === 'Home') {
		return 'before'
	}
	return key === 'ArrowRight' || key === 'ArrowDown' || key === 'End' ? 'after' : null
}
export function comparisonScrollBehavior(): ScrollBehavior {
	return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

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
