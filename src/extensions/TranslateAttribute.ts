/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

const translateAttributeKey = new PluginKey('translateAttribute')

export default Extension.create({
	name: 'TranslateAttribute',

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: translateAttributeKey,
				props: {
					attributes: () => ({
						translate: this.editor.isEditable ? 'no' : 'yes',
					}),
				},
			}),
		]
	},
})
