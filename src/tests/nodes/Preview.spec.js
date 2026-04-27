/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getExtensionField } from '@tiptap/core'
import { test as baseTest } from 'vitest'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'
import {
	markdownThroughEditor,
	markdownThroughEditorHtml,
} from '../testHelpers/markdown.js'
import Markdown from './../../extensions/Markdown.js'
import Link from './../../marks/Link.ts'
import Preview from './../../nodes/Preview.js'

const test = baseTest.extend({
	editor: async ({ task: _ }, use) => {
		const editor = createCustomEditor('', [Markdown, Preview, Link])
		await use(editor)
		editor.destroy()
	},
})

describe('Preview extension', () => {
	test('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(Preview, 'toMarkdown', Preview)
		expect(typeof toMarkdown).toEqual('function')
	})

	test('exposes the toMarkdown function in the prosemirror schema', ({
		editor,
	}) => {
		const preview = editor.schema.nodes.preview
		expect(preview.spec.toMarkdown).toBeDefined()
	})

	test('markdown syntax is preserved through editor', () => {
		const markdown = '[link](https://example.org (preview))'
		expect(markdownThroughEditor(markdown)).toBe(markdown)
	})

	test('serializes HTML to markdown', () => {
		const markdown = '[link](https://example.org (preview))'
		const link = '<a href="https://example.org" title="preview">link</a>'
		expect(markdownThroughEditorHtml(link)).toBe(markdown)
	})

	test('detects links', ({ editor }) => {
		const link = '<a href="https://example.org" title="preview">link</a>'
		editor.commands.setContent(`${link}<p>hello></p>`)
		const node = editor.state.doc.content.firstChild
		expect(node.type.name).toBe('preview')
		expect(node.attrs.title).toBe('preview')
		expect(node.attrs.href).toBe('https://example.org')
	})
})

describe('setPreview Tiptap command', () => {
	function findLinkRange(doc) {
		let from = null
		let to = null

		doc.descendants((node, pos) => {
			if (
				from === null
				&& node.isText
				&& node.marks.some((m) => m.type.name === 'link')
			) {
				from = pos
				to = pos + node.nodeSize
			}
		})
		return { from, to }
	}

	test('returns false on plain text', ({ editor }) => {
		editor.commands.setContent('<p>plain text</p>')
		const result = editor.commands.setPreview()
		expect(result).toBe(false)
	})

	test('converts standalone link with cursor at start', ({ editor }) => {
		editor.commands.setContent('<p><a href="https://example.org">link</a></p>')
		const { from } = findLinkRange(editor.state.doc)
		editor.commands.setTextSelection(from)
		editor.commands.setPreview()
		expect(editor.state.doc.childCount).toBe(1)
		expect(editor.state.doc.firstChild.type.name).toBe('preview')
		expect(editor.state.doc.firstChild.attrs.href).toBe('https://example.org')
	})

	test('converts standalone link with cursor at end of link text', ({
		editor,
	}) => {
		editor.commands.setContent('<p><a href="https://example.org">link</a></p>')
		const { to } = findLinkRange(editor.state.doc)
		editor.commands.setTextSelection(to)
		editor.commands.setPreview()
		expect(editor.state.doc.childCount).toBe(1)
		expect(editor.state.doc.firstChild.type.name).toBe('preview')
		expect(editor.state.doc.firstChild.attrs.href).toBe('https://example.org')
	})

	test('splits inline link with text on both sides', ({ editor }) => {
		editor.commands.setContent(
			'<p>before <a href="https://example.org">link</a> after</p>',
		)
		const { to } = findLinkRange(editor.state.doc)
		editor.commands.setTextSelection(to)
		editor.commands.setPreview()
		expect(editor.state.doc.childCount).toBe(3)
		expect(editor.state.doc.child(1).type.name).toBe('preview')
		expect(editor.state.doc.child(1).attrs.href).toBe('https://example.org')
	})

	test('splits inline link with text before only', ({ editor }) => {
		editor.commands.setContent(
			'<p>before <a href="https://example.org">link</a></p>',
		)
		const { to } = findLinkRange(editor.state.doc)
		editor.commands.setTextSelection(to)
		editor.commands.setPreview()
		expect(editor.state.doc.childCount).toBe(2)
		expect(editor.state.doc.child(1).type.name).toBe('preview')
		expect(editor.state.doc.child(1).attrs.href).toBe('https://example.org')
	})

	test('splits inline link with text after only', ({ editor }) => {
		editor.commands.setContent(
			'<p><a href="https://example.org">link</a> after</p>',
		)
		const { to } = findLinkRange(editor.state.doc)
		editor.commands.setTextSelection(to)
		editor.commands.setPreview()
		expect(editor.state.doc.childCount).toBe(2)
		expect(editor.state.doc.firstChild.type.name).toBe('preview')
		expect(editor.state.doc.firstChild.attrs.href).toBe('https://example.org')
	})
})
