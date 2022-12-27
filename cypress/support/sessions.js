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

Cypress.Commands.add('prepareSessionApi', (fileId) => {
	return cy.request('/csrftoken')
		.then(({ body }) => emit('csrf-token-update', body))
})

Cypress.Commands.add('createTextSession', (fileId) => {
	const api = new SessionApi()
	return api.open({fileId})
})

Cypress.Commands.add('failToCreateTextSession', (fileId) => {
	const api = new SessionApi()
	return api.open({fileId})
		.then((response) => {
			throw 'Expected request to fail - but it succeeded!'
		})
		.catch((err) => err.response)
})

Cypress.Commands.add('pushSteps', ({connection, steps, version}) => {
	return connection.push({steps, version})
		.then(response => response.data)
})

Cypress.Commands.add('syncSteps', ({connection, version}) => {
	return connection.sync({version})
		.then(response => response.data)
})

