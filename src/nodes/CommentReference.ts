/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getCurrentUser } from '@nextcloud/auth'
import { InputRule, mergeAttributes, Node } from '@tiptap/core'
import { generateReferenceId, isInsideCommentOrFootnote } from '../plugins/referenceHelpers.ts'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		commentReference: {
			insertComment: () => ReturnType
		}
	}
}

const CommentReference = Node.create({
	name: 'commentReference',
	group: 'inline',
	inline: true,
	atom: true,

	addAttributes() {
		return {
			referenceId: {
				default: '',
				parseHTML: (el) => el.getAttribute('data-reference-id') ?? '',
				renderHTML: (attrs) => ({
					'data-reference-id': attrs.referenceId,
				}),
			},
		}
	},

	parseHTML() {
		return [{ tag: 'sup[data-type="comment-reference"]' }]
	},

	renderHTML({ node, HTMLAttributes }) {
		const id = node.attrs.referenceId
		return [
			'sup',
			mergeAttributes(HTMLAttributes, {
				'data-type': 'comment-reference',
				id: `cref-${id}`,
			}),
			[
				'a',
				{ href: `#c-${id}`, class: 'comment-ref', role: 'doc-noteref', title: id },
				'💬',
			],
		]
	},

	toMarkdown(state, node) {
		state.write(`[^${node.attrs.referenceId}]`)
	},

	addCommands() {
		return {
			insertComment: () => ({ state, chain }) => {
				if (isInsideCommentOrFootnote(state)) {
					return false
				}

				const referenceId = generateReferenceId(state.doc, 'comment')
				if (!referenceId) {
					return false
				}

				const currentUser = getCurrentUser()
				const author = currentUser?.uid ?? ''
				const authorLabel = currentUser?.displayName ?? localStorage.getItem('nick') ?? ''
				const timestamp = new Date().toISOString()

				const commentType = state.schema.nodes.comment
				const commentItemType = state.schema.nodes.commentItem
				const paragraphType = state.schema.nodes.paragraph

				const newCommentItem = commentItemType.create(
					{ author, authorLabel, timestamp },
					paragraphType.create(),
				)
				const newComment = commentType.create({ referenceId }, newCommentItem)

				let c = chain()
					.insertContent({ type: 'commentReference', attrs: { referenceId } })

				// Find positions of existing containers in the original doc
				let commentsInsidePos = -1
				let footnotesStartPos = -1
				state.doc.forEach((child, offset) => {
					if (child.type.name === 'comments') {
						commentsInsidePos = offset + child.nodeSize - 1
					}
					if (child.type.name === 'footnotes') {
						footnotesStartPos = offset
					}
				})

				if (commentsInsidePos !== -1) {
					c = c.insertContentAt(commentsInsidePos, newComment.toJSON())
				} else if (footnotesStartPos !== -1) {
					c = c.insertContentAt(footnotesStartPos, {
						type: 'comments',
						content: [newComment.toJSON()],
					})
				} else {
					c = c.insertContentAt(state.doc.content.size, {
						type: 'comments',
						content: [newComment.toJSON()],
					})
				}

				return c
					.focus()
					.scrollIntoView()
					.run()
			},
		}
	},

	addKeyboardShortcuts() {
		return {
			'Mod-Alt-m': () => this.editor.commands.insertComment(),
		}
	},

	addInputRules() {
		return [
			new InputRule({
				find: /\[\?\]$/,
				handler: ({ state, range, chain }) => {
					if (isInsideCommentOrFootnote(state)) {
						return null
					}
					chain()
						.deleteRange({ from: range.from, to: range.to })
						.insertComment()
						.run()
				},
			}),
		]
	},
})

export default CommentReference
