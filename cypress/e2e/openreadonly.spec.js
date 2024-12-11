/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { User } from '@nextcloud/cypress'
import { randUser } from '../utils/index.js'

const admin = new User('admin', 'admin')
const user = randUser()

describe('Open read-only mode', function() {

	const setReadOnlyMode = function(mode) {
		cy.login(admin)
		cy.ocsRequest({
			method: 'POST',
			url: `${Cypress.env('baseUrl')}/ocs/v2.php/apps/testing/api/v1/app/text/open_read_only_enabled`,
			body: { value: mode },
		}).then(response => {
			cy.log(response.status)
		})
		cy.logout()
	}

	describe('Disabled', function() {
		const checkMenubar = function() {
			cy.get('.text-editor--readonly-bar').should('not.exist')
			cy.get('.text-menubar').getActionEntry('done').should('not.exist')
		}

		beforeEach(function() {
			setReadOnlyMode(0)

			cy.createUser(user)
			cy.login(user)

			cy.uploadFile('test.md', 'text/markdown')
			cy.uploadFile('test.md', 'text/markdown', 'test.txt')

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

		beforeEach(function() {
			setReadOnlyMode(1)

			cy.createUser(user)
			cy.login(user)

			cy.removeFile('test.md')
			cy.removeFile('test.txt')

			cy.uploadFile('test.md', 'text/markdown')
			cy.uploadFile('test.md', 'text/plain', 'test.txt')

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
