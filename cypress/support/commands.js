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
import { addCommands } from '@nextcloud/cypress'
import compareSnapshotCommand from 'cypress-visual-regression/dist/command.js'

// eslint-disable-next-line no-unused-vars,n/no-extraneous-import
import regeneratorRuntime from 'regenerator-runtime'

compareSnapshotCommand()

const url = Cypress.config('baseUrl').replace(/\/index.php\/?$/g, '')
Cypress.env('baseUrl', url)
const silent = { log: false }

addCommands()

// Keep track of the current user authentication.
// We need it for various commands to authenticate
// and also to determine paths, urls and the like.
let auth
Cypress.Commands.overwrite('login', (login, user) => {
	cy.window(silent).then((win) => {
		win.location.href = 'about:blank'
	})
	auth = { user: user.userId, password: user.password }
	cy.wrap(null).as('requesttoken')
	login(user)
})

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
	// Make sure that each visit call that triggers a page load will update the stored requesttoken
	return originalFn(url, options).then((result) => {
		cy.window(silent)
			.then((win) => {
				cy.wrap(win?.OC?.requestToken)
					.as('requesttoken')
			})
	})
})

Cypress.Commands.add('getRequestToken', () => {
	cy.then(function() {
		if (this.requesttoken) {
			return this.requesttoken
		} else {
			cy.log('Fetching request token')
			return cy.request('/csrftoken')
				.its('body.token')
				.as('requesttoken')
		}
	})
})

Cypress.Commands.add('ocsRequest', (options) => {
	return cy.getRequestToken()
		.then((requesttoken) => {
			return cy.request({
				form: true,
				auth,
				headers: {
					'OCS-ApiRequest': 'true',
					'Content-Type': 'application/x-www-form-urlencoded',
					requesttoken,
				},
				...options,
			})
		})
})

