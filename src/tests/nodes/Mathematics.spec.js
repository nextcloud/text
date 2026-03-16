/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getExtensionField } from '@tiptap/core'
import { test as baseTest } from 'vitest'
import { createRichEditor } from '../../EditorFactory.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import markdownit from '../../markdownit/index.js'
import { MathBlock, MathInline } from '../../nodes/Mathematics.js'
import { markdownThroughEditor } from '../testHelpers/markdown.js'

const test = baseTest.extend({
	editor: async ({ task: _ }, use) => {
		const editor = createRichEditor()
		await use(editor)
		editor.destroy()
	},
})

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
		test('simple inline formula', () => {
			expect(markdownThroughEditor('$E=mc^2$')).toBe('$E=mc^2$')
		})

		test('inline formula with complex LaTeX', () => {
			expect(markdownThroughEditor('$\\sum_{i=1}^n i$')).toBe(
				'$\\sum_{i=1}^n i$',
			)
		})

		test('inline formula with fractions', () => {
			expect(markdownThroughEditor('$\\frac{a}{b}$')).toBe('$\\frac{a}{b}$')
		})

		test('multiple inline formulas', () => {
			expect(markdownThroughEditor('$a$ and $b$')).toBe('$a$ and $b$')
		})

		test('inline formula in text', () => {
			expect(markdownThroughEditor('The formula $E=mc^2$ is famous.')).toBe(
				'The formula $E=mc^2$ is famous.',
			)
		})
	})

	describe('Markdown roundtrip - Block math', () => {
		test('simple block formula', () => {
			expect(markdownThroughEditor('$$\nE=mc^2\n$$')).toBe('$$\nE=mc^2\n$$')
		})

		test('block formula with complex LaTeX', () => {
			const input = '$$\n\\sum_{i=1}^n i = \\frac{n(n+1)}{2}\n$$'
			expect(markdownThroughEditor(input)).toBe(input)
		})

		test('block formula without newlines', () => {
			// markdown-it-katex accepts this format too
			expect(markdownThroughEditor('$$E=mc^2$$')).toBe('$$\nE=mc^2\n$$')
		})
	})

	describe('Menu commands', () => {
		test('insertMathInline with empty selection', ({ editor }) => {
			// Insert empty inline math
			editor.commands.insertInlineMath({ latex: '' })

			// Inline nodes are inside paragraphs
			const paragraph = editor.state.doc.firstChild
			const mathNode = paragraph.firstChild
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
			const paragraph = editor.state.doc.firstChild
			const mathNode = paragraph.firstChild
			expect(mathNode.type.name).toBe('inlineMath')
			expect(mathNode.attrs.latex).toBe('E=mc^2')
		})

		test('insertMathBlock with empty selection', ({ editor }) => {
			// Insert empty block math
			editor.commands.insertBlockMath({ latex: '' })

			// Should have a blockMath node
			const node = editor.state.doc.firstChild
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
			const node = editor.state.doc.firstChild
			expect(node.type.name).toBe('blockMath')
			expect(node.attrs.latex).toBe('E=mc^2')
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
		test('serializes inline math node', ({ editor }) => {
			editor.commands.insertInlineMath({ latex: 'E=mc^2' })
			editor.commands.insertContent(' some more text.')

			const serializer = createMarkdownSerializer(editor.schema)
			const markdown = serializer.serialize(editor.state.doc)

			expect(markdown).toBe('$E=mc^2$ some more text.')
		})

		test('serializes block math node', ({ editor }) => {
			editor.commands.insertBlockMath({ latex: 'E=mc^2' })

			const serializer = createMarkdownSerializer(editor.schema)
			const markdown = serializer.serialize(editor.state.doc)

			expect(markdown).toBe('$$\nE=mc^2\n$$')
		})
	})
})
