/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TiptapCodeBlock from '@tiptap/extension-code-block'
import codeBlockShortcuts from './CodeBlock/codeBlockShortcuts.js'

const CodeBlockPlainText = TiptapCodeBlock.extend({
	addKeyboardShortcuts() {
		return codeBlockShortcuts
	},
})

export default CodeBlockPlainText
