import { randUser } from '../utils/index.js'

const user = randUser()
const fileName = 'empty.md'

const refresh = () => cy.get('.files-controls .crumb:not(.hidden) a')
	.last()
	.click({ force: true })

const clickOutline = () => {
	cy.getActionEntry('headings')
		.click()

	cy.get('.v-popper__wrapper .open').getActionEntry('outline')
		.click()
}

let currentFolder

describe('Content Sections', () => {
	before(function() {
		cy.createUser(user)
	})

	beforeEach(function() {
		cy.login(user)
		cy.createTestFolder().then(folderName => {
			currentFolder = folderName
			cy.uploadFile(fileName, 'text/markdown', `${currentFolder}/${fileName}`)
		})
	})

	describe('Heading anchors', () => {
		it('Anchor exists', () => {
			cy.visitTestFolder()
			cy.openFile(fileName, { force: true })
			cy.getContent()
				.type('# Heading\nText\n## Heading 2\nText\n## Heading 2')
				.then(() => {
					cy.getContent()
						.find('a.heading-anchor')
						.should(($anchor) => {
							expect($anchor).to.have.length(3)
							expect($anchor.eq(0)).to.have.attr('href').and.equal('#heading')
							expect($anchor.eq(1)).to.have.attr('href').and.equal('#heading-2')
							expect($anchor.eq(2)).to.have.attr('href').and.equal('#heading-2--1')
						})
				})
		})

		it('Anchor ID is updated', () => {
			cy.visitTestFolder()
			cy.openFile(fileName, { force: true })
			cy.getContent()
				.type('# Heading 1{enter}')
				.then(() => {
					cy.getContent()
						.find('h1')
						.should('have.attr', 'id')
						.and('equal', 'heading-1')
					cy.getContent()
						.find('a.heading-anchor')
						.should('have.attr', 'href')
						.and('equal', '#heading-1')
				})
			cy.then(() => {
				cy.getContent()
					.type('{backspace}{backspace}2{enter}')
					.then(() => {
						cy.getContent()
							.find('h1')
							.should('have.attr', 'id')
							.and('equal', 'heading-2')
						cy.getContent()
							.find('a.heading-anchor')
							.should('have.attr', 'href')
							.and('equal', '#heading-2')
					})
			})
		})

		it('scrolls anchor into view', () => {
			cy.uploadFile('anchors.md', 'text/markdown', `${currentFolder}/anchors.md`)
			cy.visitTestFolder()
			cy.openFile('anchors.md')
			cy.getContent()
				.get('h2[id="bottom"]')
				.should('not.be.inViewport')
			cy.getContent()
				.find('a[href="#bottom"]:not(.heading-anchor)')
				.click()
			cy.getContent()
				.get('h2[id="bottom"]')
				.should('be.inViewport')
		})

		it('Can change heading level', () => {
			cy.visitTestFolder()
			cy.openFile(fileName, { force: true })
			// Issue #2868
			cy.getContent()
				.type('# Heading 1{enter}')
				.then(() => {
					cy.getContent()
						.find('h1')
						.should('have.attr', 'id')
						.and('equal', 'heading-1')
				})
			cy.then(() => {
				cy.getContent()
					.find('h1 [data-node-view-content]')
					.click({ force: true, position: 'center' })
					.then(() => {
						cy.getActionEntry('headings')
							.click()
						cy.get('.v-popper__wrapper .open').getActionEntry('headings-h3')
							.click()
						cy.getContent()
							.find('h3')
							.should('have.attr', 'id')
							.and('equal', 'heading-1')
					})
			})
		})
	})

	describe('Table of Contents', () => {
		it('sidebar toc', () => {
			cy.visitTestFolder()
			cy.openFile(fileName, { force: true })
			cy.getContent()
				.type('# T1 \n## T2 \n### T3 \n#### T4 \n##### T5 \n###### T6\n')
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
			cy.visitTestFolder()
			cy.openFile(fileName, { force: true })
				.then(clickOutline)

			cy.getOutline()
				.find('ul')
				.should('be.empty')
		})
	})
})
