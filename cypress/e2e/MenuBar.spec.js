import { initUserAndFiles, randHash } from '../utils/index.js'

const randUser = randHash()
const fileName = 'test.md'

describe('Test the rich text editor menu bar', function() {
	before(() => initUserAndFiles(randUser, fileName))

	beforeEach(function() {
		cy.login(randUser, 'password', {
			onBeforeLoad(win) {
				cy.stub(win, 'open')
					.as('winOpen')

			},
		})

		cy.openFile(fileName)
	})

	describe('word count', function() {
		/**
		 *
		 */
		function getWordCount() {
			return cy.get('.popover .open').get('[data-text-action-entry="word-count"]')
		}

		beforeEach(cy.clearContent)
		it('empty file', () => {
			cy.getFile(fileName)
				.then($el => {
					cy.getActionEntry('remain')
						.click()
					getWordCount()
						.should('include.text', '0 words')
				})
		})

		it('single word', () => {
			cy.getFile(fileName)
				.then($el => {
					cy.getContent()
						.type('  Hello  ')
					cy.getActionEntry('remain')
						.click()
					getWordCount()
						.should('include.text', '1 word')
				})
		})

		it('multiple words', () => {
			cy.getFile(fileName)
				.then($el => {
					cy.getContent()
						.type('Hello \nworld')
					cy.getActionEntry('remain')
						.click()
					getWordCount()
						.should('include.text', '2 word')
				})
		})
	})
})
