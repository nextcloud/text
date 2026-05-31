/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { logger } from '../helpers/logger.js'

export const ATTACHMENT_RESOLVER = Symbol('attachment:resolver')
export const IS_MOBILE = Symbol('editor:is-mobile')
export const EDITOR_UPLOAD = Symbol('editor:upload')
export const HOOK_MENTION_SEARCH = Symbol('hook:mention-search')
export const HOOK_MENTION_INSERT = Symbol('hook:mention-insert')
export const HOOK_MENUBAR_LINK_CUSTOM_ACTION = Symbol('menubar:link-custom-action')

export const useIsMobileMixin = {
	inject: {
		$isMobile: { from: IS_MOBILE, default: false },
	},
}

export const useAttachmentResolver = {
	inject: {
		$attachmentResolver: {
			from: ATTACHMENT_RESOLVER,
			default: {
				resolve(src: string) {
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
			default: false,
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
