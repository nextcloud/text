/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node as ProseMirrorNode } from '@tiptap/pm/model'

import { getCurrentUser } from '@nextcloud/auth'
import { InputRule, mergeAttributes, Node } from '@tiptap/core'
import { DOMParser } from '@tiptap/pm/model'
import { TextSelection } from '@tiptap/pm/state'
import markdownit from '../markdownit/index.js'
import { generateReferenceId, isInsideCommentOrFootnote } from '../plugins/referenceHelpers.ts'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		commentReference: {
			insertComment: () => ReturnType
			addOrUpdateCommentReply: (referenceId: string, markdownText: string, itemIndex?: number) => ReturnType
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

				// Move selection/cursor to reference to avoid it being inside the hidden comments container
				c = c.command(({ state, dispatch }) => {
					let refEnd: number | null = null
					state.doc.descendants((node, pos) => {
						if (refEnd !== null) {
							return false
						}
						if (node.type.name === 'commentReference' && node.attrs.referenceId === referenceId) {
							refEnd = pos + node.nodeSize
							return false
						}
					})
					if (refEnd === null) {
						return false
					}
					if (dispatch) {
						dispatch(state.tr.setSelection(TextSelection.near(state.doc.resolve(refEnd))))
					}
					return true
				})

				return c
					.scrollIntoView()
					.openCommentBubble(referenceId)
					.run()
			},
			addOrUpdateCommentReply: (referenceId: string, markdownText: string, itemIndex?: number) => ({ state, dispatch }) => {
				if (!markdownText) {
					return false
				}

				// serialize Markdown from content to a ProseMirror Fragment
				const html = markdownit.render(markdownText)
				const dom = document.createElement('div')
				dom.innerHTML = html
				const fragment = DOMParser.fromSchema(this.editor.schema).parse(dom)
				const content = fragment.content

				if (content.textBetween(0, content.size, ' ').trim() === '') {
					return false
				}

				const currentUser = getCurrentUser()
				const author = currentUser?.uid ?? ''
				const authorLabel = currentUser?.displayName ?? localStorage.getItem('nick') ?? ''
				const timestamp = new Date().toISOString()

				let commentPos = -1
				let targetComment: ProseMirrorNode | null = null
				state.doc.descendants((node, pos) => {
					if (targetComment) {
						return false
					}
					if (node.type.name === 'comment' && node.attrs.referenceId === referenceId) {
						commentPos = pos
						targetComment = node
						return false
					}
				})
				if (!targetComment || commentPos === -1) {
					return false
				}
				const comment = targetComment as ProseMirrorNode

				if (itemIndex !== undefined && itemIndex >= comment.childCount) {
					// Given itemIndex does not exist
					return false
				}

				// Get item to update if itemIndex is provided
				let itemPos = commentPos + 1
				let item: ProseMirrorNode
				if (itemIndex !== undefined) {
					for (let i = 0; i < itemIndex; i++) {
						itemPos += comment.child(i).nodeSize
					}
					item = comment.child(itemIndex)
				} else {
					item = comment.firstChild!
				}

				const tr = state.tr
				const shouldAppendNewReply = itemIndex === undefined
					&& !(comment.childCount === 1 && item.textContent === '')
				if (shouldAppendNewReply) {
					// Append a new reply item
					const commentItemType = state.schema.nodes.commentItem
					const newItem = commentItemType.create({ author, authorLabel, timestamp }, content)
					tr.insert(commentPos + comment.nodeSize - 1, newItem)
				} else {
					// Replace existing item if itemIndex is given or if only one empty item
					// exists (i.e. straight after addComment() command was called)
					tr.setNodeMarkup(itemPos, null, { ...item.attrs, timestamp })
					tr.replaceWith(itemPos + 1, itemPos + item.nodeSize - 1, content)
				}

				if (dispatch) {
					dispatch(tr)
				}
				return true
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
