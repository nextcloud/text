/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import { type InjectionKey, type ShallowRef, shallowRef, provide, inject } from 'vue'

export const editorKey = Symbol('tiptap:editor') as InjectionKey<
	ShallowRef<Editor | undefined>
>
export const provideEditor = () => {
	const editor: ShallowRef<Editor | undefined> = shallowRef(undefined)
	provide(editorKey, editor)
	return { editor }
}
export const useEditor = () => {
	const editor = inject(editorKey, shallowRef(undefined))
	return { editor }
}
