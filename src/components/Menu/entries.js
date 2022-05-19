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

import {
	Undo,
	Redo,
	FormatBold,
	FormatItalic,
	FormatUnderline,
	FormatStrikethrough,
	FormatHeader1,
	FormatHeader2,
	FormatHeader3,
	FormatHeader4,
	FormatHeader5,
	FormatHeader6,
	FormatListNumbered,
	FormatListBulleted,
	FormatListCheckbox,
	FormatQuote,
	Info,
	Positive,
	Warn,
	Danger,
	CodeTags,
	Table,
	Emoticon,
	Help,
	Images,
} from '../icons.js'
import EmojiPickerAction from './EmojiPickerAction.vue'
import ActionImageUpload from './ActionImageUpload.vue'

export default [
	{
		_key: 'undo',
		label: t('text', 'Undo'),
		keyChar: 'z',
		keyModifiers: ['ctrl'],
		class: 'icon-undo',
		icon: Undo,
		action: (command) => command.undo(),
		priority: 5,
	},
	{
		_key: 'redo',
		label: t('text', 'Redo'),
		keyChar: 'y',
		keyModifiers: ['ctrl'],
		class: 'icon-redo',
		icon: Redo,
		action: (command) => command.redo(),
		priority: 11,
	},
	{
		_key: 'bold',
		label: t('text', 'Bold'),
		keyChar: 'b',
		keyModifiers: ['ctrl'],
		class: 'icon-bold',
		icon: FormatBold,
		isActive: 'strong',
		action: (command) => {
			return command.toggleBold()
		},
		priority: 6,
	},
	{
		_key: 'italic',
		label: t('text', 'Italic'),
		keyChar: 'i',
		keyModifiers: ['ctrl'],
		class: 'icon-italic',
		icon: FormatItalic,
		isActive: 'em',
		action: (command) => {
			return command.toggleItalic()
		},
		priority: 7,
	},
	{
		_key: 'underline',
		label: t('text', 'Underline'),
		keyChar: 'u',
		keyModifiers: ['ctrl'],
		class: 'icon-underline',
		icon: FormatUnderline,
		isActive: 'underline',
		action: (command) => {
			return command.toggleUnderline()
		},
		priority: 14,
	},
	{
		_key: 'strikethrough',
		label: t('text', 'Strikethrough'),
		keyChar: 'd',
		keyModifiers: ['ctrl'],
		class: 'icon-strike',
		icon: FormatStrikethrough,
		isActive: 'strike',
		action: (command) => {
			return command.toggleStrike()
		},
		priority: 15,
	},
	{
		_key: 'headings',
		label: t('text', 'Headings'),
		keyChar: '1…6',
		keyModifiers: ['ctrl', 'shift'],
		visible: false,
		icon: FormatHeader1,
		children: [
			{
				_key: 'headings-01',
				label: t('text', 'Heading 1'),
				class: 'icon-h1',
				icon: FormatHeader1,
				isActive: ['heading', { level: 1 }],
				action: (command) => {
					return command.toggleHeading({ level: 1 })
				},
			},
			{
				_key: 'headings-02',
				label: t('text', 'Heading 2'),
				class: 'icon-h2',
				icon: FormatHeader2,
				isActive: ['heading', { level: 2 }],
				action: (command) => {
					return command.toggleHeading({ level: 2 })
				},
			},
			{
				_key: 'headings-03',
				label: t('text', 'Heading 3'),
				class: 'icon-h3',
				icon: FormatHeader3,
				isActive: ['heading', { level: 3 }],
				action: (command) => {
					return command.toggleHeading({ level: 3 })
				},
			},
			{
				_key: 'headings-04',
				label: t('text', 'Heading 4'),
				class: 'icon-h4',
				isActive: ['heading', { level: 4 }],
				icon: FormatHeader4,
				action: (command) => {
					return command.toggleHeading({ level: 4 })
				},
			},
			{
				_key: 'headings-05',
				label: t('text', 'Heading 5'),
				class: 'icon-h5',
				isActive: ['heading', { level: 5 }],
				icon: FormatHeader5,
				action: (command) => {
					return command.toggleHeading({ level: 5 })
				},
			},
			{
				_key: 'headings-06',
				label: t('text', 'Heading 6'),
				class: 'icon-h6',
				isActive: ['heading', { level: 6 }],
				icon: FormatHeader6,
				action: (command) => {
					return command.toggleHeading({ level: 6 })
				},
			},
		],
		priority: 1,
	},
	{
		_key: 'unordered-list',
		label: t('text', 'Unordered list'),
		keyChar: '8',
		keyModifiers: ['ctrl', 'shift'],
		class: 'icon-ul',
		isActive: 'bulletList',
		icon: FormatListBulleted,
		action: (command) => {
			return command.toggleBulletList()
		},
		priority: 8,
	},
	{
		_key: 'ordered-list',
		label: t('text', 'Ordered list'),
		keyChar: '9',
		keyModifiers: ['ctrl', 'shift'],
		class: 'icon-ol',
		isActive: 'orderedList',
		icon: FormatListNumbered,
		action: (command) => {
			return command.toggleOrderedList()
		},
		priority: 9,
	},
	{
		_key: 'todo-list',
		label: t('text', 'ToDo list'),
		class: 'icon-tasklist',
		isActive: 'taskList',
		icon: FormatListCheckbox,
		action: (command) => command.toggleTaskList(),
		priority: 10,
	},
	{
		_key: 'blockquote',
		label: t('text', 'Blockquote'),
		keyChar: '>',
		keyModifiers: ['ctrl'],
		class: 'icon-quote',
		isActive: 'blockquote',
		icon: FormatQuote,
		action: (command) => {
			return command.toggleBlockquote()
		},
		priority: 12,
	},
	{
		_key: 'callouts',
		label: t('text', 'Callouts'),
		visible: false,
		icon: Info,
		children: [
			{
				_key: 'info',
				label: t('text', 'Info'),
				class: 'icon-info',
				isActive: ['callout', { type: 'info' }],
				icon: Info,
				action: (command) => {
					return command.toggleCallout({ type: 'info' })
				},
			},
			{
				_key: 'success',
				label: t('text', 'Success'),
				class: 'icon-success',
				isActive: ['callout', { type: 'success' }],
				icon: Positive,
				action: (command) => {
					return command.toggleCallout({ type: 'success' })
				},
			},
			{
				_key: 'warning',
				label: t('text', 'Warning'),
				class: 'icon-warn',
				isActive: ['callout', { type: 'warn' }],
				icon: Warn,
				action: (command) => {
					return command.toggleCallout({ type: 'warn' })
				},
			},
			{
				_key: 'danger',
				label: t('text', 'Danger'),
				class: 'icon-error',
				isActive: ['callout', { type: 'error' }],
				icon: Danger,
				action: (command) => {
					return command.toggleCallout({ type: 'error' })
				},
			},
		],
		priority: 3,
	},
	{
		_key: 'code-block',
		label: t('text', 'Code block'),
		class: 'icon-code',
		isActive: 'codeBlock',
		icon: CodeTags,
		action: (command) => {
			return command.toggleCodeBlock()
		},
		priority: 13,
	},
	{
		_key: 'table',
		label: t('text', 'Table'),
		class: 'icon-table',
		isActive: 'table',
		icon: Table,
		action: (command) => {
			return command.insertTable()
		},
		priority: 16,
	},
	{
		_key: 'emoji-picker',
		label: t('text', 'Insert emoji'),
		class: 'icon-emoji',
		icon: Emoticon,
		component: EmojiPickerAction,
		action: (command, emojiObject = {}) => {
			return command.emoji(emojiObject)
		},
		priority: 4,
	},
	{
		_key: 'insert-image',
		label: t('text', 'Insert image'),
		class: 'icon-image',
		icon: Images,
		component: ActionImageUpload,
		priority: 2,
	},
	{
		_key: 'formatting-help',
		label: t('text', 'Formatting help'),
		class: 'icon-help',
		icon: Help,
		click: (view) => view.$emit('show-help'),
		priority: 17,
	},
]
