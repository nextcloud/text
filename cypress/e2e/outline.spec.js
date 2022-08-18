import { randHash } from '../utils/index.js'

const currentUser = randHash()

const refresh = () => cy.get('.files-controls .crumb:not(.hidden) a')
	.last()
	.click({ force: true })

const clickOutline = () => {
	cy.getActionEntry('headings')
		.click()

	cy.get('.popover.open').getActionEntry('outline')
		.click()
}

const createMarkdown = (fileName, content) => {
	return cy.createFile(fileName, content, 'text/markdown')
		.then(refresh)
}

describe('Table of Contents', () => {
	before(() => {
		// Init user
		cy.nextcloudCreateUser(currentUser, 'password')
		cy.login(currentUser, 'password')
	})

	beforeEach(() => {
		cy.login(currentUser, 'password')
	})

	it('sidebar toc', () => {
		const fileName = 'toc.md'

		createMarkdown(fileName, '# T1 \n ## T2 \n ### T3 \n #### T4 \n ##### T5 \n ###### T6')
			.then(refresh)
			.then(() => cy.openFile(fileName, { force: true }))
			.then(clickOutline)

		cy.getOutline()
			.find('header')
			.should('exist')

		cy.getTOC()
			.find('ul li')
			.should('have.length', 6)
		cy.getTOC()
			.find('ul li')
			.each((el, index) => {
				cy.wrap(el)
					.should('have.attr', 'data-toc-level')
					.and('equal', String(index + 1))

				cy.wrap(el)
					.find('a')
					.should('have.attr', 'href')
					.and('equal', `#t${index + 1}`)
			})
	})

	it('empty toc', () => {
		const fileName = 'empty.md'

		createMarkdown(fileName, '')
			.then(refresh)
			.then(() => cy.openFile(fileName, { force: true }))
			.then(clickOutline)

		cy.getOutline()
			.find('ul')
			.should('be.empty')
	})
})
