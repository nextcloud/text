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

	let fileId
	let requesttoken

	beforeEach(function() {
		cy.login(user)
		cy.prepareSessionApi().then((token) => {
			requesttoken = token
			cy.uploadTestFile('test.md')
				.then(id => {
					fileId = id
				})
		})
	})

	it('fetches users with valid session', function() {
		cy.createTextSession(fileId).then(connection => {
			cy.wrap(connection)
				.its('document.id')
				.should('equal', fileId)

			const requestData = {
				method: 'POST',
				url: '/apps/text/api/v1/users',
				body: {
					documentId: connection.document.id,
					sessionId: connection.session.id,
					sessionToken: connection.session.token,
					requesttoken,
				},
				failOnStatusCode: false,
			}
			const invalidRequestData = { ...requestData }

			cy.request(requestData).then(({ status }) => {
				expect(status).to.eq(200)

				invalidRequestData.body = {
					...requestData.body,
					sessionToken: 'invalid',
				}
			})

			cy.request(invalidRequestData).then(({ status }) => {
				expect(status).to.eq(403)
				invalidRequestData.body = {
					...requestData.body,
					sessionId: 0,
				}
			})

			cy.request(invalidRequestData).then(({ status }) => {
				expect(status).to.eq(403)

				invalidRequestData.body = {
					...requestData.body,
					documentId: 0,
				}
			})

			cy.request(invalidRequestData).then(({ status }) => {
				expect(status).to.eq(403)
			})

			cy.wrap(null).then(() => connection.close())

			cy.request(requestData).then(({ status, body }) => {
				expect(status).to.eq(403)
			})
		})
	})
})
