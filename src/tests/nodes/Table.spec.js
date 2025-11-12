/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as baseTest } from 'vitest'
import { createRichEditor } from '../../EditorFactory.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'

import markdownit from '../../markdownit/index.js'

// Eslint does not know about ?raw suffix it seems.
/* eslint-disable import/no-unresolved */
import output from '../fixtures/tables/basic/table.html?raw'
import input from '../fixtures/tables/basic/table.md?raw'
import otherStructure from '../fixtures/tables/basic/table.structure.html?raw'
import handbook from '../fixtures/tables/handbook/handbook.html?raw'
import handbookOut from '../fixtures/tables/handbook/handbook.out.html?raw'
/* eslint-enable import/no-unresolved */

import {
	br,
	expectDocument,
	table,
	td,
	th,
	thead,
	tr,
} from '../testHelpers/builders.js'

const test = baseTest.extend({
	editor: async ({ task: _ }, use) => {
		const editor = createRichEditor()
		await use(editor)
		editor.destroy()
	},
})

describe('Table', () => {
	test('Markdown-IT renders tables', () => {
		const rendered = markdownit.render(input)
		expect(rendered).toBe(output)
	})

	test('Load into editor', ({ editor }) => {
		editor.commands.setContent(markdownit.render(input))

		expectDocument(
			editor.state.doc,
			table(
				thead(
					th({ dir: 'ltr', textAlign: 'center' }, 'heading'),
					th({ dir: 'ltr', textAlign: 'right' }, 'heading 2'),
					th({ dir: 'ltr' }, 'heading 3'),
				),
				tr(
					td({ dir: 'ltr', textAlign: 'center' }, 'center'),
					td({ dir: 'ltr', textAlign: 'right' }, 'right'),
					td(
						{ dir: 'ltr' },
						'left cell ',
						br({ syntax: 'html' }),
						'with line break',
					),
				),
			),
		)
	})

	test('load html table with other structure', ({ editor }) => {
		editor.commands.setContent(otherStructure.replace(/\n\s*/g, ''))

		expectDocument(
			editor.state.doc,
			table(
				thead(
					th({ dir: 'ltr', textAlign: 'center' }, 'heading'),
					th({ dir: 'ltr', textAlign: 'right' }, 'heading 2'),
					th({ dir: 'ltr' }, 'heading 3'),
				),
				tr(
					td({ dir: 'ltr', textAlign: 'center' }, 'center'),
					td({ dir: 'ltr', textAlign: 'right' }, 'right'),
					td(
						{ dir: 'ltr' },
						'left cell ',
						br({ syntax: '  ' }),
						'with line break',
					),
				),
			),
		)
	})

	test('handle html table from handbook', ({ editor }) => {
		editor.commands.setContent(handbook.replace(/\n\s*/g, ''))
		expect(formatHTML(editor.getHTML())).toBe(formatHTML(handbookOut))
	})

	test('serialize from editor', ({ editor }) => {
		editor.commands.setContent(markdownit.render(input))
		const serializer = createMarkdownSerializer(editor.schema)

		expect(serializer.serialize(editor.state.doc)).toBe(input)
	})

	test('serialize from editor without thead and tbody', ({ editor }) => {
		const markdownitHtml = output.replaceAll(/<\/?t(head|body)>\n/g, '')
		editor.commands.setContent(markdownitHtml)
		const serializer = createMarkdownSerializer(editor.schema)

		expect(serializer.serialize(editor.state.doc)).toBe(input)
	})

	test('parse from HTML: only one row always regarded as header row (required in markdown tables)', ({
		editor,
	}) => {
		const editorHtml =
			'<div class="table-wrapper" style="overflow-x: auto;"><table><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></table></div><p></p>'
		const tables = [
			'<table><thead><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></thead></table>',
			'<table><thead><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr></thead></table>',
			'<table><tbody><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></tbody></table>',
			'<table><tbody><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr></tbody></table>',
			'<table><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></table>',
			'<table><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr></table>',
		]
		for (const tableHtml of tables) {
			editor.commands.setContent(tableHtml)
			expect(editor.getHTML()).toBe(editorHtml)
		}
	})

	// Make sure
	test('parse from HTML: first row is header, second is body row with several thead/tbody and th/td combinations', ({
		editor,
	}) => {
		const editorHtml =
			'<div class="table-wrapper" style="overflow-x: auto;"><table><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr><tr><td dir="ltr">a</td><td dir="ltr">b</td></tr></table></div><p></p>'
		const tables = [
			'<table><thead><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>',
			'<table><thead><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr></thead><tbody><tr><td>a</td><td>b</td></tr></tbody></table>',
			'<table><thead><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></thead><tr><td>a</td><td>b</td></tr></table>',
			'<table><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr><tr><td>a</td><td>b</td></tr></table>',
			'<table><thead><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr><tr><td>a</td><td>b</td></tr></thead></table>',
			'<table><thead><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr><tr><td>a</td><td>b</td></tr></thead></table>',
			'<table><tbody><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr><tr><td>a</td><td>b</td></tr></tbody></table>',
			'<table><tbody><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr><tr><td>a</td><td>b</td></tr></tbody></table>',
			'<table><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr><tr><td>a</td><td>b</td></tr></table>',
		]
		for (const tableHtml of tables) {
			editor.commands.setContent(tableHtml)
			expect(editor.getHTML()).toBe(editorHtml)
		}
	})
})

const formatHTML = (html) => {
	return html.replaceAll('><', '>\n<').replace(/\n$/, '')
}
