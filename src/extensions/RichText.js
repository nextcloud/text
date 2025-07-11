/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { createLowlight, common } from 'lowlight'

/* eslint-disable import/no-named-as-default */
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from './../nodes/BulletList.js'
import Callouts from './../nodes/Callouts.js'
import CharacterCount from '@tiptap/extension-character-count'
import Code from '@tiptap/extension-code'
import CodeBlock from './../nodes/CodeBlock.js'
import Details from './../nodes/Details.js'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import EditableTable from './../nodes/EditableTable.js'
import Emoji from './Emoji.js'
import EmojiSuggestion from './../components/Suggestion/Emoji/suggestions.js'
import FrontMatter from './../nodes/FrontMatter.js'
import Gapcursor from '@tiptap/extension-gapcursor'
import HardBreak from './../nodes/HardBreak.js'
import Heading from '../nodes/Heading.js'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Image from './../nodes/Image.js'
import ImageInline from './../nodes/ImageInline.js'
import KeepSyntax from './KeepSyntax.js'
import Keymap from './Keymap.js'
import LinkBubble from './../extensions/LinkBubble.js'
import LinkPicker from './../extensions/LinkPicker.js'
import ListItem from '@tiptap/extension-list-item'
import Markdown from './../extensions/Markdown.js'
import Mention from './../extensions/Mention.js'
import MentionSuggestion from '../components/Suggestion/Mention/suggestions.js'
import OrderedList from './../nodes/OrderedList.js'
import Paragraph from './../nodes/Paragraph.js'
import Preview from './../nodes/Preview.js'
import Search from './../extensions/Search.js'
import Table from './../nodes/Table.js'
import TaskItem from './../nodes/TaskItem.js'
import TaskList from './../nodes/TaskList.js'
import Text from '@tiptap/extension-text'
import TextDirection from 'tiptap-text-direction'
import TrailingNode from './../nodes/TrailingNode.js'
/* eslint-enable import/no-named-as-default */

import { Strong, Italic, Strike, Link, Underline } from './../marks/index.js'

const lowlight = createLowlight(common)
lowlight.registerAlias('plaintext', 'mermaid')

export default Extension.create({
	name: 'RichText',

	addOptions() {
		return {
			connection: null,
			editing: true,
			extensions: [],
			relativePath: null,
			isEmbedded: false,
		}
	},

	addExtensions() {
		const defaultExtensions = [
			this.options.editing ? Markdown : null,
			Document,
			Text,
			Paragraph,
			HardBreak,
			Heading,
			Strong,
			Italic,
			Strike,
			Blockquote,
			CharacterCount,
			Code,
			CodeBlock.configure({
				lowlight,
				defaultLanguage: 'plaintext',
			}),
			Details,
			BulletList,
			HorizontalRule,
			OrderedList,
			ListItem,
			this.options.editing ? EditableTable : Table,
			TaskList,
			TaskItem,
			Callouts,
			Preview.configure({
				isEmbedded: this.options.isEmbedded,
			}),
			Underline,
			Image,
			ImageInline,
			Dropcursor,
			Gapcursor,
			KeepSyntax,
			Keymap,
			FrontMatter,
			Mention.configure({
				suggestion: MentionSuggestion({
					connection: this.options.connection,
				}),
			}),
			Search,
			Emoji.configure({
				suggestion: EmojiSuggestion(),
			}),
			LinkPicker,
			Link.configure({
				openOnClick: true,
				shouldAutoLink: (href) => /^https?:\/\//.test(href),
				relativePath: this.options.relativePath,
			}),
			LinkBubble,
			TrailingNode,
			TextDirection.configure({
				types: ['heading', 'paragraph', 'listItem', 'orderedList'],
			}),
		]
		const additionalExtensionNames = this.options.extensions.map((e) => e.name)
		return [
			...defaultExtensions.filter(
				(e) => e && !additionalExtensionNames.includes(e.name),
			),
			...this.options.extensions,
		]
	},
})
