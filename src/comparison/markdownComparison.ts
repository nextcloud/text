/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { Node } from '@tiptap/pm/model'
import type { PluginKey } from '@tiptap/pm/state'
import type { LocatedComparisonNode as LocatedNode } from './comparisonDocumentIndex.ts'
import type { ComparisonDescriptor as Descriptor, ComparisonSide as Side } from './markdownComparisonTypes.ts'

import { Plugin, PluginKey as ProseMirrorPluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { createComparisonDocumentIndex, findComparisonNodes } from './comparisonDocumentIndex.ts'

export { ComparisonModelLimitError, createHierarchicalMarkdownComparisonModel as createMarkdownComparisonModel } from './hierarchicalMarkdownComparisonModel.ts'
export type * from './markdownComparisonTypes.ts'

export interface ComparisonDecorationState {
	activeIds: readonly string[]
	currentIds: readonly string[]
}

export interface PreparedComparisonDecoration {
	descriptor: Descriptor
	from: number
	to: number
	type: 'inline' | 'node'
}

type State = ComparisonDecorationState
type Prepared = PreparedComparisonDecoration
interface PluginState extends State {
	decorations: DecorationSet
	prepared: readonly Prepared[]
}

export type ComparisonDecorationKey = PluginKey<PluginState>

export const RENDERED_COMPARISON_LIMITS = Object.freeze({
	maximumCharactersPerSnapshot: 210_000,
	maximumCharactersPerLine: 20_000,
	maximumLinesPerSnapshot: 6_500,
})
const LIMITS = RENDERED_COMPARISON_LIMITS

export class ComparisonProjectionError extends Error {
	constructor(id: string) {
		super(`Comparison range cannot be projected: ${id}`)
		this.name = 'ComparisonProjectionError'
	}
}

export function exceedsRenderedComparisonLimit(before: string, after: string): boolean {
	return [before, after].some((content) => {
		if (content.length > LIMITS.maximumCharactersPerSnapshot) {
			return true
		}
		let lines = content ? 1 : 0
		let lineCharacters = 0
		for (let index = 0; index < content.length; index++) {
			if (content[index] === '\n' || (content[index] === '\r' && content[index + 1] !== '\n')) {
				lines++
				lineCharacters = 0
				if (lines > LIMITS.maximumLinesPerSnapshot) {
					return true
				}
			} else if (content[index] !== '\r' && ++lineCharacters > LIMITS.maximumCharactersPerLine) {
				return true
			}
		}
		return false
	})
}

let pluginId = 0
export function createComparisonDecorationPlugin(descriptors: readonly Descriptor[], side: Side, markerLabel: string, initialState: State = { activeIds: descriptors.map(({ id }) => id), currentIds: [] }) {
	const key = new ProseMirrorPluginKey<PluginState>(`markdown-comparison-${side}-${pluginId++}`)
	const plugin = new Plugin<PluginState>({
		key,
		state: {
			init: (_, state) => createPluginState(state.doc, descriptors, side, initialState, markerLabel),
			apply: (transaction, current) => {
				if (transaction.docChanged) {
					return { activeIds: [], currentIds: [], decorations: DecorationSet.empty, prepared: [] }
				}
				const update = transaction.getMeta(key) as State | undefined
				if (!update) {
					return current
				}
				const selection = normalizeDecorationState(descriptors, update)
				return {
					...selection,
					prepared: current.prepared,
					decorations: buildDecorationSet(transaction.doc, current.prepared, selection, side, markerLabel),
				}
			},
		},
		props: {
			decorations: (state) => key.getState(state)?.decorations ?? DecorationSet.empty,
		},
	})
	return { key, plugin }
}

export function setComparisonDecorationState(editor: Editor, key: ComparisonDecorationKey, state: State) {
	editor.view.dispatch(editor.state.tr.setMeta(key, state))
}

function createPluginState(doc: Node, descriptors: readonly Descriptor[], side: Side, selection: State, markerLabel: string): PluginState {
	const prepared = prepareComparisonDecorations(doc, descriptors, side)
	const normalized = normalizeDecorationState(descriptors, selection)
	return {
		...normalized,
		prepared,
		decorations: buildDecorationSet(doc, prepared, normalized, side, markerLabel),
	}
}

function normalizeDecorationState(descriptors: readonly Descriptor[], state: State): State {
	const known = new Set(descriptors.map(({ id }) => id))
	const activeIds = [...new Set(state.activeIds)].filter((id) => known.has(id))
	const active = new Set(activeIds)
	return {
		activeIds,
		currentIds: [...new Set(state.currentIds)].filter((id) => active.has(id)),
	}
}

export function prepareComparisonDecorations(doc: Node, descriptors: readonly Descriptor[], side: Side) {
	const index = createComparisonDocumentIndex(doc)
	return descriptors.flatMap((descriptor): Prepared[] => {
		const source = descriptor[side]
		if (source.from === source.to) {
			return []
		}
		const from = clamp(source.from, 0, doc.content.size)
		const to = clamp(source.to, 0, doc.content.size)
		if (from >= to) {
			throw new ComparisonProjectionError(descriptor.id)
		}
		const candidates = findComparisonNodes({ from, to }, index.children)
		const parts = descriptor.detail === 'block'
			? projectBlock(descriptor, side, from, to, candidates)
			: projectInline(descriptor, from, to, candidates)
		if (parts.length > 0) {
			return parts
		}
		const fallback = projectionFallback(candidates, descriptor, side, from, to)
		if (!fallback) {
			throw new ComparisonProjectionError(descriptor.id)
		}
		return [{ descriptor, ...fallback, type: 'node' }]
	})
}

function projectBlock(descriptor: Descriptor, side: Side, from: number, to: number, nodes: readonly LocatedNode[]) {
	const topLevel = nodes.filter(({ parent }) => parent === null)
	const covered = topLevel
		.filter((node) => from <= node.from && to >= node.to)
		.map(({ from: nodeFrom, to: nodeTo }) => ({ descriptor, from: nodeFrom, to: nodeTo, type: 'node' as const }))
	if (covered.length > 0) {
		return covered
	}
	const enclosing = nodes
		.filter(({ node, from: nodeFrom, to: nodeTo }) => !node.isText && nodeFrom <= from && nodeTo >= to)
		.toSorted((a, b) => (a.to - a.from) - (b.to - b.from) || b.path.length - a.path.length)[0]
	if (enclosing) {
		return [{ descriptor, from: enclosing.from, to: enclosing.to, type: 'node' as const }]
	}
	const context = descriptor.context[side]
	const exact = context && context.from < context.to
		? nodes.find((node) => node.from === context.from && node.to === context.to)
		: undefined
	return exact ? [{ descriptor, from: exact.from, to: exact.to, type: 'node' as const }] : []
}

function projectInline(descriptor: Descriptor, from: number, to: number, nodes: readonly LocatedNode[]) {
	const parts: Prepared[] = []
	for (const { node, from: position, to: end } of nodes) {
		if (node.isText) {
			const partFrom = Math.max(from, position)
			const partTo = Math.min(to, end)
			if (partFrom < partTo) {
				parts.push({ descriptor, from: partFrom, to: partTo, type: 'inline' })
			}
			continue
		}
		const fullyCovered = from <= position && to >= end
		const edgeChanged = (from <= position && to > position && to <= position + 1)
			|| (from < end && to >= end && from >= end - 1)
		const semanticsChanged = descriptor.facets.some((facet) => facet !== 'text' && facet !== 'formatting')
		if (node.isLeaf || (semanticsChanged && (fullyCovered || edgeChanged))) {
			parts.push({ descriptor, from: position, to: end, type: 'node' })
		}
	}
	return parts
}

function projectionFallback(nodes: readonly LocatedNode[], descriptor: Descriptor, side: Side, from: number, to: number) {
	const context = descriptor.context[side]
	if (context && context.from < context.to) {
		const exact = nodes.find((node) => node.from === context.from && node.to === context.to)
		if (exact) {
			return { from: exact.from, to: exact.to }
		}
	}
	const enclosing = nodes
		.filter(({ node, from: nodeFrom, to: nodeTo }) => !node.isText && nodeFrom <= from && nodeTo >= to)
		.toSorted((a, b) => (a.to - a.from) - (b.to - b.from) || b.path.length - a.path.length)[0]
	return enclosing ? { from: enclosing.from, to: enclosing.to } : null
}

function buildDecorationSet(doc: Node, prepared: readonly Prepared[], state: State, side: Side, markerLabel: string) {
	const active = new Set(state.activeIds)
	const current = new Set(state.currentIds)
	const decorations = prepared.flatMap((item): Decoration[] => {
		if (!active.has(item.descriptor.id)) {
			return []
		}
		const attributes = changeAttributes(item.descriptor, side, current.has(item.descriptor.id), markerLabel)
		return [item.type === 'inline'
			? Decoration.inline(item.from, item.to, attributes)
			: Decoration.node(item.from, item.to, attributes)]
	})
	return DecorationSet.create(doc, decorations)
}

function changeAttributes(descriptor: Descriptor, side: Side, current: boolean, label: string) {
	const pureFormatting = descriptor.facets.length === 1 && descriptor.facets[0] === 'formatting'
	const coarse = descriptor.detail === 'block' && descriptor.operation === 'replace'
	const treatment = coarse
		? 'block'
		: pureFormatting
			? 'formatting'
			: descriptor.operation === 'move'
				? 'move'
				: descriptor.facets.includes('attribute') && !descriptor.facets.includes('text')
					? 'attribute'
					: side === 'before' ? 'removed' : 'added'
	const classes = ['text-comparison-change', `text-comparison-change--${treatment}`]
	if (descriptor.detail === 'block' && !coarse) {
		classes.push('text-comparison-change--block')
	}
	if (current) {
		classes.push('text-comparison-change--current')
	}
	return {
		class: classes.join(' '),
		'data-comparison-change': descriptor.id,
		'aria-label': label,
		...(current ? { 'aria-current': 'true' } : {}),
	}
}
function clamp(value: number, minimum: number, maximum: number) {
	return Math.min(Math.max(value, minimum), maximum)
}
