/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()

describe('Test the rich text editor menu bar', function () {
	before(function () {
		cy.createUser(user)
	})

	beforeEach(function () {
		cy.login(user)
		cy.uploadTestFile()
	})

	describe('word count', function () {
		/**
		 *
		 */
		function getWordCount() {
			return cy
				.get('.v-popper__popper .open')
				.get('[data-text-action-entry="character-count"]')
		}

		beforeEach(function () {
			cy.visit('/apps/files')
			cy.openTestFile()
		})

		it('empty file', () => {
			cy.getContent()
			cy.getActionEntry('remain').click()
			getWordCount().should('include.text', '0 words, 0 chars')
		})

		it('single word', () => {
			cy.getContent().type('  Hello  ')
			cy.getActionEntry('remain').click()
			getWordCount().should('include.text', '1 word, 9 chars')
		})

		it('multiple words', () => {
			cy.getContent().type('Hello \nworld')
			cy.getActionEntry('remain').click()
			getWordCount().should('include.text', '2 words, 11 chars')
		})
	})

	describe('text width toggle', function () {
		beforeEach(() => {
			cy.configureText('is_full_width_editor', 0)
			cy.visit('/apps/files')
			cy.window()
				.its('document.documentElement.style')
				.invoke('getPropertyValue', '--text-editor-max-width')
				.as('maxWidth')
		})

		it('applys default', function () {
			cy.openTestFile()
			cy.get('@maxWidth').should('equal', '80ch')
		})

		it('toggles value', function () {
			cy.openTestFile()
			cy.getActionEntry('remain').click()
			cy.contains('Full width editor').click()
			cy.get('@maxWidth').should('equal', '100%')
		})

		it('preserves on reopen', function () {
			cy.openTestFile()
			cy.getActionEntry('remain').click()
			cy.contains('Full width editor').click()
			cy.closeFile()
			cy.openTestFile()
			cy.get('@maxWidth').should('equal', '100%')
		})

		it('preserves on reload', function () {
			cy.openTestFile()
			cy.getActionEntry('remain').click()
			cy.contains('Full width editor').click()
			cy.visit('/apps/files')
			cy.openTestFile()
			cy.get('@maxWidth').should('equal', '100%')
		})

		it('does not interfere if width is already set', function () {
			cy.window()
				.its('document.body.style')
				.invoke('setProperty', '--text-editor-max-width', '987px')
			cy.openTestFile()
			cy.getActionEntry('remain').click()
			cy.contains('Full width editor').should('not.exist')
			cy.get('@maxWidth').should('equal', '')
		})
	})
})
