/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { MarkdownSerializerState } from 'prosemirror-markdown'

import { mergeAttributes } from '@tiptap/core'
import { TaskList as TiptapTaskList } from '@tiptap/extension-list'
import { toggleListCommand } from '../commands/index.ts'

const TaskList = TiptapTaskList.extend({
	parseHTML() {
		return [
			{
				priority: 100,
				tag: 'ul.contains-task-list',
			},
		]
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'ul',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				class: 'contains-task-list',
			}),
			0,
		]
	},

	addAttributes() {
		return {
			...this.parent?.(),
			isList: {
				default: true,
				rendered: false,
			},
			bullet: {
				default: '-',
				rendered: false,
				parseHTML: (el) => el.getAttribute('data-bullet'),
			},
		}
	},

	toMarkdown: (state: MarkdownSerializerState, node: Node) => {
		state.renderList(node, '  ', () => `${node.attrs.bullet} `)
	},

	addCommands() {
		return {
			...this.parent?.(),
			toggleTaskList: toggleListCommand('taskList', 'taskItem'),
		}
	},
})

export default TaskList
