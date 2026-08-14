/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { Node } from '@tiptap/pm/model'
import type { PluginKey } from '@tiptap/pm/state'
import type { ComparisonNodeSearchAudit } from './comparisonDocumentIndex.ts'
import type {
	ComparisonDescriptor,
	ComparisonSide,
} from './markdownComparisonTypes.ts'

import { Plugin, PluginKey as ProseMirrorPluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import {
	createComparisonDocumentIndex,
	findComparisonNodes,
} from './comparisonDocumentIndex.ts'
import { createHierarchicalMarkdownComparisonModel } from './hierarchicalMarkdownComparisonModel.ts'

export { ComparisonModelLimitError } from './hierarchicalMarkdownComparisonModel.ts'
export type * from './markdownComparisonTypes.ts'

interface ComparisonDecorationState {
	activeIds: readonly string[]
	currentId: string | null
}

interface PreparedDecoration {
	descriptor: ComparisonDescriptor
	from: number
	to: number
	type: 'inline' | 'node' | 'widget'
}

interface ComparisonDecorationPluginState extends ComparisonDecorationState {
	decorations: DecorationSet
	prepared: readonly PreparedDecoration[]
}

type ComparisonDecorationKey = PluginKey<ComparisonDecorationPluginState>

let pluginId = 0

/**
 * Compare complete documents through the bounded hierarchical implementation.
 *
 * @param before Earlier document
 * @param after Later document
 */
export function createMarkdownComparisonModel(before: Node, after: Node) {
	return createHierarchicalMarkdownComparisonModel(before, after)
}

/**
 * Create stable-ID comparison decorations for registration after editor mount.
 *
 * @param descriptors Semantic descriptors
 * @param side Document side
 * @param markerLabel Accessible marker label
 * @param emptyMarkerLabel Accessible empty-range label
 * @param initialState Initial visible/current descriptor IDs
 */
export function createComparisonDecorationPlugin(
	descriptors: readonly ComparisonDescriptor[],
	side: ComparisonSide,
	markerLabel: string,
	emptyMarkerLabel = markerLabel,
	initialState: ComparisonDecorationState = {
		activeIds: descriptors.map(({ id }) => id),
		currentId: descriptors[0]?.id ?? null,
	},
) {
	const key = new ProseMirrorPluginKey<ComparisonDecorationPluginState>(`markdown-comparison-${side}-${pluginId++}`)
	const plugin = new Plugin<ComparisonDecorationPluginState>({
		key,
		state: {
			init: (_, state) => createPluginState(
				state.doc,
				descriptors,
				side,
				initialState,
				markerLabel,
				emptyMarkerLabel,
			),
			apply: (transaction, current) => {
				const update = transaction.getMeta(key) as ComparisonDecorationState | undefined
				if (transaction.docChanged) {
					return {
						activeIds: [],
						currentId: null,
						decorations: DecorationSet.empty,
						prepared: [],
					}
				}
				if (!update) {
					return current
				}
				const selection = normalizeDecorationState(descriptors, update)
				return {
					...selection,
					prepared: current.prepared,
					decorations: buildDecorationSet(
						transaction.doc,
						current.prepared,
						selection,
						side,
						markerLabel,
						emptyMarkerLabel,
					),
				}
			},
		},
		props: {
			decorations(state) {
				return key.getState(state)?.decorations ?? DecorationSet.empty
			},
		},
	})
	return { key, plugin }
}

/**
 * Update visible/current IDs without traversing the document again.
 *
 * @param editor Comparison editor
 * @param key Decoration plugin key
 * @param state Decoration visibility and selection state
 */
export function setComparisonDecorationState(
	editor: Editor,
	key: ComparisonDecorationKey,
	state: ComparisonDecorationState,
) {
	editor.view.dispatch(editor.state.tr.setMeta(key, state))
}

/**
 * Create the initial comparison decoration state.
 *
 * @param doc Document to decorate
 * @param descriptors Semantic comparison descriptors in source order
 * @param side Document side to decorate
 * @param selection Initial decoration visibility and selection state
 * @param markerLabel Accessible change marker label
 * @param emptyMarkerLabel Accessible empty-range marker label
 */
function createPluginState(
	doc: Node,
	descriptors: readonly ComparisonDescriptor[],
	side: ComparisonSide,
	selection: ComparisonDecorationState,
	markerLabel: string,
	emptyMarkerLabel: string,
): ComparisonDecorationPluginState {
	const prepared = prepareComparisonDecorations(doc, descriptors, side)
	const normalized = normalizeDecorationState(descriptors, selection)
	return {
		...normalized,
		prepared,
		decorations: buildDecorationSet(
			doc,
			prepared,
			normalized,
			side,
			markerLabel,
			emptyMarkerLabel,
		),
	}
}

/**
 * Limit visible and current IDs to known descriptors.
 *
 * @param descriptors Semantic comparison descriptors in source order
 * @param state Decoration visibility and selection state
 */
function normalizeDecorationState(
	descriptors: readonly ComparisonDescriptor[],
	state: ComparisonDecorationState,
): ComparisonDecorationState {
	const known = new Set(descriptors.map(({ id }) => id))
	const activeIds = [...new Set(state.activeIds)].filter((id) => known.has(id))
	return {
		activeIds,
		currentId: state.currentId && activeIds.includes(state.currentId) ? state.currentId : null,
	}
}

/**
 * Prepare range templates once. Navigation only combines these templates.
 *
 * @param doc Document to decorate
 * @param descriptors Semantic comparison descriptors in source order
 * @param side Document side to decorate
 * @param audit Optional operation counter for structural regression tests
 */
export function prepareComparisonDecorations(
	doc: Node,
	descriptors: readonly ComparisonDescriptor[],
	side: ComparisonSide,
	audit?: ComparisonNodeSearchAudit,
) {
	const index = createComparisonDocumentIndex(doc, audit)
	const byId = new Map(descriptors.map((descriptor) => [descriptor.id, {
		descriptor,
		from: clamp(descriptor[side].from, 0, doc.content.size),
		to: clamp(descriptor[side].to, 0, doc.content.size),
		represented: false,
		parts: [] as PreparedDecoration[],
	}]))
	const blockItems = [...byId.values()].filter((item) => item.descriptor.detail === 'block')
	const topLevelNodes: Array<{ from: number, to: number }> = []
	const nodeRanges = new Set<string>()
	if (blockItems.some((item) => item.from !== item.to)) {
		for (const location of index.nodes) {
			const range = { from: location.from, to: location.to }
			nodeRanges.add(`${range.from}:${range.to}`)
			if (location.parent === null) {
				topLevelNodes.push(range)
			}
		}
	}
	for (const item of blockItems) {
		let lower = 0
		let upper = topLevelNodes.length
		while (lower < upper) {
			const middle = Math.floor((lower + upper) / 2)
			if (topLevelNodes[middle]!.to <= item.from) {
				lower = middle + 1
			} else {
				upper = middle
			}
		}
		for (let index = lower; index < topLevelNodes.length; index++) {
			const range = topLevelNodes[index]!
			if (range.from >= item.to) {
				break
			}
			if (item.from <= range.from && item.to >= range.to) {
				item.parts.push({ descriptor: item.descriptor, ...range, type: 'node' })
				item.represented = true
			}
		}
		if (!item.represented && item.from !== item.to) {
			const context = item.descriptor.context[side]
			if (context
				&& context.from < context.to
				&& nodeRanges.has(`${context.from}:${context.to}`)) {
				item.parts.push({
					descriptor: item.descriptor,
					from: clamp(context.from, 0, doc.content.size),
					to: clamp(context.to, 0, doc.content.size),
					type: 'node',
				})
				item.represented = true
			}
		}
	}

	const inlineItems = [...byId.values()].filter((item) => item.descriptor.detail === 'inline')
	for (const item of inlineItems) {
		if (item.from === item.to) {
			continue
		}
		for (const { node, from: pos, to: end } of findComparisonNodes(
			{ from: item.from, to: item.to },
			index.children,
			audit,
		)) {
			if (node.isText) {
				const from = Math.max(item.from, pos)
				const to = Math.min(item.to, end)
				if (from < to) {
					item.parts.push({ descriptor: item.descriptor, from, to, type: 'inline' })
					item.represented = true
				}
				continue
			}
			const fullyCovered = item.from <= pos && item.to >= end
			const openingChanged = item.from <= pos && item.to > pos && item.to <= pos + 1
			const closingChanged = item.from < end && item.to >= end && item.from >= end - 1
			const nodeSemanticsChanged = item.descriptor.facets.some((facet) => facet !== 'text' && facet !== 'formatting')
			if (node.isLeaf || (nodeSemanticsChanged && (fullyCovered || openingChanged || closingChanged))) {
				item.parts.push({ descriptor: item.descriptor, from: pos, to: end, type: 'node' })
				item.represented = true
			}
		}
	}

	return [...byId.values()].flatMap((item) => item.represented
		? item.parts
		: [{
				descriptor: item.descriptor,
				from: item.from,
				to: item.from,
				type: 'widget' as const,
			}])
}

/**
 * Build decorations from prepared templates and UI state.
 *
 * @param doc Document to decorate
 * @param prepared Prepared decoration templates
 * @param state Decoration visibility and selection state
 * @param side Document side to decorate
 * @param markerLabel Accessible change marker label
 * @param emptyMarkerLabel Accessible empty-range marker label
 */
function buildDecorationSet(
	doc: Node,
	prepared: readonly PreparedDecoration[],
	state: ComparisonDecorationState,
	side: ComparisonSide,
	markerLabel: string,
	emptyMarkerLabel: string,
) {
	const active = new Set(state.activeIds)
	const decorations = prepared.flatMap((item): Decoration[] => {
		if (!active.has(item.descriptor.id)) {
			return []
		}
		const label = item.type === 'widget' ? emptyMarkerLabel : markerLabel
		const current = item.descriptor.id === state.currentId
		const attributes = changeAttributes(
			item.descriptor,
			side,
			current,
			label,
			item.type === 'widget',
		)
		if (item.type === 'inline') {
			return [Decoration.inline(item.from, item.to, attributes)]
		}
		if (item.type === 'node') {
			return [Decoration.node(item.from, item.to, attributes)]
		}
		return [Decoration.widget(item.from, () => {
			const marker = document.createElement('span')
			marker.className = attributes.class
			marker.dataset.comparisonChange = item.descriptor.id
			marker.setAttribute('role', 'note')
			marker.setAttribute('aria-label', label)
			if (current) {
				marker.setAttribute('aria-current', 'true')
			}
			marker.textContent = '•'
			return marker
		}, { key: `${side}-${item.descriptor.id}-${current ? 'current' : 'idle'}`, side: -1 })]
	})
	return DecorationSet.create(doc, decorations)
}

/**
 * Build accessible DOM attributes for one change marker.
 *
 * @param descriptor Semantic comparison descriptor
 * @param side Document side to decorate
 * @param current Whether the descriptor is selected
 * @param label Accessible marker label
 * @param empty Whether the descriptor range is empty
 */
function changeAttributes(
	descriptor: ComparisonDescriptor,
	side: ComparisonSide,
	current: boolean,
	label: string,
	empty: boolean,
) {
	const pureFormatting = descriptor.facets.length === 1 && descriptor.facets[0] === 'formatting'
	const coarseReplacement = descriptor.detail === 'block' && descriptor.operation === 'replace'
	const classes = [
		'text-comparison-change',
		coarseReplacement
			? 'text-comparison-change--block'
			: pureFormatting
				? 'text-comparison-change--formatting'
				: descriptor.operation === 'move'
					? 'text-comparison-change--move'
					: descriptor.facets.includes('attribute') && !descriptor.facets.includes('text')
						? 'text-comparison-change--attribute'
						: `text-comparison-change--${side === 'before' ? 'removed' : 'added'}`,
		descriptor.detail === 'block' && !coarseReplacement ? 'text-comparison-change--block' : '',
		current ? 'text-comparison-change--current' : '',
		empty ? 'text-comparison-change--empty' : '',
	].filter(Boolean)
	return {
		class: classes.join(' '),
		'data-comparison-change': descriptor.id,
		'aria-label': label,
		...(current ? { 'aria-current': 'true' } : {}),
	}
}

/**
 * Constrain a number to an inclusive range.
 *
 * @param value Input number
 * @param minimum Inclusive lower bound
 * @param maximum Inclusive upper bound
 */
function clamp(value: number, minimum: number, maximum: number) {
	return Math.min(Math.max(value, minimum), maximum)
}
