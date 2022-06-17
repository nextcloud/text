import { initUserAndFiles, randHash } from '../utils/index.js'

const randUser = randHash()
const fileName = 'test.md'

describe('test link marks', function() {
	before(function() {
		initUserAndFiles(randUser, fileName)
	})

	beforeEach(function() {
		cy.login(randUser, 'password', {
			onBeforeLoad(win) {
				cy.stub(win, 'open')
					.as('winOpen')
			},
		})

		cy.openFile(fileName)
	})

	describe('autolink', function() {
		beforeEach(cy.clearContent)
		it('with protocol', () => {
			cy.getFile(fileName)
				.then($el => {
					const id = $el.data('id')

					const link = `${Cypress.env('baseUrl')}/file-name?fileId=${id}`
					cy.getContent()
						.type(link)

					cy.getContent()
						.find(`a[href*="${Cypress.env('baseUrl')}"]`)
						.click({ force: true })

					cy.get('@winOpen')
						.should('have.been.calledOnce')
						.should('have.been.calledWithMatch', new RegExp(`/f/${id}$`))
				})
		})

		it('whithout protocol', () => {
			cy.getContent()
				.type('google.com')

			cy.getContent()
				.find('a[href*="google.com"]')
				.click({ force: true })

			cy.get('@winOpen')
				.should('have.been.calledOnce')
				.should('have.been.calledWith', 'http://google.com/')
		})
	})

	describe('link menu', function() {
		const text = 'some text'

		describe('link to website', function() {
			const url = 'https://nextcloud.com/'
			// Helper to reduce duplicated code, checking inserting with and without selected text
			const checkLinkWebsite = (url, text) => {
				cy.getSubmenuEntry('insert-link', 'insert-link-website').click()
				cy.getActionSubEntry('insert-link-input').find('input[type="text"]').type(`${url}{enter}`)
				cy.getContent()
					.get(`a[href*="${url}"]`)
					.should('have.text', text) // ensure correct text used
					.click({ force: true })

				cy.get('@winOpen')
					.should('have.been.calledOnce')
					.should('have.been.calledWith', url)
			}

			beforeEach(cy.clearContent)
			it('Link website without selection', () => {
				cy.getFile('test.md')
					.then($el => {
						checkLinkWebsite(url, url)
					})
			})

			it('Link website with selection', () => {
				cy.getFile('test.md')
					.then($el => {
						cy.getContent().type(`${text}{selectAll}`)
						checkLinkWebsite(url, text)
					})
			})
		})

		describe('link to local file', function() {
			const filename = 'welcome.txt'
			// Helper to reduce duplicated code, checking inserting with and without selected text
			const checkLinkFile = (filename, text) => {
				cy.getSubmenuEntry('insert-link', 'insert-link-file').click()
				cy.get('.oc-dialog').find(`tr[data-entryname="${filename}"]`).click()
				cy.get('.oc-dialog').find('.oc-dialog-buttonrow > button').click()

				return cy.getContent()
					.find(`a[href*="${encodeURIComponent(filename)}"]`)
					.should('have.text', text === undefined ? filename : text)
					.click({ force: true })
			}

			beforeEach(cy.clearContent)
			it('without text', () => {
				cy.getFile('test.md')
					.then($el => {
						checkLinkFile(filename)
						cy.get('.modal-title').should('include.text', filename)
					})
			})
			it('with selected text', () => {
				cy.getFile('test.md')
					.then($el => {
						cy.getContent().type(`${text}{selectAll}`)
						checkLinkFile(filename, text)
						cy.get('.modal-title').should('include.text', filename)
					})
			})
			it('link to directory', () => {
				cy.createFolder('dummy folder')
				cy.getFile('test.md').then($el => {
					cy.getContent().type(`${text}{selectAll}`)
					checkLinkFile('dummy folder', text)
					cy.get('@winOpen')
						.should('have.been.calledOnce')
				})
			})
		})
	})
})
