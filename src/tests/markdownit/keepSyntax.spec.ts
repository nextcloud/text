/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import MarkdownIt from 'markdown-it'
import markdownit from '../../markdownit/index.ts'

describe('keepSyntax (markdown-it)', () => {
	it('wraps special characters', () => {
		expect(markdownit.render('a ~ b'))
			.to.equal('<p>a <span class="keep-md">~</span> b</p>\n')
	})

	it('creates markdown-it tokens', () => {
		const [, inline] = markdownit.parse('a ~ b', {})
		for (const token of inline.children ?? []) {
			expect(token).to.be.instanceOf(MarkdownIt.Token)
		}
	})
})
