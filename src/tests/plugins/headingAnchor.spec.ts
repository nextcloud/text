/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { DecorationSet } from '@tiptap/pm/view'

import { TextSelection } from '@tiptap/pm/state'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Heading from '../../nodes/Heading.js'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

const content = '<h1>First</h1><p>Some text</p><h2>Second</h2>'

describe('headingAnchor plugin', () => {
	let editor: Editor

	beforeEach(() => {
		editor = createCustomEditor(content, [Heading])
	})

	afterEach(() => {
		editor.destroy()
	})

	it('adds an anchor for each heading', () => {
		expect(anchorIds(editor)).toEqual(['h-first', 'h-second'])
	})

	it('keeps decorations on selection change', () => {
		const before = decorations(editor)
		const { tr, doc } = editor.state
		editor.view.dispatch(tr.setSelection(TextSelection.create(doc, 10)))
		expect(decorations(editor)).toBe(before)
	})

	it('maps anchors when editing text outside headings', () => {
		editor.commands.insertContentAt(8, 'More ')
		expect(anchorIds(editor)).toEqual(['h-first', 'h-second'])
		expect(anchorPositions(editor)).toEqual(headingPositions(editor))
	})

	it('updates anchors when a heading changes', () => {
		editor.commands.insertContentAt(1, 'New ')
		expect(anchorIds(editor)).toEqual(['h-new-first', 'h-second'])
		expect(anchorPositions(editor)).toEqual(headingPositions(editor))
	})

	it('keeps the anchor element of unchanged headings', () => {
		const second = editor.view.dom.querySelector('#h-second')
		expect(second).not.toBeNull()
		editor.commands.insertContentAt(1, 'New ')
		expect(editor.view.dom.querySelector('#h-second')).toBe(second)
	})
})

/**
 * @param editor - tiptap editor
 */
function decorations(editor: Editor) {
	return editor.view.someProp('decorations', (f) => f.call(editor.view, editor.state)) as DecorationSet
}

/**
 * @param editor - tiptap editor
 */
function anchorIds(editor: Editor) {
	return decorations(editor).find().map((d) => d.spec.key)
}

/**
 * @param editor - tiptap editor
 */
function anchorPositions(editor: Editor) {
	return decorations(editor).find().map((d) => d.from)
}

/**
 * @param editor - tiptap editor
 */
function headingPositions(editor: Editor) {
	const positions: number[] = []
	editor.state.doc.descendants((node, pos) => {
		if (node.type.name === 'heading') {
			positions.push(pos + 1)
		}
	})
	return positions
}
