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
			return cy.get('.v-popper__popper .open').get('[data-text-action-entry="character-count"]')
		}

		beforeEach(cy.clearContent)
		it('empty file', () => {
			cy.getFile(fileName)
				.then($el => {
					cy.getActionEntry('remain')
						.click()
					getWordCount()
						.should('include.text', '0 words, 0 chars')
				})
		})

		it('single word', () => {
			cy.getFile(fileName)
				.then($el => {
					cy.clearContent()
						.type('  Hello  ')
					cy.getActionEntry('remain')
						.click()
					getWordCount()
						.should('include.text', '1 word, 9 chars')
				})
		})

		it('multiple words', () => {
			cy.getFile(fileName)
				.then($el => {
					cy.clearContent()
						.type('Hello \nworld')
					cy.getActionEntry('remain')
						.click()
					getWordCount()
						.should('include.text', '2 words, 11 chars')
				})
		})
	})
})
