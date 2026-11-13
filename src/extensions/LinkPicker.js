/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { PluginKey, TextSelection } from '@tiptap/pm/state'
import { findSuggestionMatch, Suggestion } from '@tiptap/suggestion'
import suggestions from '../components/Suggestion/LinkPicker/suggestions.js'

export const LinkPickerPluginKey = new PluginKey('linkPicker')
export default Extension.create({
	name: 'linkPicker',

	addOptions() {
		return {
			suggestion: {
				char: '/',
				// Typed trigger characters need to follow whitespace, see `shouldShow`
				allowedPrefixes: null,
				pluginKey: LinkPickerPluginKey,
				allow: ({ state, range }) => {
					const $from = state.doc.resolve(range.from)
					return $from.parent.type.name !== 'codeBlock'
				},
				shouldShow: ({ editor, range, text, transaction }) => {
					const typed = findSuggestionMatch({
						char: '/',
						allowSpaces: false,
						allowToIncludeChar: false,
						allowedPrefixes: [' '],
						startOfLine: false,
						$position: transaction.selection.$from,
					})
					if (typed?.range.from === range.from || transaction.getMeta(LinkPickerPluginKey)?.open) {
						return true
					}
					// Keep a link picker opened by `openLinkPicker` open. `editor.state` is the state before `transaction`.
					// Remote changes replace the whole document, so also compare the text.
					const prev = LinkPickerPluginKey.getState(editor.state)
					return prev.active
						&& (transaction.mapping.map(prev.range.from) === range.from || text === prev.text)
				},
				...suggestions(),
			},
		}
	},

	addCommands() {
		return {
			/**
			 * Insert the trigger character after the cursor or selection and open the link picker,
			 * also within words.
			 */
			openLinkPicker: () => ({ editor, state, tr, dispatch }) => {
				const { char, allow } = this.options.suggestion
				const { to } = tr.selection
				if (!allow({ editor, state, range: { from: to, to } })) {
					return false
				}
				if (dispatch) {
					tr.insertText(char, to)
						.setSelection(TextSelection.create(tr.doc, to + char.length))
						.setMeta(LinkPickerPluginKey, { open: true })
				}
				return true
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
