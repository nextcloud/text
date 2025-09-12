/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Editor } from '@tiptap/core'
import { type InjectionKey } from 'vue'

let globalEditor: Editor | undefined

export const editorKey = Symbol('tiptap:editor') as InjectionKey<Editor>
export const provideEditor = (editor: Editor) => {
	globalEditor = editor
}
export const useEditor = () => {
	if (!globalEditor) {
		throw new Error('Failed to inject Editor')
	}
	return { editor: globalEditor! }
}
