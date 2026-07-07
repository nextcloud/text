/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Document } from '@tiptap/extension-document'
import { describe, expect } from 'vitest'
import Footnotes from '../../nodes/Footnotes.ts'
import testEditor from '../testHelpers/testEditor.ts'

const test = testEditor.override('extensions', [
	Document.extend({ content: 'block+ footnotes?' }),
	Footnotes,
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
