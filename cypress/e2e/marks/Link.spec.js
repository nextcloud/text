/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expectMarkdown, loadMarkdown } from '../nodes/helpers.js'
import Markdown from './../../../src/extensions/Markdown.js'
import { Italic, Link } from './../../../src/marks/index.js'
import { createCustomEditor } from './../../support/components.js'

describe('Link marks', { retries: 0 }, () => {
	const editor = createCustomEditor({
		content: '',
		extensions: [Markdown, Link, Italic],
	})

	describe('insertOrSetLink command', { retries: 0 }, () => {
		it('is available in commands', () => {
			expect(editor.commands).to.have.property('insertOrSetLink')
		})

		it('can run on normal paragraph', () => {
			prepareEditor('hello\n', 3)
			expect(editor.can().insertOrSetLink().run()).to.equal(true)
		})

		it('will insert a link in a normal paragraph', () => {
			prepareEditor('hello\n', 3)
			editor.commands.insertOrSetLink('https://nextcloud.com', {
				href: 'https://nextcloud.com',
			})
			expectMarkdown(editor, 'he\n\n<https://nextcloud.com>\n\nllo')
		})
	})

	/**
	 *
	 * @param {*} input markdown content
	 * @param {*} position cursor pos
	 */
	function prepareEditor(input, position = 1) {
		loadMarkdown(editor, input)
		editor.commands.setTextSelection(position)
	}
})
