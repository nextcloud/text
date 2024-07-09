/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/* eslint-disable no-unused-expressions */

import Markdown from './../../../src/extensions/Markdown.js'
import Preview from './../../../src/nodes/Preview.js'
import { Italic, Link } from './../../../src/marks/index.js'
import { createCustomEditor } from './../../support/components.js'
import { loadMarkdown, runCommands, expectMarkdown } from './helpers.js'

// https://github.com/import-js/eslint-plugin-import/issues/1739
/* eslint-disable-next-line import/no-unresolved */
import testData from '../../fixtures/Preview.md?raw'

describe('Preview extension', { retries: 0 }, () => {

	const editor = createCustomEditor({
		content: '',
		extensions: [
			Markdown,
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
			expect(getParentNode().type.name).to.equal('paragraph')
		})

		it('includes a link', () => {
			prepareEditor('[link text](https://nextcloud.com)\n')
			editor.commands.setPreview()
			editor.commands.unsetPreview()
			expect(getMark().attrs.href).to.equal('https://nextcloud.com')
		})

	})

	describe('insertPreview command', { retries: 0 }, () => {

		it('is available in commands', () => {
			expect(editor.commands).to.have.property('insertPreview')
		})

		it('inserts a preview', () => {
			editor.commands.clearContent()
			editor.commands.insertPreview('https://nextcloud.com')
			editor.commands.setTextSelection(1)
			expectPreview()
		})

	})

	/**
	 *  Expect a preview in the editor.
	 */
	function expectPreview() {
		expect(getParentNode().type.name).to.equal('preview')
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
	 * @param {string} input - markdown content
	 */
	function prepareEditor(input) {
		loadMarkdown(editor, input)
		editor.commands.setTextSelection(1)
	}

})

describe('Markdown tests for Previews in the editor', { retries: 0 }, () => {
	const editor = createCustomEditor({
		content: '',
		extensions: [
			Markdown,
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
