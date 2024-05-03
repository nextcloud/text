/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../../utils/index.js'

const user = randUser()
const mentionMe = randUser()
const mention = mentionMe.userId
const currentUser = user

const fileName = 'empty.md'

const createFileWithMention = (target, userToMention) => {
	const content = `Hello @[${userToMention}](mention://user/${userToMention})`
	cy.createFile(target, content)
		.then(() => cy.reloadFileList())
}

describe('Test mentioning users', () => {
	before(() => {
		initUserAndFiles(user, 'test.md')
		cy.createUser(mentionMe)
	})

	beforeEach(() => {
		cy.login(currentUser)
		cy.visit('/apps/files')
	})

	it('Type @ and see the user list', () => {
		const requestAlias = 'fetchUsersList'
		cy.intercept({ method: 'POST', url: '**/users' }).as(requestAlias)

		cy.isolateTest({
			sourceFile: fileName,
			onBeforeLoad(win) {
				cy.stub(win, 'open')
					.as('winOpen')
			},
		})

		cy.openFile(fileName, { force: true })

		cy.getContent()
			.type(`@${mention.substring(0, 3)}`)

		return cy.wait(`@${requestAlias}`)
			.then(() => {
				cy.get('.tippy-box .suggestion-list').children().should(($children) => {
					const users = $children.map((i, el) => el.innerText).get()
					expect(users.length).to.be.greaterThan(0)
					expect(mention).to.be.oneOf(users)
				})
			})
	})

	it('Select a user will insert the mention', () => {
		const autocompleteReauestAlias = 'fetchUsersList'
		cy.intercept({ method: 'POST', url: '**/users' }).as(autocompleteReauestAlias)

		cy.isolateTest({
			sourceFile: fileName,
			onBeforeLoad(win) {
				cy.stub(win, 'open')
					.as('winOpen')
			},
		})

		cy.openFile(fileName, { force: true })

		cy.get('.text-editor__content div[contenteditable="true"]')
			.clear()
		cy.get('.text-editor__content div[contenteditable="true"]')
			.type(`@${mention.substring(0, 3)}`)

		return cy.wait(`@${autocompleteReauestAlias}`)
			.then(() => {
				cy.intercept({ method: 'PUT', url: '**/mention' }).as('putMention')
				cy.get('.tippy-box .suggestion-list').contains(mention).click()
				cy.get('span.mention').contains(mention).should('be.visible')
				cy.wait('@putMention')
					.its('response.statusCode').should('eq', 200)
			})
	})

	it('Open a document with an existing mention and properly see the user bubble rendered', () => {
		const mentionFilename = 'mention.md'
		createFileWithMention(mentionFilename, mention)
		cy.openFile(mentionFilename, { force: true })
		cy.get('.text-editor__content div[contenteditable="true"] span.mention')
			.contains(mention)
			.should('be.visible')
	})
})
