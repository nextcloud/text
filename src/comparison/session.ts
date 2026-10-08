/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { BlockPair, ComparisonSpacers } from './alignment.ts'
import type { Change } from './compare.ts'
import type { ComparisonDecorationKey, ComparisonSide as Side } from './decorations.ts'

import { t } from '@nextcloud/l10n'
import { computed, effectScope, nextTick, ref, watch } from 'vue'
import { logger } from '../helpers/logger.ts'
import { adjustSpacers, pairTopLevelBlocks } from './alignment.ts'
import { compareDocuments } from './compare.ts'
import { createComparisonDecorationPlugin, createComparisonSpacerPlugin, setComparisonDecorations, setComparisonSpacers } from './decorations.ts'
import { createComparisonEditor } from './editor.ts'

/** Larger inputs are shown as plain source instead of being compared. */
const MAX_CONTENT_LENGTH = 1_000_000

export const comparisonSides: readonly Side[] = ['before', 'after']

export interface ComparisonSessionOptions {
	filePath?: string
	noLazyImages?: boolean
	openLink?: (href: string) => void
}

export type ComparisonSession = ReturnType<typeof createComparisonSession>

type ComparisonEditor = ReturnType<typeof createComparisonEditor>

/**
 * Compare two Markdown documents and hold everything their views share: the
 * editors of both sides, the changes, the current one and the filter, and the
 * alignment and scrolling of the documents. The views may live in different
 * components, each showing one side.
 *
 * @param beforeContent Markdown of the older document.
 * @param afterContent Markdown of the newer document.
 * @param options Attachment and link settings of the editors.
 */
