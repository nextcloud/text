import { initUserAndFiles, randUser } from '../utils/index.js'

const user = randUser()

describe('direct editing', function() {

	const visitHooks = {
		onBeforeLoad(win) {
			win.DirectEditingMobileInterface = {
				close() {},
			}
		},
	}
	before(function() {
		initUserAndFiles(user, 'test.md', 'empty.md', 'empty.txt')
	})

	it('Open an existing file, edit it', () => {
		cy.intercept({ method: 'POST', url: '**/session/*/close' }).as('closeRequest')
		cy.intercept({ method: 'POST', url: '**/session/*/push' }).as('push')
		cy.intercept({ method: 'POST', url: '**/session/*/sync' }).as('sync')

		cy.login(user)
		cy.createDirectEditingLink('empty.md')
			.then((token) => {
				cy.logout()
				cy.visit(token, visitHooks)
			})
		cy.getContent().type('# This is a headline')
		cy.getContent().type('{enter}')
		cy.getContent().type('Some text')
		cy.getContent().type('{enter}')
		cy.getContent().type('{ctrl+s}')

		cy.wait('@push')
		cy.wait('@sync')

		cy.get('button.icon-close').click()
		cy.wait('@closeRequest')
			.then(() => {
				cy.getFileContent('empty.md').then((content) => {
					expect(content).to.equal('# This is a headline\n\nSome text')
				})
			})
	})

	it('Create a file, edit it', () => {
		cy.intercept({ method: 'POST', url: '**/session/*/close' }).as('closeRequest')
		cy.intercept({ method: 'POST', url: '**/session/*/push' }).as('push')
		cy.intercept({ method: 'POST', url: '**/session/*/sync' }).as('sync')

		cy.login(user)
		cy.createDirectEditingLinkForNewFile('newfile.md')
			.then((token) => {
				cy.logout()
				cy.visit(token, visitHooks)
			})

		cy.getContent().type('# This is a headline')
		cy.getContent().type('{enter}')
		cy.getContent().type('Some text')
		cy.getContent().type('{enter}')
		cy.getContent().type('{ctrl+s}')

		cy.wait('@push')
		cy.wait('@sync')

		cy.get('button.icon-close').click()
		cy.wait('@closeRequest')
			.then(() => {
				cy.getFileContent('newfile.md').then((content) => {
					expect(content).to.equal('# This is a headline\n\nSome text')
				})
			})
	})

	it('Open an existing plain text file, edit it', () => {
		cy.intercept({ method: 'POST', url: '**/session/*/close' }).as('closeRequest')
		cy.intercept({ method: 'POST', url: '**/session/*/push' }).as('push')
		cy.intercept({ method: 'POST', url: '**/session/*/sync' }).as('sync')

		cy.login(user)
		cy.createDirectEditingLink('empty.txt')
			.then((token) => {
				cy.logout()
				cy.visit(token, visitHooks)
			})

		cy.getContent().type('# This is a headline')
		cy.getContent().type('{enter}')
		cy.getContent().type('Some text')
		cy.getContent().type('{enter}')
		cy.getContent().type('{ctrl+s}')

		cy.wait('@push')
		cy.wait('@sync')

		cy.get('button.icon-close').click()
		cy.wait('@closeRequest')
			.then(() => {
				cy.getFileContent('empty.txt').then((content) => {
					expect(content).to.equal('# This is a headline\nSome text\n')
				})
			})
	})
})
