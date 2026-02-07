/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Encode filename the same way as at `insertAttachment` in MediaHandler.vue
 *
 * @param filename - The filename to encode
 */
export function encodeAttachmentFilename(filename: string) {
	return encodeURIComponent(filename).replace(/[!'()*]/g, (c) => {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	})
}
