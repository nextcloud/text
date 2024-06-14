/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit'
import { typesAvailable } from '../../markdownit/callouts'
import stripIndent from './stripIndent.js'

describe('callouts', () => {
	typesAvailable.forEach((type) => {
		it(`render ${type}`, () => {
			const rendered = markdownit.render(`::: ${type}\nHey there!\n:::`)
			expect(stripIndent(rendered)).toBe(stripIndent(
				`<div data-callout="${type}" class="callout callout-${type}">
					<p>Hey there!</p>
				</div>`
			))
		})
	})
})

