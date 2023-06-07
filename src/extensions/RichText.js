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

/* eslint-disable import/no-named-as-default */
import History from '@tiptap/extension-history'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from './../nodes/BulletList.js'
import Callout from './../nodes/Callouts.js'
import CharacterCount from '@tiptap/extension-character-count'
import Code from '@tiptap/extension-code'
import CodeBlock from './../nodes/CodeBlock.js'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Emoji from './Emoji.js'
import EmojiSuggestion from './../components/Suggestion/Emoji/suggestions.js'
import FrontMatter from './../nodes/FrontMatter.js'
import Paragraph from './../nodes/Paragraph.js'
import HardBreak from './../nodes/HardBreak.js'
import Heading from '../nodes/Heading/index.js'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Image from './../nodes/Image.js'
import ImageInline from './../nodes/ImageInline.js'
import KeepSyntax from './KeepSyntax.js'
import ListItem from '@tiptap/extension-list-item'
import Markdown from './../extensions/Markdown.js'
import Mention from './../extensions/Mention.js'
import LinkPicker from './../extensions/LinkPicker.js'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from '@tiptap/extension-placeholder'
import Table from './../nodes/Table.js'
import EditableTable from './../nodes/EditableTable.js'
import TaskItem from './../nodes/TaskItem.js'
import TaskList from './../nodes/TaskList.js'
import Text from '@tiptap/extension-text'
import TrailingNode from './../nodes/TrailingNode.js'
/* eslint-enable import/no-named-as-default */

import { Strong, Italic, Strike, Link, Underline } from './../marks/index.js'
import { translate as t } from '@nextcloud/l10n'

export default Extension.create({
	name: 'RichText',

	addOptions() {
		return {
			editing: true,
			link: {},
			extensions: [],
			component: null,
			relativePath: null,
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
			CodeBlock,
			BulletList,
			HorizontalRule,
			OrderedList,
			ListItem,
			this.options.editing ? EditableTable : Table,
			TaskList,
			TaskItem,
			Callout,
			Underline,
			Image,
			ImageInline,
			Dropcursor,
			KeepSyntax,
			FrontMatter,
			Mention,
			History,
			Emoji.configure({
				suggestion: EmojiSuggestion(),
			}),
			LinkPicker,
			this.options.editing
				? Placeholder.configure({
					emptyNodeClass: 'is-empty',
					placeholder: t('text', 'Add notes, lists or links …'),
					showOnlyWhenEditable: true,
				})
				: null,
			TrailingNode,
		]
		if (this.options.link !== false) {
			defaultExtensions.push(Link.configure({
				...this.options.link,
				openOnClick: true,
				validate: href => /^https?:\/\//.test(href),
				relativePath: this.options.relativePath,
			}))
		}
		const additionalExtensionNames = this.options.extensions.map(e => e.name)
		return [
			...defaultExtensions.filter(e => e && !additionalExtensionNames.includes(e.name)),
			...this.options.extensions,
		]
	},

})
