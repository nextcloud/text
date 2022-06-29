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
		key: 'undo',
		label: t('text', 'Undo'),
		keyChar: 'z',
		keyModifiers: ['ctrl'],
		icon: Undo,
		action: (command) => command.undo(),
		priority: 5,
		position: 'top',
	},
	{
		key: 'redo',
		label: t('text', 'Redo'),
		keyChar: 'y',
		keyModifiers: ['ctrl'],
		icon: Redo,
		action: (command) => command.redo(),
		priority: 11,
		position: 'top',
	},
	{
		key: 'style',
		label: t('text', 'Style'),
		keyModifiers: ['ctrl', 'shift'],
		visible: false,
		icon: FormatBold,
		isActive: 'styling',
		children: [
			{
				key: 'bold',
				label: t('text', 'Bold'),
				keyChar: 'b',
				keyModifiers: ['ctrl'],
				icon: FormatBold,
				isActive: 'strong',
				action: (command) => {
					return command.toggleBold()
				},
				priority: 6,
				position: 'top',
			},
			{
				key: 'italic',
				label: t('text', 'Italic'),
				keyChar: 'i',
				keyModifiers: ['ctrl'],
				icon: FormatItalic,
				isActive: 'em',
				action: (command) => {
					return command.toggleItalic()
				},
				priority: 7,
				position: 'top',
			},
			{
				key: 'underline',
				label: t('text', 'Underline'),
				keyChar: 'u',
				keyModifiers: ['ctrl'],
				icon: FormatUnderline,
				isActive: 'underline',
				action: (command) => {
					return command.toggleUnderline()
				},
				priority: 14,
				position: 'top',
			},
			{
				key: 'strikethrough',
				label: t('text', 'Strikethrough'),
				keyChar: 'd',
				keyModifiers: ['ctrl'],
				icon: FormatStrikethrough,
				isActive: 'strike',
				action: (command) => {
					return command.toggleStrike()
				},
				priority: 15,
				position: 'top',
			},
		],
		priority: 1,
		position: 'top',
	},
	{
		key: 'headings',
		label: t('text', 'Headings'),
		keyChar: '1…6',
		keyModifiers: ['ctrl', 'shift'],
		visible: false,
		icon: FormatHeader1,
		isActive: 'heading',
		children: [
			{
				key: 'headings-h1',
				label: t('text', 'Heading 1'),
				icon: FormatHeader1,
				isActive: ['heading', { level: 1 }],
				action: (command) => {
					return command.toggleHeading({ level: 1 })
				},
			},
			{
				key: 'headings-h2',
				label: t('text', 'Heading 2'),
				icon: FormatHeader2,
				isActive: ['heading', { level: 2 }],
				action: (command) => {
					return command.toggleHeading({ level: 2 })
				},
			},
			{
				key: 'headings-h3',
				label: t('text', 'Heading 3'),
				icon: FormatHeader3,
				isActive: ['heading', { level: 3 }],
				action: (command) => {
					return command.toggleHeading({ level: 3 })
				},
			},
			{
				key: 'headings-h4',
				label: t('text', 'Heading 4'),
				isActive: ['heading', { level: 4 }],
				icon: FormatHeader4,
				action: (command) => {
					return command.toggleHeading({ level: 4 })
				},
			},
			{
				key: 'headings-h5',
				label: t('text', 'Heading 5'),
				isActive: ['heading', { level: 5 }],
				icon: FormatHeader5,
				action: (command) => {
					return command.toggleHeading({ level: 5 })
				},
			},
			{
				key: 'headings-h6',
				label: t('text', 'Heading 6'),
				isActive: ['heading', { level: 6 }],
				icon: FormatHeader6,
				action: (command) => {
					return command.toggleHeading({ level: 6 })
				},
			},
		],
		priority: 1,
		position: 'top',
	},
	{
		key: 'lists',
		label: t('text', 'Lists'),
		keyChar: '1…6',
		keyModifiers: ['ctrl', 'shift'],
		visible: false,
		icon: FormatListBulleted,
		isActive: ['bulletList', 'orderedList', 'taskList'],
		children: [
			{
				key: 'unordered-list',
				label: t('text', 'Unordered list'),
				icon: FormatListBulleted,
				isActive: 'bulletList',
				keyChar: '8',
				keyModifiers: ['ctrl', 'shift'],
				action: (command) => {
					return command.toggleBulletList()
				},
			},
			{
				key: 'ordered-list',
				label: t('text', 'Ordered list'),
				icon: FormatListNumbered,
				isActive: 'orderedList',
				keyChar: '9',
				keyModifiers: ['ctrl', 'shift'],
				action: (command) => {
					return command.toggleOrderedList()
				},
			},
			{
				key: 'task-list',
				label: t('text', 'To-Do list'),
				icon: FormatListCheckbox,
				isActive: 'taskList',
				action: (command) => command.toggleTaskList(),
			},
		],
		priority: 1,
		position: 'top',
	},
	{
		key: 'blocks',
		label: t('text', 'Blocks'),
		keyModifiers: ['ctrl', 'shift'],
		visible: false,
		icon: FormatQuote,
		isActive: 'blocks',
		children: [
			{
				key: 'blockquote',
				label: t('text', 'Blockquote'),
				keyChar: '>',
				keyModifiers: ['ctrl'],
				isActive: 'blockquote',
				icon: FormatQuote,
				action: (command) => {
					return command.toggleBlockquote()
				},
			},
			{
				key: 'callout-info',
				label: t('text', 'Info'),
				isActive: ['callout', { type: 'info' }],
				icon: Info,
				action: (command) => {
					return command.toggleCallout({ type: 'info' })
				},
			},
			{
				key: 'callout-success',
				label: t('text', 'Success'),
				isActive: ['callout', { type: 'success' }],
				icon: Positive,
				action: (command) => {
					return command.toggleCallout({ type: 'success' })
				},
			},
			{
				key: 'callout-warn',
				label: t('text', 'Warning'),
				isActive: ['callout', { type: 'warn' }],
				icon: Warn,
				action: (command) => {
					return command.toggleCallout({ type: 'warn' })
				},
			},
			{
				key: 'callout-error',
				label: t('text', 'Danger'),
				isActive: ['callout', { type: 'error' }],
				icon: Danger,
				action: (command) => {
					return command.toggleCallout({ type: 'error' })
				},
			},
			{
				key: 'code-block',
				label: t('text', 'Code block'),
				isActive: 'codeBlock',
				icon: CodeTags,
				action: (command) => {
					return command.toggleCodeBlock()
				},
			},
		],
		priority: 1,
		position: 'bottom',
	},
	{
		key: 'table',
		label: t('text', 'Table'),
		isActive: 'table',
		icon: Table,
		action: (command) => {
			return command.insertTable()
		},
		priority: 16,
		position: 'bottom',
	},
	{
		key: 'emoji-picker',
		label: t('text', 'Insert emoji'),
		icon: Emoticon,
		component: EmojiPickerAction,
		action: (command, emojiObject = {}) => {
			return command.emoji(emojiObject)
		},
		priority: 4,
		position: 'bottom',
	},
	{
		key: 'insert-image',
		label: t('text', 'Insert image'),
		icon: Images,
		component: ActionImageUpload,
		priority: 2,
		position: 'bottom',
	},
	{
		key: 'formatting-help',
		label: t('text', 'Formatting help'),
		icon: Help,
		click: (view) => view.$emit('call:help'),
		priority: 17,
		position: 'bottom',
	},
]
