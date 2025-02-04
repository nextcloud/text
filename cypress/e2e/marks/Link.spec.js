/* eslint-disable no-unused-expressions */
/**
 * @copyright Copyright (c) 2024 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import Markdown from './../../../src/extensions/Markdown.js'
import { Italic, Link } from './../../../src/marks/index.js'
import { createCustomEditor } from './../../support/components.js'
import { loadMarkdown, expectMarkdown } from '../nodes/helpers.js'

describe('Link marks', { retries: 0 }, () => {

	const editor = createCustomEditor({
		content: '',
		extensions: [
			Markdown,
			Link,
			Italic,
		],
	})

	describe('insertOrSetLink command', { retries: 0 }, () => {

		it('is available in commands', () => {
			expect(editor.commands).to.have.property('insertOrSetLink')
		})

		it('can run on normal paragraph', () => {
			prepareEditor('hello\n', 3)
			expect(editor.can().insertOrSetLink()).to.be.ok
		})

		it('will insert a link in a normal paragraph', () => {
			prepareEditor('hello\n', 3)
			editor.commands.insertOrSetLink('https://nextcloud.com', { href: 'https://nextcloud.com' })
			expectMarkdown(editor, 'he\n\n<https://nextcloud.com>\n\nllo')
		})

		it('will change the url and text of an existing link', () => {
			prepareEditor('[https://nextcloud.com/team](https://nextcloud.com/team)\n', 3)
			editor.commands.insertOrSetLink('https://nextcloud.com', { href: 'https://nextcloud.com' })
			expectMarkdown(editor, '<https://nextcloud.com>')
		})

		it('will change the url and keep the text if it is different', () => {
			prepareEditor('[Nextcloud](https://nextcloud.com/team)\n', 3)
			editor.commands.insertOrSetLink('https://nextcloud.com', { href: 'https://nextcloud.com' })
			expectMarkdown(editor, '[Nextcloud](https://nextcloud.com)')
		})

		it('will only change the link in a longer paragraph', () => {
			prepareEditor('Hello https://nextcloud.com/team team\n', 8)
			editor.commands.insertOrSetLink('https://nextcloud.com', { href: 'https://nextcloud.com' })
			expectMarkdown(editor, 'Hello https://nextcloud.com team\n')
		})

		it('will only change the link url in a longer paragraph if the text differs', () => {
			prepareEditor('Hello [Nextcloud](https://nextcloud.com/team) team\n', 8)
			editor.commands.insertOrSetLink('https://nextcloud.com', { href: 'https://nextcloud.com' })
			expectMarkdown(editor, 'Hello [Nextcloud](https://nextcloud.com) team\n')
		})

	})

	/**
	 *  Expect a link in the editor.
	 */
	function expectLink() {
		expect(getParentNode().type.name).to.equal('paragraph')
		expect(getParentNode().attrs.href).to.equal('https://nextcloud.com')
		expect(getMark().attrs.href).to.equal('https://nextcloud.com')
	}

	/**
	 *
	 */
	function getParentNode() {
		const { state: { selection } } = editor
		return selection.$head.parent
	}

	/**
	 *
	 */
	function getMark() {
		const { state: { selection } } = editor
		console.info(selection.$head)
		return selection.$head.nodeAfter.marks[0]
	}

	/**
	 *
	 * @param input
	 */
	function prepareEditor(input, position = 1) {
		loadMarkdown(editor, input)
		editor.commands.setTextSelection( position )
	}

})
