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
 * Tiptap extension to ease customize the serialization to markdown
 *
 * Most markdown serialization can be handled by `@tiptap/pm/markdown`.
 * In order to make it easier to add custom markdown rendering
 * this extension will extend the prosemirror schema for nodes and marks
 * with a `toMarkdown` specification if that is defined in a tiptap extension.
 *
 * For nodes `toMarkown` should be function
 * that take a serializer state and such a node, and serializes the node.
 *
 * For marks `toMarkdown` is an object with open and close properties,
 * which hold the strings that should appear before and after.
 *
 * For more details see
 * https://github.com/ProseMirror/prosemirror-markdown#class-markdownserializer
 */

import { Extension, getExtensionField } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { MarkdownSerializer, defaultMarkdownSerializer } from '@tiptap/pm/markdown'
import { DOMParser } from '@tiptap/pm/model'

const Markdown = Extension.create({

	name: 'markdown',

	extendMarkSchema(extension) {
		const context = {
			name: extension.name,
			options: extension.options,
			storage: extension.storage,
		}
		return {
			toMarkdown: getExtensionField(extension, 'toMarkdown', context),
		}
	},

	extendNodeSchema(extension) {
		const context = {
			name: extension.name,
			options: extension.options,
			storage: extension.storage,
		}
		return {
			toMarkdown: getExtensionField(extension, 'toMarkdown', context),
		}
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: new PluginKey('pasteEventHandler'),
				props: {
					clipboardTextParser(str, $context, _, view) {
						const parser = DOMParser.fromSchema(view.state.schema)
						const doc = document.cloneNode(false)
						const dom = doc.createElement('div')
						// Treat single newlines as linebreaks and double newlines as paragraph breaks when pasting as plaintext
						dom.innerHTML = '<p>' + str.replaceAll('\n', '<br />').replaceAll('<br /><br />', '</p><p>') + '</p>'

						return parser.parseSlice(dom, { preserveWhitespace: true, context: $context })
					},
				},
			}),
		]
	},
})

const createMarkdownSerializer = ({ nodes, marks }) => {
	const defaultNodes = convertNames(defaultMarkdownSerializer.nodes)
	const defaultMarks = convertNames(defaultMarkdownSerializer.marks)
	return {
		serializer: new MarkdownSerializer(
			{ ...defaultNodes, ...extractToMarkdown(nodes) },
			{ ...defaultMarks, ...extractToMarkdown(marks) }
		),
		serialize(content, options) {
			return this.serializer.serialize(content, { ...options, tightLists: true })
		},
	}
}

const extractToMarkdown = (nodesOrMarks) => {
	return Object
		.entries(nodesOrMarks)
		.map(([name, nodeOrMark]) => [name, nodeOrMark.spec.toMarkdown])
		.filter(([, toMarkdown]) => toMarkdown)
		.reduce((items, [name, toMarkdown]) => ({
			...items,
			[name]: toMarkdown,
		}), {})
}

const convertNames = (object) => {
	const convert = (name) => {
		return name.replace(/_(\w)/g, (_m, letter) => letter.toUpperCase())
	}
	return Object.fromEntries(
		Object.entries(object)
			.map(([name, value]) => [convert(name), value])
	)
}

export { createMarkdownSerializer }
export default Markdown
