/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()
const fileName = 'empty.md'

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
		cy.clearAllSessionStorage()
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
			cy.getContent().find('a.heading-anchor')
				.should(($anchor) => {
					expect($anchor).to.have.length(3)
					expect($anchor.eq(0)).to.have.attr('href').and.equal('#h-heading')
					expect($anchor.eq(1)).to.have.attr('href').and.equal('#h-heading-2')
					expect($anchor.eq(2)).to.have.attr('href').and.equal('#h-heading-2--1')
				})
		})

		it('Anchor ID is updated', () => {
			cy.visitTestFolder()
			cy.openFile(fileName, { force: true })
			cy.insertLine('# Heading 1')
			cy.getContent()
				.find('h1 > a')
				.should('have.attr', 'id')
				.and('equal', 'h-heading-1')
			cy.getContent()
				.find('a.heading-anchor')
				.should('have.attr', 'href')
				.and('equal', '#h-heading-1')
			cy.getContent().type('{backspace}{backspace}2{enter}')
			cy.getContent()
				.find('h1 > a')
				.should('have.attr', 'id')
				.and('equal', 'h-heading-2')
			cy.getContent()
				.find('a.heading-anchor')
				.should('have.attr', 'href')
				.and('equal', '#h-heading-2')
		})

		it('scrolls anchor into view', () => {
			cy.uploadFile('anchors.md', 'text/markdown', `${currentFolder}/anchors.md`)
			cy.visitTestFolder()
			cy.openFile('anchors.md')
			cy.getContent()
				.get('h2 > a[id="h-bottom"]')
				.should('not.be.inViewport')
			cy.getContent()
				.find('a[href="#h-bottom"]:not(.heading-anchor)')
				.click()
			cy.getContent()
				.get('h2 > a[id="h-bottom"]')
				.should('be.inViewport')
		})

		it('Can change heading level', () => {
			cy.visitTestFolder()
			cy.openFile(fileName, { force: true })
			// Issue #2868
			cy.insertLine('# Heading 1')
			cy.getContent()
				.find('h1 > a')
				.should('have.attr', 'id')
				.and('equal', 'h-heading-1')
			cy.getContent()
				.find('h1')
				.click({ force: true, position: 'center' })
			cy.getActionEntry('headings').click()
			cy.get('.v-popper__wrapper .open').getActionEntry('headings-h3').click()
			cy.getContent().find('h3 > a')
				.should('have.attr', 'id')
				.and('equal', 'h-heading-1')
		})
	})

	describe('Table of Contents', () => {
		it('sidebar toc', () => {
			cy.visitTestFolder()
			cy.openFile(fileName, { force: true })
			cy.getContent()
				.type('# T1 \n## T2 \n### T3 \n#### T4 \n##### T5 \n###### T6\n')
			cy.closeFile()
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
						.and('equal', `#h-t${index + 1}`)
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
