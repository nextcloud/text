/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit/index.js'

describe('Preview extension', () => {
	const link = {
		md: '[link](https://example.org)',
		html: '<a href="https://example.org">link</a>',
	}
	const preview = {
		md: '[link](https://example.org (preview))',
		html: '<a href="https://example.org" title="preview">link</a>',
	}

	it('wraps', () => {
		expect(markdownit.render('[link](https://example.org)')).toBe(
			'<p><a href="https://example.org">link</a></p>\n',
		)
	})

	it('unwraps preview from paragraph', () => {
		const rendered = markdownit.render(preview.md)
		expect(rendered).toBe(preview.html)
	})

	it('leaves non-preview links alone', () => {
		const rendered = markdownit.render(link.md)
		expect(rendered).toBe(`<p>${link.html}</p>\n`)
	})

	it('leaves two previews in one paragraph', () => {
		const rendered = markdownit.render(`${preview.md}\n${preview.md}`)
		expect(rendered).toBe(`<p>${preview.html}\n${preview.html}</p>\n`)
	})
})
