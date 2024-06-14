/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TiptapTaskList from '@tiptap/extension-task-list'

const TaskList = TiptapTaskList.extend({

	parseHTML: [
		{
			priority: 100,
			tag: 'ul.contains-task-list',
		},
	],

	addAttributes() {
		return {
			...this.parent?.(),
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
