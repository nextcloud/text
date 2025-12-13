/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'

import EditableTable from './../nodes/EditableTable.js'
import Paragraph from './../nodes/Paragraph.js'
import PlainTableDocument from './../nodes/PlainTableDocument.js'
import Keymap from './Keymap.js'
import Markdown from './Markdown.js'
/* eslint-disable import/no-named-as-default */
import Text from '@tiptap/extension-text'

export default Extension.create({
	name: 'PlainTable',

	addExtensions() {
		return [Markdown, Paragraph, PlainTableDocument, EditableTable, Keymap, Text]
	},
})
