/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from './../../../src/markdownit/index.js'
import { findChildren } from './../../../src/helpers/prosemirrorUtils.js'
import { createMarkdownSerializer } from './../../../src/extensions/Markdown.js'

/**
 *
 * @param {object} editor - the editor object
 * @param {string} markdown - markdown content
 */
export function loadMarkdown(editor, markdown) {
	const stripped = markdown.replace(/\t*/g, '')
	editor.commands.setContent(markdownit.render(stripped))
}

/**
 *
 * @param {object} editor - the editor object
 */
export function runCommands(editor) {
	let found
	while ((found = findCommand(editor))) {
		const { node, pos } = found
		const name = node.text
		editor.commands.setTextSelection(pos)
		editor.commands[name]()
		editor.commands.insertContent('did ')
	}
}

/**
 *
 * @param {object} editor - the editor object
 */
function findCommand(editor) {
	const doc = editor.state.doc
	return findChildren(doc, child => {
		return child.isText && Object.prototype.hasOwnProperty.call(editor.commands, child.text)
	})[0]
}

/**
 *
 * @param {object} editor - the editor object
 * @param {string} markdown - markdown content
 */
export function expectMarkdown(editor, markdown) {
	const stripped = markdown.replace(/\t*/g, '')
	expect(getMarkdown(editor)).to.equal(stripped)
}

/**
 *
 * @param {object} editor - the editor object
 */
function getMarkdown(editor) {
	const serializer = createMarkdownSerializer(editor.schema)
	return serializer.serialize(editor.state.doc)
}
