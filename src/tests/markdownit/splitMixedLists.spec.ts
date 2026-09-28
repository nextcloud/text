/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit/index.ts'

const taskItem = (id: number) => `<li class="task-list-item "><input class="task-list-item-checkbox" type="checkbox" disabled="" id="task-item-${id}" />task</li>`

describe('splitMixedLists (markdown-it)', () => {
	it('splits a list starting with a task', () => {
		expect(markdownit.render('* [ ] task\n* not a task'))
			.to.equal('<ul class="contains-task-list" data-bullet="*">\n'
				+ `${taskItem(0)}\n`
				+ '</ul>\n'
				+ '<ul data-bullet="*">\n'
				+ '<li>not a task</li>\n'
				+ '</ul>\n')
	})

	it('splits a list starting with a regular item', () => {
		expect(markdownit.render('* not a task\n* [ ] task'))
			.to.equal('<ul data-bullet="*">\n'
				+ '<li>not a task</li>\n'
				+ '</ul>\n'
				+ '<ul class="contains-task-list" data-bullet="*">\n'
				+ `${taskItem(1)}\n`
				+ '</ul>\n')
	})
})
