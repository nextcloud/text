/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import escapeHtml from 'escape-html'
import type { ShallowRef } from 'vue'
import markdownit from '../markdownit/index.js'

export const useEditorMethods = (editor: ShallowRef<Editor | undefined>) => {
	const setEditable = (val: boolean) => {
		if (editor.value && editor.value.isEditable !== val) {
			editor.value.setEditable(val)
		}
	}

	const setContent: (
		content: string,
		options: { isRichEditor?: boolean; addToHistory?: boolean },
	) => void = (content, { isRichEditor, addToHistory = true } = {}) => {
		const html = isRichEditor
			? markdownit.render(content) + '<p/>'
			: `<pre>${escapeHtml(content)}</pre>`
		editor.value
			?.chain()
			.setContent(html, addToHistory)
			.command(({ tr }) => {
				tr.setMeta('addToHistory', addToHistory)
				return true
			})
			.run()
	}

	return { setContent, setEditable }
}
