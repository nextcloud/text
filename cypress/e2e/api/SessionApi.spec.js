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
		beforeEach(function() {
			cy.uploadTestFile('test.md').as('fileId')
			cy.testName().then(name => `/${name}.md`).as('filePath')
		})

		it('returns connection', function() {
			cy.createTextSession(this.fileId)
				.as('connection')
				.its('document.id')
				.should('equal', this.fileId)
			cy.get('@connection').then(con => con.close())
		})

		it('provides initial content', function() {
			cy.createTextSession(this.fileId, { filePath: this.filePath })
				.as('connection')
				.its('state.documentSource')
				.should('eql', '## Hello world\n')
			cy.get('@connection').then(con => con.close())
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

		beforeEach(function() {
			cy.uploadTestFile()
				.then(cy.createTextSession)
				.as('connection')
		})

		afterEach(function() {
			this.connection.close()
		})

		// Echoes all message types but queries
		Object.entries(messages)
			.filter(([key, _value]) => key !== 'query')
			.forEach(([type, sample]) => {
				it(`echos ${type} messages`, function() {
					const steps = [sample]
					const version = 0
					cy.pushSteps({ connection: this.connection, steps, version })
						.its('version')
						.should('be.at.least', 1)
					cy.syncSteps(this.connection)
						.its('steps[0].data')
						.should('eql', steps)
				})
			})

		it('responds to queries', function() {
			const version = 0
			Object.entries(messages)
				.forEach(([type, sample]) => {
					cy.pushSteps({ connection: this.connection, steps: [sample], version })
				})
			cy.pushSteps({ connection: this.connection, steps: [messages.query], version })
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

		beforeEach(function() {
			cy.uploadTestFile().as('fileId')
			cy.testName().then(name => `/${name}.md`).as('filePath')
				.then(filePath => cy.createTextSession(this.fileId, { filePath }))
				.as('connection')
		})

		afterEach(function() {
			this.connection.close()
		})

		it('starts empty', function() {
			cy.syncSteps(this.connection)
				.its('steps')
				.should('eql', [])
		})

		it('saves', function() {
			cy.pushSteps({ connection: this.connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.save(this.connection, { version: 1, autosaveContent: '# Heading 1', manualSave: true })
			cy.downloadFile(this.filePath)
				.its('data')
				.should('eql', '# Heading 1')
		})

		it('saves yjs document state', function() {
			const documentState = 'Base64 encoded string'
			cy.pushSteps({ connection: this.connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.save(this.connection, {
				version: 1,
				autosaveContent: '# Heading 1',
				documentState,
				manualSave: true,
			})
			cy.createTextSession(this.fileId, { filePath: this.filePath })
				.as('joining')
				.its('state.documentState')
				.should('eql', documentState)
			cy.get('@joining').then(con => con.close())
		})

	})

	describe('public sync', function() {
		const version = 0

		beforeEach(function() {
			cy.uploadTestFile().as('fileId')
			cy.testName().then(name => `/${name}.md`).as('filePath')
				.then(filePath => cy.shareFile(filePath, { edit: true }))
				.as('shareToken')
			cy.clearCookies()
			cy.get('@shareToken')
				.then(shareToken => cy.createTextSession(undefined, { filePath: '', shareToken }))
				.as('connection')
		})

		afterEach(function() {
			this.connection.close()
		})

		it('starts empty public', function() {
			cy.syncSteps(this.connection)
				.its('steps')
				.should('eql', [])
		})

		it('saves public', function() {
			cy.pushSteps({ connection: this.connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.save(this.connection, { version: 1, autosaveContent: '# Heading 1', manualSave: true })
			cy.login(user)
			cy.downloadFile('saves.md')
				.its('data')
				.should('eql', '# Heading 1')
		})

		it('saves yjs document state public', function() {
			const documentState = 'Base64 encoded string'
			cy.pushSteps({ connection: this.connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.save(this.connection, {
				version: 1,
				autosaveContent: '# Heading 1',
				documentState,
				manualSave: true,
			})
			cy.createTextSession(undefined, { filePath: '', shareToken: this.shareToken })
				.as('joining')
				.its('state.documentState')
				.should('eql', documentState)
			cy.get('@joining').then(con => con.close())
		})

	})

	describe('race conditions', function() {
		const version = 0

		beforeEach(function() {
			cy.uploadTestFile('test.md').as('fileId')
			cy.testName().then(name => `/${name}.md`).as('filePath')
				.then(filePath => cy.shareFile(filePath, { edit: true }))
				.as('shareToken')
			cy.clearCookies()
			cy.get('@shareToken')
				.then(shareToken => cy.createTextSession(undefined, { filePath: '', shareToken }))
				.as('connection')
		})

		afterEach(function() {
			if (!this.connection.isClosed) {
				this.connection.close()
			}
		})

		it('signals closing connection', function() {
			cy.then(() => {
				return new Promise((resolve, reject) => {
					this.connection.close()
					this.connection.push({ steps: [messages.update], version, awareness: '' })
						.then(
							() => reject(new Error('Push should have thrown ConnectionClosed()')),
							resolve,
						)
				})
			})
		})

		it('does not send initial content if other session is alive but did not push any steps', function() {
			cy.createTextSession(undefined, { filePath: '', shareToken: this.shareToken })
				.as('joining')
			cy.get('@connection')
				.its('state.documentSource')
				.should('eql', '## Hello world\n')
			cy.get('@joining').then(con => con.close())
		})

		it('does not send initial content if session is alive even without saved state', function() {
			cy.pushSteps({ connection: this.connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.createTextSession(undefined, { filePath: '', shareToken: this.shareToken })
				.as('joining')
			cy.get('@connection')
				.its('state.documentSource')
				.should('eql', '## Hello world\n')
			cy.get('@joining').then(con => con.close())
		})

		it('refuses create,push,sync,save with non-matching baseVersionEtag', function() {
			cy.failToCreateTextSession(undefined,
				'wrongBaseVersionEtag',
				{ filePath: '', shareToken: this.shareToken },

			)
				.its('status')
				.should('eql', 412)

			this.connection.setBaseVersionEtag('wrongBaseVersionEtag')

			cy.failToPushSteps({ connection: this.connection, steps: [messages.update], version })
				.its('status')
				.should('equal', 412)

			cy.failToSyncSteps(this.connection, { version: 0 })
				.its('status')
				.should('equal', 412)

			cy.failToSave(this.connection)
				.its('status')
				.should('equal', 412)
		})

		it('recovers session even if last person leaves right after create', function() {
			cy.log('Initial user pushes steps')
			cy.pushSteps({ connection: this.connection, steps: [messages.update], version })
				.its('version')
				.should('be.at.least', 1)
			cy.log('Other user creates session')
			cy.createTextSession(undefined, { filePath: '', shareToken: this.shareToken })
				.as('joining')
			cy.log('Initial user closes session')
				.then(() => this.connection.close())
			cy.log('Other user still finds the steps')
				.then(() => cy.syncSteps(this.joining, { version: 0 }))
				.its('steps[0].data')
				.should('eql', [messages.update])
			cy.get('@joining').then(con => con.close())
		})

		// Failed with a probability of ~ 50% initially
		// Skipped for now since the behaviour changed by not cleaning up the state on close/create
		it.skip('ignores steps stored after close cleaned up', function() {
			cy.pushAndClose({ connection: this.connection, steps: [messages.update], version })
			cy.createTextSession(undefined, { filePath: '', shareToken: this.shareToken })
				.as('joining')
				.its('state.documentSource')
				.should('eql', '## Hello world\n')
			cy.get('@joining').then(con => con.close())
		})

	})
})
