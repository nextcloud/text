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
import Link from './../../marks/Link.js'
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
		const markdown = '[link](https://nextcloud.com (preview))'
		expect(markdownThroughEditor(markdown)).toBe(markdown)
	})

	test('serializes HTML to markdown', () => {
		const markdown = '[link](https://nextcloud.com (preview))'
		const link = '<a href="https://nextcloud.com" title="preview">link</a>'
		expect(markdownThroughEditorHtml(link)).toBe(markdown)
	})

	test('detects links', ({ editor }) => {
		const link = '<a href="https://nextcloud.com" title="preview">link</a>'
		editor.commands.setContent(`${link}<p>hello></p>`)
		const node = editor.state.doc.content.firstChild
		expect(node.type.name).toBe('preview')
		expect(node.attrs.title).toBe('preview')
		expect(node.attrs.href).toBe('https://nextcloud.com')
	})
})
