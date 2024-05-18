import { initUserAndFiles, randUser } from '../utils/index.js'

const user = randUser()

const enterContentAndClose = () => {
	cy.intercept({ method: 'POST', url: '**/session/*/close' }).as('closeRequest')
	cy.intercept({ method: 'POST', url: '**/session/*/push' }).as('push')
	cy.intercept({ method: 'POST', url: '**/session/*/sync' }).as('sync')
	cy.getContent().type('# This is a headline')
	cy.getContent().type('{enter}')
	cy.getContent().type('Some text')
	cy.getContent().type('{enter}')
	cy.getContent().type('{ctrl+s}')
	cy.wait('@push')
	cy.wait('@sync')
	cy.get('button.icon-close').click()
	cy.wait('@closeRequest')
}

describe('direct editing', function() {

	before(function() {
		initUserAndFiles(user, 'test.md', 'empty.md', 'empty.txt')
	})

	it('Open an existing file, edit it', () => {
		cy.login(user)
		cy.createDirectEditingLink('empty.md')
			.then((token) => {
				cy.session('direct-editing', () => { })
				cy.openDirectEditingToken(token)
			})
		enterContentAndClose()
		cy.login(user)
		cy.getFileContent('empty.md')
			.should('equal', '# This is a headline\n\nSome text')
	})

	it('Create a file, edit it', () => {
		cy.login(user)
		cy.createDirectEditingLinkForNewFile('newfile.md')
			.then((token) => {
				cy.session('direct-editing', () => { })
				cy.openDirectEditingToken(token)
			})
		enterContentAndClose()
		cy.login(user)
		cy.getFileContent('newfile.md')
			.should('equal', '# This is a headline\n\nSome text')
	})

	it('Open an existing plain text file, edit it', () => {
		cy.login(user)
		cy.createDirectEditingLink('empty.txt')
			.then((token) => {
				cy.session('direct-editing', () => { })
				cy.openDirectEditingToken(token)
			})
		enterContentAndClose()
		cy.login(user)
		cy.getFileContent('empty.txt')
			.should('equal', '# This is a headline\nSome text\n')
	})
})
