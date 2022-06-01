import { randHash } from '../utils/'

const randUser = randHash()
const fileName = 'empty.md'

const getEditor = () => cy.getEditor().find('.ProseMirror')

const clearContent = () => getEditor()
	.type('{selectall}')
	.type('{enter}')

describe('test link marks', function() {
	before(function() {
		// Init user
		cy.nextcloudCreateUser(randUser, 'password')
		cy.login(randUser, 'password')

		// Upload test files
		cy.uploadFile('test.md', 'text/markdown')
		cy.uploadFile(fileName, 'text/markdown')
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
		beforeEach(clearContent)
		it('with protocol', () => {
			cy.getFile('test.md')
				.then($el => {
					const id = $el.data('id')

					const link = `${Cypress.env('baseUrl')}/file-name?fileId=${id}`
					getEditor()
						.type(link)

					getEditor()
						.get(`a[href*="${Cypress.env('baseUrl')}`)
						.click({ force: true })

					cy.get('@winOpen')
						.should('have.been.calledOnce')
						.should('have.been.calledWithMatch', new RegExp(`/f/${id}$`))
				})
		})

		it('whithout protocol', () => {
			getEditor()
				.type('google.com')

			getEditor()
				.get('a[href*="google.com"]')
				.click({ force: true })

			cy.get('@winOpen')
				.should('have.been.calledOnce')
				.should('have.been.calledWith', 'http://google.com/')
		})
	})
})
