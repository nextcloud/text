/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'

import { Document } from '@tiptap/extension-document'
import { ListItem } from '@tiptap/extension-list'
import { describe, expect } from 'vitest'
import KeepSyntax from '../../extensions/KeepSyntax.js'
import BulletList from '../../nodes/BulletList.ts'
import Footnotes from '../../nodes/Footnotes.ts'
import testEditor from '../testHelpers/testEditor.ts'

const test = testEditor.override('extensions', [
	Document.extend({ content: 'block+ footnotes?' }),
	Footnotes,
	BulletList,
	KeepSyntax,
	ListItem,
])

describe('Footnotes extension', () => {
	test('registers footnotes, footnote and footnoteReference nodes', ({ editor }) => {
		expect(editor.schema.nodes.footnote).toBeDefined()
		expect(editor.schema.nodes.footnotes).toBeDefined()
		expect(editor.schema.nodes.footnoteReference).toBeDefined()
	})

	test('parses footnote reference with custom label from HTML', ({ editor }) => {
		editor.commands
			.setContent('<p>Foo<sup data-type="footnote-reference" data-reference-id="label"></sup></p>'
				+ '<section data-type="footnotes">'
				+ '<div data-type="footnote" data-reference-id="label"><p>Footnote</p></div>'
				+ '</section>')

		const ref = editor.state.doc.firstChild!.child(1)
		const footnotes = editor.state.doc.lastChild!
		const footnote = footnotes.firstChild!

		expect(ref.type.name).toBe('footnoteReference')
		expect(ref.attrs.referenceId).toBe('label')
		expect(footnotes.type.name).toBe('footnotes')
		expect(footnote.type.name).toBe('footnote')
		expect(footnote.attrs.referenceId).toBe('label')
	})

	test('preserves data attributes across HTML round-trip', ({ editor }) => {
		editor.commands.setContent('<p>Foo<sup data-type="footnote-reference" data-reference-id="label"></sup></p>'
			+ '<section data-type="footnotes">'
			+ '<div data-type="footnote" data-reference-id="label"><p>Footnote</p></div>'
			+ '</section>')
		const out = editor.getHTML()
		expect(out).toContain('data-type="footnote-reference"')
		expect(out).toContain('data-reference-id="label"')
		expect(out).toContain('data-type="footnotes"')
		expect(out).toContain('data-type="footnote"')
		expect(out).toContain('id="fnref-label"')
		expect(out).toContain('id="fn-label"')
	})

	test('parses multi-paragraph footnote body', ({ editor }) => {
		editor.commands.setContent('<p>Foo<sup data-type="footnote-reference" data-reference-id="1"></sup></p>'
			+ '<section data-type="footnotes">'
			+ '<div data-type="footnote" data-reference-id="1"><p>first</p><p>second</p></div>'
			+ '</section>')
		const footnote = editor.state.doc.lastChild!.firstChild!
		expect(footnote.type.name).toBe('footnote')
		expect(footnote.childCount).toBe(2)
		expect(footnote.firstChild!.textContent).toBe('first')
		expect(footnote.lastChild!.textContent).toBe('second')
	})
})

describe('insertFootnote command', () => {
	test('inserts a reference and a matching definition', ({ editor }) => {
		editor.commands.setContent('<p>Foo</p>')
		editor.commands.focus('end')

		const result = editor.commands.insertFootnote()
		expect(result).toBe(true)

		const paragraph = editor.state.doc.firstChild!
		expect(paragraph.childCount).toBe(2)
		expect(paragraph.child(1).type.name).toBe('footnoteReference')

		const footnotes = editor.state.doc.lastChild!
		const footnote = footnotes.firstChild!
		expect(footnote.type.name).toBe('footnote')
	})

	test('generates the lowest unused numeric id', ({ editor }) => {
		editor.commands.setContent('<p>Foo<sup data-type="footnote-reference" data-reference-id="1"></sup></p>'
			+ '<section> data-type="footnotes">'
			+ '<div data-type="footnote" data-reference-id="1"><p>x</p></div>'
			+ '</section>')
		editor.commands.focus('start')
		editor.commands.setTextSelection(1)
		editor.commands.insertFootnote()

		const refs: string[] = []
		editor.state.doc.descendants((node) => {
			if (node.type.name === 'footnoteReference') {
				refs.push(node.attrs.referenceId)
			}
		})
		expect(refs).toContain('1')
		expect(refs).toContain('2')
	})

	test('accepts explicit referenceId option', ({ editor }) => {
		editor.commands.setContent('<p>Foo</p>')
		editor.commands.focus('end')
		editor.commands.insertFootnote({ referenceId: 'custom' })

		const ref = editor.state.doc.firstChild!.lastChild!
		expect(ref.attrs.referenceId).toBe('custom')

		const footnote = editor.state.doc.lastChild!.firstChild!
		expect(footnote.attrs.referenceId).toBe('custom')
	})
})

