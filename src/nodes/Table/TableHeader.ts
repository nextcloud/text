/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node as PMNode } from '@tiptap/pm/model'

import { mergeAttributes } from '@tiptap/core'
import { TableHeader } from '@tiptap/extension-table'
import { Fragment, Slice } from '@tiptap/pm/model'
import { Plugin, PluginKey } from '@tiptap/pm/state'

export default TableHeader.extend({
	content: 'inline*',

	toMarkdown(state, node) {
		// Header cells are inline-parsed, so no escaping of block syntax at line start
		state.renderInline(node, false)
		state.closeBlock(node)
	},

	parseHTML() {
		return [
			{ tag: 'table thead:empty ~ tbody :first-child th', priority: 80 },
			{ tag: 'table thead:empty ~ tbody :first-child td', priority: 80 },
			{ tag: 'table thead :first-child th', priority: 60 },
			{ tag: 'table thead :first-child td', priority: 60 },
			{ tag: 'table tbody :first-child th', priority: 60 },
			{ tag: 'table tbody :first-child td', priority: 60 },
			{ tag: 'table > :first-child > th', priority: 60 },
			{ tag: 'table > :first-child > td', priority: 60 },
			// Unwrap paragraphs from multiline header cells instead of creating nested tables
			{ tag: 'p', context: 'tableHeader/', skip: true, priority: 60 },
		]
	},

	renderHTML({ HTMLAttributes }) {
		const attributes = mergeAttributes(
			this.options.HTMLAttributes,
			HTMLAttributes,
		)
		if (attributes.colspan === 1) {
			delete attributes.colspan
		}
		if (attributes.rowspan === 1) {
			delete attributes.rowspan
		}
		return ['th', attributes, 0]
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: new PluginKey('singleLineTableHeader'),
				props: {
					// Markdown table headers cannot span multiple lines: flatten pasted content to inline nodes
					transformPasted: (slice, view) => {
						if (!this.editor.isActive(this.type.name)) {
							return slice
						}

						const { schema } = view.state
						const nodes: PMNode[] = []
						const addSpace = () => {
							const last = nodes[nodes.length - 1]
							if (last && !(last.isText && last.text?.endsWith(' '))) {
								nodes.push(schema.text(' '))
							}
						}
						slice.content.descendants((node) => {
							if (node.isText) {
								nodes.push(schema.text(node.text!.replace(/\s*\n\s*/g, ' '), node.marks))
							} else if (node.type.name === 'hardBreak') {
								addSpace()
							} else if (node.isInline) {
								nodes.push(node)
							} else if (node.isTextblock) {
								addSpace()
							}
						})

						return new Slice(Fragment.from(nodes), 0, 0)
					},
				},
			}),
		]
	},
})
