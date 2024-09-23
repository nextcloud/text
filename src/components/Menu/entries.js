/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	Undo,
	Redo,
	CodeTags,
	Danger,
	Emoticon,
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
	FormatIndentDecrease,
	FormatIndentIncrease,
	FormatListNumbered,
	FormatListBulleted,
	FormatListCheckbox,
	FormatQuote,
	Info,
	LinkIcon,
	Paperclip,
	Positive,
	Table,
	Warn,
} from '../icons.js'
import EmojiPickerAction from './EmojiPickerAction.vue'
import ActionAttachmentUpload from './ActionAttachmentUpload.vue'
import ActionInsertLink from './ActionInsertLink.vue'

import { MODIFIERS } from './keys.js'

export const ReadonlyEntries = [{
	key: 'outline',
	forceLabel: true,
	icon: FormatListBulleted,
	click: ({ $outlineActions }) => $outlineActions.toggle(),
	label: ({ $outlineState }) => {
		return $outlineState.visible
			? t('text', 'Hide outline')
			: t('text', 'Show outline')
	},
}]

export default [
	{
		key: 'undo',
		label: t('text', 'Undo'),
		keyChar: 'z',
		keyModifiers: [MODIFIERS.Mod],
		icon: Undo,
		action: (command) => command.undo(),
		priority: 7,
	},
	{
		key: 'redo',
		label: t('text', 'Redo'),
		keyChar: 'y',
		keyModifiers: [MODIFIERS.Mod],
		icon: Redo,
		action: (command) => command.redo(),
		priority: 10,
	},
	{
		key: 'bold',
		label: t('text', 'Bold'),
		keyChar: 'b',
		keyModifiers: [MODIFIERS.Mod],
		icon: FormatBold,
		isActive: 'strong',
		action: (command) => {
			return command.toggleBold()
		},
		priority: 8,
	},
	{
		key: 'italic',
		label: t('text', 'Italic'),
		keyChar: 'i',
		keyModifiers: [MODIFIERS.Mod],
		icon: FormatItalic,
		isActive: 'em',
		action: (command) => {
			return command.toggleItalic()
		},
		priority: 9,
	},
	{
		key: 'underline',
		label: t('text', 'Underline'),
		keyChar: 'u',
		keyModifiers: [MODIFIERS.Mod],
		icon: FormatUnderline,
		isActive: 'underline',
		action: (command) => {
			return command.toggleUnderline()
		},
		priority: 13,
	},
	{
		key: 'strikethrough',
		label: t('text', 'Strikethrough'),
		keyChar: 's',
		keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
		icon: FormatStrikethrough,
		isActive: 'strike',
		action: (command) => {
			return command.toggleStrike()
		},
		priority: 14,
	},
	{
		key: 'headings',
		label: t('text', 'Headings'),
		keyChar: '1…6',
		keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
		icon: FormatHeader1,
		isActive: 'heading',
		children: [
			{
				key: 'headings-h1',
				label: t('text', 'Heading 1'),
				keyChar: '1',
				keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
				icon: FormatHeader1,
				isActive: ['heading', { level: 1 }],
				action: (command) => {
					return command.toggleHeading({ level: 1 })
				},
			},
			{
				key: 'headings-h2',
				label: t('text', 'Heading 2'),
				keyChar: '2',
				keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
				icon: FormatHeader2,
				isActive: ['heading', { level: 2 }],
				action: (command) => {
					return command.toggleHeading({ level: 2 })
				},
			},
			{
				key: 'headings-h3',
				label: t('text', 'Heading 3'),
				keyChar: '3',
				keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
				icon: FormatHeader3,
				isActive: ['heading', { level: 3 }],
				action: (command) => {
					return command.toggleHeading({ level: 3 })
				},
			},
			{
				key: 'headings-h4',
				label: t('text', 'Heading 4'),
				keyChar: '4',
				keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
				isActive: ['heading', { level: 4 }],
				icon: FormatHeader4,
				action: (command) => {
					return command.toggleHeading({ level: 4 })
				},
			},
			{
				key: 'headings-h5',
				label: t('text', 'Heading 5'),
				keyChar: '5',
				keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
				isActive: ['heading', { level: 5 }],
				icon: FormatHeader5,
				action: (command) => {
					return command.toggleHeading({ level: 5 })
				},
			},
			{
				key: 'headings-h6',
				label: t('text', 'Heading 6'),
				keyChar: '6',
				keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
				isActive: ['heading', { level: 6 }],
				icon: FormatHeader6,
				action: (command) => {
					return command.toggleHeading({ level: 6 })
				},
			},
			{
				key: 'headings-separator',
				isSeparator: true,
				visible: ({ $outlineState }) => {
					return $outlineState.enable
				},
			},
			{
				key: 'outline',
				icon: FormatListBulleted,
				click: ({ $outlineActions }) => $outlineActions.toggle(),
				visible: ({ $outlineState }) => {
					return $outlineState.enable
				},
				label: ({ $outlineState }) => {
					return $outlineState.visible
						? t('text', 'Hide outline')
						: t('text', 'Show outline')
				},
			},
		],
		priority: 1,
	},
	{
		key: 'lists',
		label: t('text', 'Lists'),
		keyChar: '7…9',
		keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
		isActive: [{ isList: true }],
		icon: FormatListBulleted,
		children: [
			{
				key: 'unordered-list',
				label: t('text', 'Unordered list'),
				keyChar: '8',
				keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
				isActive: 'bulletList',
				icon: FormatListBulleted,
				action: (command) => {
					return command.toggleBulletList()
				},
			},
			{
				key: 'ordered-list',
				label: t('text', 'Ordered list'),
				keyChar: '7',
				keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
				isActive: 'orderedList',
				icon: FormatListNumbered,
				action: (command) => {
					return command.toggleOrderedList()
				},
			},
			{
				key: 'task-list',
				label: t('text', 'To-Do list'),
				keyChar: '9',
				keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
				isActive: 'taskList',
				icon: FormatListCheckbox,
				action: (command) => command.toggleTaskList(),
			},
			{
				key: 'lists-separator',
				isSeparator: true,
			},
			{
				key: 'list-indent-increase',
				label: t('text', 'Increase indentation'),
				keyChar: 'Tab',
				icon: FormatIndentIncrease,
				action: (command, editor = null) => {
					if (editor && editor.isActive('taskItem')) {
						return command.sinkListItem('taskItem')
					}
					return command.sinkListItem('listItem')
				},
			},
			{
				key: 'list-indent-decrease',
				label: t('text', 'Decrease indentation'),
				keyChar: 'Tab',
				keyModifiers: [MODIFIERS.Shift],
				icon: FormatIndentDecrease,
				action: (command, editor = null) => {
					if (editor && editor.isActive('taskItem')) {
						return command.liftListItem('taskItem')
					}
					return command.liftListItem('listItem')
				},
			},
		],
		priority: 2,
	},
	{
		key: 'insert-link',
		label: t('text', 'Insert link'),
		isActive: 'link',
		icon: LinkIcon,
		component: ActionInsertLink,
		priority: 3,
	},
	{
		key: 'blockquote',
		label: t('text', 'Blockquote'),
		keyChar: 'b',
		keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
		isActive: 'blockquote',
		icon: FormatQuote,
		action: (command) => {
			return command.toggleBlockquote()
		},
		priority: 11,
	},
	{
		key: 'callouts',
		label: t('text', 'Callouts'),
		visible: false,
		icon: Info,
		isActive: 'callout',
		children: [
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
		],
		priority: 4,
	},
	{
		key: 'code-block',
		label: t('text', 'Code block'),
		keyChar: 'c',
		keyModifiers: [MODIFIERS.Mod, MODIFIERS.Alt],
		isActive: 'codeBlock',
		icon: CodeTags,
		action: (command) => {
			return command.toggleCodeBlock()
		},
		priority: 12,
	},
	{
		key: 'table',
		label: t('text', 'Table'),
		isActive: 'table',
		icon: Table,
		action: (command) => {
			return command.insertTable()
		},
		priority: 15,
	},
	{
		key: 'emoji-picker',
		label: t('text', 'Insert emoji'),
		icon: Emoticon,
		component: EmojiPickerAction,
		action: (command, emojiObject = {}) => {
			return command.emoji(emojiObject)
		},
		priority: 5,
	},
	{
		key: 'insert-attachment',
		label: t('text', 'Insert attachment'),
		icon: Paperclip,
		component: ActionAttachmentUpload,
		priority: 6,
	},
]
