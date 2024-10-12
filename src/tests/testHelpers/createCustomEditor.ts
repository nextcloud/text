/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Editor, type Content, type Extensions } from '@tiptap/core'

import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import Paragraph from '../../nodes/Paragraph'

/**
 *
 * @param content Content for the editor.
 * @param extensions Tip tap extensions
 */
export default function createCustomEditor(
	content: Content = '',
	extensions: Extensions = [],
): Editor {
	return new Editor({
		content,
		extensions: [
			Document,
			Paragraph,
			Text,
			...extensions,
		],
	})
}
