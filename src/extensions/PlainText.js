/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import Text from '@tiptap/extension-text'
import CodeBlockPlainText from './../nodes/CodeBlockPlainText.js'
import PlainTextDocument from './../nodes/PlainTextDocument.js'
import Keymap from './Keymap.js'

export default Extension.create({
	name: 'PlainText',

	addOptions() {
		return {
			...this.parent?.(),
			lowlight: undefined,
			defaultLanguage: 'plaintext',
		}
	},

	addExtensions() {
		return [
			CodeBlockPlainText.configure({
				lowlight: this.options.lowlight,
				defaultLanguage: this.options.defaultLanguage,
				exitOnTripleEnter: false,
			}),
			Keymap,
			PlainTextDocument,
			Text,
		]
	},
})
