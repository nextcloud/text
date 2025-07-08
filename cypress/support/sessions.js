/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { SessionConnection } from '../../src/services/SessionConnection.js'
import { open, close } from '../../src/apis/Connect.ts'
import { push } from '../../src/apis/Sync.ts'

const url = Cypress.config('baseUrl').replace(/\/index.php\/?$/g, '')

Cypress.Commands.add('createTextSession', async (fileId, options = {}) => {
	const { connection, data } = await open({ fileId, token: options.shareToken, ...options })
	return new SessionConnection(data, connection)
})

Cypress.Commands.add('destroySession', async (sessionConnection) => {
	const { documentId, id, token } = sessionConnection.session
	await close({ documentId, sessionId: id, sessionToken: token })
	sessionConnection.close()
})

Cypress.Commands.add('failToCreateTextSession', (fileId, baseVersionEtag = null, options = {}) => {
	return open({ fileId, ...options, baseVersionEtag })
		.then((_response) => {
			throw new Error('Expected request to fail - but it succeeded!')
		}, (err) => err.response)
})

Cypress.Commands.add('pushSteps', ({ connection: sessionConnection, steps, version, awareness = '' }) => {
	return push(
		sessionConnection.connection,
		{ steps, version, awareness }
	).then(response => response.data)
})

Cypress.Commands.add('failToPushSteps', ({ connection: sessionConnection, steps, version, awareness = '' }) => {
	return push(
		sessionConnection.connection,
		{ steps, version, awareness }
	).then((_response) => {
		throw new Error('Expected request to fail - but it succeeded!')
	}, (err) => err.response)
})

Cypress.Commands.add('syncSteps', (connection, options = { version: 0 }) => {
	return connection.sync(options)
		.then(response => response.data)
})

Cypress.Commands.add('failToSyncSteps', (connection, options = { version: 0 }) => {
	return connection.sync(options)
		.then((response) => {
			throw new Error('Expected request to fail - but it succeeded!')
		}, (err) => err.response)
})

Cypress.Commands.add('save', (connection, options = { version: 0 }) => {
	return connection.save(options)
		.then(response => response.data)
})

Cypress.Commands.add('failToSave', (connection, options = { version: 0 }) => {
	return connection.save(options)
		.then((response) => {
			throw new Error('Expected request to fail - but it succeeded!')
		}, (err) => err.response)
})

Cypress.Commands.add('sessionUsers', function(connection, bodyOptions = {}) {
	const data = {
		documentId: connection.document.id,
		sessionId: connection.session.id,
		sessionToken: connection.session.token,
		requesttoken: this.requesttoken,
		...bodyOptions,
	}
	return axios.request({
		method: 'POST',
		url: `${url}/index.php/apps/text/api/v1/users`,
		data,
		validateStatus: status => status < 500,
	})
})

// Used to test for race conditions between the last push and the close request
Cypress.Commands.add('pushAndClose', ({ connection, steps, version, awareness = '' }) => {
	cy.log('Race between push and close')
		.then(() => {
			const push = connection.push({ steps, version, awareness })
				.catch(error => {
					 // handle 403 gracefully
					 if (error.response?.status !== 403) {
						 throw error
					 }
				})
			const close = connection.close()
			return Promise.all([push, close])
		})
})
