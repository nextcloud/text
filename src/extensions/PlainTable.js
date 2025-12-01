/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'

import PlainTableDocument from './../nodes/PlainTableDocument.js'
import EditableTable from './../nodes/EditableTable.js'
import Markdown from './Markdown.js'
import Keymap from './Keymap.js'
/* eslint-disable import/no-named-as-default */
import Text from '@tiptap/extension-text'

export default Extension.create({
	name: 'PlainTable',

	addOptions() {
		return {
			...this.parent?.(),
		}
	},

	addExtensions() {
		return [
			Markdown,
			PlainTableDocument,
			EditableTable,
			Keymap,
			Text,
		]
	},
})
