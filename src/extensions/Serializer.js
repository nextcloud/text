/**
 * SPDX-FileCopyrightText: 2024 Max <max@nextcloud.com>
 * SPDX-License-Identifier: @license AGPL-3.0-or-later
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
import { MarkdownSerializer } from '@tiptap/pm/markdown'
import { extractNodesToMarkdown, extractMarksToMarkdown } from '../helpers/serialize.js'

export const serializeEditorContent = ({ schema, state }) => {
	return _createMarkdownSerializer(schema)
		.serialize(state.doc, { tightLists: true })
}

const Serializer = Extension.create({

	name: 'serializer',

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

/*
 * Create the markdown serializer.
 *
 * Only exported for tests,
 */
export const _createMarkdownSerializer = ({ nodes, marks }) => {
	return new MarkdownSerializer(
		extractNodesToMarkdown(nodes),
		extractMarksToMarkdown(marks),
	)
}

export default Serializer
