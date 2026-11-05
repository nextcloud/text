/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { GapCursor } from '@tiptap/pm/gapcursor'
import { describe, expect } from 'vitest'
import RichText from '../../extensions/RichText.ts'
import markdownit from '../../markdownit/index.ts'
import testEditor from '../testHelpers/testEditor.ts'

// Same extension order as the real editor, so the gap cursor keymap runs
// before the table keymap.
const test = testEditor.extend({
	allExtensions: [RichText.configure({ editing: true })],
})

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
})
