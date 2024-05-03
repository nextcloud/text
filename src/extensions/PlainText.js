/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'

/* eslint-disable import/no-named-as-default */
import Text from '@tiptap/extension-text'
import PlainTextDocument from './../nodes/PlainTextDocument.js'

export default Extension.create({
	name: 'PlainText',

	addExtensions() {
		return [
			PlainTextDocument,
			Text,
		]
	},

})
