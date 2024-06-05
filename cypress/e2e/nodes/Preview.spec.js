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

import Serializer from './../../../src/extensions/Serializer.js'
import Preview from './../../../src/nodes/Preview.js'
import { Italic, Link } from './../../../src/marks/index.js'
import { createCustomEditor } from './../../support/components.js'
import { loadMarkdown, runCommands, expectMarkdown } from './helpers.js'
import { isNodeActive, getMarkAttributes, getNodeAttributes } from '@tiptap/core'

// https://github.com/import-js/eslint-plugin-import/issues/1739
/* eslint-disable-next-line import/no-unresolved */
import testData from '../../fixtures/Preview.md?raw'

describe('Preview extension', { retries: 0 }, () => {

	const editor = createCustomEditor({
		content: '',
		extensions: [
			Serializer,
			Preview,
			Link,
			Italic,
		],
	})

	describe('setPreview command', { retries: 0 }, () => {

		it('is available in commands', () => {
			expect(editor.commands).to.have.property('setPreview')
		})

		it('cannot run on normal paragraph', () => {
			prepareEditor('hello\n')
			expect(editor.can().setPreview()).to.be.false
		})

		it('cannot run on a paragraph with a different mark', () => {
			prepareEditor('*link text*\n')
			expect(editor.can().setPreview()).to.be.false
		})

		it('cannot run on a paragraph with a link without a href', () => {
			prepareEditor('[link text]()\n')
			expect(editor.can().setPreview()).to.be.false
		})

		it('cannot run on a paragraph with an anchor link', () => {
			prepareEditor('[link text](#top)\n')
			expect(editor.can().setPreview()).to.be.false
		})

		it('cannot run on a paragraph with other content', () => {
			prepareEditor('[link text](https://nextcloud.com) hello\n')
			expect(editor.can().setPreview()).to.be.false
		})

		it('convert a paragraph with a link', () => {
			prepareEditor('[link text](https://nextcloud.com)\n')
			editor.commands.setPreview()
			expectPreview()
		})

		it('convert the second a paragraph with a link', () => {
			prepareEditor('hello\n\n[link text](https://nextcloud.com)\n')
			editor.commands.setTextSelection(10)
			editor.commands.setPreview()
			expectPreview()
		})

		it('convert a paragraph with a link and a space', () => {
			prepareEditor('[link text](https://nextcloud.com)\n')
			editor.commands.insertContentAt(
				editor.state.doc.content.size - 1,
				' ',
				{ updateSelection: false },
			)
			editor.commands.setPreview()
			expectPreview()
		})

		it('results in a preview node with the href and text with link mark', () => {
			prepareEditor('[link text](https://nextcloud.com)\n')
			editor.commands.setPreview()
			expectPreview()
		})

		it('cannot run twice', () => {
			prepareEditor('[link text](https://nextcloud.com)\n')
			editor.commands.setPreview()
			expect(editor.can().setPreview()).to.be.false
		})

	})

	describe('unsetPreview command', { retries: 0 }, () => {

		it('is available in commands', () => {
			expect(editor.commands).to.have.property('unsetPreview')
		})

		it('cannot run on normal paragraph', () => {
			prepareEditor('hello\n')
			expect(editor.can().unsetPreview()).to.be.false
		})

		it('can run on the output of setPreview', () => {
			prepareEditor('[link text](https://nextcloud.com)\n')
			editor.commands.setPreview()
			expect(editor.can().unsetPreview()).to.be.true
		})

		it('creates a paragraph', () => {
			prepareEditor('[link text](https://nextcloud.com)\n')
			editor.commands.setPreview()
			editor.commands.unsetPreview()
			expectParagraphWithLink()
		})

	})

	/**
	 *  Expect a preview at the current position.
	 */
	function expectPreview() {
		expect(isNodeActive(editor.state, 'paragraph'))
			.to.be.false
		expect(getNodeAttributes(editor.state, 'preview'))
			.to.include({ href: 'https://nextcloud.com' })
		expect(getMarkAttributes(editor.state, 'link'))
			.to.include({ href: 'https://nextcloud.com' })
	}

	/**
	 *  Expect a paragraph with a link at the current position.
	 */
	function expectParagraphWithLink() {
		expect(isNodeActive(editor.state, 'preview'))
			.to.be.false
		expect(isNodeActive(editor.state, 'paragraph'))
			.to.be.true
		expect(getMarkAttributes(editor.state, 'link'))
			.to.include({ href: 'https://nextcloud.com' })
	}

	/**
	 * Load input and position the cursor inside.
	 * @param { string } input - markdown to load
	 */
	function prepareEditor(input) {
		loadMarkdown(editor, input)
		editor.commands.setTextSelection(2)
	}

})

describe('Markdown tests for Previews in the editor', { retries: 0 }, () => {
	const editor = createCustomEditor({
		content: '',
		extensions: [
			Serializer,
			Preview,
			Link,
		],
	})

	for (const spec of testData.split(/#+\s+/)) {
		const [description, ...rest] = spec.split(/\n/)
		const [input, output] = rest.join('\n').split(/\n\n---\n\n/)
		if (!description) {
			continue
		}
		it(description, () => {
			expect(spec).to.include('\n')
			/* eslint-disable no-unused-expressions */
			expect(input).to.be.ok
			expect(output).to.be.ok
			/* eslint-enable no-unused-expressions */
			loadMarkdown(editor, input)
			runCommands(editor)
			expectMarkdown(editor, output.replace(/\n*$/, ''))
		})
	}
})
