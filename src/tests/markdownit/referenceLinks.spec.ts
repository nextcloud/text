/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit/index.js'

describe('reference style links (markdown-it)', () => {
	it('renders a reference link of type shortcut (omitted label)', () => {
		expect(
			markdownit.render(
				'text with [Some Reference] in it\n\n[Some Reference]: https://example.org',
			),
		).to.equal(
			'<p>text with <a href="https://example.org" data-md-reference-label="Some Reference" data-md-reference-type="shortcut">Some Reference</a> in it</p>\n',
		)
	})

	it('renders a reference link of type collapsed (empty label)', () => {
		expect(
			markdownit.render(
				'text with [Some Reference][] in it\n\n[Some Reference]: https://example.org',
			),
		).to.equal(
			'<p>text with <a href="https://example.org" data-md-reference-label="Some Reference" data-md-reference-type="collapsed">Some Reference</a> in it</p>\n',
		)
	})

	it('renders a reference link of type full (separate label)', () => {
		expect(
			markdownit.render(
				'text with [Some Reference][ref] in it\n\n[ref]: https://example.org',
			),
		).to.equal(
			'<p>text with <a href="https://example.org" data-md-reference-label="ref" data-md-reference-type="full">Some Reference</a> in it</p>\n',
		)
	})

	it('renders a reference link with paragraphs after reference', () => {
		expect(
			markdownit.render(
				'text with [reference] in it\n\n[reference]: /url\n\nsome extra content.',
			),
		).to.equal(
			'<p>text with <a href="/url" data-md-reference-label="reference" data-md-reference-type="shortcut">reference</a> in it</p>\n<p>some extra content.</p>\n',
		)
	})
})
