/*
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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

import { Extension } from '@tiptap/core'

/* eslint-disable import/no-named-as-default */
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Blockquote from '@tiptap/extension-blockquote'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Dropcursor from '@tiptap/extension-dropcursor'
import FrontMatter from './../nodes/FrontMatter.js'
import Paragraph from './../nodes/Paragraph.js'
import HardBreak from './HardBreak.js'
import KeepSyntax from './KeepSyntax.js'
import Table from './../nodes/Table.js'
import Image from './../nodes/Image.js'
import ImageInline from './../nodes/ImageInline.js'
import Heading from '../nodes/Heading/index.js'
import BulletList from './../nodes/BulletList.js'
import TaskList from './../nodes/TaskList.js'
import TaskItem from './../nodes/TaskItem.js'
import Callout from './../nodes/Callouts.js'
import Mention from './../extensions/Mention.js'
/* eslint-enable import/no-named-as-default */

import { Strong, Italic, Strike, Link, Underline } from './../marks/index.js'

export default Extension.create({
	name: 'RichText',

	addOptions() {
		return {
			link: {},
			extensions: [],
		}
	},

	addExtensions() {
		const defaultExtensions = [
			Document,
			Text,
			Paragraph,
			HardBreak,
			Heading,
			Strong,
			Italic,
			Strike,
			Blockquote,
			Code,
			CodeBlock,
			BulletList,
			HorizontalRule,
			OrderedList,
			ListItem,
			Table,
			TaskList,
			TaskItem,
			Callout,
			Underline,
			Image,
			ImageInline,
			Dropcursor,
			KeepSyntax,
			FrontMatter,
			Mention.configure({
				HTMLAttributes: {
					class: 'mention',
				},
			}),
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
			...this.options.extensions,
			...defaultExtensions.filter(e => !additionalExtensionNames.includes(e.name)),
		]
	},

})
