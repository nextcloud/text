/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { open, close } from '../../src/apis/connect.ts'
import { push, sync } from '../../src/apis/sync.ts'
import { save } from '../../src/apis/save.ts'

const url = Cypress.config('baseUrl').replace(/\/index.php\/?$/g, '')

Cypress.Commands.add('openConnection', open)

Cypress.Commands.add('closeConnection', close)

Cypress.Commands.add('failToCreateTextSession', (fileId, baseVersionEtag = null, options = {}) => {
	return open({ fileId, ...options, baseVersionEtag })
		.then((_response) => {
			throw new Error('Expected request to fail - but it succeeded!')
		}, (err) => err.response)
})

Cypress.Commands.add('pushSteps', ({ connection, steps, version, awareness = '' }) => {
	return push(connection, { steps, version, awareness })
		.then(response => response.data)
})

Cypress.Commands.add('failToPushSteps', ({ connection, steps, version, awareness = '' }) => {
	return push( connection, { steps, version, awareness })
		.then((_response) => {
			throw new Error('Expected request to fail - but it succeeded!')
		}, (err) => err.response)
})

Cypress.Commands.add('syncSteps', (connection, options = { version: 0 }) => {
	return sync(connection, options)
		.then(response => response.data)
})

Cypress.Commands.add('failToSyncSteps', (connection, options = { version: 0 }) => {
	return sync(connection, options)
		.then((_response) => {
			throw new Error('Expected request to fail - but it succeeded!')
		}, (err) => err.response)
})

Cypress.Commands.add('save', (connection, options = { version: 0 }) => {
	return save( connection, options)
		.then(response => response.data)
})

Cypress.Commands.add('failToSave', (connection, options = { version: 0 }) => {
	return save( connection, options)
		.then((_response) => {
			throw new Error('Expected request to fail - but it succeeded!')
		}, (err) => err.response)
})

Cypress.Commands.add('sessionUsers', function(connection, bodyOptions = {}) {
	const { documentId, sessionId, sessionToken } = connection
	const data = {
		documentId,
		sessionId,
		sessionToken,
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
			const pushed = push(connection, { steps, version, awareness })
				.catch(error => {
					 // handle 403 gracefully
					 if (error.response?.status !== 403) {
						 throw error
					 }
				})
			const closed = close(connection)
			return Promise.all([pushed, closed])
		})
})
