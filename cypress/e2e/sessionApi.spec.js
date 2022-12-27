/**
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
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

import { initUserAndFiles, randUser } from '../utils/index.js'

const user = randUser()

describe('The session Api', function() {

	before(function() {
		cy.createUser(user)
		window.OC = {
			config: {modRewriteWorking: false},
			webroot: ''
		}
		cy.prepareSessionApi()
	})

	beforeEach(function() {
		cy.login(user)
	})

	describe('open the session', function() {
		const filename = 'empty.md'
		let fileId

		before(function() {
			cy.login(user)
			cy.uploadFile(filename, 'text/markdown')
				.then(id => {
					fileId = id
				})
		})

		it('returns connection', function() {
			cy.createTextSession(fileId).then(session => {
				cy.wrap(session)
					.its('state.document.id')
					.should('equal', fileId)
				session.close()
			})
		})

		it('handles invalid file id', function() {
			cy.failToCreateTextSession(123)
				.its('status')
				.should('equal', 404)
		})

		it('handles missing file id', function() {
			cy.failToCreateTextSession()
				.its('status')
				.should('equal', 412)
		})

	})

	describe('step types', function() {
		let connection
		const messages = {
			awareness: "AQoBw9LM0gwAAnt9",
			update: "AAIKAAHYidydCwEEAQ==",
			query: "AAABAA==",
			response: "AAECAAA=",
		}

		beforeEach(function() {
			cy.testName().then(name => {
				cy.uploadFile('empty.md', 'text/markdown', name)
					.then(cy.createTextSession)
					.then(session => {
						connection = session
					})
			})
		})

		afterEach(function() {
			connection.close()
		})

		// Echoes all message types but queries
		Object.entries(messages)
			.filter(([key, _value]) => key !== 'query')
			.forEach(([type, sample]) => {
			it(`echos ${type} messages`, function() {
				const steps = [sample]
				const version = 0
				cy.pushSteps({connection, steps, version})
					.its('version')
					.should('eql', 1)
				cy.syncSteps({connection, version})
					.its('steps[0].data')
					.should('eql', steps)
			})
		})

		it('responds to queries', function() {
			const version = 0
			Object.entries(messages)
				.forEach(([type, sample]) => {
					cy.pushSteps({connection, steps: [sample], version})
				})
			cy.pushSteps({connection, steps: [messages.query], version})
				.then(response => {
					cy.wrap(response)
						.its('version')
						.should('eql', 0)
					cy.wrap(response)
						.its('steps.length')
						.should('eql', 3)
					cy.wrap(response)
					cy.wrap(response)
						.its('steps[0].data')
						.should('eql', [messages.awareness])
				})
		})
	})
})

