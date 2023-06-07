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
		let filePath

		beforeEach(function() {
			cy.uploadTestFile('test.md')
				.then(id => {
					fileId = id
				})
			cy.testName().then(name => {
				filePath = `/${name}.md`
			})
		})

		it('returns connection', function() {
			cy.createTextSession(fileId).then(connection => {
				cy.wrap(connection)
					.its('document.id')
					.should('equal', fileId)
				connection.close()
			})
		})

		it('provides initial content', function() {
			cy.createTextSession(fileId, { filePath }).then(connection => {
				cy.wrap(connection)
					.its('state.documentSource')
					.should('eql', '## Hello world\n')
				connection.close()
			})
		})

		it('handles invalid file id', function() {
			cy.failToCreateTextSession(123456789)
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
				.then(con => {
					connection = con
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
						.should('eql', 0)
				})
		})
	})

	describe('sync', function() {
		const version = 0
		let connection
		let fileId
		let filePath
		let joining

		beforeEach(function() {
			cy.testName().then(name => {
				filePath = `/${name}.md`
			})
			cy.uploadTestFile()
				.then(id => {
					fileId = id
					return cy.createTextSession(fileId, { filePath })
				})
				.then(con => {
					connection = con
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
			cy.downloadFile(filePath)
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
			cy.createTextSession(fileId, { filePath })
				.then(con => {
					joining = con
					return joining
				})
				.its('state.documentState')
				.should('eql', documentState)
				.then(() => joining.close())
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
		let joining

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
				.then(() => cy.clearCookies())
				.then(() => {
					cy.prepareSessionApi()
					return cy.createTextSession(undefined, { filePath: '', shareToken })
						.then(con => {
							connection = con
						})
				})
		})

		afterEach(function() {
			connection.close()
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
			cy.createTextSession(undefined, { filePath: '', shareToken })
				.then(con => {
					joining = con
					return con
				})
				.its('state.documentState')
				.should('eql', documentState)
				.then(() => joining.close())
		})

	})

	describe('race conditions', function() {
		const version = 0
		let connection
		let shareToken

		beforeEach(function() {
			cy.testName().then(name => {
				const filePath = `/${name}.md`
				cy.uploadTestFile('test.md')
				return cy.shareFile(filePath, { edit: true })
			}).then(token => {
				cy.log(token)
				shareToken = token
				cy.clearCookies()
				cy.prepareSessionApi()
				cy.createTextSession(undefined, { filePath: '', shareToken })
					.then(con => {
						connection = con
					})
			})
		})

		it('sends initial content if other session is alive but did not push any steps', function() {
			let joining
			cy.createTextSession(undefined, { filePath: '', shareToken })
				.then(con => {
					joining = con
					return con
				})
				.its('state.documentSource')
				.should('not.eql', '')
				.then(() => joining.close())
				.then(() => connection.close())
		})

		it('does not send initial content if session is alive even without saved state', function() {
			let joining
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('eql', 1)
			cy.createTextSession(undefined, { filePath: '', shareToken })
				.then(con => {
					joining = con
					return con
				})
				.its('state.documentSource')
				.should('eql', '')
				.then(() => joining.close())
				.then(() => connection.close())
		})

		it('recovers session even if last person leaves right after create', function() {
			let joining
			cy.log('Initial user pushes steps')
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('eql', 1)
			cy.log('Other user creates session')
			cy.createTextSession(undefined, { filePath: '', shareToken })
				.then(con => {
					joining = con
				})
			cy.log('Initial user closes session')
				.then(() => connection.close())
			cy.log('Other user still finds the steps')
				.then(() => {
					cy.syncSteps(joining, {
						version: 0,
					}).its('steps[0].data')
						.should('eql', [messages.update])
				})
		})

		// Failed with a probability of ~ 50% initially
		// Skipped for now since the behaviour chanced by not cleaning up the state on close/create
		it.skip('ignores steps stored after close cleaned up', function() {
			cy.pushAndClose({ connection, steps: [messages.update], version })
			cy.createTextSession(undefined, { filePath: '', shareToken })
				.then(con => {
					connection = con
				})
				.its('state.documentSource')
				.should('eql', '## Hello world\n')
		})

	})
})
