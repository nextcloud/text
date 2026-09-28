/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit/index.ts'

describe('hardbreak (markdown-it)', () => {
	it('keeps double space syntax', () => {
		expect(markdownit.render('a  \nb'))
			.to.equal('<p>a<br data-syntax="  " />b</p>\n')
	})

	it('keeps backslash syntax', () => {
		expect(markdownit.render('a\\\nb'))
			.to.equal('<p>a<br data-syntax="\\" />b</p>\n')
	})

	it('parses html breaks', () => {
		expect(markdownit.render('a<br>b'))
			.to.equal('<p>a<br data-syntax="html" />b</p>\n')
	})

	it('parses html breaks in link labels', () => {
		expect(markdownit.render('[a<br>b](https://example.com)'))
			.to.equal('<p><a href="https://example.com">a<br data-syntax="html" />b</a></p>\n')
	})
})
