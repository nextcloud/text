/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'

import { Document } from '@tiptap/extension-document'
import { ListItem } from '@tiptap/extension-list'
import { describe, expect } from 'vitest'
import KeepSyntax from '../../extensions/KeepSyntax.js'
import Mention from '../../extensions/Mention.js'
import BulletList from '../../nodes/BulletList.ts'
import Comments from '../../nodes/Comments.ts'
import Footnotes from '../../nodes/Footnotes.ts'
import testEditor from '../testHelpers/testEditor.ts'

const test = testEditor.override('extensions', [
	Document.extend({ content: 'block+ comments? footnotes?' }),
	Comments,
	Footnotes,
	BulletList,
	KeepSyntax,
	Mention,
	ListItem,
])

describe('Comments extension', () => {
	test('registers comments, comment, commentItem, and commentReference nodes', ({ editor }) => {
		expect(editor.schema.nodes.comments).toBeDefined()
		expect(editor.schema.nodes.comment).toBeDefined()
		expect(editor.schema.nodes.commentItem).toBeDefined()
		expect(editor.schema.nodes.commentReference).toBeDefined()
	})

	test('parses comment from HTML', ({ editor }) => {
		editor.commands
			.setContent('<p>Foo<sup data-type="comment-reference" data-reference-id="comment-1"></sup></p>\n'
				+ '<section data-type="comments">\n'
				+ '<div data-type="comment" data-reference-id="comment-1">\n'
				+ '<div data-type="comment-item" data-author="jane" data-author-label="jane" data-timestamp="2026-07-15T13:12Z">\n'
				+ '<p>Comment by Jane</p>\n'
				+ '</div>\n'
				+ '</div>\n'
				+ '</section>\n')

		const ref = editor.state.doc.firstChild!.child(1)
		const comments = editor.state.doc.lastChild!
		const comment = comments.firstChild!
		const item = comment.firstChild!

		expect(ref.type.name).toBe('commentReference')
		expect(ref.attrs.referenceId).toBe('comment-1')
		expect(comments.type.name).toBe('comments')
		expect(comment.type.name).toBe('comment')
		expect(comment.attrs.referenceId).toBe('comment-1')
		expect(item.type.name).toBe('commentItem')
		expect(item.attrs.author).toBe('jane')
		expect(item.attrs.authorLabel).toBe('jane')
		expect(item.attrs.timestamp).toBe('2026-07-15T13:12Z')
		expect(item.textContent).toBe('Comment by Jane')
	})

	test('parses multiple comment items in a thread', ({ editor }) => {
		editor.commands
			.setContent('<p>Foo<sup data-type="comment-reference" data-reference-id="comment-1"></sup></p>\n'
				+ '<section data-type="comments">\n'
				+ '<div data-type="comment" data-reference-id="comment-1">\n'
				+ '<div data-type="comment-item" data-author="jane" data-author-label="jane" data-timestamp="2026-05-21T10:30Z"><p>First</p></div>\n'
				+ '<div data-type="comment-item" data-author="bob" data-author-label="bob" data-timestamp="2026-05-21T12:45Z"><p>Second</p></div>\n'
				+ '</div>\n'
				+ '</section>\n')
		const comment = editor.state.doc.lastChild!.firstChild!
		expect(comment.childCount).toBe(2)
		expect(comment.firstChild!.attrs.author).toBe('jane')
		expect(comment.lastChild!.attrs.author).toBe('bob')
	})

	test('preserves data attributes across HTML round-trip', ({ editor }) => {
		editor.commands
			.setContent('<p>Foo<sup data-type="comment-reference" data-reference-id="comment-1"></sup></p>\n'
				+ '<section data-type="comments">\n'
				+ '<div data-type="comment" data-reference-id="comment-1">\n'
				+ '<div data-type="comment-item" data-author="jane" data-author-label="jane" data-timestamp="2026-07-15T13:12Z">\n'
				+ '<p>Comment by Jane</p>\n'
				+ '</div>\n'
				+ '</div>\n'
				+ '</section>\n')
		const html = editor.getHTML()
		expect(html).toContain('data-type="comment-reference"')
		expect(html).toContain('data-reference-id="comment-1"')
		expect(html).toContain('id="cref-comment-1"')
		expect(html).toContain('data-type="comments"')
		expect(html).toContain('data-type="comment"')
		expect(html).toContain('id="c-comment-1"')
		expect(html).toContain('data-type="comment-item"')
		expect(html).toContain('data-author="jane"')
		expect(html).toContain('data-timestamp="2026-07-15T13:12Z"')
	})
})

