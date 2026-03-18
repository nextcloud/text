/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import mathematics from '../../markdownit/mathematics'
import stripIndent from './stripIndent.js'

describe('mathematics extension', () => {
	it('renders inline math', () => {
		const rendered = MarkdownIt('commonmark')
			.use(mathematics)
			.render('Here is some math: $1 + 1 = 2$.')
		expect(stripIndent(rendered)).toBe(
			stripIndent(`
			<p>Here is some math:
			<span data-type="inline-math" data-latex="1 + 1 = 2">1 + 1 = 2</span>.</p>`),
		)
	})

	it('renders block math', () => {
		const rendered = MarkdownIt('commonmark').use(mathematics).render(`
Here is some more math:
$$
1 + 1 + 1 = 3
$$
.`)
		expect(stripIndent(rendered)).toBe(
			stripIndent(`
			<p>Here is some more math:</p>
			<div data-type="block-math" data-latex="1 + 1 + 1 = 3" />
			<p>.</p>`),
		)
	})

	it('escapes html', () => {
		const rendered = MarkdownIt('commonmark')
			.use(mathematics)
			.render('Here is some html: $<div>aaargh</div>$.')
		expect(stripIndent(rendered)).toBe(
			stripIndent(`
			<p>Here is some html:
			<span data-type="inline-math" data-latex="&lt;div&gt;aaargh&lt;/div&gt;">&lt;div&gt;aaargh&lt;/div&gt;</span>.</p>`),
		)
	})
})
