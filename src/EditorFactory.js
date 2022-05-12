/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
*/

/* eslint-disable import/no-named-as-default */
import Dropcursor from '@tiptap/extension-dropcursor'
import History from '@tiptap/extension-history'
import Placeholder from '@tiptap/extension-placeholder'
/* eslint-enable import/no-named-as-default */

import { TrailingNode } from './nodes/index.js'
import { Editor } from '@tiptap/core'
import { Emoji, Markdown, PlainText, RichText } from './extensions/index.js'
import { translate as t } from '@nextcloud/l10n'
import { listLanguages, registerLanguage } from 'lowlight/lib/core'
import { emojiSearch } from '@nextcloud/vue/dist/Functions/emoji'
import { VueRenderer } from '@tiptap/vue-2'
import EmojiList from './components/EmojiList.vue'
import tippy from 'tippy.js'

import 'proxy-polyfill'

const loadSyntaxHighlight = async (language) => {
	const list = listLanguages()
	console.info(list)
	if (!listLanguages().includes(language)) {
		try {
			const syntax = await import(/* webpackChunkName: "highlight/[request]" */'highlight.js/lib/languages/' + language)
			registerLanguage(language, syntax.default)
		} catch (e) {
			// No matching highlighing found, fallback to none
			console.debug(e)
		}
	}
}

const createEditor = ({ content, onCreate, onUpdate, extensions, enableRichEditing }) => {
	let richEditingExtensions = []
	if (enableRichEditing) {
		richEditingExtensions = [
			Markdown,
			RichText,
			Emoji.configure({
				suggestion: {
					items: ({ query }) => {
						return emojiSearch(query)
					},
					render: () => {
						let component
						let popup

						return {
							onStart: props => {
								component = new VueRenderer(EmojiList, {
									parent: this,
									propsData: props,
								})

								popup = tippy('body', {
									getReferenceClientRect: props.clientRect,
									appendTo: () => document.body,
									content: component.element,
									showOnCreate: true,
									interactive: true,
									trigger: 'manual',
									placement: 'bottom-start',
								})
							},

							onUpdate(props) {
								component.updateProps(props)
								popup[0].setProps({
									getReferenceClientRect: props.clientRect,
								})
							},

							onKeyDown(props) {
								if (props.event.key === 'Escape') {
									popup[0].hide()
									return true
								}
								return component.ref?.onKeyDown(props)
							},

							onExit() {
								popup[0].destroy()
								component.destroy()
							},
						}
					},
				},
			}),
			Placeholder.configure({
				emptyNodeClass: 'is-empty',
				placeholder: t('text', 'Add notes, lists or links …'),
				showOnlyWhenEditable: true,
			}),
			Dropcursor,
			TrailingNode,
		]
	} else {
		richEditingExtensions = [PlainText]
	}
	extensions = extensions || []
	return new Editor({
		content,
		onCreate,
		onUpdate,
		extensions: [
			History,
			...richEditingExtensions,
		].concat(extensions),
	})
}

const SerializeException = function(message) {
	this.message = message
}

const serializePlainText = (tiptap) => {
	const doc = tiptap.getJSON()

	if (doc.content.length !== 1 || typeof doc.content[0].content === 'undefined' || doc.content[0].content.length !== 1) {
		if (doc.content[0].type === 'code_block' && typeof doc.content[0].content === 'undefined') {
			return ''
		}
		throw new SerializeException('Failed to serialize document to plain text')
	}
	const codeBlock = doc.content[0].content[0]
	if (codeBlock.type !== 'text') {
		throw new SerializeException('Failed to serialize document to plain text')
	}
	return codeBlock.text
}

export default createEditor
export { createEditor, serializePlainText, loadSyntaxHighlight }
