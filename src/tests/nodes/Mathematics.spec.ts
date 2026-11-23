/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'

import { getExtensionField } from '@tiptap/core'
import { describe, expect } from 'vitest'
import markdownit from '../../markdownit/index.ts'
import { MathBlock, MathInline } from '../../nodes/Mathematics.ts'
import testEditor from '../testHelpers/testEditor.ts'

const test = testEditor.override('extensions', [MathBlock, MathInline])

describe('Mathematics nodes', () => {
	describe('Node structure', () => {
		test('MathInline exposes toMarkdown function', () => {
			const toMarkdown = getExtensionField(
				MathInline,
				'toMarkdown',
				MathInline,
			)
			expect(typeof toMarkdown).toEqual('function')
		})

		test('MathBlock exposes toMarkdown function', () => {
			const toMarkdown = getExtensionField(MathBlock, 'toMarkdown', MathBlock)
			expect(typeof toMarkdown).toEqual('function')
		})
	})

	describe('Markdown roundtrip - Inline math', () => {
		test('simple inline formula', ({ markdownThroughEditor }) => {
			expect(markdownThroughEditor('$E=mc^2$')).toBe('$E=mc^2$')
		})

		test('inline formula with complex LaTeX', ({ markdownThroughEditor }) => {
			expect(markdownThroughEditor('$\\sum_{i=1}^n i$')).toBe('$\\sum_{i=1}^n i$')
		})

		test('inline formula with fractions', ({ markdownThroughEditor }) => {
			expect(markdownThroughEditor('$\\frac{a}{b}$')).toBe('$\\frac{a}{b}$')
		})

		test('multiple inline formulas', ({ markdownThroughEditor }) => {
			expect(markdownThroughEditor('$a$ and $b$')).toBe('$a$ and $b$')
		})

		test('inline formula in text', ({ markdownThroughEditor }) => {
			expect(markdownThroughEditor('The formula $E=mc^2$ is famous.')).toBe('The formula $E=mc^2$ is famous.')
		})
	})

	describe('Markdown roundtrip - Block math', () => {
		test('simple block formula', ({ markdownThroughEditor }) => {
			expect(markdownThroughEditor('$$\nE=mc^2\n$$')).toBe('$$\nE=mc^2\n$$')
		})

		test('block formula with complex LaTeX', ({ markdownThroughEditor }) => {
			const input = '$$\n\\sum_{i=1}^n i = \\frac{n(n+1)}{2}\n$$'
			expect(markdownThroughEditor(input)).toBe(input)
		})

		test('block formula without newlines', ({ markdownThroughEditor }) => {
			// markdown-it-katex accepts this format too
			expect(markdownThroughEditor('$$E=mc^2$$')).toBe('$$\nE=mc^2\n$$')
		})
	})

	describe('Menu commands', () => {
		test('insertMathInline with empty selection', ({ editor }) => {
			// Insert empty inline math
			editor.commands.insertInlineMath({ latex: '' })

			// Inline nodes are inside paragraphs
			const paragraph = editor.state.doc.firstChild!
			const mathNode = paragraph.firstChild!
			expect(mathNode.type.name).toBe('inlineMath')
			expect(mathNode.attrs.latex).toBe('')
		})

		test('insertMathInline with selected text', ({ editor }) => {
			// Set content and select it
			editor.commands.setContent('<p>E=mc^2</p>')
			editor.commands.selectAll()

			// Get selected text
			const { from, to } = editor.state.selection
			const latex = editor.state.doc.textBetween(from, to)

			// Insert math - should wrap the selection
			editor.commands.insertInlineMath({ latex })

			// Inline nodes are inside paragraphs
			const paragraph = editor.state.doc.firstChild!
			const mathNode = paragraph.firstChild!
			expect(mathNode.type.name).toBe('inlineMath')
			expect(mathNode.attrs.latex).toBe('E=mc^2')
		})

		test('insertMathBlock with empty selection', ({ editor }) => {
			// Insert empty block math
			editor.commands.insertBlockMath({ latex: '' })

			// Should have a blockMath node
			const node = editor.state.doc.firstChild!
			expect(node.type.name).toBe('blockMath')
			expect(node.attrs.latex).toBe('')
		})

		test('insertMathBlock with selected text', ({ editor }) => {
			// Set content and select it
			editor.commands.setContent('<p>E=mc^2</p>')
			editor.commands.selectAll()

			// Get selected text
			const { from, to } = editor.state.selection
			const latex = editor.state.doc.textBetween(from, to)

			// Insert math - should wrap the selection
			editor.commands.insertBlockMath({ latex })

			// Should have a blockMath node with the selected text
			const node = editor.state.doc.firstChild!
			expect(node.type.name).toBe('blockMath')
			expect(node.attrs.latex).toBe('E=mc^2')
		})
	})

	describe('Input rules', () => {
		/**
		 * Type text at the cursor the way ProseMirror input rules see it.
		 *
		 * @param editor the editor to type into
		 * @param text text to type
		 */
		function type(editor: Editor, text: string) {
			for (const char of text) {
				const { from, to } = editor.state.selection
				const insert = () => editor.state.tr.insertText(char, from, to)
				const handled = editor.view.someProp('handleTextInput', (f) => f(editor.view, from, to, char, insert))
				if (!handled) {
					editor.view.dispatch(insert())
				}
			}
		}

		test('$$...$$ inside text becomes inline math', ({ editor }) => {
			editor.commands.setContent('<p>a </p>')
			editor.commands.setTextSelection(3)
			type(editor, '$$x_1$$')
			const paragraph = editor.state.doc.firstChild!
			expect(paragraph.lastChild!.type.name).toBe('inlineMath')
			expect(paragraph.lastChild!.attrs.latex).toBe('x_1')
			expect(paragraph.textContent).toBe('a ')
		})

		test('$$$...$$$ on its own line becomes block math', ({ editor }) => {
			editor.commands.setContent('<p></p>')
			type(editor, '$$$y^2$$$')
			const node = editor.state.doc.firstChild!
			expect(node.type.name).toBe('blockMath')
			expect(node.attrs.latex).toBe('y^2')
		})
	})

	describe('Markdown-it rendering', () => {
		test('renders inline math to HTML span element', () => {
			const rendered = markdownit.render('$E=mc^2$')
			expect(rendered).toContain('span')
			expect(rendered).toContain('inline-math')
			expect(rendered).toContain('E=mc^2')
		})

		test('renders block math to HTML div element', () => {
			const rendered = markdownit.render('$$\nE=mc^2\n$$')
			expect(rendered).toContain('div')
			expect(rendered).toContain('block-math')
			expect(rendered).toContain('E=mc^2')
		})
	})

	describe('Serialization to markdown', () => {
		test('serializes inline math node', ({ editor, serializeMarkdown }) => {
			editor.commands.insertInlineMath({ latex: 'E=mc^2' })
			editor.commands.insertContent(' some more text.')
			expect(serializeMarkdown()).toBe('$E=mc^2$ some more text.')
		})

		test('serializes block math node', ({ editor, serializeMarkdown }) => {
			editor.commands.insertBlockMath({ latex: 'E=mc^2' })
			expect(serializeMarkdown()).toBe('$$\nE=mc^2\n$$')
		})
	})
})
