/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { loadState } from '@nextcloud/initial-state'
import { isPublicShare } from '@nextcloud/sharing/public'
import {
	type Ref,
	type InjectionKey,
	type ShallowReactive,
	computed,
	provide,
	inject,
	ref,
} from 'vue'

export interface EditorFlags {
	isPublic: Ref<boolean>
	isRichEditor: Ref<boolean>
	isRichWorkspace: Ref<boolean>
}
interface Props {
	isDirectEditing: boolean
	richWorkspace: boolean
	mime: string
}
export const editorFlagsKey = Symbol('editor:flags') as InjectionKey<EditorFlags>
export const provideEditorFlags = (props: ShallowReactive<Props>) => {
	const isPublic = computed(() => props.isDirectEditing || isPublicShare())
	const isRichWorkspace = computed(() => props.richWorkspace ?? false)
	const isRichEditor = computed(
		() =>
			loadState('text', 'rich_editing_enabled', true)
			&& props.mime === 'text/markdown',
	)
	provide(editorFlagsKey, { isPublic, isRichEditor, isRichWorkspace })
	return { isPublic, isRichEditor, isRichWorkspace }
}
export const useEditorFlags = () => {
	const { isPublic, isRichEditor, isRichWorkspace } = inject(editorFlagsKey, {
		isPublic: ref(false),
		isRichEditor: ref(false),
		isRichWorkspace: ref(false),
	})
	return { isPublic, isRichEditor, isRichWorkspace }
}
