/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { compareDocuments } from '../../comparison/compare.ts'
import { createComparisonDecorationPlugin, setComparisonDecorations } from '../../comparison/decorations.ts'
import { createComparisonEditor } from '../../comparison/editor.ts'

const before = createComparisonEditor('Hello world\n\nRemoved paragraph\n\nLast')
const after = createComparisonEditor('Hello **world**\n\nLast\n\nAdded paragraph')
const changes = compareDocuments(before.state.doc, after.state.doc)
const beforePlugin = createComparisonDecorationPlugin('before')
const afterPlugin = createComparisonDecorationPlugin('after')

beforeEach(() => {
	before.mount(document.createElement('div'))
	after.mount(document.createElement('div'))
	before.registerPlugin(beforePlugin.plugin)
	after.registerPlugin(afterPlugin.plugin)
})

afterEach(() => {
	before.unregisterPlugin(beforePlugin.key)
	after.unregisterPlugin(afterPlugin.key)
	before.unmount()
	after.unmount()
})

function marked(editor: typeof before) {
	return [...editor.view.dom.querySelectorAll('.text-comparison-change')]
		.map((node) => [node.getAttribute('data-comparison-change'), node.className])
}

describe('comparison decorations', () => {
	it('highlights each side of the changes with its own treatment', () => {
		setComparisonDecorations(before, beforePlugin.key, { changes, currentId: null, hideFormatting: false })
		setComparisonDecorations(after, afterPlugin.key, { changes, currentId: null, hideFormatting: false })

		expect(marked(before)).toEqual([
			['change-0', 'text-comparison-change text-comparison-change--formatting'],
			['change-1', 'text-comparison-change text-comparison-change--removed text-comparison-change--block'],
		])
		expect(marked(after)).toEqual([
			['change-0', 'text-comparison-change text-comparison-change--formatting'],
			['change-2', 'text-comparison-change text-comparison-change--added text-comparison-change--block'],
		])
	})

	it('marks the current change and hides formatting changes on request', () => {
		setComparisonDecorations(after, afterPlugin.key, { changes, currentId: 'change-2', hideFormatting: true })

		expect(marked(after)).toEqual([
			['change-2', 'text-comparison-change text-comparison-change--added text-comparison-change--block text-comparison-change--current'],
		])
	})
})
