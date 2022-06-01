/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
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
import regeneratorRuntime from 'regenerator-runtime'

const url = Cypress.config('baseUrl').replace(/\/index.php\/?$/g, '')
Cypress.env('baseUrl', url)

Cypress.Commands.add('login', (user, password, { route, onBeforeLoad } = {}) => {
	route = route || '/apps/files'

	cy.session(user, function() {
		cy.visit(route)
		cy.get('input[name=user]').type(user)
		cy.get('input[name=password]').type(password)
		cy.get('.submit-wrapper input[type=submit]').click()
		cy.url().should('include', route)
	})
	// in case the session already existed but we are on a different route...
	cy.visit(route, { onBeforeLoad })
})

Cypress.Commands.add('logout', (route = '/') => {
	cy.session('_guest', function() {
	})
})

Cypress.Commands.add('nextcloudCreateUser', (user, password) => {
	cy.clearCookies()
	cy.request({
		method: 'POST',
		url: `${Cypress.env('baseUrl')}/ocs/v1.php/cloud/users?format=json`,
		form: true,
		body: {
			userid: user,
			password,
		},
		auth: { user: 'admin', pass: 'admin' },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		cy.log(`Created user ${user}`, response.status)
	})
})

Cypress.Commands.add('nextcloudUpdateUser', (user, password, key, value) => {
	cy.request({
		method: 'PUT',
		url: `${Cypress.env('baseUrl')}/ocs/v2.php/cloud/users/${user}`,
		form: true,
		body: { key, value },
		auth: { user, pass: password },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		cy.log(`Updated user ${user} ${key} to ${value}`, response.status)
	})
})

Cypress.Commands.add('nextcloudDeleteUser', (user) => {
	cy.clearCookies()
	cy.request({
		method: 'DELETE',
		url: `${Cypress.env('baseUrl')}/ocs/v1.php/cloud/users/${user}`,
		form: true,
		auth: { user: 'admin', pass: 'admin' },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		cy.log(`Deleted user ${user}`, response.status)
	})
})

Cypress.Commands.add('uploadFile', (fileName, mimeType, target) => {
	cy.fixture(fileName, 'base64')
		.then(Cypress.Blob.base64StringToBlob)
		.then(async blob => {
			const file = new File([blob], fileName, { type: mimeType })
			if (typeof target !== 'undefined') {
				fileName = target
			}
			await cy.window().then(async window => {
				await axios.put(`${Cypress.env('baseUrl')}/remote.php/webdav/${fileName}`, file, {
					headers: {
						requesttoken: window.OC.requestToken,
						'Content-Type': mimeType,
					},
				}).then(response => {
					cy.log(`Uploaded ${fileName}`, response.status)
				})
			})
		})
})

Cypress.Commands.add('shareFileToUser', (userId, password, path, targetUserId) => {
	cy.clearCookies()
	cy.request({
		method: 'POST',
		url: `${Cypress.env('baseUrl')}/ocs/v2.php/apps/files_sharing/api/v1/shares`,
		form: true,
		body: {
			path,
			shareType: 0,
			shareWith: targetUserId,
		},
		auth: { user: userId, pass: password },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		cy.log(`${userId} shared ${path} with ${targetUserId}`, response.status)
	})
})

Cypress.Commands.add('createFolder', dirName => {
	cy.window().then(win => {
		win.OC.Files.getClient().createDirectory(dirName)
	})
})

Cypress.Commands.add('moveFile', (path, destinationPath) => {
	cy.window().then(win => {
		win.OC.Files.getClient().move(path, destinationPath)
	})
})

Cypress.Commands.add('copyFile', (path, destinationPath) => {
	cy.window().then(win => {
		win.OC.Files.getClient().copy(path, destinationPath)
	})
})

Cypress.Commands.add('reloadFileList', () => {
	cy.window().then(win => {
		win.OCA?.Files?.App?.fileList?.reload()
	})
})

Cypress.Commands.add('openFile', fileName => {
	cy.get(`#fileList tr[data-file="${fileName}"] a.name`).click()
	cy.wait(250)
})

Cypress.Commands.add('getFile', fileName => {
	return cy.get(`#fileList tr[data-file="${fileName}"]`)
})

Cypress.Commands.add('deleteFile', fileName => {
	cy.get(`#fileList tr[data-file="${fileName}"] a.name .action-menu`).click()
	cy.get(`#fileList tr[data-file="${fileName}"] a.name + .popovermenu .action-delete`).click()
})

Cypress.Commands.add('getEditor', () => {
	return cy.get('[data-text-el="editor-container"]')
})

Cypress.Commands.add('getMenu', { prevSubject: 'optional' }, (subject) => {
	return (subject ? cy.wrap(subject) : cy.getEditor())
		.find('[data-text-el="menubar"]')
})

Cypress.Commands.add('getActionEntry', { prevSubject: 'optional' }, (subject, name) => {
	return (subject ? cy.wrap(subject) : cy.getMenu())
		.find(`[data-text-action-entry="${name}"]`)
})

Cypress.Commands.add('openWorkspace', (subject, name) => {
	cy.get('#rich-workspace .empty-workspace').click()
	cy.getEditor().find('[data-text-el="editor-content-wrapper"]').click()

	return cy.getEditor().find('.ProseMirror')
})
