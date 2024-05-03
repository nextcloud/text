/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit'

describe('image figures extension', () => {

	it('renders images as figures', () => {
		expect(markdownit.render('[![moon](moon.jpg)](/uri)\n'))
		.toBe('<figure><a href=\"/uri\"><img src=\"moon.jpg\" alt=\"moon\" /></a></figure>\n')
	})

})
