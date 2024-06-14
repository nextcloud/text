/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit'
import stripIndent from './stripIndent.js'

describe('markdownit', () => {

	it('renders mentions of users with escaped whitespace', () => {
		const rendered = markdownit.render('@[whitespace user](mention://user/whitespace%20user)')
		expect(stripIndent(rendered)).toBe(stripIndent(`
			<p><span class="mention" data-type="user" data-id="whitespace%20user">whitespace user</span></p>`
		))
	})

})
