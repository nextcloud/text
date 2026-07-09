/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/* eslint-disable jsdoc/require-param-description */

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

import type { ParentConfig } from '@tiptap/core'
import type { Mark, MarkType, Node, NodeType, Schema, Slice } from '@tiptap/pm/model'
import type { MarkdownSerializerState } from 'prosemirror-markdown'

import { Extension, getExtensionField } from '@tiptap/core'
import { DOMParser } from '@tiptap/pm/model'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { normalizeReference } from 'markdown-it/lib/common/utils.mjs'
import { defaultMarkdownSerializer, MarkdownSerializer } from 'prosemirror-markdown'
import markdownit from '../markdownit/index.js'
import Link from '../marks/Link.ts'
import transformPastedHTML from './transformPastedHTML.ts'

// taken from prosemirror-markdown
type MarkSerializerSpec = {
	/// The string that should appear before a piece of content marked
	/// by this mark, either directly or as a function that returns an
	/// appropriate string.
	open: string | ((state: MarkdownSerializerState, mark: Mark, parent: Node, index: number) => string)
	/// The string that should appear after a piece of content marked by
	/// this mark.
	close: string | ((state: MarkdownSerializerState, mark: Mark, parent: Node, index: number) => string)
	/// When `true`, this indicates that the order in which the mark's
	/// opening and closing syntax appears relative to other mixable
	/// marks can be varied. (For example, you can say `**a *b***` and
	/// `*a **b***`, but not `` `a *b*` ``.)
	mixable?: boolean
	/// When enabled, causes the serializer to move enclosing whitespace
	/// from inside the marks to outside the marks. This is necessary
	/// for emphasis marks as CommonMark does not permit enclosing
	/// whitespace inside emphasis marks, see:
	/// http:///spec.commonmark.org/0.26/#example-330
	expelEnclosingWhitespace?: boolean
	/// Can be set to `false` to disable character escaping in a mark. A
	/// non-escaping mark has to have the highest precedence (must
	/// always be the innermost mark).
	escape?: boolean
}

declare module '@tiptap/core' {
	interface MarkConfig {
		toMarkdown?: MarkSerializerSpec
	}
	interface NodeConfig<Options, Storage> {
		toMarkdown?: (
			this: {
				name: string
				options: Options
				storage: Storage
				parent: ParentConfig<NodeConfig<Options>>['toMarkdown']
			},
			state: MarkdownSerializerState,
			node: Node,
			parent: Node,
			index: number,
		) => void
	}
}

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
						const doc = document.cloneNode(false) as Document
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

						return parser.parseSlice(dom, {
							preserveWhitespace: true,
							context: $context,
						})
					},
					clipboardTextSerializer: (slice) => {
						const traverseNodes = (slice: Slice | Node) => {
							if (
								slice.content.childCount > 1
								|| (slice.content.firstChild?.childCount ?? 0) > 1
							) {
								// Selected several nodes or several children of one block node
								const doc = this.editor.schema.topNodeType.create(null, slice.content)
								return clipboardSerializer(this.editor.schema).serialize(doc)
							} else if (slice.content.firstChild?.isLeaf) {
								return slice.content.firstChild.textContent
							} else if (slice.content.firstChild) {
								// Only one block node selected, copy it's child content
								// Required to not copy wrapping block node when selecting e.g. one table
								// cell, one list item or the content of block quotes/callouts.
								return traverseNodes(slice.content.firstChild)
							} else {
								return '' // empty fragment
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

/**
 * Create a markdown serializer based on the schema
 *
 * @param schema
 * @param schema.nodes
 * @param schema.marks
 */
function createMarkdownSerializer(schema: {
	nodes: Record<string, NodeType>
	marks: Record<string, MarkType>
}) {
	return {
		serializer: new MarkdownSerializer(
			extractNodesToMarkdown(schema.nodes),
			extractMarksToMarkdown(schema.marks),
		),
		serialize(content: Node) {
			const body = this.serializer.serialize(content, {
				tightLists: true,
			} as { tightLists: boolean })

			const referenceDefinitions = new Map()
			content.descendants((node: Node) => {
				const link = node.marks.find((m: Mark) => m.type.name === Link.name)
				if (!link) {
					return
				}
				const { href, referenceLabel: label, referenceType: type, title } = link.attrs as {
					href: string
					referenceLabel?: string
					referenceType?: string
					title?: string
				}
				if (label && type) {
					const key = normalizeReference(label)
					if (!referenceDefinitions.has(key)) {
						referenceDefinitions.set(key, {
							label,
							href,
							title: title ?? null,
						})
					}
				}
				return false // do not descend into nodes that already have a link mark.
			})
			if (referenceDefinitions.size === 0) {
				return body
			}

			// Render references at the end of the document
			const referenceLines = [...referenceDefinitions.values()].map(({ label, href, title }) => {
				const titlePart = title ? ` "${title.replace(/"/g, '\\"')}"` : ''
				return `[${label}]: ${href}${titlePart}`
			})
			return (
				body.replace(/\n+$/, '') + '\n\n' + referenceLines.join('\n') + '\n'
			)
		},
	}
}

/**
 *
 * @param schema or the editorc
 */
function clipboardSerializer(schema: Schema) {
	return {
		serializer: new MarkdownSerializer(
			extractNodesToMarkdown(schema.nodes),
			extractToPlaintext(schema.marks),
		),
		serialize(content: Node) {
			return this.serializer.serialize(content, {
				tightLists: true,
			})
		},
	}
}

/**
 *
 * @param marks
 */
function extractToPlaintext(marks: Record<string, MarkType>) {
	const blankMark = {
		open: '',
		close: '',
		mixable: true,
		expelEnclosingWhitespace: true,
	}
	const defaultMarks = convertNames(defaultMarkdownSerializer.marks)
	const markEntries = Object.entries({ ...defaultMarks, ...marks }).map(([name]) => [name, blankMark])

	return Object.fromEntries(markEntries)
}

/**
 *
 * @param nodesOrMarks
 */
function extractToMarkdown(nodesOrMarks: Record<string, (NodeType | MarkType)>) {
	const nodeOrMarkEntries = Object.entries(nodesOrMarks)
		.map(([name, nodeOrMark]) => [name, nodeOrMark.spec.toMarkdown])
		.filter(([, toMarkdown]) => toMarkdown)

	return Object.fromEntries(nodeOrMarkEntries)
}

/**
 *
 * @param nodes
 */
function extractNodesToMarkdown(nodes: Record<string, NodeType>) {
	const defaultNodes = convertNames(defaultMarkdownSerializer.nodes)
	const nodesToMarkdown = extractToMarkdown(nodes)
	return { ...defaultNodes, ...nodesToMarkdown }
}

/**
 *
 * @param marks
 */
function extractMarksToMarkdown(marks: Record<string, MarkType>) {
	const defaultMarks = convertNames(defaultMarkdownSerializer.marks)
	const marksToMarkdown = extractToMarkdown(marks)
	return { ...defaultMarks, ...marksToMarkdown }
}

type NodeSerializerSpecs = typeof defaultMarkdownSerializer.nodes
type MarkSerializerSpecs = typeof defaultMarkdownSerializer.marks

/**
 *
 * @param specs
 */
function convertNames(specs: NodeSerializerSpecs | MarkSerializerSpecs) {
	const convert = (name: string) => {
		return name.replace(/_(\w)/g, (_m, letter) => letter.toUpperCase())
	}
	return Object.fromEntries(Object.entries(specs).map(([name, value]) => [convert(name), value]))
}

export { createMarkdownSerializer }
export default Markdown
