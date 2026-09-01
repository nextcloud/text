/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonDescriptor } from '../../comparison/markdownComparisonTypes.ts'

import { EditorState } from '@tiptap/pm/state'
import { schema } from 'prosemirror-schema-basic'
import { describe, expect, it } from 'vitest'
import { createComparisonDocumentIndex } from '../../comparison/comparisonDocumentIndex.ts'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'
import {
	ComparisonProjectionError,
	createComparisonDecorationPlugin,
	prepareComparisonDecorations,
} from '../../comparison/markdownComparison.ts'

function descriptor(id: string, before: { from: number, to: number }, after = before): ComparisonDescriptor {
	return {
		id,
		operation: 'replace',
		detail: 'inline',
		facets: ['text'],
		before,
		after,
		context: { before: null, after: null },
		preview: { before: null, after: null },
		signals: [],
	}
}

const doc = schema.node('doc', null, [schema.node('paragraph', null, schema.text('hello'))])

describe('comparison decorations', () => {
	it('does not infer a current descriptor without edit-owned selection', () => {
		const change = descriptor('text', { from: 1, to: 4 })
		const { key, plugin } = createComparisonDecorationPlugin([change], 'before', 'Changed')
		const state = EditorState.create({ doc, plugins: [plugin] })
		expect(key.getState(state)).toMatchObject({ activeIds: ['text'], currentIds: [] })
	})

	it('V04 projects non-empty ranges without creating any marker for a zero-length side', () => {
		expect(prepareComparisonDecorations(doc, [descriptor('empty', { from: 2, to: 2 })], 'before')).toEqual([])
		const projected = prepareComparisonDecorations(doc, [descriptor('text', { from: 1, to: 4 })], 'before')
		expect(projected).toEqual([expect.objectContaining({ from: 1, to: 4, type: 'inline' })])
	})

	it('fails the complete projection when a non-empty range cannot be represented', () => {
		const invalid = descriptor('invalid', { from: 99, to: 100 })
		expect(() => prepareComparisonDecorations(doc, [invalid], 'before')).toThrow(ComparisonProjectionError)
	})

	it('AUD-04 decorates the enclosing list for a coarse nested-list range', () => {
		const editor = createComparisonEditor('- outer\n  - first\n  - second')
		try {
			const index = createComparisonDocumentIndex(editor.state.doc)
			const outerList = index.children[0]!
			const nestedList = outerList.children[0]!.children[1]!
			const firstItem = nestedList.children[0]!
			const lastItem = nestedList.children.at(-1)!
			const change = descriptor('nested-list', { from: firstItem.from, to: lastItem.to })
			change.detail = 'block'
			change.context.before = {
				code: 'list-item',
				path: firstItem.path,
				from: firstItem.from,
				to: firstItem.to,
			}

			expect(prepareComparisonDecorations(editor.state.doc, [change], 'before')).toEqual([
				expect.objectContaining({ from: nestedList.from, to: nestedList.to, type: 'node' }),
			])
		} finally {
			editor.destroy()
		}
	})

	it('invalidates prepared immutable decorations after a document transaction', () => {
		const change = descriptor('text', { from: 1, to: 4 })
		const { key, plugin } = createComparisonDecorationPlugin([change], 'before', 'Changed', {
			activeIds: ['text'],
			currentIds: ['text'],
		})
		const state = EditorState.create({ doc, plugins: [plugin] })
		expect(key.getState(state)?.prepared).toHaveLength(1)
		const changed = state.apply(state.tr.insertText('!', 1))
		expect(key.getState(changed)).toMatchObject({ activeIds: [], currentIds: [], prepared: [] })
	})
})
