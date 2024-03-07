/**
 * @copyright Copyright (c) 2024 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import markdownit from '../../markdownit'
import stripIndent from './stripIndent.js'

describe('Preview extension', () => {

	const link = {
		md: `[link](https://nextcloud.com)`,
		html: `<a href="https://nextcloud.com">link</a>`,
	}
	const preview = {
		md: `[link](https://nextcloud.com (preview))`,
		html: `<a href="https://nextcloud.com" title="preview">link</a>`,
	}

	it('wraps', () => {
		expect(markdownit.render('[link](https://nextcloud.com)'))
			.toBe(
			`<p><a href="https://nextcloud.com">link</a></p>\n`
			)
	})

	it(`unwraps preview from paragraph`, () => {
		const rendered = markdownit.render(preview.md)
		expect(rendered).toBe(preview.html)
	})

	it(`leaves non-preview links alone`, () => {
		const rendered = markdownit.render(link.md)
		expect(rendered).toBe(
			`<p>${link.html}</p>\n`
		)
	})

	it(`leaves two previews in one paragraph`, () => {
		const rendered = markdownit.render(`${preview.md}\n${preview.md}`)
		expect(rendered).toBe(
			`<p>${preview.html}\n${preview.html}</p>\n`
		)
	})

})
