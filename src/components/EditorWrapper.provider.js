/*
 * @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
 *
 * @author Vinicius Reis <vinicius@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
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

export const EDITOR = Symbol('tiptap:editor')
export const SYNC_SERVICE = Symbol('sync:service')
export const IS_PUBLIC = Symbol('editor:is-public')
export const FILE = Symbol('editor:file')
export const IS_RICH_EDITOR = Symbol('editor:is-rich-editor')
export const IS_MOBILE = Symbol('editor:is-mobile')
export const RELATIVE_PATH = Symbol('editor:relative-path')
export const IS_UPLOADING_IMAGES = Symbol('editor:is-uploading-images')
export const ACTION_IMAGE_PROMPT = Symbol('action:image-prompt')

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
