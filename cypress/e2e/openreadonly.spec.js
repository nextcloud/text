/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { User } from '@nextcloud/e2e-test-server/cypress'
import { randUser } from '../utils/index.js'

const admin = new User('admin', 'admin')
const user = randUser()

describe('Open read-only mode', function() {

	before(function() {
		cy.createUser(user)
		cy.login(user)
		cy.uploadFile('test.md', 'text/markdown')
		cy.uploadFile('test.md', 'text/plain', 'test.txt')
	})

	const setReadOnlyMode = function(mode) {
		cy.login(admin)
		cy.setAppConfig('open_read_only_enabled', mode)
	}

	describe('Disabled', function() {
		const checkMenubar = function() {
			cy.get('.text-editor--readonly-bar').should('not.exist')
			cy.get('.text-menubar', { timeout: 10000 })
				.getActionEntry('done').should('not.exist')
		}

		before(function() {
			setReadOnlyMode(0)
		})

		beforeEach(function() {
			cy.login(user)
			cy.visit('/apps/files')
		})

		it('Test writable markdown file', function() {
			cy.openFile('test.md')
			checkMenubar()
		})

		it('Test writable text file', function() {
			cy.openFile('test.txt')
			checkMenubar()
		})
	})

	describe('Enabled', function() {
		const requireReadOnlyBar = function() {
			cy.get('.text-editor--readonly-bar').should('exist')
			cy.get('.text-editor--readonly-bar').getActionEntry('edit').should('exist')
		}

		const requireMenubar = function() {
			cy.get('.text-editor--readonly-bar').should('not.exist')
			cy.get('.text-menubar').getActionEntry('done').should('exist')
		}

		before(function() {
			setReadOnlyMode(1)
		})

		beforeEach(function() {
			cy.login(user)
			cy.visit('/apps/files')
		})

		it('Test read-only markdown file', function() {
			cy.openFile('test.md')

			requireReadOnlyBar()

			// Switch to edit-mode
			cy.get('.text-editor--readonly-bar').getActionEntry('edit').click()

			requireMenubar()

			// Switch to read-only mode
			cy.get('.text-menubar').getActionEntry('done').click()

			requireReadOnlyBar()
		})

		it('Test read-only text file', function() {
			cy.openFile('test.txt')

			requireReadOnlyBar()

			// Switch to edit-mode
			cy.get('.text-editor--readonly-bar').getActionEntry('edit').click()

			// Check that read-only bar does not exist
			cy.get('.text-editor--readonly-bar').should('not.exist')
		})
	})
})
