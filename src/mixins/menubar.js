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

export default [
	{
		label: t('text', 'Undo'),
		keyChar: 'z',
		keyModifiers: ['ctrl'],
		class: 'icon-undo',
		action: (command) => command.undo(),
	},
	{
		label: t('text', 'Redo'),
		keyChar: 'y',
		keyModifiers: ['ctrl'],
		class: 'icon-redo',
		action: (command) => command.redo(),
	},
	{
		label: t('text', 'Bold'),
		keyChar: 'b',
		keyModifiers: ['ctrl'],
		class: 'icon-bold',
		isActive: 'strong',
		action: (command) => {
			return command.toggleBold()
		},
	},
	{
		label: t('text', 'Italic'),
		keyChar: 'i',
		keyModifiers: ['ctrl'],
		class: 'icon-italic',
		isActive: 'em',
		action: (command) => {
			return command.toggleItalic()
		},
	},
	{
		label: t('text', 'Underline'),
		keyChar: 'u',
		keyModifiers: ['ctrl'],
		class: 'icon-underline',
		isActive: 'underline',
		action: (command) => {
			return command.toggleUnderline()
		},
	},
	{
		label: t('text', 'Strikethrough'),
		keyChar: 'd',
		keyModifiers: ['ctrl'],
		class: 'icon-strike',
		isActive: 'strike',
		action: (command) => {
			return command.toggleStrike()
		},
	},
	{
		label: t('text', 'Headings'),
		keyChar: '1…6',
		keyModifiers: ['ctrl', 'shift'],
		visible: false,
		children: [
			{
				label: t('text', 'Heading 1'),
				class: 'icon-h1',
				isActive: ['heading', { level: 1 }],
				action: (command) => {
					return command.toggleHeading({ level: 1 })
				},
			},
			{
				label: t('text', 'Heading 2'),
				class: 'icon-h2',
				isActive: ['heading', { level: 2 }],
				action: (command) => {
					return command.toggleHeading({ level: 2 })
				},
			},
			{
				label: t('text', 'Heading 3'),
				class: 'icon-h3',
				isActive: ['heading', { level: 3 }],
				action: (command) => {
					return command.toggleHeading({ level: 3 })
				},
			},
			{
				label: t('text', 'Heading 4'),
				class: 'icon-h4',
				isActive: ['heading', { level: 4 }],
				action: (command) => {
					return command.toggleHeading({ level: 4 })
				},
			},
			{
				label: t('text', 'Heading 5'),
				class: 'icon-h5',
				isActive: ['heading', { level: 5 }],
				action: (command) => {
					return command.toggleHeading({ level: 5 })
				},
			},
			{
				label: t('text', 'Heading 6'),
				class: 'icon-h6',
				isActive: ['heading', { level: 6 }],
				action: (command) => {
					return command.toggleHeading({ level: 6 })
				},
			},
		],
	},
	{
		label: t('text', 'Unordered list'),
		keyChar: '8',
		keyModifiers: ['ctrl', 'shift'],
		class: 'icon-ul',
		isActive: 'bulletList',
		action: (command) => {
			return command.toggleBulletList()
		},
	},
	{
		label: t('text', 'Ordered list'),
		keyChar: '9',
		keyModifiers: ['ctrl', 'shift'],
		class: 'icon-ol',
		isActive: 'orderedList',
		action: (command) => {
			return command.toggleOrderedList()
		},
	},
	{
		label: t('text', 'ToDo list'),
		class: 'icon-tasklist',
		isActive: 'taskList',
		action: (command) => command.toggleTaskList(),
	},
	{
		label: t('text', 'Blockquote'),
		keyChar: '>',
		keyModifiers: ['ctrl'],
		class: 'icon-quote',
		isActive: 'blockquote',
		action: (command) => {
			return command.toggleBlockquote()
		},
	},
	{
		label: t('text', 'Callouts'),
		visible: false,
		children: [
			{
				label: t('text', 'Info'),
				class: 'icon-info',
				isActive: ['callout', { type: 'info' }],
				action: (command) => {
					return command.toggleCallout({ type: 'info' })
				},
			},
			{
				label: t('text', 'Success'),
				class: 'icon-success',
				isActive: ['callout', { type: 'success' }],
				action: (command) => {
					return command.toggleCallout({ type: 'success' })
				},
			},
			{
				label: t('text', 'Warning'),
				class: 'icon-warn',
				isActive: ['callout', { type: 'warn' }],
				action: (command) => {
					return command.toggleCallout({ type: 'warn' })
				},
			},
			{
				label: t('text', 'Error'),
				class: 'icon-error',
				isActive: ['callout', { type: 'error' }],
				action: (command) => {
					return command.toggleCallout({ type: 'error' })
				},
			},
		],
	},
	{
		label: t('text', 'Code block'),
		class: 'icon-code',
		isActive: 'codeBlock',
		action: (command) => {
			return command.toggleCodeBlock()
		},
	},
	{
		label: t('text', 'Emoji picker'),
		class: 'icon-emoji',
		action: (command, emojiObject) => {
			return command.emoji(emojiObject)
		},
	},
]