describe('Footnotes cleanup', () => {
	function deleteFirstReference(editor: Editor) {
		// Delete reference node
		let refPos = -1
		let refSize = 0
		editor.state.doc.descendants((node, pos) => {
			if (refPos !== -1) {
				return false
			}
			if (node.type.name === 'footnoteReference') {
				refPos = pos
				refSize = node.nodeSize
				return false
			}
		})
		editor.commands.setTextSelection({ from: refPos, to: refPos + refSize })
		editor.commands.deleteSelection()
	}

	function getFootnoteNodesCount(editor: Editor): { footnoteCount: number, footnotesContainerCount: number } {
		let footnoteCount = 0
		let footnotesContainerCount = 0
		editor.state.doc.descendants((n) => {
			if (n.type.name === 'footnote') {
				footnoteCount++
			}
			if (n.type.name === 'footnotes') {
				footnotesContainerCount++
			}
		})
		return { footnoteCount, footnotesContainerCount }
	}

	test('removes footnotes when last reference is deleted', ({ editor }) => {
		editor.commands.setContent('<p>Foo<sup data-type="footnote-reference" data-reference-id="1"></sup></p>'
			+ '<section> data-type="footnotes">'
			+ '<div data-type="footnote" data-reference-id="1"><p>x</p></div>'
			+ '</section>')
		deleteFirstReference(editor)

		// Verify no footnote // footnotesContainer node exists
		const { footnoteCount, footnotesContainerCount } = getFootnoteNodesCount(editor)
		expect(footnotesContainerCount).toBe(0)
		expect(footnoteCount).toBe(0)
	})

	test('keeps footnote when other references still point to it', ({ editor }) => {
		editor.commands.setContent('<p>Foo<sup data-type="footnote-reference" data-reference-id="1"></sup>'
			+ ' bar<sup data-type="footnote-reference" data-reference-id="1"></sup></p>'
			+ '<section> data-type="footnotes">'
			+ '<div data-type="footnote" data-reference-id="1"><p>x</p></div>'
			+ '</section>')
		deleteFirstReference(editor)

		const { footnoteCount, footnotesContainerCount } = getFootnoteNodesCount(editor)
		expect(footnotesContainerCount).toBe(1)
		expect(footnoteCount).toBe(1)
	})
})

describe('Footnotes Markdown roundtrip', () => {
	test('simple footnote', ({ markdownThroughEditor }) => {
		const test = 'Foo[^1]\n\n[^1]: bar'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('footnote with custom numeric label', ({ markdownThroughEditor }) => {
		const test = 'Foo[^42]\n\n[^42]: bar'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('footnote with custom string label', ({ markdownThroughEditor }) => {
		const test = 'Foo[^label]\n\n[^label]: bar'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('multi-line footnote', ({ markdownThroughEditor }) => {
		const test = 'Foo[^1]\n\n[^1]: first\n      second'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('multi-paragraph footnote with list item', ({ markdownThroughEditor }) => {
		const test = 'Foo[^1]\n\n[^1]: first\n\n      * item'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('multiple footnotes', ({ markdownThroughEditor }) => {
		const test = 'Foo[^1] bar[^2]\n\n[^1]: first\n\n[^2]: second'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('multiple references to same label', ({ markdownThroughEditor }) => {
		const test = 'Foo[^x] bar[^x]\n\n[^x]: label'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('dangling reference', ({ markdownThroughEditor }) => {
		const test = 'Foo[^dangling]'
		expect(markdownThroughEditor(test)).toBe(test)
	})
})
