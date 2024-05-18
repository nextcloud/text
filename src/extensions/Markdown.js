/**
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
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

/*
 * Tiptap extension to allow copy and paste of markdown
 */

import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { MarkdownSerializer } from '@tiptap/pm/markdown'
import { DOMParser } from '@tiptap/pm/model'
import markdownit from '../markdownit/index.js'
import transformPastedHTML from './transformPastedHTML.js'
import { extractNodesToMarkdown, extractToPlaintext } from '../helpers/serialize.js'

const Markdown = Extension.create({

	name: 'markdown',

	addProseMirrorPlugins() {
		let shiftKey = false

		return [
			// Parse markdown unless Mod+Shift+V is pressed for text clipboard content
			new Plugin({
				key: new PluginKey('pasteEventHandler'),
				props: {
					handleDOMEvents: {
						mouseup(_, event) {
							shiftKey = event.shiftKey
							return false
						},
					},
					handleKeyDown(_, event) {
						shiftKey = event.shiftKey
						return false
					},
					clipboardTextParser(str, $context, _, view) {
						const parser = DOMParser.fromSchema(view.state.schema)
						const doc = document.cloneNode(false)
						const dom = doc.createElement('div')
						if (shiftKey) {
							// Treat double newlines as paragraph breaks when pasting as plaintext
							for (const part of str.split('\n\n')) {
								const para = doc.createElement('p')
								// Treat single newlines as linebreaks
								para.innerText = part
								dom.append(para)
							}
						} else {
							dom.innerHTML = markdownit.render(str)
						}

						return parser.parseSlice(dom, { preserveWhitespace: true, context: $context })
					},
					clipboardTextSerializer: (slice) => {
						const traverseNodes = (slice) => {
							if (slice.content.childCount > 1) {
								return serializeSliceForClipboard(this.editor, slice)
							} else if (slice.isLeaf) {
								return slice.textContent
							} else {
								return traverseNodes(slice.content.firstChild)
							}
						}

						return traverseNodes(slice)
					},
					transformPastedHTML,
				},
			}),
		]
	},
})

const serializeSliceForClipboard = ({ schema }, { content }) => {
	return createTextSerializer(schema)
		.serialize(content, { tightLists: true })
}

/*
 * Create a serializer for multiple nodes:
 *
 * * use markdown for nodes so lists show up as lists, etc..
 * * ignore marks as these can be irritating.
 *
 */
const createTextSerializer = ({ nodes, marks }) => {
	return new MarkdownSerializer(
		extractNodesToMarkdown(nodes),
		extractToPlaintext(marks),
	)
}

export default Markdown
