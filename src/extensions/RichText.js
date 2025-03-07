/**
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license AGPL-3.0-or-later
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

import { Extension } from '@tiptap/core'
import { lowlight } from 'lowlight'

/* eslint-disable import/no-named-as-default */
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from './../nodes/BulletList.js'
import Callouts from './../nodes/Callouts.js'
import CharacterCount from '@tiptap/extension-character-count'
import Code from '@tiptap/extension-code'
import CodeBlock from './../nodes/CodeBlock.js'
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
import LinkPicker from './../extensions/LinkPicker.js'
import LinkBubble from './../extensions/LinkBubble.js'
import ListItem from '@tiptap/extension-list-item'
import Markdown from './../extensions/Markdown.js'
import Mention from './../extensions/Mention.js'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from './../nodes/Paragraph.js'
import Placeholder from '@tiptap/extension-placeholder'
import Preview from './../nodes/Preview.js'
import Table from './../nodes/Table.js'
import TaskItem from './../nodes/TaskItem.js'
import TaskList from './../nodes/TaskList.js'
import Text from '@tiptap/extension-text'
import TrailingNode from './../nodes/TrailingNode.js'
import TextDirection from 'tiptap-text-direction'
/* eslint-enable import/no-named-as-default */

import { Strong, Italic, Strike, Link, Underline } from './../marks/index.js'
import { translate as t } from '@nextcloud/l10n'

lowlight.registerAlias('plaintext', 'mermaid')

export default Extension.create({
	name: 'RichText',

	addOptions() {
		return {
			editing: true,
			extensions: [],
			component: null,
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
			FrontMatter,
			Mention,
			Emoji.configure({
				suggestion: EmojiSuggestion(),
			}),
			LinkPicker,
			Link.configure({
				openOnClick: true,
				validate: href => /^https?:\/\//.test(href),
				relativePath: this.options.relativePath,
			}),
			LinkBubble,
			this.options.editing
				? Placeholder.configure({
					emptyNodeClass: 'is-empty',
					placeholder: t('text', 'Add notes, lists or links …'),
					showOnlyWhenEditable: true,
				})
				: null,
			TrailingNode,
			TextDirection.configure({
				types: ['heading', 'paragraph', 'listItem', 'orderedList'],
			}),
		]
		const additionalExtensionNames = this.options.extensions.map(e => e.name)
		return [
			...defaultExtensions.filter(e => e && !additionalExtensionNames.includes(e.name)),
			...this.options.extensions,
		]
	},

})
