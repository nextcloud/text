/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../../utils/index.js'

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
	})

	beforeEach(function() {
		cy.login(user)
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
				cy.destroySession(connection)
			})
		})

		it('provides initial content', function() {
			cy.createTextSession(fileId, { filePath }).then(connection => {
				cy.wrap(connection)
					.its('state.documentSource')
					.should('eql', '## Hello world\n')
				cy.destroySession(connection)
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
			cy.destroySession(connection)
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
						.should('be.at.least', 1)
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
						.should('eql', 1)
					cy.wrap(response)
						.its('steps[0].data')
						.should('eql', [messages.update])
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
				.should('be.at.least', 1)
			cy.save(connection, { version: 1, autosaveContent: '# Heading 1', manualSave: true })
			cy.downloadFile(filePath)
				.its('data')
				.should('eql', '# Heading 1')
		})

		it('saves yjs document state', function() {
			const documentState = 'Base64 encoded string'
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.save(connection, {
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
			cy.destroySession(connection)
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
					return cy.createTextSession(undefined, { filePath: '', shareToken })
						.then(con => {
							connection = con
						})
				})
		})

		afterEach(function() {
			cy.destroySession(connection)
		})

		it('starts empty public', function() {
			cy.syncSteps(connection)
				.its('steps')
				.should('eql', [])
		})

		it('saves public', function() {
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.save(connection, { version: 1, autosaveContent: '# Heading 1', manualSave: true })
			cy.login(user)
			cy.downloadFile('saves.md')
				.its('data')
				.should('eql', '# Heading 1')
		})

		it('saves yjs document state public', function() {
			const documentState = 'Base64 encoded string'
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.save(connection, {
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
				cy.createTextSession(undefined, { filePath: '', shareToken })
					.then(con => {
						connection = con
					})
			})
		})

		it('does not send initial content if other session is alive but did not push any steps', function() {
			let joining
			cy.createTextSession(undefined, { filePath: '', shareToken })
				.then(con => {
					joining = con
					return con
				})
				.its('state.documentSource')
				.should('eql', '## Hello world\n')
				.then(() => cy.destroySession(joining))
			cy.destroySession(connection)
		})

		it('does not send initial content if session is alive even without saved state', function() {
			let joining
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.createTextSession(undefined, { filePath: '', shareToken })
				.then(con => {
					joining = con
					return con
				})
				.its('state.documentSource')
				.should('eql', '## Hello world\n')
				.then(() => cy.destroySession(joining))
			cy.destroySession(connection)
		})

		it('refuses create,push,sync,save with non-matching baseVersionEtag', function() {
			cy.failToCreateTextSession(undefined, 'wrongBaseVersionEtag', { filePath: '', token: shareToken })
				.its('status')
				.should('eql', 412)

			connection.setBaseVersionEtag('wrongBaseVersionEtag')
			connection.connection.baseVersionEtag = 'wrongBaseVersionEtag'

			cy.failToPushSteps({ connection, steps: [messages.update], version })
				.its('status')
				.should('equal', 412)

			cy.failToSyncSteps(connection, { version: 0 })
				.its('status')
				.should('equal', 412)

			cy.failToSave(connection)
				.its('status')
				.should('equal', 412)

			cy.destroySession(connection)
		})

		it('recovers session even if last person leaves right after create', function() {
			let joining
			cy.log('Initial user pushes steps')
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.log('Other user creates session')
			cy.createTextSession(undefined, { filePath: '', shareToken })
				.then(con => {
					joining = con
				})
			cy.log('Initial user closes session')
			cy.destroySession(connection)
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
