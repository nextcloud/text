/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { common, createLowlight } from 'lowlight'

/* eslint-disable import/no-named-as-default */
import Blockquote from '@tiptap/extension-blockquote'
import CharacterCount from '@tiptap/extension-character-count'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import ListItem from '@tiptap/extension-list-item'
import Text from '@tiptap/extension-text'
import MentionSuggestion from '../components/Suggestion/Mention/suggestions.js'
import Heading from '../nodes/Heading.js'
import EmojiSuggestion from './../components/Suggestion/Emoji/suggestions.js'
import LinkBubble from './../extensions/LinkBubble.js'
import LinkPicker from './../extensions/LinkPicker.js'
import Markdown from './../extensions/Markdown.js'
import Mention from './../extensions/Mention.js'
import Search from './../extensions/Search.js'
import TextDirection from './../extensions/TextDirection.ts'
import Typography from './../extensions/Typography.ts'
import BulletList from './../nodes/BulletList.js'
import Callouts from './../nodes/Callouts.js'
import CodeBlock from './../nodes/CodeBlock.js'
import Details from './../nodes/Details.js'
import EditableTable from './../nodes/EditableTable.js'
import FrontMatter from './../nodes/FrontMatter.js'
import HardBreak from './../nodes/HardBreak.js'
import Image from './../nodes/Image.js'
import ImageInline from './../nodes/ImageInline.js'
import OrderedList from './../nodes/OrderedList.js'
import Paragraph from './../nodes/Paragraph.js'
import Preview from './../nodes/Preview.js'
import Table from './../nodes/Table.js'
import TaskItem from './../nodes/TaskItem.js'
import TaskList from './../nodes/TaskList.js'
import TrailingNode from './../nodes/TrailingNode.js'
import Emoji from './Emoji.js'
import KeepSyntax from './KeepSyntax.js'
import Keymap from './Keymap.js'
/* eslint-enable import/no-named-as-default */

import { Italic, Link, Strike, Strong, Underline } from './../marks/index.js'

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
				types: [
					'blockquote',
					'callout',
					'detailsSummary',
					'heading',
					'listItem',
					'paragraph',
					'tableCell',
					'tableHeader',
					'taskItem',
				],
			}),
			Typography,
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
