/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { openLink } from '../helpers/links.js'
import { logger } from '../helpers/logger.js'

export const FILE = Symbol('editor:file')
export const ATTACHMENT_RESOLVER = Symbol('attachment:resolver')
export const IS_MOBILE = Symbol('editor:is-mobile')
export const EDITOR_UPLOAD = Symbol('editor:upload')
export const HOOK_MENTION_SEARCH = Symbol('hook:mention-search')
export const HOOK_MENTION_INSERT = Symbol('hook:mention-insert')
export const OPEN_LINK_HANDLER = Symbol('editor:open-link-handler')

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
export const useOpenLinkHandler = {
	inject: {
		$openLinkHandler: {
			from: OPEN_LINK_HANDLER,
			default: {
				openLink,
			},
		},
	},
}
