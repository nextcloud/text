/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit'
import stripIndent from './stripIndent'

describe('task list extension', () => {

	it('renders task lists', () => {
		const rendered = markdownit.render('* [ ] task\n* not a task')
		expect(stripIndent(rendered)).toBe(stripIndent(`
			<ul class="contains-task-list" data-bullet="*">
			<li class="task-list-item "><input class="task-list-item-checkbox" type="checkbox" disabled="" id="task-item-0" />task</li>
			</ul>
			<ul data-bullet="*">
			<li>not a task</li>
			</ul>`
			))
	})

})

