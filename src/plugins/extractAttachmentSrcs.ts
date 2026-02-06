/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'

/**
 * Extract attachment src attributes from doc
 *
 * @param doc - the prosemirror doc
 * @return src attributes of attachments found in the doc
 */
export default function extractAttachmentSrcs(doc: Node) {
	const attachmentSrcs: string[] = []

	doc.descendants((node) => {
		if (node.type.name !== 'image' && node.type.name !== 'imageInline') {
			return
		}

		// ignore empty src
		if (!node.attrs.src) {
			return
		}

		attachmentSrcs.push(node.attrs.src)
	})

	return attachmentSrcs
}
