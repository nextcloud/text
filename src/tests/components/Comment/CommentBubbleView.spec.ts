/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'

import { Editor as TiptapEditor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import { shallowMount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import CommentBubbleView from '../../../components/Comment/CommentBubbleView.vue'
import CommentBubble from '../../../extensions/CommentBubble.ts'
import Markdown from '../../../extensions/Markdown.js'
import Comments from '../../../nodes/Comments.ts'
import Paragraph from '../../../nodes/Paragraph.js'

vi.mock('../../../plugins/CommentBubblePluginView.ts', () => ({
	default: class {
		update() {}
		destroy() {}
	},
}))

const content = '<p>Foo<sup data-type="comment-reference" data-reference-id="comment-1"></sup></p>'
	+ '<section data-type="comments">'
	+ '<div data-type="comment" data-reference-id="comment-1">'
	+ '<div data-type="comment-item" data-author="jane" data-author-label="jane" data-timestamp="2026-07-15T11:11Z"><p>x</p></div>'
	+ '</div>'
	+ '</section>'

let editor: Editor

function mountBubble(currentUser: Editor['storage']['commentReference']['currentUser']) {
	editor = new TiptapEditor({
		content,
		extensions: [Markdown, Document.extend({ content: 'block+ comments?' }), Paragraph, Text, Comments, CommentBubble],
	})
	editor.storage.commentReference.currentUser = currentUser
	return shallowMount(CommentBubbleView, {
		props: { editor, referenceId: 'comment-1' },
		global: { stubs: { NcRichContenteditable: { render: () => null, methods: { focus() {} } } } },
	})
}

afterEach(() => {
	editor?.destroy()
	localStorage.removeItem('nick')
})

describe('CommentBubbleView', () => {
	test('shows the composer for a user', () => {
		const wrapper = mountBubble({ uid: 'alice', displayName: 'Alice' })
		expect(wrapper.find('.comment-bubble__composer').exists()).toBe(true)
		expect(wrapper.find('.comment-bubble__guest-name').exists()).toBe(false)
	})

	test('asks a guest without a name for one', () => {
		const wrapper = mountBubble(null)
		expect(wrapper.find('.comment-bubble__guest-name').exists()).toBe(true)
		expect(wrapper.find('.comment-bubble__composer').exists()).toBe(false)
	})

	test('shows the composer for a guest with a name', () => {
		localStorage.setItem('nick', 'Nick')
		const wrapper = mountBubble(null)
		expect(wrapper.find('.comment-bubble__composer').exists()).toBe(true)
	})
})
