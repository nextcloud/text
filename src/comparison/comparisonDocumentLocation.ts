/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Center one comparison target inside its own document scroller.
 *
 * @param pane Side-specific document pane
 * @param scroller Side-specific document scroller
 * @param id Opaque comparison descriptor ID
 * @param behavior Motion preference
 */
export function locateComparisonTarget(
	pane: HTMLElement | null,
	scroller: HTMLElement | null,
	id: string,
	behavior: ScrollBehavior,
) {
	if (!pane || !scroller || !pane.contains(scroller)) {
		return false
	}
	if (pane.hidden || pane.style.display === 'none') {
		return false
	}
	const target = [...pane.querySelectorAll<HTMLElement>('[data-comparison-change]')]
		.find((element) => element.dataset.comparisonChange === id)
	if (!target) {
		return false
	}

	const scrollerRect = scroller.getBoundingClientRect()
	const targetRect = target.getBoundingClientRect()
	const centeredTop = scroller.scrollTop
		+ targetRect.top
		- scrollerRect.top
		- (scroller.clientHeight - targetRect.height) / 2
	const maximumTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight)
	scroller.scrollTo({
		behavior,
		left: scroller.scrollLeft,
		top: Math.min(Math.max(0, centeredTop), maximumTop),
	})
	return true
}
