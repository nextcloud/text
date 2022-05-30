/*
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
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
 * Most markdown serialization can be handled by `prosemirror-markdown`.
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
import { MarkdownSerializer, defaultMarkdownSerializer } from 'prosemirror-markdown'

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
				.split('\\[').join('[')
				.split('\\]').join(']')
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
