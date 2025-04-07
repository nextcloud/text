/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { isNodeActive, mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import DetailsContent from './DetailsContent.js'
import DetailsSummary from './DetailsSummary.js'
import DetailsView from './DetailsView.vue'

/**
 * Get first details node from parent nodes of a resolved position
 *
 * @param {object} resolvedPos - resolved position
 * @param {object} schema - prosemirror editor schema
 */
function detailsParentInfo(resolvedPos, schema) {
	for (let depth = resolvedPos.depth; depth > 0; depth -= 1) {
		const node = resolvedPos.node(depth)
		if (node.type === schema.nodes.details) {
			return {
				pos: depth > 0 ? resolvedPos.before(depth) : 0,
				node,
			}
		}
	}
}

/**
 * Get first child node of a type from descendants of a node
 *
 * @param {object} node - prosemirror node
 * @param {object} nodeType - prosemirror node type
 */
function childFromNode(node, nodeType) {
	const childNodes = []
	node.descendants((childNode, i) => {
		if (childNode.type === nodeType) {
			childNodes.push(childNode)
			return false
		}
	})
	return childNodes.length > 0 ? childNodes[0] : null
}

const Details = Node.create({
	name: 'details',
	content: 'detailsSummary detailsContent',
	group: 'block',
	defining: true,
	isolating: true,
	allowGapCursor: false,

	addExtensions() {
		return [DetailsContent, DetailsSummary]
	},

	addOptions() {
		return {
			HTMLAttributes: {},
		}
	},

	addAttributes() {
		return {
			openDetails: {
				default: false,
			},
		}
	},

	parseHTML() {
		return [
			{
				tag: 'details',
			},
		]
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'details',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		]
	},

	addNodeView() {
		return VueNodeViewRenderer(DetailsView)
	},

	toMarkdown: (state, node) => {
		state.write('<details>\n')
		state.renderContent(node)
		state.closeBlock(node)
		state.ensureNewLine()
		state.write('</details>')
		state.ensureNewLine()
	},

	addCommands() {
		return {
			setDetails:
				() =>
				({ commands, state, chain }) => {
					const { schema, selection } = state
					const { $from, $to } = selection
					const blockRange = $from.blockRange($to)
					if (!blockRange) {
						return false
					}

					const slice = state.doc.slice(blockRange.start, blockRange.end)
					if (
						!schema.nodes.detailsContent.contentMatch.matchFragment(
							slice.content,
						)
					) {
						return false
					}
					const sliceContent = slice.toJSON()?.content || []

					return chain()
						.insertContentAt(
							{
								from: blockRange.start,
								to: blockRange.end,
							},
							{
								type: this.name,
								attrs: {
									openDetails: true,
								},
								content: [
									{ type: 'detailsSummary' },
									{
										type: 'detailsContent',
										content: sliceContent,
									},
								],
							},
						)
						.setTextSelection(blockRange.start + 2)
						.run()
				},
			unsetDetails:
				() =>
				({ state, chain }) => {
					const { schema, selection } = state
					const details = detailsParentInfo(selection.$from, schema)
					if (!details) {
						return false
					}
					const detailsContent = childFromNode(
						details.node,
						schema.nodes.detailsContent,
					)
					if (!detailsContent) {
						return false
					}

					const content = detailsContent.content.toJSON()
					const range = {
						from: details.pos,
						to: details.pos + details.node.nodeSize,
					}

					return chain()
						.insertContentAt(range, content)
						.setTextSelection(details.pos + 1)
						.run()
				},
			toggleDetails:
				() =>
				({ commands, state }) => {
					if (!isNodeActive(state, this.name)) {
						return commands.setDetails()
					}
					return commands.unsetDetails()
				},
		}
	},

	addKeyboardShortcuts() {
		return {
			// If in detailsSummary: Make sure details is open and jump to content
			Enter: ({ editor }) => {
				const { state } = editor
				const { schema, selection } = state
				const { $from } = selection
				if ($from.parent.type !== schema.nodes.detailsSummary) {
					return false
				}

				const details = detailsParentInfo($from, schema)
				if (!details.node.attrs.openDetails) {
					editor.commands.updateAttributes('details', {
						openDetails: true,
					})
				}

				const detailsContent = childFromNode(
					details.node,
					schema.nodes.detailsContent,
				)
				if (!detailsContent) {
					return false
				}

				// Check if next node is detailsContent
				const nextNode = state.doc.nodeAt($from.after())
				if (!nextNode?.type === schema.nodes.detailsContent) {
					return false
				}

				return editor.commands.setTextSelection($from.after())
			},
			// Unset details with backspace in empty summary
			Backspace: ({ editor }) => {
				const { state } = editor
				const { schema, selection } = state
				const { $from } = selection
				if ($from.parent.type !== schema.nodes.detailsSummary) {
					return false
				}
				if ($from.parent.textContent !== '') {
					return false
				}

				return editor.commands.unsetDetails()
			},
		}
	},
})

export default Details
