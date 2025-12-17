/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'
import { Extension } from '@tiptap/core'
/* eslint-disable import/no-named-as-default */
import Blockquote from '@tiptap/extension-blockquote'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { ListItem } from '@tiptap/extension-list'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
/* eslint-enable import/no-named-as-default */
import { CharacterCount, Dropcursor, Gapcursor } from '@tiptap/extensions'
import { common, createLowlight } from 'lowlight'
import MentionSuggestion from '../components/Suggestion/Mention/suggestions.js'
import Heading from '../nodes/Heading.js'
import EmojiSuggestion from './../components/Suggestion/Emoji/suggestions.js'
import LinkBubble from './../extensions/LinkBubble.js'
import LinkPicker from './../extensions/LinkPicker.js'
import Markdown from './../extensions/Markdown.js'
import Mention from './../extensions/Mention.js'
import Search from './../extensions/Search.ts'
import TextDirection from './../extensions/TextDirection.ts'
import Typography from './../extensions/Typography.ts'
import { Italic, Link, Strike, Strong, Underline } from './../marks/index.js'
import BulletList from './../nodes/BulletList.js'
import Callouts from './../nodes/Callouts.js'
import CodeBlock from './../nodes/CodeBlock.js'
import Details from './../nodes/Details.js'
import EditableTable from './../nodes/EditableTable.js'
import FrontMatter from './../nodes/FrontMatter.js'
import HardBreak from './../nodes/HardBreak.js'
import Image from './../nodes/Image.js'
import ImageInline from './../nodes/ImageInline.js'
import { MathBlock, MathInline } from './../nodes/Mathematics.js'
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
			Markdown,
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
			Dropcursor.configure({
				color: 'var(--color-primary-element)',
				width: 2,
			}),
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
			this.options.editing
				? Placeholder.configure({
						placeholder: t('text', "Start writing or type '/' to add…"),
					})
				: null,
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
			MathInline,
			MathBlock,
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
