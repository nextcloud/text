/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit'
import stripIndent from './stripIndent'

describe('markdownit', () => {

	it('exposes bullet list markup', () => {
		['*', '-'].forEach(bullet => {
			const rendered = markdownit.render(`${bullet} first\n${bullet} second`)
			expect(stripIndent(rendered)).toBe(stripIndent(`
				<ul data-bullet="${bullet}">
				<li>first</li>
				<li>second</li>
				</ul>`
			))
		})
	})

	it('renders bullet and task lists separately', () => {
		const rendered = markdownit.render('* not a task\n* [ ] task')
		expect(stripIndent(rendered)).toBe(stripIndent(`
			<ul data-bullet="*">
			<li>not a task</li>
			</ul>
			<ul class="contains-task-list" data-bullet="*">
			<li class="task-list-item "><input class="task-list-item-checkbox" type="checkbox" disabled="" id="task-item-1" />task</li>
			</ul>`
		))
	})

})
