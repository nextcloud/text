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
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Blockquote from '@tiptap/extension-blockquote'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import CodeBlock from '@tiptap/extension-code-block'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Dropcursor from '@tiptap/extension-dropcursor'
import HardBreak from './HardBreak.js'
/*
import Table from './../nodes/Table.js'
import TableCell from './../nodes/TableCell.js'
import TableHeader from './../nodes/TableHeader.js'
import TableHeadRow from './../nodes/TableHeadRow.js'
import TableRow from './../nodes/TableRow.js'
*/
/* eslint-enable import/no-named-as-default */

import { Strong, Italic, Strike, Link, Underline } from './../marks/index.js'
import {
	Image,
	Heading,
	BulletList,
	TaskList,
	TaskItem,
	Callout,
} from './../nodes/index.js'

export default Extension.create({
	name: 'RichText',

	addOptions() {
		return {
			currentDirectory: undefined,
		}
	},

	addExtensions() {
		const extensions = [
			Document,
			Text,
			Paragraph,
			HardBreak,
			Heading,
			Strong,
			Italic,
			Strike,
			Blockquote,
			CodeBlock,
			BulletList,
			HorizontalRule,
			OrderedList,
			ListItem,
/*			Table,
			TableCell,
			TableHeader,
			TableHeadRow,
			TableRow,
*/
			TaskList,
			TaskItem,
			Callout,
			Underline,
			Image.configure({
				currentDirectory: this.options.currentDirectory,
				inline: true,
			}),
			Dropcursor,
		]
		if (this.options.link !== false) {
			extensions.push(Link.configure({ openOnClick: true }))
		}
		return extensions
	},

})
