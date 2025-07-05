/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import escapeHtml from 'escape-html'
import markdownit from '../markdownit/index.js'
import Markdown from '../extensions/Markdown.js'

export const useEditorMethods = (editor: Editor) => {
	const setEditable = (val: boolean) => {
		if (editor && editor.isEditable !== val) {
			editor.setEditable(val)
		}
	}

	const isRichEditor = editor.extensionManager.extensions.includes(Markdown)

	const setContent: (
		content: string,
		options: { addToHistory?: boolean },
	) => void = (content, { addToHistory = true } = {}) => {
		const html = isRichEditor
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

	return { setContent, setEditable }
}
