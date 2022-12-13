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

import { randUser } from '../../utils/index.js'

const fileName = 'empty.md'
const user = randUser()

describe('Hard break support', function() {
	before(function() {
		cy.createUser(user)
	})

	beforeEach(function() {
		cy.login(user)
		cy.isolateTest({
			sourceFile: fileName,
		})

		return cy.openFile(fileName, { force: true })
	})

	it('Can create hard breaks with shift+enter', () => {
		cy.getContent()
			.type('Hello')
			.type('{shift+enter}world')
		cy.getContent()
			.find('p br')
			.should('exist')
	})

	it('Convert paragraph break into hard break', () => {
		cy.getContent()
			.type('Hello')
			.type('{enter}')
			.type('world')
		cy.getContent()
			.find('p')
			.should('have.length', 2)
			.and($p => {
				expect($p[0]).to.contain('Hello')
				expect($p[1]).to.contain('world')
			})
		cy.getContent()
			.type('{home}{backspace}')
		cy.getContent()
			.find('p br')
			.should('exist')
	})
})