describe('Comments cleanup', () => {
	function deleteFirstReference(editor: Editor) {
		// Delete reference node
		let refPos = -1
		let refSize = 0
		editor.state.doc.descendants((node, pos) => {
			if (refPos !== -1) {
				return false
			}
			if (node.type.name === 'commentReference') {
				refPos = pos
				refSize = node.nodeSize
				return false
			}
		})
		editor.commands.setTextSelection({ from: refPos, to: refPos + refSize })
		editor.commands.deleteSelection()
	}

	test('removes comments container when last reference is deleted', ({ editor }) => {
		editor.commands
			.setContent('<p>Foo<sup data-type="comment-reference" data-reference-id="comment-1"></sup></p>\n'
				+ '<section data-type="comments">\n'
				+ '<div data-type="comment" data-reference-id="comment-1">\n'
				+ '<div data-type="comment-item" data-author="jane" data-author-label="jane" data-timestamp="2026-07-15T13:12Z">\n'
				+ '<p>Comment by Jane</p>\n'
				+ '</div>\n'
				+ '</div>\n'
				+ '</section>\n')

		deleteFirstReference(editor)

		let commentsCount = 0, commentCount = 0
		editor.state.doc.descendants((n) => {
			if (n.type.name === 'comments') {
				commentsCount++
			}
			if (n.type.name === 'comment') {
				commentCount++
			}
		})
		expect(commentsCount).toBe(0)
		expect(commentCount).toBe(0)
	})

	test('removes only orphaned comment when other comments remain', ({ editor }) => {
		editor.commands
			.setContent('<p>Foo<sup data-type="comment-reference" data-reference-id="comment-1"></sup></p>\n'
				+ '<p>Bar<sup data-type="comment-reference" data-reference-id="comment-2"></sup></p>\n'
				+ '<section data-type="comments">\n'
				+ '<div data-type="comment" data-reference-id="comment-1">\n'
				+ '<div data-type="comment-item" data-author="jane" data-author-label="jane" data-timestamp="2026-07-15T13:12Z">\n'
				+ '<p>Comment by Jane</p>\n'
				+ '</div>\n'
				+ '<div data-type="comment" data-reference-id="comment-2">\n'
				+ '<div data-type="comment-item" data-author="bob" data-author-label="bob" data-timestamp="2026-07-15T15:11Z">\n'
				+ '<p>Comment by Bob</p>\n'
				+ '</div>\n'
				+ '</div>\n'
				+ '</section>\n')

		deleteFirstReference(editor)

		let commentsCount = 0, comment1Count = 0, comment2Count = 0
		editor.state.doc.descendants((n) => {
			if (n.type.name === 'comments') {
				commentsCount++
			}
			if (n.type.name === 'comment') {
				if (n.attrs.referenceId === 'comment-1') {
					comment1Count++
				} else if (n.attrs.referenceId === 'comment-2') {
					comment2Count++
				}
			}
		})
		expect(commentsCount).toBe(1)
		expect(comment1Count).toBe(0)
		expect(comment2Count).toBe(1)
	})
})

