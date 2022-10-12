import { initUserAndFiles, randHash } from '../utils/index.js'

const randUser = randHash()
const fileName = 'empty.md'

describe('test link marks', function() {
	before(function() {
		initUserAndFiles(randUser)
	})

	beforeEach(function() {
		cy.login(randUser, 'password')

		cy.isolateTest({
			sourceFile: fileName,
			onBeforeLoad(win) {
				cy.stub(win, 'open')
					.as('winOpen')
			},
		})

		cy.openFile(fileName, { force: true })
		return cy.clearContent()
	})

	describe('link preview', function() {
		it('shows a link preview', () => {
			cy.getContent()
				.type('https://nextcloud.com')
				.type('{enter}')

			cy.getContent()
				.find('.widgets--list', { timeout: 10000 })
				.find('.widget-default--title')
				.contains('Nextcloud - Online collaboration platform')
		})

		it('does not show a link preview for links within a paragraph', () => {
			cy.getContent()
				.type('Please visit https://nextcloud.com')
				.type('{enter}')

			cy.getContent()
				.find('.widgets--list', { timeout: 10000 })
				.should('not.exist')
		})
	})

	describe('autolink', function() {
		it('with protocol', () => {
			cy.getFile(fileName)
				.then($el => {
					const id = $el.data('id')

					const link = `${Cypress.env('baseUrl')}/file-name?fileId=${id} `
					cy.getContent()
						.type('{enter}')
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
				.type('google.com{enter}')

			cy.getContent()
				.find('a[href*="google.com"]')
				.should('not.exist')
		})

		it('whithout space', () => {
			cy.getContent()
				.type('https://nextcloud.com')

			cy.getContent()
				.find('a[href*="nextcloud.com"]')
				.should('not.exist')
		})
	})
})
