/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { emit } from '@nextcloud/event-bus'
import { addCommands } from '@nextcloud/cypress'
import { addCompareSnapshotCommand } from 'cypress-visual-regression/dist/command'

// eslint-disable-next-line no-unused-vars,n/no-extraneous-import
import regeneratorRuntime from 'regenerator-runtime'

addCompareSnapshotCommand()

const url = Cypress.config('baseUrl').replace(/\/index.php\/?$/g, '')
Cypress.env('baseUrl', url)
const silent = { log: false }

// prepare main cypress window so we can use axios there
// and it will successfully fetch csrf tokens when needed.
window.OC = {
	config: { modRewriteWorking: false },
}
// Prevent @nextcloud/router from reading window.location
window._oc_webroot = url

addCommands()

// Prepare the csrf-token for axios
Cypress.Commands.overwrite('login', (login, user) => {
	cy.window(silent).then((win) => {
		win.location.href = 'about:blank'
	})
	login(user)
	cy.request('/csrftoken', silent)
		.then(({ body }) => emit('csrf-token-update', body))
	cy.wrap(user, silent).as('currentUser')
})

Cypress.Commands.add('openDirectEditingToken', (token) => {
	const visitHooks = {
		onBeforeLoad(win) {
			win.DirectEditingMobileInterface = {
				close() {},
			}
		},
	}
	cy.visit(token, visitHooks)
})

