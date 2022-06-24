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
		beforeEach(() => cy.clearContent())
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
})
