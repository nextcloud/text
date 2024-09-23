/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TiptapTaskList from '@tiptap/extension-task-list'
import { mergeAttributes } from '@tiptap/core'

const TaskList = TiptapTaskList.extend({

	parseHTML: [
		{
			priority: 100,
			tag: 'ul.contains-task-list',
		},
	],

	renderHTML({ HTMLAttributes }) {
		return ['ul', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'contains-task-list' }), 0]
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
				isRequired: true,
				parseHTML: (el) => el.getAttribute('data-bullet'),
			},
		}
	},

	toMarkdown: (state, node) => {
		state.renderList(node, '  ', () => `${node.attrs.bullet} `)
	},

})

export default TaskList
