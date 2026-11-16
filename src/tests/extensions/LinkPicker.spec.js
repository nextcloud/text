/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { CodeBlock } from '@tiptap/extension-code-block'
import { TextSelection } from '@tiptap/pm/state'
import { exitSuggestion } from '@tiptap/suggestion'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import LinkPicker, { LinkPickerPluginKey } from '../../extensions/LinkPicker.js'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

describe('LinkPicker extension', () => {
	let editor
	let suggestionProps

	const pickerState = () => LinkPickerPluginKey.getState(editor.state)
	const queryDecorations = () => [...editor.view.dom.querySelectorAll('.suggestion-query')]
		.map((el) => el.textContent)
	const pickInsertAction = async (content) => {
		await vi.waitFor(() => expect(suggestionProps).toBeDefined())
		suggestionProps.command({ action: (chain) => chain.insertContent(content) })
	}

	beforeEach(() => {
		suggestionProps = undefined
		const render = () => ({
			onStart: (props) => { suggestionProps = props },
			onUpdate: (props) => { suggestionProps = props },
		})
		editor = createCustomEditor('<p>Hello world</p>', [
			CodeBlock,
			LinkPicker.configure({
				suggestion: { items: () => [], render },
			}),
		])
	})

	afterEach(() => {
		editor.destroy()
	})

	describe('typing the trigger character', () => {
		it('opens after whitespace', () => {
			editor.chain().setTextSelection(7).insertContent('/').run()
			expect(pickerState()).toMatchObject({ active: true, range: { from: 7, to: 8 } })
		})

		it('does not open within a word', () => {
			editor.chain().setTextSelection(4).insertContent('/').run()
			expect(pickerState().active).toBe(false)
		})
	})

	describe('openLinkPicker command', () => {
		it('inserts the trigger character and opens within a word', () => {
			editor.chain().setTextSelection(4).openLinkPicker().run()
			expect(editor.state.doc.textContent).toBe('Hel/lo world')
			expect(editor.state.selection.from).toBe(5)
			expect(pickerState()).toMatchObject({
				active: true,
				range: { from: 4, to: 5 },
				query: '',
				text: '/',
			})
		})

		it('uses text typed after the trigger character as query', () => {
			editor.chain().setTextSelection(4).openLinkPicker().run()
			editor.commands.insertContent('ab')
			expect(pickerState()).toMatchObject({
				active: true,
				range: { from: 4, to: 7 },
				query: 'ab',
			})
		})

		it('styles the query while open', () => {
			editor.chain().setTextSelection(4).openLinkPicker().run()
			editor.commands.insertContent('ab')
			expect(queryDecorations()).toEqual(['/ab'])
		})

		it('inserts the trigger character after selected text', () => {
			editor.chain().setTextSelection({ from: 1, to: 6 }).openLinkPicker().run()
			expect(editor.state.doc.textContent).toBe('Hello/ world')
			expect(pickerState()).toMatchObject({ active: true, range: { from: 6, to: 7 } })
		})

		it('replaces the trigger character and query with the picked entry', async () => {
			editor.chain().setTextSelection({ from: 1, to: 6 }).openLinkPicker().run()
			editor.commands.insertContent('ab')
			await pickInsertAction('X')
			expect(editor.state.doc.textContent).toBe('HelloX world')
			expect(pickerState().active).toBe(false)
		})

		it('does not open in a code block', () => {
			editor.commands.setContent('<pre><code>code</code></pre>')
			expect(editor.chain().setTextSelection(3).openLinkPicker().run()).toBe(false)
			expect(editor.state.doc.textContent).toBe('code')
		})

		it('does not open in a non-editable editor', () => {
			editor.setEditable(false)
			editor.chain().setTextSelection(4).openLinkPicker().run()
			expect(pickerState().active).toBe(false)
		})
	})

	describe('closing', () => {
		beforeEach(() => {
			editor.chain().setTextSelection(4).openLinkPicker().run()
		})

		it('closes on whitespace', () => {
			editor.commands.insertContent(' ')
			expect(pickerState().active).toBe(false)
		})

		it('closes when the cursor moves before the trigger character', () => {
			editor.commands.setTextSelection(4)
			expect(pickerState().active).toBe(false)
		})

		it('closes when the trigger character is deleted', () => {
			editor.commands.deleteRange({ from: 4, to: 5 })
			expect(pickerState().active).toBe(false)
		})

		it('keeps the text and removes the styling on exit', () => {
			editor.commands.insertContent('ab')
			exitSuggestion(editor.view, LinkPickerPluginKey)
			expect(pickerState().active).toBe(false)
			expect(editor.state.doc.textContent).toBe('Hel/ablo world')
			expect(queryDecorations()).toEqual([])
		})
	})

	it('does not reopen a dismissed trigger character after whitespace', () => {
		editor.chain().setTextSelection(7).openLinkPicker().run()
		exitSuggestion(editor.view, LinkPickerPluginKey)
		editor.commands.insertContent('a')
		expect(pickerState().active).toBe(false)
	})

	it('keeps the query when the whole document is replaced', () => {
		editor.chain().setTextSelection(4).openLinkPicker().run()
		editor.commands.insertContent('ab')
		const { tr } = editor.state
		tr.replaceWith(0, tr.doc.content.size, editor.state.doc.content)
		tr.setSelection(TextSelection.create(tr.doc, 7))
		editor.view.dispatch(tr)
		expect(pickerState()).toMatchObject({
			active: true,
			range: { from: 4, to: 7 },
			query: 'ab',
		})
	})
})
