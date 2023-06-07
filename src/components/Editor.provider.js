/**
 * @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
 *
 * @author Vinicius Reis <vinicius@nextcloud.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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
export const HOOK_LINK_CLICK = Symbol('hook:link-click')
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
export const useLinkClickHook = {
	inject: {
		$linkHookClick: {
			from: HOOK_LINK_CLICK,
			default: null,
		},
	},
}
