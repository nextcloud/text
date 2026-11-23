/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { MaybeRefOrGetter } from 'vue'

import { getCurrentUser } from '@nextcloud/auth'
import { computed, provide, toValue } from 'vue'
import { ATTACHMENT_RESOLVER, EDITOR_UPLOAD } from '../components/Editor.provider.ts'
import AttachmentResolver from '../services/AttachmentResolver.js'

interface ComparisonAttachmentOptions {
	fileId?: number
	/** Path of the file, once known */
	filePath?: MaybeRefOrGetter<string | undefined>
	shareToken?: string
}

/**
 * Resolve the attachments of the compared documents relative to the file,
 * for the comparison editors below the calling component.
 *
 * @param options The file the documents belong to, if known.
 */
export function useComparisonAttachments(options: ComparisonAttachmentOptions) {
	provide(ATTACHMENT_RESOLVER, computed(() => options.fileId
		? new AttachmentResolver({
				currentDirectory: toValue(options.filePath)?.split('/').slice(0, -1).join('/') ?? '/',
				fileId: options.fileId,
				session: undefined,
				shareToken: options.shareToken,
				user: getCurrentUser(),
			})
		: {
				async resolve(src: string) {
					return { fullUrl: src, isImage: true, name: src.split('/').pop(), previewUrl: src }
				},
			}))
	provide(EDITOR_UPLOAD, false)
}
