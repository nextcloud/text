/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
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

// eslint-disable-next-line no-unused-vars,node/no-extraneous-import
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
			language: 'en', // for tests that rely on the translated text
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
	return cy.fixture(fileName, 'base64')
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

Cypress.Commands.add('createFile', (target, content, mimeType) => {
	const fileName = target.split('/').pop()

	const blob = new Blob([content], { type: mimeType })
	const file = new File([blob], fileName, { type: mimeType })

	return cy.window()
		.then(async window => {
			const response = await axios.put(`${Cypress.env('baseUrl')}/remote.php/webdav/${target}`, file, {
				headers: {
					requesttoken: window.OC.requestToken,
					'Content-Type': mimeType,
				},
			})

			return cy.log(`Uploaded ${fileName}`, response.status)
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
	return cy.window().then(win => {
		return win.OC.Files.getClient().createDirectory(dirName)
	})
})

Cypress.Commands.add('moveFile', (path, destinationPath) => {
	return cy.window().then(win => {
		return win.OC.Files.getClient().move(path, destinationPath)
	})
})

Cypress.Commands.add('copyFile', (path, destinationPath) => {
	return cy.window().then(win => {
		return win.OC.Files.getClient().copy(path, destinationPath)
	})
})

Cypress.Commands.add('reloadFileList', () => {
	return cy.window().then(win => {
		return win.OCA?.Files?.App?.fileList?.reload()
	})
})

Cypress.Commands.add('openFile', (fileName, params = {}) => {
	cy.get(`#fileList tr[data-file="${fileName}"] a.name`).click(params)
	// eslint-disable-next-line cypress/no-unnecessary-waiting
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

// Get menu entry even if moved into overflow menu
Cypress.Commands.add('getMenuEntry', (name) => {
	cy.getMenu().then(($body) => {
		if ($body.find(`[data-text-action-entry="${name}"]`).length) {
			return cy.getActionEntry(name)
		}
		return cy.getSubmenuEntry('remain', name)
	})
})

Cypress.Commands.add('getSubmenuEntry', { prevSubject: 'optional' }, (subject, parent, name) => {
	(subject ? cy.wrap(subject) : cy.getMenu())
		.getActionEntry(parent).click()
	return cy.getActionSubEntry(name)
})

Cypress.Commands.add('getActionEntry', { prevSubject: 'optional' }, (subject, name) => {
	return (subject ? cy.wrap(subject) : cy.getMenu())
		.find(`[data-text-action-entry="${name}"]`)
})

Cypress.Commands.add('getActionSubEntry', (name) => {
	return cy.get('.popover .open').getActionEntry(name)
})

Cypress.Commands.add('getContent', () => {
	return cy.getEditor().find('.ProseMirror')
})

Cypress.Commands.add('clearContent', () => {
	return cy.getContent()
		.type('{selectall}')
		.type('{del}')
})

Cypress.Commands.add('openWorkspace', () => {
	cy.get('#rich-workspace .empty-workspace').click()
	cy.getEditor().find('[data-text-el="editor-content-wrapper"]').click()

	return cy.getContent()
})
