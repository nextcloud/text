/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { InjectionKey } from 'vue'

import { loadState } from '@nextcloud/initial-state'
import { isPublicShare } from '@nextcloud/sharing/public'
import { inject, provide } from 'vue'

export interface EditorFlags {
	isPublic: boolean
	isRichEditor: boolean
	isRichWorkspace: boolean
	hasTableOfContents: boolean
}
interface Props {
	isDirectEditing: boolean
	richWorkspace: boolean
	mime: string
}
export const editorFlagsKey = Symbol('editor:flags') as InjectionKey<EditorFlags>
/**
 *
 * @param props
 */
export function provideEditorFlags(props: Props) {
	const isPublic = props.isDirectEditing || isPublicShare()
	const isRichWorkspace = props.richWorkspace ?? false
	const isRichEditor
		= loadState('text', 'rich_editing_enabled', true)
			&& props.mime === 'text/markdown'
	const hasTableOfContents = isRichEditor && !isRichWorkspace
	provide(editorFlagsKey, {
		isPublic,
		isRichEditor,
		isRichWorkspace,
		hasTableOfContents,
	})
	return { isPublic, isRichEditor, isRichWorkspace, hasTableOfContents }
}
/**
 *
 */
export function useEditorFlags() {
	const { isPublic, isRichEditor, isRichWorkspace, hasTableOfContents } = inject(
		editorFlagsKey,
		{
			isPublic: false,
			isRichEditor: false,
			isRichWorkspace: false,
			hasTableOfContents: false,
		},
	)
	return { isPublic, isRichEditor, isRichWorkspace, hasTableOfContents }
}
