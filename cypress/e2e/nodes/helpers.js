/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from './../../../src/markdownit/index.js'
import { findChildren } from './../../../src/helpers/prosemirrorUtils.js'
import { createMarkdownSerializer } from './../../../src/extensions/Markdown.js'

/**
 *
 * @param editor
 * @param markdown
 */
export function loadMarkdown(editor, markdown) {
	const stripped = markdown.replace(/\t*/g, '')
	editor.commands.setContent(markdownit.render(stripped))
}

/**
 *
 * @param editor
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
 * @param editor
 */
function findCommand(editor) {
	const doc = editor.state.doc
	return findChildren(doc, child => {
		return child.isText && Object.prototype.hasOwnProperty.call(editor.commands, child.text)
	})[0]
}

/**
 *
 * @param editor
 * @param markdown
 */
export function expectMarkdown(editor, markdown) {
	const stripped = markdown.replace(/\t*/g, '')
	expect(getMarkdown(editor)).to.equal(stripped)
}

/**
 *
 * @param editor
 */
function getMarkdown(editor) {
	const serializer = createMarkdownSerializer(editor.schema)
	return serializer.serialize(editor.state.doc)
}
