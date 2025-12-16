/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	CodeBrackets,
	CodeTags,
	Danger,
	Emoticon,
	FormatBold,
	FormatHeader1,
	FormatHeader2,
	FormatHeader3,
	FormatHeader4,
	FormatHeader5,
	FormatHeader6,
	FormatIndentDecrease,
	FormatIndentIncrease,
	FormatItalic,
	FormatListBulleted,
	FormatListCheckbox,
	FormatListNumbered,
	FormatQuote,
	FormatSize,
	FormatStrikethrough,
	FormatUnderline,
	Info,
	LinkIcon,
	Paperclip,
	Pencil,
	PencilOff,
	Positive,
	Redo,
	Sigma,
	Table,
	Undo,
	UnfoldMoreHorizontal,
	Warn,
} from '../icons.js'
import ActionAttachmentUpload from './ActionAttachmentUpload.vue'
import ActionInsertLink from './ActionInsertLink.vue'
import AssistantAction from './AssistantAction.vue'
import EmojiPickerAction from './EmojiPickerAction.vue'

import { emit } from '@nextcloud/event-bus'
import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import { type AnyCommands, type Editor } from '@tiptap/core'
import { isMobileDevice } from '../../helpers/isMobileDevice.js'
import { MODIFIERS } from './keys.js'

type ClickContext = {
	$readOnlyActions?: {
		toggle: () => void
	}
}

type LabelContext = {
	displayToc: boolean
}

type MenuEntry =
	| {
			key: string
			label?: string | ((context: LabelContext) => string)
			icon?: object
			forceLabel?: boolean
			keyChar?: string
			keyModifiers?: string[]
			action?: (command: AnyCommands, editor?: Editor | null) => void
			isActive?: string | string[] | object
			component?: object
			click?: (context?: ClickContext) => void
			priority?: number
			visible?: boolean
			children?: MenuEntry[]
			isSeparator?: boolean
	  }
	| undefined

export const outlineEntries: MenuEntry[] = [
	{
		key: 'outline',
		forceLabel: true,
		icon: FormatListBulleted,
		click: () => emit('text:toc:toggle'),
		label: ({ displayToc }) => {
			return displayToc ? t('text', 'Hide outline') : t('text', 'Show outline')
		},
	},
]

export const readOnlyEditEntries: MenuEntry[] = [
	{
		key: 'edit',
		label: t('text', 'Edit'),
		forceLabel: true,
		icon: Pencil,
		click: ({ $readOnlyActions } = {}) => $readOnlyActions?.toggle(),
	},
]

export const readOnlyDoneEntries: MenuEntry[] = [
	{
		key: 'done',
		label: t('text', 'Done'),
		icon: PencilOff,
		click: ({ $readOnlyActions } = {}) => $readOnlyActions?.toggle(),
	},
]

export const getAssistantMenuEntries = (): MenuEntry[] => {
	const assistantMenuEntry: MenuEntry = {
		key: 'assistant',
		label: t('text', 'Nextcloud Assistant'),
		component: AssistantAction,
		priority: 7,
	}
	const hasAssistantTaskTypes = loadState('text', 'taskprocessing', []).length > 0
	return hasAssistantTaskTypes ? [assistantMenuEntry] : []
}

