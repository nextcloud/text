/*
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 * @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
 *
 * @author Max <max@nextcloud.com>
 * @author Julius Härtl <jus@bitgrid.net>
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

const user = randUser()

describe('The user mention API', function() {

	before(function() {
		cy.createUser(user)
		cy.prepareWindowForSessionApi()
	})

	beforeEach(function() {
		cy.login(user)
		cy.uploadTestFile('test.md').as('fileId')
			.then(cy.createTextSession).as('connection')
		cy.getRequestToken()
	})

	afterEach(function() {
		cy.get('@connection').then(c => c.closed || c.close())
	})

	it('has a valid connection', function() {
		cy.get('@connection')
			.its('document.id')
			.should('equal', this.fileId)
	})

	it('fetches users with valid session', function() {

		cy.sessionUsers(this.connection).then(({ status }) => {
			expect(status).to.eq(200)
		})

		cy.sessionUsers(this.connection, { sessionToken: 'invalid' })
			.then(({ status }) => {
			expect(status).to.eq(403)
		})

		cy.sessionUsers(this.connection, { sessionId: 0 })
			.then(({ status }) => {
			expect(status).to.eq(403)
		})

		cy.sessionUsers(this.connection, { documentId: 0 })
			.then(({ status }) => {
			expect(status).to.eq(403)
		})

		cy.then(() => this.connection.close())

		cy.sessionUsers(this.connection).then(({ status }) => {
			expect(status).to.eq(403)
		})
	})
})
