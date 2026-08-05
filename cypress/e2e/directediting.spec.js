/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../utils/index.js'

const user = randUser()

/**
 * Enter content and close
 */
function enterContentAndClose() {
	cy.intercept({ method: 'POST', url: '**/session/*/close' }).as('closeRequest')
	cy.intercept({ method: 'POST', url: '**/session/*/push' }).as('push')
	cy.intercept({ method: 'POST', url: '**/session/*/sync' }).as('sync')
	cy.insertLine('# This is a headline')
	cy.insertLine('Some text')
	cy.getContent().type('{ctrl+s}')
	cy.wait('@push')
	cy.wait('@sync')
	cy.get('button.icon-close').click()
	cy.wait('@closeRequest')
}

describe('direct editing', function () {
	before(function () {
		initUserAndFiles(user, 'test.md', 'empty.md', 'empty.txt')
	})

	beforeEach(function () {
		// ensure user is enabled if it was disabled before
		cy.clearCookies()
		cy.enableUser(user, true)
	})

	it('Open an existing file, edit it', () => {
		cy.login(user)
		cy.createDirectEditingLink('empty.md').then((token) => {
			cy.session('direct-editing', () => {})
			cy.openDirectEditingToken(token)
		})
		enterContentAndClose()
		cy.login(user)
		cy.getFileContent('empty.md').should(
			'equal',
			'# This is a headline\n\nSome text',
		)
	})

	it('Create a file, edit it', () => {
		cy.login(user)
		cy.createDirectEditingLinkForNewFile('newfile.md').then((token) => {
			cy.session('direct-editing', () => {})
			cy.openDirectEditingToken(token)
		})
		enterContentAndClose()
		cy.login(user)
		cy.getFileContent('newfile.md').should(
			'equal',
			'# This is a headline\n\nSome text',
		)
	})

	it('Open an existing plain text file, edit it', () => {
		cy.login(user)
		cy.createDirectEditingLink('empty.txt').then((token) => {
			cy.session('direct-editing', () => {})
			cy.openDirectEditingToken(token)
		})
		enterContentAndClose()
		cy.login(user)
		cy.getFileContent('empty.txt').should(
			'equal',
			'# This is a headline\nSome text\n',
		)
	})

	it('Cannot open as disabled user', () => {
		cy.login(user)
		cy.createDirectEditingLink('empty.md').as('token')
		cy.clearCookies()
		cy.enableUser(user, false)
		cy.get('@token')
			.then((token) => {
				cy.request({ url: token, failOnStatusCode: false })
			})
			.its('status')
			.should('equal', 404)
	})

	it('Cannot open as deleted user', () => {
		cy.login(user)
		cy.createDirectEditingLink('empty.md').as('token')
		cy.clearCookies()
		cy.deleteUser(user)
		cy.get('@token')
			.then((token) => {
				cy.request({ url: token, failOnStatusCode: false })
			})
			.its('status')
			.should('equal', 404)
	})
})