export const getMenuEntries = (isRichWorkspace: boolean): MenuEntry[] => {
	const menuEntries: MenuEntry[] = [
		{
			key: 'undo',
			label: t('text', 'Undo'),
			keyChar: 'z',
			keyModifiers: [MODIFIERS.Mod],
			icon: Undo,
			action: (command) => command.undo(),
			priority: 8,
		},
		{
			key: 'redo',
			label: t('text', 'Redo'),
			keyChar: 'y',
			keyModifiers: [MODIFIERS.Mod],
			icon: Redo,
			action: (command) => command.redo(),
			priority: 11,
		},
		{
			key: 'headings',
			label: t('text', 'Headings'),
			keyChar: '1…6',
			keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
			icon: FormatSize,
			isActive: 'heading',
			children: [
				{
					key: 'headings-h1',
					label: t('text', 'Heading 1'),
					keyChar: '1',
					keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
					icon: FormatHeader1,
					isActive: { name: 'heading', attributes: { level: 1 } },
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
					isActive: { name: 'heading', attributes: { level: 2 } },
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
					isActive: { name: 'heading', attributes: { level: 3 } },
					action: (command) => {
						return command.toggleHeading({ level: 3 })
					},
				},
				{
					key: 'headings-h4',
					label: t('text', 'Heading 4'),
					keyChar: '4',
					keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
					isActive: { name: 'heading', attributes: { level: 4 } },
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
					isActive: { name: 'heading', attributes: { level: 5 } },
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
					isActive: { name: 'heading', attributes: { level: 6 } },
					icon: FormatHeader6,
					action: (command) => {
						return command.toggleHeading({ level: 6 })
					},
				},
				{
					key: 'headings-separator',
					isSeparator: true,
					visible: !isRichWorkspace,
				},
				{
					key: 'outline',
					icon: FormatListBulleted,
					click: () => emit('text:toc:toggle'),
					visible: !isRichWorkspace,
					label: ({ displayToc }) => {
						return displayToc
							? t('text', 'Hide outline')
							: t('text', 'Show outline')
					},
				},
			],
			priority: 1,
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
			priority: 9,
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
			priority: 10,
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
			priority: 12,
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
			priority: 13,
		},
		{
			key: 'lists',
			label: t('text', 'Lists'),
			keyChar: '7…9',
			keyModifiers: [MODIFIERS.Mod, MODIFIERS.Shift],
			isActive: ['bulletList', 'orderedList', 'taskList'],
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
					action: (command, editor) => {
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
					action: (command, editor) => {
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
			key: 'blocks',
			label: t('text', 'Blocks'),
			visible: false,
			icon: CodeBrackets,
			isActive: [
				'blockquote',
				'codeBlock',
				'callout',
				'inlineMath',
				'blockMath',
			],
			children: [
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
				},
				{
					key: 'blocks-separator',
					isSeparator: true,
				},
				{
					key: 'math-inline',
					// TRANSLATORS Inline level math/science formula menu item, eg "something [the formula] something"
					label: t('text', 'Inline math'),
					icon: Sigma,
					isActive: 'inlineMath',
					action: (command, editor) => {
						let latex = ''
						if (editor) {
							const { from, to, empty } = editor.state.selection
							latex = empty
								? ''
								: editor.state.doc.textBetween(from, to)
						}
						return command.insertInlineMath({ latex })
					},
				},
				{
					key: 'math-block',
					// TRANSLATORS Block level math/science formula menu item, appears on its own, akin to a paragraph
					label: t('text', 'Block math'),
					icon: Sigma,
					isActive: 'blockMath',
					action: (command, editor) => {
						let latex = ''
						if (editor) {
							const { from, to, empty } = editor.state.selection
							latex = empty
								? ''
								: editor.state.doc.textBetween(from, to)
						}
						return command.insertBlockMath({ latex })
					},
				},
				{
					key: 'math-separator',
					isSeparator: true,
				},
				{
					key: 'callout-info',
					label: t('text', 'Info callout'),
					isActive: { name: 'callout', attributes: { type: 'info' } },
					icon: Info,
					action: (command) => {
						return command.toggleCallout({ type: 'info' })
					},
				},
				{
					key: 'callout-success',
					label: t('text', 'Success callout'),
					isActive: { name: 'callout', attributes: { type: 'success' } },
					icon: Positive,
					action: (command) => {
						return command.toggleCallout({ type: 'success' })
					},
				},
				{
					key: 'callout-warn',
					label: t('text', 'Warning callout'),
					isActive: { name: 'callout', attributes: { type: 'warn' } },
					icon: Warn,
					action: (command) => {
						return command.toggleCallout({ type: 'warn' })
					},
				},
				{
					key: 'callout-error',
					label: t('text', 'Danger callout'),
					isActive: { name: 'callout', attributes: { type: 'error' } },
					icon: Danger,
					action: (command) => {
						return command.toggleCallout({ type: 'error' })
					},
				},
			],
			priority: 3,
		},
		{
			key: 'table',
			label: t('text', 'Table'),
			isActive: 'table',
			icon: Table,
			action: (command) => {
				return command.insertTable()
			},
			priority: 14,
		},
		{
			key: 'details',
			label: t('text', 'Details'),
			isActive: 'details',
			icon: UnfoldMoreHorizontal,
			action: (command) => {
				return command.toggleDetails()
			},
			priority: 15,
		},
		{
			key: 'insert-link',
			label: t('text', 'Insert link'),
			keyChar: 'k',
			keyModifiers: [MODIFIERS.Mod],
			isActive: 'link',
			icon: LinkIcon,
			component: ActionInsertLink,
			priority: 4,
		},
		{
			key: 'insert-attachment',
			label: t('text', 'Insert attachment'),
			icon: Paperclip,
			component: ActionAttachmentUpload,
			priority: 5,
		},
	]

	if (!isMobileDevice) {
		menuEntries.push({
			key: 'emoji-picker',
			label: t('text', 'Insert emoji'),
			icon: Emoticon,
			component: EmojiPickerAction,
			// @ts-expect-error emoji action expects object instead of editor as second argument
			action: (command, emojiObject = {}) => {
				return command.emoji(emojiObject)
			},
			priority: 6,
		})
	}

	return menuEntries
}
