/*
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

import { randUser } from '../utils/index.js'

const user = randUser()
const messages = {
	awareness: 'AQoBw9LM0gwAAnt9',
	update: 'AAIKAAHYidydCwEEAQ==',
	query: 'AAABAA==',
	response: 'AAECAAA=',
}

describe('The session Api', function() {

	before(function() {
		cy.createUser(user)
		window.OC = {
			config: { modRewriteWorking: false },
			webroot: '',
		}
	})

	beforeEach(function() {
		cy.login(user)
		cy.prepareSessionApi()
	})

	describe('open the session', function() {
		let fileId

		before(function() {
			cy.login(user)
			cy.uploadTestFile()
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

		beforeEach(function() {
			cy.uploadTestFile()
				.then(cy.createTextSession)
				.then(session => {
					connection = session
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
					cy.pushSteps({ connection, steps, version })
						.its('version')
						.should('eql', 1)
					cy.syncSteps(connection)
						.its('steps[0].data')
						.should('eql', steps)
				})
			})

		it('responds to queries', function() {
			const version = 0
			Object.entries(messages)
				.forEach(([type, sample]) => {
					cy.pushSteps({ connection, steps: [sample], version })
				})
			cy.pushSteps({ connection, steps: [messages.query], version })
				.then(response => {
					cy.wrap(response)
						.its('version')
						.should('eql', 0)
					cy.wrap(response)
						.its('steps.length')
						.should('eql', 3)
					cy.wrap(response)
						.its('steps[0].data')
						.should('eql', [messages.awareness])
				})
		})
	})

	describe('sync', function() {
		const version = 0
		let connection
		let fileId
		let filePath

		beforeEach(function() {
			cy.testName().then(name => {
				filePath = `/${name}.md`
			})
			cy.uploadTestFile()
				.then(id => {
					fileId = id
					return cy.createTextSession(fileId, { filePath })
				})
				.then(session => {
					connection = session
				})
		})

		it('starts empty', function() {
			cy.syncSteps(connection)
				.its('steps')
				.should('eql', [])
		})

		it('saves', function() {
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('eql', 1)
			cy.syncSteps(connection, { version: 1, autosaveContent: '# Heading 1', manualSave: true })
			cy.downloadFile('saves.md')
				.its('data')
				.should('eql', '# Heading 1')
		})

		it('saves yjs document state', function() {
			const documentState = 'Base64 encoded string'
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('eql', 1)
			cy.syncSteps(connection, {
				version: 1,
				autosaveContent: '# Heading 1',
				documentState,
				manualSave: true,
			})
				.then(() => connection.close())
			cy.createTextSession(fileId, { filePath })
				.then(session => {
					connection = session
					return session.content
				})
				.should('eql', documentState)
		})

		afterEach(function() {
			connection.close()
		})
	})

	describe('public sync', function() {
		const version = 0
		let connection
		let filePath
		let shareToken

		beforeEach(function() {
			cy.testName().then(name => {
				filePath = `/${name}.md`
			})
			cy.uploadTestFile()
				.then(_id => {
					return cy.shareFile(filePath, { edit: true })
				})
				.then(token => {
					shareToken = token
				})
				.then(() => cy.logout())
				.then(() => {
					cy.prepareSessionApi()
					return cy.createTextSession(undefined, { filePath: '', shareToken })
						.then(session => {
							connection = session
						})
				})
		})

		it('starts empty public', function() {
			cy.syncSteps(connection)
				.its('steps')
				.should('eql', [])
		})

		it('saves public', function() {
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('eql', 1)
			cy.syncSteps(connection, { version: 1, autosaveContent: '# Heading 1', manualSave: true })
			cy.login(user)
			cy.prepareSessionApi()
			cy.downloadFile('saves.md')
				.its('data')
				.should('eql', '# Heading 1')
		})

		it('saves yjs document state public', function() {
			const documentState = 'Base64 encoded string'
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('eql', 1)
			cy.syncSteps(connection, {
				version: 1,
				autosaveContent: '# Heading 1',
				documentState,
				manualSave: true,
			})
				.then(() => connection.close())
			cy.createTextSession(undefined, { filePath: '', shareToken })
				.then(session => {
					connection = session
					return session.content
				})
				.should('eql', documentState)
		})

		afterEach(function() {
			connection.close()
		})
	})

})
