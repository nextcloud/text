/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { Node } from '@tiptap/pm/model'
import type { Change } from './compare.ts'

import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export type ComparisonSide = 'before' | 'after'

export interface ComparisonDecorationState {
	changes: readonly Change[]
	currentId: string | null
	hideFormatting: boolean
}

export type ComparisonDecorationKey = PluginKey<DecorationSet>

/**
 * Create a plugin that highlights changes on one side of a comparison.
 * The highlighted changes are set with setComparisonDecorations.
 *
 * @param side Which side of the changes this editor shows.
 */
export function createComparisonDecorationPlugin(side: ComparisonSide) {
	const key: ComparisonDecorationKey = new PluginKey(`comparison-${side}`)
	const plugin = new Plugin<DecorationSet>({
		key,
		state: {
			init: () => DecorationSet.empty,
			apply: (transaction, decorations) => {
				const state = transaction.getMeta(key) as ComparisonDecorationState | undefined
				return state
					? buildDecorations(transaction.doc, side, state)
					: decorations.map(transaction.mapping, transaction.doc)
			},
		},
		props: {
			decorations: (state) => key.getState(state),
		},
	})
	return { key, plugin }
}

/**
 * Replace the highlighted changes of an editor.
 *
 * @param editor Editor with the decoration plugin registered.
 * @param key Key returned with the plugin.
 * @param state Changes to show and which one is current.
 */
export function setComparisonDecorations(editor: Editor, key: ComparisonDecorationKey, state: ComparisonDecorationState) {
	editor.view.dispatch(editor.state.tr.setMeta(key, state))
}

function buildDecorations(doc: Node, side: ComparisonSide, { changes, currentId, hideFormatting }: ComparisonDecorationState) {
	const decorations: Decoration[] = []
	for (const change of changes) {
		const { from, to } = change[side]
		if (from === to || (hideFormatting && change.category === 'formatting')) {
			continue
		}
		const classes = ['text-comparison-change', `text-comparison-change--${treatment(change, side)}`]
		if (change.block) {
			classes.push('text-comparison-change--block')
		}
		if (change.id === currentId) {
			classes.push('text-comparison-change--current')
		}
		const attributes = {
			class: classes.join(' '),
			'data-comparison-change': change.id,
		}
		decorations.push(change.block
			? Decoration.node(from, to, attributes)
			: Decoration.inline(from, to, attributes))
	}
	return DecorationSet.create(doc, decorations)
}

function treatment(change: Change, side: ComparisonSide) {
	if (change.category === 'formatting' || change.category === 'attribute') {
		return change.category
	}
	return side === 'before' ? 'removed' : 'added'
}
