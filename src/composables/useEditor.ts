/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Editor } from '@tiptap/core'
import { type InjectionKey, provide, inject } from 'vue'

export const editorKey = Symbol('tiptap:editor') as InjectionKey<Editor>
export const provideEditor = (editor: Editor) => {
	provide(editorKey, editor)
}
export const useEditor = () => {
	const editor = inject(editorKey)
	if (!editor) {
		throw new Error('Failed to inject Editor')
	}
	return { editor: editor as Editor }
}
