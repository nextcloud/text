/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { loadState } from '@nextcloud/initial-state'
import { isPublicShare } from '@nextcloud/sharing/public'
import { inject, type InjectionKey, provide } from 'vue'

export interface EditorFlags {
	isPublic: boolean
	isRichEditor: boolean
	isRichWorkspace: boolean
}
interface Props {
	isDirectEditing: boolean
	richWorkspace: boolean
	mime: string
}
export const editorFlagsKey = Symbol('editor:flags') as InjectionKey<EditorFlags>
export const provideEditorFlags = (props: Props) => {
	const isPublic = props.isDirectEditing || isPublicShare()
	const isRichWorkspace = props.richWorkspace ?? false
	const isRichEditor =
		loadState('text', 'rich_editing_enabled', true)
		&& props.mime === 'text/markdown'
	provide(editorFlagsKey, { isPublic, isRichEditor, isRichWorkspace })
	return { isPublic, isRichEditor, isRichWorkspace }
}
export const useEditorFlags = () => {
	const { isPublic, isRichEditor, isRichWorkspace } = inject(editorFlagsKey, {
		isPublic: false,
		isRichEditor: false,
		isRichWorkspace: false,
	})
	return { isPublic, isRichEditor, isRichWorkspace }
}
