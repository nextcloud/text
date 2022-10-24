import { initUserAndFiles, randHash } from '../utils/index.js'

const currentUser = randHash()
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

describe('Content Sections', () => {
	before(function() {
		initUserAndFiles(currentUser, fileName)
	})

	beforeEach(function() {
		cy.login(currentUser, 'password', {
			onBeforeLoad(win) {
				cy.stub(win, 'open')
					.as('winOpen')
			},
		})

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

	describe('Heading anchors', () => {
		it('Anchor exists', () => {
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
			cy.clearContent()
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

		it('Anchor scrolls into view', () => {
			// Create link to top heading
			cy.clearContent()
				.type('{selectAll}{backspace}move top\n{selectAll}')
				.then(() => {
					cy.getSubmenuEntry('insert-link', 'insert-link-website')
						.click()
						.then(() => {
							cy.getActionSubEntry('insert-link-input')
								.find('input[type="text"]')
								.type('#top{enter}')
						})
				})
			// Insert content above link
			cy.getContent()
				.type('{moveToStart}\n{moveToStart}# top \n')
				.type('lorem ipsum \n'.repeat(25))
				.type('{moveToEnd}\n')

			cy.getContent().find('h1#top')
				.should('not.be.inViewport')

			// Click link and test view moved to anchor
			cy.getContent()
				.find('a:not(.heading-anchor)')
				.click({ force: true })
				.then(() => {
					cy.getContent()
						.get('h1[id="top"]')
						.should('be.inViewport')
				})
		})

		it('Can change heading level', () => {
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
					.find('h1 [data-node-view-content] span')
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
			refresh()
				.then(() => cy.openFile(fileName, { force: true }))
				.then(clickOutline)

			cy.getOutline()
				.find('ul')
				.should('be.empty')
		})
	})
})
