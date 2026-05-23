/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import Paragraph from '../../src/nodes/Paragraph.js'

/**
 *
 * @param root0
 * @param root0.content
 * @param root0.extensions
 */
export function createCustomEditor({ content, extensions }) {
	return new Editor({
		content,
		extensions: [Document, Paragraph, Text, ...extensions],
	})
}
