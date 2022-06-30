import { randHash } from '../utils/index.js'

const currentUser = randHash()

const refresh = () => cy.get('#controls .crumb:not(.hidden) a')
	.last()
	.click({ force: true })

const createMarkdown = (fileName, content) => {
	return cy.createFile(fileName, content, 'text/markdown')
		.then(refresh)
}

describe('Image View', () => {
	before(() => {
		// Init user
		cy.nextcloudCreateUser(currentUser, 'password')
		cy.login(currentUser, 'password')

		// Upload test files to user's storage
		cy.createFolder('child-folder')
		cy.uploadFile('github.png', 'image/png')
		cy.uploadFile('github.png', 'image/png', 'child-folder/github.png')
	})

	beforeEach(() => {
		cy.login(currentUser, 'password')
	})

	describe('direct access', () => {
		it('from root', () => {
			const fileName = `${Cypress.currentTest.title}.md`

			createMarkdown(fileName, '# from root\n\n ![git](/github.png)')

			cy.openFile(fileName)

			cy.getContent()
				.find('[data-component="image-view"]')
				.should('have.attr', 'data-src')
				.should('eq', '/github.png')

			cy.getContent()
				.find('[data-component="image-view"] img')
				.should('have.attr', 'src')
				.should('contains', `/dav/files/${currentUser}/github.png`)
		})

		it('from child folder', () => {
			const fileName = `${Cypress.currentTest.title}.md`

			createMarkdown(fileName, '# from child\n\n ![git](child-folder/github.png)')

			cy.openFile(fileName)

			cy.getContent()
				.find('[data-component="image-view"]')
				.should('have.attr', 'data-src')
				.should('eq', 'child-folder/github.png')

			cy.getContent()
				.find('[data-component="image-view"] img')
				.should('have.attr', 'src')
				.should('contains', `/dav/files/${currentUser}/child-folder/github.png`)
		})

		it('from parent folder', () => {
			cy.visit('apps/files?dir=/child-folder')

			const fileName = `${Cypress.currentTest.title}.md`

			createMarkdown(`/child-folder/${fileName}`, '# from parent\n\n ![git](../github.png)')

			cy.openFile(fileName, { force: true })

			cy.getContent()
				.find('[data-component="image-view"]')
				.should('have.attr', 'data-src')
				.should('eq', '../github.png')

			cy.getContent()
				.find('[data-component="image-view"] img')
				.should('have.attr', 'src')
				.should('contains', `/dav/files/${currentUser}/github.png`)
		})

		it('with preview', () => {
			cy.get('#fileList tr[data-file="github.png"]')
				.should('have.attr', 'data-id')
				.then(imageId => {
					const fileName = `${Cypress.currentTest.title}.md`

					createMarkdown(fileName, `# from image id\n\n ![${imageId}](github.png?fileId=${imageId}&hasPreview=true)`)

					cy.openFile(fileName, { force: true })

					cy.getContent()
						.find('[data-component="image-view"] img')
						.should('have.attr', 'src')
						.should('contains', `core/preview?fileId=${imageId}&file=${encodeURIComponent('/github.png')}`, { timeout: 5000 })
				})
		})
	})

	describe('fail to load', () => {
		it.only('direct access', () => {
			const fileName = `${Cypress.currentTest.title}.md`

			createMarkdown(fileName, '# from root\n\n ![yaha](/yaha.png)')

			cy.openFile(fileName)

			cy.getContent()
				.find('[data-component="image-view"]')
				.should('have.class', 'image-view--failed')

			cy.getContent()
				.find('[data-component="image-view"] svg')
				.should('be.visible')

			cy.getContent()
				.find('[data-component="image-view"] .image__error-message')
				.should('be.visible')

			cy.getContent()
				.find('[data-component="image-view"] .image__caption input')
				.should('have.value', 'yaha')
		})
	})
})
