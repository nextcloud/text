/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { MarkdownSerializer, defaultMarkdownSerializer } from '@tiptap/pm/markdown'
import { DOMParser } from '@tiptap/pm/model'
import markdownit from '../markdownit/index.js'
import transformPastedHTML from './transformPastedHTML.js'

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
								return clipboardSerializer(this.editor.schema).serialize(slice.content)
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

const createMarkdownSerializer = ({ nodes, marks }) => {
	return {
		serializer: new MarkdownSerializer(
			extractNodesToMarkdown(nodes),
			extractMarksToMarkdown(marks),
		),
		serialize(content, options) {
			return this.serializer.serialize(content, { ...options, tightLists: true })
		},
	}
}

const clipboardSerializer = ({ nodes, marks }) => {
	return {
		serializer: new MarkdownSerializer(
			extractNodesToMarkdown(nodes),
			extractToPlaintext(marks),
		),
		serialize(content, options) {
			return this.serializer.serialize(content, { ...options, tightLists: true })
		},
	}
}

const extractToPlaintext = (marks) => {
	const blankMark = { open: '', close: '', mixable: true, expelEnclosingWhitespace: true }
	const defaultMarks = convertNames(defaultMarkdownSerializer.marks)
	const markEntries = Object.entries({ ...defaultMarks, ...marks })
		.map(([name, _mark]) => [name, blankMark])

	return Object.fromEntries(markEntries)
}

const extractToMarkdown = (nodesOrMarks) => {
	const nodeOrMarkEntries = Object
		.entries(nodesOrMarks)
		.map(([name, nodeOrMark]) => [name, nodeOrMark.spec.toMarkdown])
		.filter(([, toMarkdown]) => toMarkdown)

	return Object.fromEntries(nodeOrMarkEntries)
}

const extractNodesToMarkdown = (nodes) => {
	const defaultNodes = convertNames(defaultMarkdownSerializer.nodes)
	const nodesToMarkdown = extractToMarkdown(nodes)
	return { ...defaultNodes, ...nodesToMarkdown }
}

const extractMarksToMarkdown = (marks) => {
	const defaultMarks = convertNames(defaultMarkdownSerializer.marks)
	const marksToMarkdown = extractToMarkdown(marks)
	return { ...defaultMarks, ...marksToMarkdown }
}

const convertNames = (object) => {
	const convert = (name) => {
		return name.replace(/_(\w)/g, (_m, letter) => letter.toUpperCase())
	}
	return Object.fromEntries(
		Object.entries(object)
			.map(([name, value]) => [convert(name), value]),
	)
}

export { createMarkdownSerializer }
export default Markdown
