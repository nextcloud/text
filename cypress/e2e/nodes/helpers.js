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

import markdownit from './../../../src/markdownit/index.js'
import { findChildren } from './../../../src/helpers/prosemirrorUtils.js'
import { createMarkdownSerializer } from './../../../src/extensions/Markdown.js'

/**
 *
 * @param {object} editor the editor object
 * @param {string} markdown the markdown content
 */
export function loadMarkdown(editor, markdown) {
	const stripped = markdown.replace(/\t*/g, '')
	editor.commands.setContent(markdownit.render(stripped))
}

/**
 *
 * @param {object} editor the editor object
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
 * @param {object} editor the editor object
 */
function findCommand(editor) {
	const doc = editor.state.doc
	return findChildren(doc, child => {
		return child.isText && Object.prototype.hasOwnProperty.call(editor.commands, child.text)
	})[0]
}

/**
 *
 * @param {object} editor the editor object
 * @param {string} markdown the markdown content
 */
export function expectMarkdown(editor, markdown) {
	const stripped = markdown.replace(/\t*/g, '')
	expect(getMarkdown(editor)).to.equal(stripped)
}

/**
 *
 * @param {object} editor the editor object
 */
function getMarkdown(editor) {
	const serializer = createMarkdownSerializer(editor.schema)
	return serializer.serialize(editor.state.doc)
}
