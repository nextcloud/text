/**
 * @copyright Copyright (c) 2022
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

import { initUserAndFiles, randHash } from '../utils/index.js'

const randUser = randHash()

describe('Front matter support', function() {
	before(function() {
		initUserAndFiles(randUser, 'frontmatter.md', 'empty.md')
	})

	beforeEach(function() {
		cy.login(randUser, 'password')
	})

	it('Open file with front matter', function() {
		cy.openFile('frontmatter.md').then(() => {
			expect(cy.getContent().find('pre.frontmatter').length === 1)
		})
	})

	it('Add front matter', function() {
		cy.openFile('empty.md').clearContent().then(() => {
			cy.getContent()
				.type('---')
				.type('test')
			cy.getContent().find('pre.frontmatter').should(pre => {
				expect(pre.length === 1)
				expect(pre[0].text === 'test')
			})
		})
	})

	it('Do not add multiple front matter', function() {
		cy.openFile('empty.md').clearContent().then(() => {
			cy.getContent()
				.type('---test')
				.type('{downArrow}')
				.type('---test')
			cy.getContent().find('pre.frontmatter').should(pre => expect(pre.length === 1))
			cy.getContent().find('hr').should(hr => expect(hr.length === 1))
		})
	})
})
