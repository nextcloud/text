/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../../utils/index.js'

const user = randUser()

describe('The user mention API', function () {
	before(function () {
		cy.createUser(user)
	})

	beforeEach(function () {
		cy.login(user)
		cy.uploadTestFile('test.md')
			.as('fileId')
			.then((fileId) => cy.openConnection({ fileId }))
			.its('connection')
			.as('connection')
	})

	it('has a valid connection', function () {
		cy.get('@connection').its('documentId').should('equal', this.fileId)
		cy.closeConnection(this.connection)
	})

	it('fetches users with valid session', function () {
		cy.sessionUsers(this.connection).its('status').should('eq', 200)
		cy.closeConnection(this.connection)
	})

	it('rejects invalid sessions', function () {
		cy.sessionUsers(this.connection, { sessionToken: 'invalid' })
			.its('status')
			.should('eq', 403)
		cy.sessionUsers(this.connection, { sessionId: 0 })
			.its('status')
			.should('eq', 403)
		cy.sessionUsers(this.connection, { documentId: 0 })
			.its('status')
			.should('eq', 403)
		cy.closeConnection(this.connection)
	})

	it('rejects closed sessions', function () {
		cy.closeConnection(this.connection)
		cy.sessionUsers(this.connection).its('status').should('eq', 403)
	})
})
