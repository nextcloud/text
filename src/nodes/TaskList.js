/*
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
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
