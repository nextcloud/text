/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'

import { GapCursor } from '@tiptap/pm/gapcursor'
import { TextSelection } from '@tiptap/pm/state'
import { describe, expect } from 'vitest'
import RichText from '../../extensions/RichText.ts'
import markdownit from '../../markdownit/index.ts'
import testEditor from '../testHelpers/testEditor.ts'

// Same extension order as the real editor, so the gap cursor keymap runs
// before the table keymap.
const test = testEditor.extend({
	allExtensions: [RichText.configure({ editing: true })],
})

function pressKey(editor: Editor, key: string) {
	const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
	editor.view.dom.dispatchEvent(event)
}

describe('gap cursor between block nodes', () => {
	test('is offered between two consecutive tables', ({ editor }) => {
		editor.commands.setContent(markdownit.render('| a |\n|---|\n| 1 |\n\n| b |\n|---|\n| 2 |\n'))
		const { doc } = editor.state
		const between = doc.child(0).nodeSize
		expect(doc.child(1).type.name).toBe('table')
		// end of  the text in the last cell of the first table
		editor.commands.setTextSelection(between - 4)
		expect(editor.state.selection.$from.parent.textContent).toBe('1')
		const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })
		editor.view.dom.dispatchEvent(event)
		expect(event.defaultPrevented).toBe(true)
		expect(editor.state.selection).toBeInstanceOf(GapCursor)
		expect(editor.state.selection.from).toBe(between)
	})

	test('is not offered after the last footnote', ({ editor }) => {
		editor.commands.setContent(markdownit.render('Text[^1]\n\n[^1]: Note\n'))
		// end of the text in the footnote
		const end = editor.state.doc.content.size - 3
		editor.commands.setTextSelection(end)
		expect(editor.state.selection.$from.parent.textContent).toBe('Note')
		pressKey(editor, 'ArrowRight')
		expect(editor.state.selection).toBeInstanceOf(TextSelection)
		expect(editor.state.selection.head).toBe(end)
	})

	test('moves a gap cursor after the footnotes into the last footnote', ({ editor }) => {
		editor.commands.setContent(markdownit.render('Text[^1]\n\n[^1]: Note\n'))
		const { doc } = editor.state
		editor.view.dispatch(editor.state.tr.setSelection(new GapCursor(doc.resolve(doc.content.size))))
		expect(editor.state.selection).toBeInstanceOf(TextSelection)
		expect(editor.state.selection.$head.parent.textContent).toBe('Note')
	})

	test('is offered between the last block and the footnotes', ({ editor }) => {
		editor.commands.setContent(markdownit.render('Text[^1]\n\n| a |\n|---|\n| 1 |\n\n[^1]: Note\n'))
		const { doc } = editor.state
		const between = doc.content.size - doc.lastChild!.nodeSize
		// end of the text in the last cell of the table
		editor.commands.setTextSelection(between - 4)
		expect(editor.state.selection.$from.parent.textContent).toBe('1')
		pressKey(editor, 'ArrowRight')
		expect(editor.state.selection).toBeInstanceOf(GapCursor)
		expect(editor.state.selection.from).toBe(between)
	})

	test('is skipped between comments and footnotes', ({ editor }) => {
		editor.commands.setContent('<p>Text'
			+ '<sup data-type="comment-reference" data-reference-id="comment-1"></sup>'
			+ '<sup data-type="footnote-reference" data-reference-id="1"></sup></p>'
			+ '<section data-type="comments"><div data-type="comment" data-reference-id="comment-1">'
			+ '<div data-type="comment-item" data-author="jane"><p>Comment</p></div>'
			+ '</div></section>'
			+ '<section data-type="footnotes"><div data-type="footnote" data-reference-id="1">'
			+ '<p>Note</p>'
			+ '</div></section>')
		const { doc } = editor.state
		const between = doc.content.size - doc.lastChild!.nodeSize
		expect(doc.childBefore(between).node!.type.name).toBe('comments')
		// end of the text in the comment
		editor.commands.setTextSelection(between - 4)
		expect(editor.state.selection.$from.parent.textContent).toBe('Comment')
		pressKey(editor, 'ArrowRight')
		expect(editor.state.selection).toBeInstanceOf(TextSelection)
		expect(editor.state.selection.$head.parent.textContent).toBe('Note')
		pressKey(editor, 'ArrowLeft')
		expect(editor.state.selection).toBeInstanceOf(TextSelection)
		expect(editor.state.selection.$head.parent.textContent).toBe('Comment')
	})
})