Cypress.Commands.add('uploadFile', (fileName, mimeType, target) => {
	return cy.fixture(fileName, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(blob => {
			if (typeof target !== 'undefined') {
				fileName = target
			}
			return axios.put(
				`${url}/remote.php/webdav/${fileName}`,
				blob.size > 0 ? blob : '',
				{ headers: { 'Content-Type': mimeType } },
			).then(response => {
				const fileId = Number(response.headers['oc-fileid']?.split('oc')?.[0])
				Cypress.log({ message: `"${target}" (${response.status}): ${fileId}` })
				return cy.wrap(fileId, silent)
			})
		})
})

Cypress.Commands.add('downloadFile', (fileName) => {
	return axios.get(`${url}/remote.php/webdav/${fileName}`)
})

Cypress.Commands.add('createFile', (target, content, mimeType = 'text/markdown', headers = {}) => {
	const blob = new Blob([content], { type: mimeType })
	return axios.put(
		`${url}/remote.php/webdav/${target}`,
		blob.size > 0 ? blob : '',
		{
			headers: { 'Content-Type': mimeType, ...headers },
		},
	).then((response) => {
		const fileId = Number(response.headers['oc-fileid']?.split('oc')?.[0])
		Cypress.log({ message: `"${target}" (${response.status}): ${fileId}` })
		return fileId
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
	Cypress.log()
	return axios.post(
		`${url}/ocs/v2.php/apps/files_sharing/api/v1/shares`,
		{
			path,
			shareType: 0,
			shareWith: targetUser.userId,
			...shareData,
		},
	)
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
	const shareType = window.OC?.Share?.SHARE_TYPE_LINK ?? 3
	return axios.post(
		`${url}/ocs/v2.php/apps/files_sharing/api/v1/shares`,
		{ path, shareType },
	)
		.then(response => response.data.ocs.data)
		.then(({ token, id }) => {
			Cypress.log({ message: `"${path}" (${id}): ${token}` })
			if (!options.edit) {
				return token
			}
			// Same permissions makeing the share editable in the UI would set
			// 1 = read; 2 = write; 16 = share;
			const permissions = 19
			return axios.put(
				`${url}/ocs/v2.php/apps/files_sharing/api/v1/shares/${id}`,
				{ permissions },
			).then(() => token)
		})
})

Cypress.Commands.add('createFolder', (target) => {
	cy.get('@currentUser', silent).then(({ userId }) => {
		const rootPath = `${url}/remote.php/dav/files/${encodeURIComponent(userId)}`
		const dirPath = target.split('/').map(encodeURIComponent).join('/')
		return axios.request(
			`${rootPath}/${dirPath}`,
			{ method: 'MKCOL' },
		)
	}).then((response) => parseInt(response.headers['oc-fileid']))
})

Cypress.Commands.add('moveFile', (path, destinationPath) => {
	return axios.request({
		method: 'MOVE',
		url: `${url}/remote.php/webdav/${path}`,
		headers: {
			Destination: `${url}/remote.php/webdav/${destinationPath}`,
		},
	}).then(response => response.body)
})

// For files wait for preview to load and release lock
Cypress.Commands.add('waitForPreview', name => {
	cy.getFile(name)
		.scrollIntoView({ offset: { top: -200 } })
	cy.getFile(name)
		.find('.files-list__row-icon img')
		.should('be.visible')
		.its('[0].naturalWidth')
		.should('be.greaterThan', 0)
})

Cypress.Commands.add('deleteFile', (path) => {
	return axios.delete(`${url}/remote.php/webdav/${path}`)
})

Cypress.Commands.add('copyFile', (path, destinationPath) => {
	return axios.request({
		method: 'COPY',
		url: `${url}/remote.php/webdav/${path}`,
		headers: {
			Destination: `${url}/remote.php/webdav/${destinationPath}`,
		},
	}).then(response => response.body)
})

Cypress.Commands.add('getFileContent', (path) => {
	return axios.get(`${url}/remote.php/webdav/${path}`)
		.then(response => response.data)
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
	return cy.get('.vue-crumb:last-child a').click({ force: true })
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
	cy.get(`[data-cy-files-list] tr[data-cy-files-list-row-name="${fileName}"] [data-cy-files-list-row-name-link]`).click(params)
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
	return axios.post(
		closeData.url,
		{
			documentId: closeData.session.documentId,
			sessionId: closeData.session.id,
			sessionToken: closeData.session.token,
			token: shareToken,
		},
	)
})

Cypress.Commands.add('getFile', fileName => {
	return cy.get(`[data-cy-files-list] [data-cy-files-list-row-name="${fileName}"]`)

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

Cypress.Commands.add('insertLine', (line = '') => {
	cy.getContent()
		.type(`${line}{enter}`)
})

Cypress.Commands.add('openWorkspace', () => {
	cy.createDescription()
	cy.get('#rich-workspace .editor__content').click({ force: true })
	cy.getEditor().find('[data-text-el="editor-content-wrapper"]').click({ force: true })

	return cy.getContent()
})

Cypress.Commands.add('configureText', (key, value) => {
	return axios.post(
		`${url}/index.php/apps/text/settings`,
		{ key, value },
	)
})

Cypress.Commands.add('showHiddenFiles', (value = true) => {
	Cypress.log()
	return axios.put(
		`${url}/index.php/apps/files/api/v1/config/show_hidden`,
		{ value },
	)
})

Cypress.Commands.add('createDescription', (buttonLabel = 'Add folder description') => {
	const url = '**/remote.php/dav/files/**'
	cy.intercept({ method: 'PUT', url })
		.as('addDescription')

	cy.get('[data-cy-files-list] tr[data-cy-files-list-row-name="Readme.md"]').should('not.exist')
	cy.get('[data-cy-files-content-breadcrumbs] [data-cy-upload-picker] button.action-item__menutoggle').click()
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

Cypress.Commands.add('createDirectEditingLink', path => {
	return axios.request({
		method: 'POST',
		url: `${url}/ocs/v2.php/apps/files/api/v1/directEditing/open?format=json`,
		data: { path },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		const token = response.data?.ocs?.data?.url
		Cypress.log({ message: token })
		return token
	})
})

Cypress.Commands.add('createDirectEditingLinkForNewFile', path => {
	return axios.request({
		method: 'POST',
		url: `${url}/ocs/v2.php/apps/files/api/v1/directEditing/create?format=json`,
		data: {
			path,
			editorId: 'text',
			creatorId: 'textdocument',
		},
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		const token = response.data?.ocs?.data?.url
		Cypress.log({ message: token })
		return token
	})
})

Cypress.on(
	'uncaught:exception',
	err => !err.message.includes('ResizeObserver loop limit exceeded'),
)