Cypress.Commands.add('uploadFile', (fileName, mimeType, target) => {
	return cy.fixture(fileName, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(blob => {
			if (typeof target !== 'undefined') {
				fileName = target
			}
			cy.getRequestToken()
				.then(async (requesttoken) => {
					return cy.request({
						url: `${url}/remote.php/webdav/${fileName}`,
						method: 'put',
						body: blob.size > 0 ? blob : '',
						auth,
						headers: {
							requesttoken,
							'Content-Type': mimeType,
						},
					})
				}).then(response => {
					const fileId = Number(
						response.headers['oc-fileid']?.split('oc')?.[0],
					)
					cy.log(`Uploaded ${fileName}`,
						response.status,
						{ fileId },
					)
					return cy.wrap(fileId)
				})
		})
})

Cypress.Commands.add('downloadFile', (fileName) => {
	return cy.getRequestToken()
		.then(requesttoken => {
			return axios.get(`${url}/remote.php/webdav/${fileName}`, {
				headers: {
					requesttoken,
				},
			})
		})
})

Cypress.Commands.add('createFile', (target, content, mimeType = 'text/markdown', headers = {}) => {
	const blob = new Blob([content], { type: mimeType })

	return cy.getRequestToken()
		.then(requesttoken => {
			return cy.request({
				url: `${url}/remote.php/webdav/${target}`,
				method: 'put',
				body: blob.size > 0 ? blob : '',
				auth,
				headers: {
					'Content-Type': mimeType,
					requesttoken,
					...headers,
				},
			}).then((response) => {
				cy.log(`Uploaded ${target}`, response.status)
				const fileId = Number(
					response.headers['oc-fileid']?.split('oc')?.[0],
				)
				return cy.wrap(fileId)
			})
		})
})

Cypress.Commands.add('createMarkdown', (fileName, content, reload = true) => {
	return cy.createFile(fileName, content, 'text/markdown')
		.then((fileId) => {
			if (reload) {
				cy.reloadFileList()
			}
			return cy.wrap(fileId)
		})
})

Cypress.Commands.add('shareFileToUser', (path, targetUser, shareData = {}) => {
	cy.ocsRequest({
		method: 'POST',
		url: `${url}/ocs/v2.php/apps/files_sharing/api/v1/shares`,
		body: {
			path,
			shareType: 0,
			shareWith: targetUser.userId,
			...shareData,
		},
	}).then(response => {
		cy.log(`${auth.user} shared ${path} with ${targetUser.userId}`, response.status)
	})
})

Cypress.Commands.add('testName', () => {
	const retry = cy.state('test').currentRetry()
	const folderName = retry
		? `${Cypress.currentTest.title} (${retry})`
		: Cypress.currentTest.title
	return cy.wrap(folderName)
})

Cypress.Commands.add('createTestFolder', () => {
	return cy.testName().then(folderName => {
		cy.createFolder(folderName)
		return cy.wrap(folderName)
	})
})

Cypress.Commands.add('visitTestFolder', (visitOptions = {}) => {
	return cy.testName().then(folderName => {
		const url = `apps/files?dir=/${encodeURIComponent(folderName)}`
		return cy.visit(url, visitOptions)
	})
})

Cypress.Commands.add('uploadTestFile', (source = 'empty.md') => {
	return cy.testName().then(name => {
		return cy.uploadFile(source, 'text/markdown', `${name}.md`)
	})
})

Cypress.Commands.add('openTestFile', () => {
	return cy.testName().then(name => cy.openFile(`${name}.md`))
})

Cypress.Commands.add('isolateTest', ({ sourceFile = 'empty.md', targetFile = null, onBeforeLoad } = {}) => {
	targetFile = targetFile || sourceFile
	cy.createTestFolder().then(folderName => {
		cy.uploadFile(sourceFile, 'text/markdown', `${encodeURIComponent(folderName)}/${targetFile}`)
		window.__currentDirectory = folderName
		return cy.visitTestFolder({ onBeforeLoad })
			.then(() => ({ folderName, fileName: targetFile }))
	})
})

Cypress.Commands.add('shareFile', (path, options = {}) => {
	return cy.getRequestToken()
		.then(async requesttoken => {
			const headers = { requesttoken }
			const shareType = window.OC?.Share?.SHARE_TYPE_LINK ?? 3
			const request = await axios.post(
				`${url}/ocs/v2.php/apps/files_sharing/api/v1/shares`,
				{ path, shareType },
				{ headers },
			)
			const token = request.data?.ocs?.data?.token
			const id = request.data?.ocs?.data?.id
			if (!token || !id || token.length === 0) {
				throw request
			}
			cy.log(`Share link created: ${token}`)

			if (options.edit) {
				// Same permissions makeing the share editable in the UI would set
				// 1 = read; 2 = write; 16 = share;
				const permissions = 19
				await axios.put(
					`${url}/ocs/v2.php/apps/files_sharing/api/v1/shares/${id}`,
					{ permissions },
					{ headers },
				)
				cy.log(`Made share ${token} editable.`)
			}
			return cy.wrap(token)
		}).should('have.length', 15)
})

Cypress.Commands.add('createFolder', (target) => {
	const rootPath = `${Cypress.env('baseUrl')}/remote.php/dav/files/${encodeURIComponent(auth.user)}`
	const dirPath = target.split('/').map(encodeURIComponent).join('/')

	return cy.getRequestToken()
		.then(requesttoken => {
			return cy.request({
				url: `${rootPath}/${dirPath}`,
				method: 'MKCOL',
				auth,
				headers: {
					requesttoken,
				},
			})
		})
})

Cypress.Commands.add('moveFile', (path, destinationPath) => {
	return cy.getRequestToken()
		.then(requesttoken => {
			return cy.request({
				method: 'MOVE',
				url: `${url}/remote.php/webdav/${path}`,
				auth,
				headers: {
					requesttoken,
					Destination: `${url}/remote.php/webdav/${destinationPath}`,
				},
			}).then(response => {
				cy.wrap(response.body)
			})
		})
})

Cypress.Commands.add('removeFile', (path) => {
	return cy.getRequestToken()
		.then(requesttoken => {
			return cy.request({
				url: `${url}/remote.php/webdav/${path}`,
				method: 'DELETE',
				auth,
				headers: {
					requesttoken,
				},
			})
		})
})

Cypress.Commands.add('copyFile', (path, destinationPath) => {
	return cy.getRequestToken()
		.then(requesttoken => {
			return cy.request({
				method: 'COPY',
				url: `${url}/remote.php/webdav/${path}`,
				auth,
				headers: {
					requesttoken,
					Destination: `${url}/remote.php/webdav/${destinationPath}`,
				},
			}).then(response => {
				cy.wrap(response.body)
			})
		})
})

Cypress.Commands.add('getFileContent', (path) => {
	return cy.request({
		method: 'GET',
		url: `${url}/remote.php/webdav/${path}`,
		auth,
	}).then(response => {
		cy.wrap(response.body)
	})
})

Cypress.Commands.add('propfindFolder', (path, depth = 0) => {
	return cy.window(silent)
		.then(win => {
			const files = win.OC.Files
			const PROPERTY_WORKSPACE_FILE
				= `{${files.Client.NS_NEXTCLOUD}}rich-workspace-file`
			const PROPERTY_WORKSPACE
				= `{${files.Client.NS_NEXTCLOUD}}rich-workspace`
			const properties = [
				...files.getClient().getPropfindProperties(),
				PROPERTY_WORKSPACE_FILE,
				PROPERTY_WORKSPACE,
			]
			const client = files.getClient().getClient()
			return client.propFind(client.baseUrl + path, properties, depth)
				.then((results) => {
					cy.log(`Propfind returned ${results.status}`)
					if (depth) {
						return results.body
					} else {
						return results.body.propStat[0].properties
					}
				})
		})
})

Cypress.Commands.add('reloadFileList', () => {
	return cy.get('.vue-crumb:last-child a').click()
})

Cypress.Commands.add('openFolder', (name) => {
	const url = `**/${encodeURI(name)}`
	cy.intercept({ method: 'PROPFIND', url })
		.as(`open-${name}`)
	cy.openFile(name)
	cy.wait(`@open-${name}`)
})

Cypress.Commands.add('getFileId', (fileName, params = {}) => {
	return cy.get(`[data-cy-files-list] tr[data-cy-files-list-row-name="${fileName}"]`)
		.invoke('attr', 'data-cy-files-list-row-fileid')
})

Cypress.Commands.add('openFile', (fileName, params = {}) => {
	cy.get(`[data-cy-files-list] tr[data-cy-files-list-row-name="${fileName}"] a[data-cy-files-list-row-name-link]`).click(params)
})

Cypress.Commands.add('openFileInShare', fileName => {
	cy.get(`.files-fileList tr[data-file="${CSS.escape(fileName)}"] a.name`).click()
	// eslint-disable-next-line
	cy.wait(250)
})

Cypress.Commands.add('closeFile', (params = {}) => {
	cy.intercept({ method: 'POST', url: '**/apps/text/session/*/close' })
		.as('close')
	cy.get('#viewer .modal-header button.header-close').click(params)
	cy.get('#viewer .modal-header').should('not.exist')
	cy.wait('@close', { timeout: 7000 })
})

let closeData = null
Cypress.Commands.add('interceptCreate', () => {
	return cy.intercept({ method: 'PUT', url: '**/session/*/create' }, (req) => {
		closeData = {
			url: ('' + req.url).replace('create', 'close'),
		}
		req.continue((res) => {
			closeData = {
				...closeData,
				...res.body,
			}
		})
	}).as('create')
})

Cypress.Commands.add('closeInterceptedSession', (shareToken = undefined) => {
	return cy.window().then(win => {
		return axios.post(
			closeData.url,
			{
				documentId: closeData.session.documentId,
				sessionId: closeData.session.id,
				sessionToken: closeData.session.token,
				token: shareToken,
			},
			{ headers: { requesttoken: win.OC.requestToken } },
		)
	})
})

Cypress.Commands.add('getFile', fileName => {
	return cy.get(`[data-cy-files-list] tr[data-cy-files-list-row-name="${fileName}"]`)

})

Cypress.Commands.add('deleteFile', fileName => {
	return cy.getRequestToken()
		.then(requesttoken => {
			return cy.request({
				method: 'DELETE',
				url: `${url}/remote.php/webdav/${fileName}`,
				auth,
				headers: {
					requesttoken,
				},
			}).then(response => {
				cy.wrap(response.body)
			})
		})
})

Cypress.Commands.add('getModal', () => {
	return cy.get('#viewer[data-handler="text"]')
})

Cypress.Commands.add('getEditor', { prevSubject: 'optional' }, (subject) => {
	return subject
		? cy.wrap(subject).find('[data-text-el="editor-container"]')
		: cy.get('[data-text-el="editor-container"]')
})

Cypress.Commands.add('getMenu', { prevSubject: 'optional' }, (subject) => {
	return (subject ? cy.wrap(subject) : cy.getEditor())
		.find('[data-text-el="menubar"]')
})

// Get menu entry even if moved into overflow menu
Cypress.Commands.add('getMenuEntry', (name) => {
	cy.getMenu().then(($body) => {
		if ($body.find(`div.text-menubar__entries > [data-text-action-entry="${name}"]`).length) {
			return cy.getActionEntry(name)
		}
		return cy.getSubmenuEntry('remain', name)
	})
})

Cypress.Commands.add('getSubmenuEntry', { prevSubject: 'optional' }, (subject, parent, name) => {
	return (subject ? cy.wrap(subject) : cy.getMenu())
		.getActionEntry(parent)
		.click()
		.then(() => cy.getActionSubEntry(name))
})

Cypress.Commands.add('getActionEntry', { prevSubject: 'optional' }, (subject, name) => {
	return (subject ? cy.wrap(subject) : cy.getMenu())
		.find(`[data-text-action-entry="${name}"]`)
})

Cypress.Commands.add('getActionSubEntry', (name) => {
	return cy.get('div[data-text-el="menubar"]').getActionEntry(name)
})

Cypress.Commands.add('getContent', { prevSubject: 'optional' }, (subject) => {
	return (subject ? cy.wrap(subject) : cy.getEditor())
		.find('.ProseMirror', { timeout: 10000 })
})

Cypress.Commands.add('getOutline', () => {
	return cy.getEditor().find('[data-text-el="editor-outline"]')
})

Cypress.Commands.add('getTOC', () => {
	return cy.getEditor().find('[data-text-el="editor-table-of-contents"]')
})

Cypress.Commands.add('clearContent', () => {
	cy.getContent().scrollIntoView()
	cy.getContent().type('{selectAll}{backspace}')

	cy.getContent()
})

Cypress.Commands.add('openWorkspace', () => {
	cy.createDescription()
	cy.get('#rich-workspace .editor__content').click({ force: true })
	cy.getEditor().find('[data-text-el="editor-content-wrapper"]').click({ force: true })

	return cy.getContent()
})

Cypress.Commands.add('configureText', (key, value) => {
	return cy.window(silent).then(win => {
		return axios.post(
			`${url}/index.php/apps/text/settings`,
			{ key, value },
			{ headers: { requesttoken: win.OC.requestToken } },
		)
	})
})

Cypress.Commands.add('showHiddenFiles', (value = true) => {
	return cy.getRequestToken()
		.then(requesttoken => {
			return cy.request({
				url: `${url}/index.php/apps/files/api/v1/config/show_hidden`,
				method: 'put',
				body: {
					value,
				},
				auth,
				headers: {
					requesttoken,
				},
			}).then((response) => {
				return cy.log(`Set hidden files to ${value}`, response.status)
			})
		})
})

Cypress.Commands.add('createDescription', (buttonLabel = 'Add description') => {
	const url = '**/remote.php/dav/files/**'
	cy.intercept({ method: 'PUT', url })
		.as('addDescription')

	cy.get('[data-cy-files-list] tr[data-cy-files-list-row-name="Readme.md"]').should('not.exist')
	cy.get('[data-cy-upload-picker] button.action-item__menutoggle').click()
	cy.get('li.upload-picker__menu-entry button').contains(buttonLabel).click()

	cy.wait('@addDescription')
})

Cypress.Commands.add('setCssMedia', (media) => {
	cy.log(`Setting CSS media to ${media}`)
	Cypress.automation('remote:debugger:protocol', {
		command: 'Emulation.setEmulatedMedia',
		params: {
			media,
		},
	})
})

Cypress.on(
	'uncaught:exception',
	err => !err.message.includes('ResizeObserver loop limit exceeded'),
)
