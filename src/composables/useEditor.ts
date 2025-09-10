/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Editor } from '@tiptap/core'
import { inject, type InjectionKey } from 'vue'

export const editorKey = Symbol('tiptap:editor') as InjectionKey<Editor>
export const useEditor = () => {
	const editor = inject(editorKey)
	if (!editor) {
		throw new Error('Failed to inject Editor')
	}
	return { editor: editor as Editor }
}
