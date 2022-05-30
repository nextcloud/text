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
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import History from '@tiptap/extension-history'
import Blockquote from '@tiptap/extension-blockquote'
import Placeholder from '@tiptap/extension-placeholder'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import CodeBlock from '@tiptap/extension-code-block'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Dropcursor from '@tiptap/extension-dropcursor'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Table from './nodes/Table.js'
import TableCell from './nodes/TableCell.js'
import TableHeader from './nodes/TableHeader.js'
import TableHeadRow from './nodes/TableHeadRow.js'
import TableRow from './nodes/TableRow.js'
/* eslint-enable import/no-named-as-default */

// fixing "The type 'EditorState' is undefined"
import { EditorState } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

import { Editor } from '@tiptap/core'
import { Strong, Italic, Strike, Link, Underline } from './marks/index.js'
import {
	Image,
	PlainTextDocument,
	TrailingNode,
	Heading,
	BulletList,
	TaskList,
	TaskItem,
	Callout,
} from './nodes/index.js'
import { Markdown, Emoji } from './extensions/index.js'
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

const editorDecorations = (/** @param {EditorState} state */ state) => {
	const decorations = []
	state.doc.descendants((node, pos) => {
		if (node.type.name === Heading.name && node.attrs?.id) {
			decorations.push(
				Decoration.widget(pos + 1, () => {
					const link = document.createElement('a')
					link.ariaHidden = true
					link.href = `#${node.attrs.id}`
					link.classList.add('anchor-link')
					link.title = t('text', 'Permalink')
					link.appendChild(document.createTextNode('#'))
					return link
				}, {
					side: -1,
					key: `${pos}#${node.attrs.id}`, // Prevent decoration rendering loops
				})
			)
			return false
		}
		return true
	})
	return decorations.length > 0 ? DecorationSet.create(state.doc, decorations) : null
}

const createEditor = ({ content, onCreate, onUpdate, extensions, enableRichEditing, currentDirectory }) => {
	let richEditingExtensions = []
	if (enableRichEditing) {
		richEditingExtensions = [
			Markdown,
			Document,
			Paragraph,
			Heading,
			Strong,
			Italic,
			Strike,
			Link.configure({ openOnClick: true }),
			Blockquote,
			CodeBlock,
			BulletList,
			HorizontalRule,
			OrderedList,
			ListItem,
			Table,
			TableCell,
			TableHeader,
			TableHeadRow,
			TableRow,
			TaskList,
			TaskItem,
			Callout,
			Underline,
			Image.configure({ currentDirectory, inline: true }),
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
		richEditingExtensions = [
			PlainTextDocument,
			CodeBlockLowlight,
		]
	}
	extensions = extensions || []
	const editor = new Editor({
		content,
		onCreate,
		onUpdate,
		extensions: [
			Text,
			History,
			...richEditingExtensions,
		].concat(extensions),
	})
	editor.view.props.decorations = editorDecorations
	return editor
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
