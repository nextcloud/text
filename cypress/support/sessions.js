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

import axios from '@nextcloud/axios'
import SessionApi from '../../src/services/SessionApi.js'

const url = Cypress.config('baseUrl').replace(/\/index.php\/?$/g, '')

Cypress.Commands.add('createTextSession', (fileId, options = {}) => {
	const api = new SessionApi(options)
	return api.open({ fileId })
})

Cypress.Commands.add('failToCreateTextSession', (fileId, baseVersionEtag = null, options = {}) => {
	const api = new SessionApi(options)
	return api.open({ fileId, baseVersionEtag })
		.then((response) => {
			throw new Error('Expected request to fail - but it succeeded!')
		}, (err) => err.response)
})

Cypress.Commands.add('pushSteps', ({ connection, steps, version, awareness = '' }) => {
	return connection.push({ steps, version, awareness })
		.then(response => response.data)
})

Cypress.Commands.add('failToPushSteps', ({ connection, steps, version, awareness = '' }) => {
	return connection.push({ steps, version, awareness })
		.then((response) => {
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
