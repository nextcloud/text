/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../utils/index.js'

const user = randUser()
const fileName = 'empty.md'

describe('Test the rich text editor menu bar', function() {
	before(() => initUserAndFiles(user, fileName))

	beforeEach(function() {
		cy.login(user)
		cy.visit('/apps/files', {
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
					cy.getContent()
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
					cy.getContent()
						.type('Hello \nworld')
					cy.getActionEntry('remain')
						.click()
					getWordCount()
						.should('include.text', '2 words, 11 chars')
				})
		})
	})
})
