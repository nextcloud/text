import { initUserAndFiles, randUser } from '../utils/index.js'

const user = randUser()

const createDirectEditingLink = (user, file) => {
	cy.login(user)
	return cy.request({
		method: 'POST',
		url: `${Cypress.env('baseUrl')}/ocs/v2.php/apps/files/api/v1/directEditing/open?format=json`,
		form: true,
		body: {
			path: file,
		},
		auth: { user: user.userId, pass: user.password },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		cy.log(response)
		const token = response.body?.ocs?.data?.url
		cy.log(`Created direct editing token for ${user.userId}`, token)
		return cy.wrap(token)
	})
}

const createDirectEditingLinkForNewFile = (user, file) => {
	cy.login(user)
	return cy.request({
		method: 'POST',
		url: `${Cypress.env('baseUrl')}/ocs/v2.php/apps/files/api/v1/directEditing/create?format=json`,
		form: true,
		body: {
			path: file,
			editorId: 'text',
			creatorId: 'textdocument',
		},
		auth: { user: user.userId, pass: user.password },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		cy.log(response)
		const token = response.body?.ocs?.data?.url
		cy.log(`Created direct editing token for ${user.userId}`, token)
		return cy.wrap(token)
	})
}

describe('direct editing', function() {
	before(function() {
		initUserAndFiles(user, 'test.md', 'empty.md', 'empty.txt')
	})

	it('Open an existing file, edit and close it', () => {
		createDirectEditingLink(user, 'empty.md')
			.then((token) => {
				cy.logout()
				cy.visit(token)
			})
		const closeRequestAlias = 'closeRequest'
		cy.intercept({ method: 'POST', url: '**/session/close' }).as(closeRequestAlias)
		cy.intercept({ method: 'POST', url: '**/apps/text/session/sync' }).as('sync')
		cy.getContent()
			.type('# This is a headline')
			.type('{enter}')
			.type('Some text')
			.type('{enter}')

		// ensure we have received our own steps
		cy.wait('@sync', { timeout: 7000 })
		cy.wait('@sync', { timeout: 7000 })

		cy.get('button.icon-close').click()
		cy.wait(`@${closeRequestAlias}`).then(() => {
			cy.getFileContent('empty.md').then((content) => {
				expect(content).to.equal('# This is a headline\n\nSome text')
			})
		})
	})

	it('Create a file, edit and close it', () => {
		createDirectEditingLinkForNewFile(user, 'newfile.md')
			.then((token) => {
				cy.logout()
				cy.visit(token)
			})
		const closeRequestAlias = 'closeRequest'
		cy.intercept({ method: 'POST', url: '**/session/close' }).as(closeRequestAlias)
		cy.intercept({ method: 'POST', url: '**/apps/text/session/sync' }).as('sync')

		cy.getContent()
			.type('# This is a headline')
			.type('{enter}')
			.type('Some text')
			.type('{enter}')

		// ensure we have received our own steps
		cy.wait('@sync', { timeout: 7000 })
		cy.wait('@sync', { timeout: 7000 })

		cy.get('button.icon-close').click()
		cy.wait(`@${closeRequestAlias}`).then(() => {
			cy.getFileContent('newfile.md').then((content) => {
				expect(content).to.equal('# This is a headline\n\nSome text')
			})
		})
	})

	it('Open an existing plain text file, edit and close it', () => {
		createDirectEditingLink(user, 'empty.txt')
			.then((token) => {
				cy.logout()
				cy.visit(token)
			})
		const closeRequestAlias = 'closeRequest'
		cy.intercept({ method: 'POST', url: '**/session/close' }).as(closeRequestAlias)
		cy.intercept({ method: 'POST', url: '**/apps/text/session/sync' }).as('sync')

		cy.getContent()
			.type('# This is a headline')
			.type('{enter}')
			.type('Some text')
			.type('{enter}')

		// ensure we have received our own steps
		cy.wait('@sync', { timeout: 7000 })
		cy.wait('@sync', { timeout: 7000 })

		cy.get('button.icon-close').click()
		cy.wait(`@${closeRequestAlias}`).then(() => {
			cy.getFileContent('empty.txt').then((content) => {
				expect(content).to.equal('# This is a headline\nSome text\n')
			})
		})
	})
})
