/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { AwarenessUser } from '../extensions/CollaborationCaret.ts'
import type { Session } from '../services/SyncService.ts'

import escapeHtml from 'escape-html'
import Markdown from '../extensions/Markdown.js'
import markdownit from '../markdownit/index.js'
import { isUser } from '../services/SyncService.ts'

/**
 * Convert editor source content to the HTML consumed by Tiptap's parser.
 *
 * @param content Editor source content
 * @param markdown Whether the editor supports Markdown content
 */
export function renderEditorContent(content: string, markdown: boolean) {
	return markdown
		? markdownit.render(content) + '<p/>'
		: `<pre>\n${escapeHtml(content)}</pre>`
}

/**
 *
 * @param editor to apply methods to
 */
export function useEditorMethods(editor: Editor) {
	const setEditable = (val: boolean) => {
		if (editor && editor.isEditable !== val) {
			editor.setEditable(val)
		}
	}

	const setContent: (
		content: string,
		options?: { addToHistory?: boolean },
	) => void = (content, { addToHistory = true } = {}) => {
		const hasMarkdownContent
			= editor.extensionManager.extensions.includes(Markdown)
		editor
			.chain()
			.setContent(renderEditorContent(content, hasMarkdownContent), { emitUpdate: addToHistory })
			.command(({ tr }) => {
				tr.setMeta('addToHistory', addToHistory)
				return true
			})
			.run()
	}

	const updateUser = (session: Session) => {
		const user: AwarenessUser = {
			name: isUser(session) ? session.displayName : session?.guestName || '',
			color: session?.color,
		}
		editor.commands.updateUser(user)
	}

	return { setContent, setEditable, updateUser }
}
