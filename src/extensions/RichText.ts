/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { Extensions } from '@tiptap/core'

import { t } from '@nextcloud/l10n'
import { Extension } from '@tiptap/core'
import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import { ListItem } from '@tiptap/extension-list'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import { CharacterCount, Dropcursor, Gapcursor } from '@tiptap/extensions'
import { common, createLowlight } from 'lowlight'
import EmojiSuggestion from '../components/Suggestion/Emoji/suggestions.js'
import MentionSuggestion from '../components/Suggestion/Mention/suggestions.js'
import {
	Code,
	Highlight,
	Italic,
	Link,
	Strike,
	Strong,
	Underline,
} from '../marks/index.js'
import BulletList from '../nodes/BulletList.ts'
import Callouts from '../nodes/Callout.js'
import CodeBlock from '../nodes/CodeBlock.js'
import Details from '../nodes/Details.js'
import EditableTable from '../nodes/EditableTable.js'
import Footnotes from '../nodes/Footnotes.ts'
import FrontMatter from '../nodes/FrontMatter.js'
import HardBreak from '../nodes/HardBreak.js'
import Heading from '../nodes/Heading.js'
import HorizontalRule from '../nodes/HorizontalRule.ts'
import Image from '../nodes/Image.js'
import ImageInline from '../nodes/ImageInline.js'
import { MathBlock, MathInline } from '../nodes/Mathematics.js'
import OrderedList from '../nodes/OrderedList.ts'
import Paragraph from '../nodes/Paragraph.js'
import Preview from '../nodes/Preview.js'
import Table from '../nodes/Table.js'
import TaskItem from '../nodes/TaskItem.ts'
import TaskList from '../nodes/TaskList.ts'
import TrailingNode from '../nodes/TrailingNode.js'
import Emoji from './Emoji.js'
import KeepSyntax from './KeepSyntax.js'
import Keymap from './Keymap.js'
import LinkBubble from './LinkBubble.js'
import LinkPicker from './LinkPicker.js'
import Markdown from './Markdown.js'
import Mention from './Mention.js'
import Search from './Search.ts'
import TextDirection from './TextDirection.ts'
import Typography from './Typography.ts'

const lowlight = createLowlight(common)
lowlight.registerAlias('plaintext', 'mermaid')

export default Extension.create({
	name: 'RichText',

	addOptions() {
		return {
			connection: null,
			editing: true,
			extensions: [] as Extensions,
			relativePath: undefined,
			isEmbedded: false,
			mentionSearch: undefined,
			openLink: undefined,
			noLazyImages: false,
		}
	},

	addExtensions() {
		const defaultExtensions = [
			Markdown,
			Document.extend({
				content: 'block+ footnotes?',
			}),
			Text,
			Paragraph,
			HardBreak,
			Heading,
			Strong,
			Highlight,
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
			Footnotes,
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
			Image.configure({ noLazyImages: this.options.noLazyImages }),
			ImageInline.configure({ noLazyImages: this.options.noLazyImages }),
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
					options: {
						mentionSearch: this.options.mentionSearch,
					},
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
				openLink: this.options.openLink,
			}),
			LinkBubble,
			...(this.options.editing
				? [ Placeholder.configure({
						placeholder: t('text', "Start writing or type '/' to add…"),
					})]
				: []),
			TrailingNode.configure({
				notAfter: ['paragraph', 'footnotes'],
			}),
			TextDirection.configure({
				types: [
					'blockquote',
					'callout',
					'detailsSummary',
					'footnote',
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
		] as const
		const additionalExtensionNames = this.options.extensions.map((e: Extension) => e.name)
		return [
			...defaultExtensions.filter((e) => e && !additionalExtensionNames.includes(e.name)),
			...this.options.extensions,
		]
	},
})
