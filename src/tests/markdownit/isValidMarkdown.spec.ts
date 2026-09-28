/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import isValidMarkdown from '../../markdownit/isValidMarkdown.ts'

describe('isValidMarkdown', () => {
	it('accepts plain markdown', () => {
		expect(isValidMarkdown('Some *emphasis* and a [link](https://example.com)')).to.equal(true)
	})

	it('accepts reference definitions', () => {
		expect(isValidMarkdown('[foo]\n\n[foo]: https://example.com')).to.equal(true)
	})

	it('accepts footnotes', () => {
		expect(isValidMarkdown('Foo[^1]\n\n[^1]: bar')).to.equal(true)
	})
})
