/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'

import CodeBlockPlainText from './../nodes/CodeBlockPlainText.js'
import Keymap from './Keymap.js'
import PlainTextDocument from './../nodes/PlainTextDocument.js'
/* eslint-disable import/no-named-as-default */
import Text from '@tiptap/extension-text'

export default Extension.create({
	name: 'PlainText',

	addExtensions() {
		return [CodeBlockPlainText, Keymap, PlainTextDocument, Text]
	},

})