export function createComparisonSession(beforeContent: string, afterContent: string, options: ComparisonSessionOptions = {}) {
	const labels = { before: t('text', 'Before'), after: t('text', 'After') }
	const legends = { before: t('text', 'Removed'), after: t('text', 'Added') }

	const editors = {} as Record<Side, ComparisonEditor>
	const decorationKeys = {} as Record<Side, ComparisonDecorationKey>
	const spacerKeys = {} as Record<Side, ComparisonDecorationKey>
	const scrollers: Record<Side, HTMLElement | null> = { before: null, after: null }
	const mirrored: Record<Side, number | null> = { before: null, after: null }
	let changes: Change[] = []
	let blockPairs: BlockPair[] = []
	let spacers: ComparisonSpacers = { before: new Map(), after: new Map() }
	let observer: ResizeObserver | null = null
	let failed = false

	try {
		if (beforeContent.length + afterContent.length > MAX_CONTENT_LENGTH) {
			throw new Error('Content exceeds the comparison limit')
		}
		for (const side of comparisonSides) {
			editors[side] = createComparisonEditor(side === 'before' ? beforeContent : afterContent, {
				ariaLabel: labels[side],
				filePath: options.filePath,
				noLazyImages: options.noLazyImages,
				openLink: options.openLink,
			})
			const { key, plugin } = createComparisonDecorationPlugin(side)
			editors[side].registerPlugin(plugin)
			decorationKeys[side] = key
			const spacer = createComparisonSpacerPlugin()
			editors[side].registerPlugin(spacer.plugin)
			spacerKeys[side] = spacer.key
		}
		changes = compareDocuments(editors.before.state.doc, editors.after.state.doc)
		blockPairs = pairTopLevelBlocks(editors.before.state.doc, editors.after.state.doc, changes)
	} catch (error) {
		logger.warn('Falling back to plain source comparison', { error })
		failed = true
		destroyEditors()
	}

	// Detached, so the state outlives the component that created it
	const scope = effectScope(true)
	const state = scope.run(() => {
		const hideFormatting = ref(false)
		const currentId = ref<string | null>(changes[0]?.id ?? null)
		const visibleChanges = computed(() => hideFormatting.value
			? changes.filter(({ category }) => category !== 'formatting')
			: changes)
		const currentIndex = computed(() => visibleChanges.value.findIndex(({ id }) => id === currentId.value))
		const status = computed(() => currentIndex.value < 0
			? t('text', 'No changes')
			: t('text', 'Change {current} of {total}', { current: currentIndex.value + 1, total: visibleChanges.value.length }))
		const emptyMessage = computed(() => {
			if (changes.length) {
				return t('text', 'All changes are formatting-only and hidden.')
			}
			return beforeContent === afterContent
				? t('text', 'No differences.')
				: t('text', 'No rendered differences — Markdown syntax differs.')
		})

		watch(visibleChanges, (visible) => {
			if (!visible.some(({ id }) => id === currentId.value)) {
				currentId.value = visible[0]?.id ?? null
			}
		})
		watch([currentId, hideFormatting], () => {
			if (failed) {
				return
			}
			for (const side of comparisonSides) {
				setComparisonDecorations(editors[side], decorationKeys[side], {
					changes,
					currentId: currentId.value,
					hideFormatting: hideFormatting.value,
				})
			}
		}, { immediate: true })
		watch(currentId, () => nextTick(scrollToCurrent))

		return { hideFormatting, currentId, visibleChanges, currentIndex, status, emptyMessage }
	})!

	/**
	 * Make a change the current one.
	 *
	 * @param id Id of the change.
	 */
	function select(id: string) {
		state.currentId.value = id
	}

	/**
	 * Step through the visible changes, wrapping around at either end.
	 *
	 * @param offset How many changes to step, negative to go back.
	 */
	function move(offset: number) {
		const count = state.visibleChanges.value.length
		const index = (Math.max(state.currentIndex.value, 0) + offset + count) % count
		state.currentId.value = state.visibleChanges.value[index]!.id
	}

	/**
	 * Register the element one side's document scrolls in, or unregister it
	 * with null. Once both sides are shown, the documents are aligned and
	 * scroll together.
	 *
	 * @param side Side of the document.
	 * @param element Its scrolling element, or null once it is gone.
	 */
	function attachScroller(side: Side, element: HTMLElement | null) {
		if (failed || scrollers[side] === element) {
			return
		}
		scrollers[side]?.removeEventListener('scroll', syncScroll)
		observer?.unobserve(editors[side].view.dom)
		scrollers[side] = element
		if (!element) {
			return
		}
		element.addEventListener('scroll', syncScroll, { passive: true })
		if (typeof ResizeObserver === 'undefined') {
			nextTick(alignDocuments)
			return
		}
		// Any layout change of either document re-aligns: pane resizes, images that
		// appear once loaded, fonts. Aligning changes the observed size itself, so
		// run it a frame later to keep the observer from reporting a loop.
		observer ??= new ResizeObserver(() => requestAnimationFrame(alignDocuments))
		observer.observe(editors[side].view.dom)
	}

	/**
	 * Pad top-level blocks so paired blocks start at the same offset in both documents.
	 * Measuring includes the spacers already in place, so a few rounds settle margin effects.
	 */
	function alignDocuments() {
		if (failed || !scrollers.before || !scrollers.after) {
			return
		}
		for (let round = 0; round < 3; round++) {
			const tops = { before: blockTops(editors.before), after: blockTops(editors.after) }
			const adjusted = adjustSpacers(blockPairs, tops, spacers)
			if (adjusted.largest === 0) {
				break
			}
			spacers = adjusted.spacers
			for (const side of comparisonSides) {
				setComparisonSpacers(editors[side], spacerKeys[side], spacers[side])
			}
		}
		scrollToCurrent()
	}

	/**
	 * Offsets of the top-level blocks of a document from its top.
	 *
	 * @param editor Editor of the document.
	 */
	function blockTops(editor: ComparisonEditor) {
		const origin = editor.view.dom.getBoundingClientRect().top
		const tops: number[] = []
		editor.state.doc.forEach((_node, offset) => {
			const dom = editor.view.nodeDOM(offset)
			tops.push(dom instanceof HTMLElement ? dom.getBoundingClientRect().top - origin : 0)
		})
		return tops
	}

	/** Scroll one document to the current change; the other follows through syncScroll. */
	function scrollToCurrent() {
		if (state.currentId.value === null) {
			return
		}
		for (const side of comparisonSides) {
			const scroller = scrollers[side]
			const target = scroller?.querySelector<HTMLElement>(`[data-comparison-change="${state.currentId.value}"]`)
			if (scroller && target) {
				const offset = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top
				scroller.scrollTop += offset - (scroller.clientHeight - target.offsetHeight) / 2
				return
			}
		}
	}

	/**
	 * Mirror the scroll position of one document onto the other.
	 * A document that was just positioned by the mirror reports that position in its own scroll event;
	 * that echo must not be mirrored back, as assigning scrollTop would cancel a running scroll animation.
	 *
	 * @param event Scroll event of one of the documents.
	 */
	function syncScroll(event: Event) {
		const sourceSide: Side = event.currentTarget === scrollers.before ? 'before' : 'after'
		const targetSide: Side = sourceSide === 'before' ? 'after' : 'before'
		const source = scrollers[sourceSide]!
		const target = scrollers[targetSide]
		const echo = mirrored[sourceSide] === source.scrollTop
		mirrored[sourceSide] = null
		if (echo || !target || target.scrollTop === source.scrollTop) {
			return
		}
		target.scrollTop = source.scrollTop
		mirrored[targetSide] = target.scrollTop
	}

	function destroyEditors() {
		for (const side of comparisonSides) {
			editors[side]?.destroy()
		}
	}

	/** Stop following the documents and release the editors. */
	function destroy() {
		scope.stop()
		observer?.disconnect()
		for (const side of comparisonSides) {
			scrollers[side]?.removeEventListener('scroll', syncScroll)
			scrollers[side] = null
		}
		destroyEditors()
	}

	return {
		failed,
		beforeContent,
		afterContent,
		editors,
		labels,
		legends,
		formattingCount: changes.filter(({ category }) => category === 'formatting').length,
		...state,
		select,
		move,
		attachScroller,
		scrollToCurrent,
		destroy,
	}
}
