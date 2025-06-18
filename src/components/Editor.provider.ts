/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import { logger } from '../helpers/logger.js'
import { provide, inject, shallowRef, ref, computed } from 'vue'
import type { InjectionKey, Ref, ShallowReactive, ShallowRef } from 'vue'
import { isPublicShare } from '@nextcloud/sharing/public'
import { loadState } from '@nextcloud/initial-state'

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
	const isRichWorkspace = computed(() => props.richWorkspace)
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

export const FILE = Symbol('editor:file')
export const ATTACHMENT_RESOLVER = Symbol('attachment:resolver')
export const IS_MOBILE = Symbol('editor:is-mobile')
export const SYNC_SERVICE = Symbol('sync:service')
export const EDITOR_UPLOAD = Symbol('editor:upload')
export const HOOK_MENTION_SEARCH = Symbol('hook:mention-search')
export const HOOK_MENTION_INSERT = Symbol('hook:mention-insert')

export const useSyncServiceMixin = {
	inject: {
		$syncService: { from: SYNC_SERVICE, default: null },
	},
}

export const useIsMobileMixin = {
	inject: {
		$isMobile: { from: IS_MOBILE, default: false },
	},
}

export const useFileMixin = {
	inject: {
		$file: {
			from: FILE,
			default: () => ({
				fileId: 0,
				relativePath: null,
				document: null,
			}),
		},
	},
}

export const useAttachmentResolver = {
	inject: {
		$attachmentResolver: {
			from: ATTACHMENT_RESOLVER,
			default: {
				resolve(src: string) {
					logger.warn(
						'No attachment resolver provided. Some attachment sources cannot be resolved.',
					)
					return [src]
				},
			},
		},
	},
}
export const useEditorUpload = {
	inject: {
		$editorUpload: {
			from: EDITOR_UPLOAD,
			default: true,
		},
	},
}
export const useMentionHook = {
	inject: {
		$mentionHookInsert: {
			from: HOOK_MENTION_INSERT,
			default: true,
		},
		$mentionHookSearch: {
			from: HOOK_MENTION_SEARCH,
			default: true,
		},
	},
}
