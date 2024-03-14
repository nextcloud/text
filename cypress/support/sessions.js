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

import SessionApi from '../../src/services/SessionApi.js'
import { emit } from '@nextcloud/event-bus'

Cypress.Commands.add('prepareWindowForSessionApi', () => {
	window.OC = {
		config: { modRewriteWorking: false },
	}
	// Prevent @nextcloud/router from reading window.location
	window._oc_webroot = ''
})

Cypress.Commands.add('prepareSessionApi', () => {
	return cy.request('/csrftoken')
		.then(({ body }) => {
			emit('csrf-token-update', body)
			return body.token
		})
})

Cypress.Commands.add('createTextSession', (fileId, options = {}) => {
	const api = new SessionApi(options)
	return api.open({ fileId })
})

Cypress.Commands.add('failToCreateTextSession', (fileId) => {
	const api = new SessionApi()
	return api.open({ fileId })
		.then((response) => {
			throw new Error('Expected request to fail - but it succeeded!')
		})
		.catch((err) => err.response)
})

Cypress.Commands.add('pushSteps', ({ connection, steps, version, awareness = '' }) => {
	return connection.push({ steps, version, awareness })
		.then(response => response.data)
})

Cypress.Commands.add('syncSteps', (connection, options = { version: 0 }) => {
	return connection.sync(options)
		.then(response => response.data)
})

Cypress.Commands.add('save', (connection, options = { version: 0 }) => {
	return connection.save(options)
		.then(response => response.data)
})

Cypress.Commands.add('sessionUsers', function(connection, bodyOptions = {}) {
	const body = {
		documentId: connection.document.id,
		sessionId: connection.session.id,
		sessionToken: connection.session.token,
		requesttoken: this.requesttoken,
		...bodyOptions,
	}
	cy.request({
		method: 'POST',
		url: '/apps/text/api/v1/users',
		body,
		failOnStatusCode: false,
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
