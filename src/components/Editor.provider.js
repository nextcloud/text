/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { logger } from '../helpers/logger.js'

export const EDITOR = Symbol('tiptap:editor')
export const FILE = Symbol('editor:file')
export const ATTACHMENT_RESOLVER = Symbol('attachment:resolver')
export const IS_MOBILE = Symbol('editor:is-mobile')
export const IS_PUBLIC = Symbol('editor:is-public')
export const IS_RICH_EDITOR = Symbol('editor:is-rich-editor')
export const IS_RICH_WORKSPACE = Symbol('editor:is-rich-woskapace')
export const SYNC_SERVICE = Symbol('sync:service')
export const EDITOR_UPLOAD = Symbol('editor:upload')
export const HOOK_MENTION_SEARCH = Symbol('hook:mention-search')
export const HOOK_MENTION_INSERT = Symbol('hook:mention-insert')

export const useEditorMixin = {
	inject: {
		$editor: { from: EDITOR, default: null },
	},
}

export const useSyncServiceMixin = {
	inject: {
		$syncService: { from: SYNC_SERVICE, default: null },
	},
}

export const useIsPublicMixin = {
	inject: {
		$isPublic: { from: IS_PUBLIC, default: false },
	},
}

export const useIsRichWorkspaceMixin = {
	inject: {
		$isRichWorkspace: { from: IS_RICH_WORKSPACE, default: false },
	},
}

export const useIsRichEditorMixin = {
	inject: {
		$isRichEditor: { from: IS_RICH_EDITOR, default: false },
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
				resolve(src) {
					logger.warn('No attachment resolver provided. Some attachment sources cannot be resolved.')
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
