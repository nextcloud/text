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

describe('The session Api', function () {
	before(function () {
		cy.createUser(user)
	})

	beforeEach(function () {
		cy.login(user)
	})

	describe('open the session', function () {
		let fileId
		let filePath

		beforeEach(function () {
			cy.uploadTestFile('test.md').then((id) => {
				fileId = id
			})
			cy.testName().then((name) => {
				filePath = `/${name}.md`
			})
		})

		it('returns connection', function () {
			cy.openConnection({ fileId }).then(({ connection }) => {
				cy.wrap(connection).its('documentId').should('equal', fileId)
				cy.closeConnection(connection)
			})
		})

		it('provides initial content', function () {
			cy.openConnection({ fileId, filePath }).then(({ connection, data }) => {
				cy.wrap(data).its('content').should('eql', '## Hello world\n')
				cy.closeConnection(connection)
			})
		})

		it('handles invalid file id', function () {
			cy.failToCreateTextSession(123456789).its('status').should('equal', 404)
		})

		it('handles missing file id', function () {
			cy.failToCreateTextSession().its('status').should('equal', 412)
		})
	})

	describe('step types', function () {
		let connection

		beforeEach(function () {
			cy.uploadTestFile()
				.then((fileId) => cy.openConnection({ fileId }))
				.then(({ connection: con }) => {
					connection = con
				})
		})

		afterEach(function () {
			cy.closeConnection(connection)
		})

		// Echoes all message types but queries
		Object.entries(messages)
			.filter(([key, _value]) => key !== 'query')
			.forEach(([type, sample]) => {
				it(`echos ${type} messages`, function () {
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

		it('responds to queries', function () {
			const version = 0
			Object.entries(messages).forEach(([type, sample]) => {
				cy.pushSteps({ connection, steps: [sample], version })
			})
			cy.pushSteps({ connection, steps: [messages.query], version }).then(
				(response) => {
					cy.wrap(response).its('version').should('eql', 0)
					cy.wrap(response).its('steps.length').should('eql', 1)
					cy.wrap(response)
						.its('steps[0].data')
						.should('eql', [messages.update])
				},
			)
		})
	})

	describe('sync', function () {
		const version = 0
		let connection
		let fileId
		let filePath
		let joining

		beforeEach(function () {
			cy.testName().then((name) => {
				filePath = `/${name}.md`
			})
			cy.uploadTestFile()
				.then((id) => {
					fileId = id
					return cy.openConnection({ fileId, filePath })
				})
				.then(({ connection: con }) => {
					connection = con
				})
		})

		it('starts empty', function () {
			cy.syncSteps(connection).its('steps').should('eql', [])
		})

		it('saves', function () {
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.save(connection, {
				version: 1,
				autosaveContent: '# Heading 1',
				manualSave: true,
			})
			cy.downloadFile(filePath).its('data').should('eql', '# Heading 1')
		})

		it('saves yjs document state', function () {
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
			cy.openConnection({ fileId, filePath })
				.then(({ connection: con, data }) => {
					joining = con
					return data
				})
				.its('documentState')
				.should('eql', documentState)
			cy.closeConnection(joining)
		})

		afterEach(function () {
			cy.closeConnection(connection)
		})
	})

	describe('public sync', function () {
		const version = 0
		let connection
		let filePath
		let shareToken
		let joining

		beforeEach(function () {
			cy.testName().then((name) => {
				filePath = `/${name}.md`
			})
			cy.uploadTestFile()
				.then((_id) => {
					return cy.shareFile(filePath, { edit: true })
				})
				.then((token) => {
					shareToken = token
				})
				.then(() => cy.clearCookies())
				.then(() => {
					return cy
						.openConnection({ filePath: '', token: shareToken })
						.then(({ connection: con }) => {
							connection = con
						})
				})
		})

		afterEach(function () {
			cy.closeConnection(connection)
		})

		it('starts empty public', function () {
			cy.syncSteps(connection).its('steps').should('eql', [])
		})

		it('saves public', function () {
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.save(connection, {
				version: 1,
				autosaveContent: '# Heading 1',
				manualSave: true,
			})
			cy.login(user)
			cy.downloadFile('saves.md').its('data').should('eql', '# Heading 1')
		})

		it('saves yjs document state public', function () {
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
			cy.openConnection({ filePath: '', token: shareToken })
				.then(({ connection: con, data }) => {
					joining = con
					return data
				})
				.its('documentState')
				.should('eql', documentState)
			cy.closeConnection(joining)
		})
	})

	describe('race conditions', function () {
		const version = 0
		let connection
		let shareToken

		beforeEach(function () {
			cy.testName()
				.then((name) => {
					const filePath = `/${name}.md`
					cy.uploadTestFile('test.md')
					return cy.shareFile(filePath, { edit: true })
				})
				.then((token) => {
					cy.log(token)
					shareToken = token
					cy.clearCookies()
					cy.openConnection({ filePath: '', token: shareToken }).then(
						({ connection: con }) => {
							connection = con
						},
					)
				})
		})

		it('does not send initial content if other session is alive but did not push any steps', function () {
			let joining
			cy.openConnection({ filePath: '', token: shareToken })
				.then(({ connection: con, data }) => {
					joining = con
					return data
				})
				.its('content')
				.should('eql', '## Hello world\n')
				.then(() => cy.closeConnection(joining))
			cy.closeConnection(connection)
		})

		it('does not send initial content if session is alive even without saved state', function () {
			let joining
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.openConnection({ filePath: '', token: shareToken })
				.then(({ connection: con, data }) => {
					joining = con
					return data
				})
				.its('content')
				.should('eql', '## Hello world\n')
				.then(() => cy.closeConnection(joining))
			cy.closeConnection(connection)
		})

		it('refuses create,push,sync,save with non-matching baseVersionEtag', function () {
			cy.failToCreateTextSession(undefined, 'wrongBaseVersionEtag', {
				filePath: '',
				token: shareToken,
			})
				.its('status')
				.should('eql', 412)

			connection.baseVersionEtag = 'wrongBaseVersionEtag'

			cy.failToPushSteps({ connection, steps: [messages.update], version })
				.its('status')
				.should('equal', 412)

			cy.failToSyncSteps(connection, { version: 0 })
				.its('status')
				.should('equal', 412)

			cy.failToSave(connection).its('status').should('equal', 412)

			cy.closeConnection(connection)
		})

		it('recovers session even if last person leaves right after create', function () {
			let joining
			cy.log('Initial user pushes steps')
			cy.pushSteps({ connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.log('Other user creates session')
			cy.openConnection({ filePath: '', token: shareToken }).then(
				({ connection: con }) => {
					joining = con
				},
			)
			cy.log('Initial user closes session')
			cy.closeConnection(connection)
			cy.log('Other user still finds the steps').then(() => {
				cy.syncSteps(joining, {
					version: 0,
				})
					.its('steps[0].data')
					.should('eql', [messages.update])
			})
		})

		// Failed with a probability of ~ 50% initially
		// Skipped for now since the behaviour chanced by not cleaning up the state on close/create
		it.skip('ignores steps stored after close cleaned up', function () {
			cy.pushAndClose({ connection, steps: [messages.update], version })
			cy.openConnection({ filePath: '', token: shareToken })
				.then(({ connection: con, data }) => {
					connection = con
					return data
				})
				.its('content')
				.should('eql', '## Hello world\n')
		})
	})
})
