/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { InjectionKey } from 'vue'

import { inject, provide } from 'vue'

export const editorKey = Symbol('tiptap:editor') as InjectionKey<Editor>
/**
 *
 * @param editor
 */
export function provideEditor(editor: Editor) {
	provide(editorKey, editor)
}
/**
 *
 */
export function useEditor() {
	const editor = inject(editorKey)
	if (!editor) {
		throw new Error('Failed to inject Editor')
	}
	return { editor }
}