describe('insertComment command', () => {
	test('inserts a reference and matching comment thread', ({ editor }) => {
		editor.commands.setContent('<p>Foo</p>')
		editor.commands.focus('end')

		const result = editor.commands.insertComment()
		expect(result).toBe(true)

		expect(editor.state.doc.firstChild!.lastChild!.type.name).toBe('commentReference')

		const comments = editor.state.doc.lastChild!
		expect(comments.type.name).toBe('comments')
		expect(comments.firstChild!.type.name).toBe('comment')
		expect(comments.firstChild!.firstChild!.type.name).toBe('commentItem')
	})

	test('generates comment-1 for the first comment', ({ editor }) => {
		editor.commands.setContent('<p>Foo</p>')
		editor.commands.focus('end')
		editor.commands.insertComment()

		const ref = editor.state.doc.firstChild!.lastChild!
		expect(ref.attrs.referenceId).toBe('comment-1')
		expect(editor.state.doc.lastChild!.firstChild!.attrs.referenceId).toBe('comment-1')
	})

	test('generates lowest unused comment-N id', ({ editor }) => {
		editor.commands.setContent('<p>Foo<sup data-type="comment-reference" data-reference-id="comment-1"></sup></p>'
			+ '<section data-type="comments">'
			+ '<div data-type="comment" data-reference-id="comment-1">'
			+ '<div data-type="comment-item" data-author="" data-author-label="" data-timestamp="ts"><p>x</p></div>'
			+ '</div>'
			+ '</section>')
		editor.commands.setTextSelection(1)
		editor.commands.insertComment()

		const refs: string[] = []
		editor.state.doc.descendants((node) => {
			if (node.type.name === 'commentReference') {
				refs.push(node.attrs.referenceId)
			}
		})
		expect(refs).toContain('comment-1')
		expect(refs).toContain('comment-2')
	})

	test('appends into existing comments container', ({ editor }) => {
		editor.commands.setContent('<p>Foo<sup data-type="comment-reference" data-reference-id="comment-1"></sup></p>'
			+ '<section data-type="comments">'
			+ '<div data-type="comment" data-reference-id="comment-1">'
			+ '<div data-type="comment-item" data-author="jane" data-author-label="jane" data-timestamp="2026-07-15T11:11Z"><p>x</p></div>'
			+ '</div>'
			+ '</section>')
		editor.commands.focus('start')
		editor.commands.insertComment()

		const comments = editor.state.doc.lastChild!
		expect(comments.type.name).toBe('comments')
		expect(comments.childCount).toBe(2)
	})

	test('inserts comments container before footnotes', ({ editor }) => {
		editor.commands.setContent('<p>Foo<sup data-type="footnote-reference" data-reference-id="1"></sup></p>'
			+ '<section data-type="footnotes">'
			+ '<div data-type="footnote" data-reference-id="1"><p>fn</p></div>'
			+ '</section>')
		editor.commands.setTextSelection(1)
		editor.commands.insertComment()

		const childNames: string[] = []
		editor.state.doc.forEach((child) => childNames.push(child.type.name))
		expect(childNames.indexOf('comments')).toBeLessThan(childNames.indexOf('footnotes'))
	})
})

describe('Comments Markdown roundtrip', () => {
	test('single-reply comment', ({ markdownThroughEditor }) => {
		const test = 'Foo[^comment-1]\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-16T13:12Z)*\n'
			+ '      Hello there'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('multi-reply comment', ({ markdownThroughEditor }) => {
		const test = 'Foo[^comment-1]\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-16T13:12Z)*\n'
			+ '      Hello there\n'
			+ '    - @[bob](mention://user/bob) *(2026-07-17T11:11Z)*\n'
			+ '      Second comment'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('comment with complex content', ({ markdownThroughEditor }) => {
		const test = 'Foo[^comment-1]\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-16T13:12Z)*\n'
			+ '      Check this @[bob](mention://user/bob):\n'
			+ '      * first item\n'
			+ '      * second item'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('multiple comments', ({ markdownThroughEditor }) => {
		const test = 'Foo[^comment-1] bar[^comment-2]\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-16T13:12Z)*\n'
			+ '      Hello there\n\n'
			+ '[^comment-2]:\n'
			+ '    - @[bob](mention://user/bob) *(2026-07-17T11:11Z)*\n'
			+ '      Second comment'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('comments and footnotes', ({ markdownThroughEditor }) => {
		const test = 'Foo[^comment-1] bar[^1]\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-16T13:12Z)*\n'
			+ '      Hello there\n\n'
			+ '[^1]: footnote body'
		expect(markdownThroughEditor(test)).toBe(test)
	})
	test('cleanup dangling comments', ({ markdownThroughEditor }) => {
		const test = 'Foo\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-16T13:12Z)*\n'
			+ '      Hello there\n'
		expect(markdownThroughEditor(test)).toBe('Foo')
	})
})
