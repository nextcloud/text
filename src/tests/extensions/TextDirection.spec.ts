/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Transaction } from '@tiptap/pm/state'

import { Editor } from '@tiptap/core'
import { afterEach, describe, expect, it } from 'vitest'
import RichText from '../../extensions/RichText.ts'
import TextDirection from '../../extensions/TextDirection.ts'
import markdownit from '../../markdownit/index.js'

const directionTypes = [
	'blockquote',
	'callout',
	'detailsSummary',
	'footnote',
	'heading',
	'listItem',
	'paragraph',
	'tableCell',
	'tableHeader',
	'taskItem',
]

const editors: Editor[] = []

afterEach(() => {
	for (const editor of editors.splice(0)) {
		editor.destroy()
	}
})

function createEditor(
	defaultDirection: 'ltr' | 'rtl' | 'auto' | null = null,
	content?: string,
	inferTextDirectionOnParse = true,
) {
	const editor = new Editor({
		content,
		extensions: [
			RichText.configure({
				editing: false,
				extensions: [TextDirection.configure({
					defaultDirection,
					inferTextDirectionOnParse,
					types: directionTypes,
				})],
			}),
		],
	})
	editors.push(editor)
	return editor
}

function captureAppendedTransactions(editor: Editor) {
	const transactions: Transaction[] = []
	editor.on('transaction', ({ appendedTransactions }) => transactions.push(...appendedTransactions))
	return transactions
}

function directionSteps(transactions: readonly Transaction[]) {
	return transactions.flatMap(({ steps }) => steps).filter((step) => {
		const json = step.toJSON() as { attr?: string, attrs?: Record<string, unknown> }
		return json.attr === 'dir' || json.attrs?.dir !== undefined
	})
}

function nodeDirections(editor: Editor, type: string) {
	const directions: Array<string | null> = []
	editor.state.doc.descendants((node) => {
		if (node.type.name === type) {
			directions.push(node.attrs.dir as string | null)
		}
		return true
	})
	return directions
}

describe('TextDirection', () => {
	it('keeps parse-time inference opt-in', () => {
		const editor = createEditor(null, '<p>English</p>', false)
		expect(nodeDirections(editor, 'paragraph')[0]).toBeNull()
	})

	it('infers parsed LTR and RTL content without an appended direction transaction', () => {
		const editor = createEditor()
		const appended = captureAppendedTransactions(editor)
		editor.commands.setContent('<p>English</p><p>العربية</p>')

		expect(nodeDirections(editor, 'paragraph').slice(0, 2)).toEqual(['ltr', 'rtl'])
		expect(directionSteps(appended)).toEqual([])
	})

	it('preserves explicit valid direction before inferred content direction', () => {
		const editor = createEditor()
		editor.commands.setContent([
			'<p dir="rtl">English</p>',
			'<p dir="ltr">العربية</p>',
			'<p dir="auto">English</p>',
			'<p dir="invalid">English</p>',
		].join(''))

		expect(nodeDirections(editor, 'paragraph').slice(0, 4)).toEqual(['rtl', 'ltr', 'auto', 'ltr'])
	})

	it.each([
		[null, [null, null]],
		['rtl', ['rtl', 'rtl']],
	] as const)('uses the %s default for neutral and empty parsed content', (defaultDirection, expected) => {
		const editor = createEditor(defaultDirection, '<p>1234</p><p></p>')
		expect(nodeDirections(editor, 'paragraph').slice(0, 2)).toEqual(expected)
	})

	it('infers direction for every configured nested RichText node', () => {
		const editor = createEditor()
		const markdown = [
			'# Heading',
			'',
			'> Quote',
			'',
			'- List item',
			'',
			'- [ ] Task item',
			'',
			'::: info',
			'Callout',
			':::',
			'',
			'<details>',
			'<summary>Summary</summary>',
			'Details',
			'</details>',
			'',
			'| Header |',
			'|---|',
			'| Cell |',
			'',
			'Reference[^note].',
			'',
			'[^note]: Footnote',
		].join('\n')
		editor.commands.setContent(markdownit.render(markdown))

		for (const type of directionTypes) {
			expect(nodeDirections(editor, type), type).not.toEqual([])
			expect(nodeDirections(editor, type), type).toEqual(expect.arrayContaining(['ltr']))
		}
	})
})
