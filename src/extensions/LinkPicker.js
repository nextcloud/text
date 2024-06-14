/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { Suggestion } from '@tiptap/suggestion'
import { PluginKey } from '@tiptap/pm/state'
import suggestions from '../components/Suggestion/LinkPicker/suggestions.js'

export const LinkPickerPluginKey = new PluginKey('linkPicker')
export default Extension.create({

	name: 'linkPicker',

	addOptions() {
		return {
			suggestion: {
				char: '/',
				allowedPrefixes: [' '],
				pluginKey: LinkPickerPluginKey,
				allow: ({ state, range }) => {
					const $from = state.doc.resolve(range.from)
					return $from.parent.type.name !== 'codeBlock'
				},
				...suggestions(),
			},
		}
	},

	addProseMirrorPlugins() {
		return [
			Suggestion({
				editor: this.editor,
				...this.options.suggestion,
			}),
		]
	},
})
