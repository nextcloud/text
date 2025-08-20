/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'
import type { Editor } from '@tiptap/core'
import escapeHtml from 'escape-html'
import Markdown from '../extensions/Markdown.js'
import markdownit from '../markdownit/index.js'
import type { Session } from '../services/SyncService.ts'

interface AwarenessUser {
	name: string
	color: string
}

export const useEditorMethods = (editor: Editor) => {
	const setEditable = (val: boolean) => {
		if (editor && editor.isEditable !== val) {
			editor.setEditable(val)
		}
	}

	const setContent: (
		content: string,
		options: { addToHistory?: boolean },
	) => void = (content, { addToHistory = true } = {}) => {
		const hasMarkdownContent =
			editor.extensionManager.extensions.includes(Markdown)
		const html = hasMarkdownContent
			? markdownit.render(content) + '<p/>'
			: `<pre>${escapeHtml(content)}</pre>`
		editor
			.chain()
			.setContent(html, addToHistory)
			.command(({ tr }) => {
				tr.setMeta('addToHistory', addToHistory)
				return true
			})
			.run()
	}

	const updateUser = (session: Session) => {
		const user: AwarenessUser = {
			name: session?.userId
				? session.displayName
				: session?.guestName || t('text', 'Guest'),
			color: session?.color,
		}
		editor.commands.updateUser(user)
	}

	return { setContent, setEditable, updateUser }
}
