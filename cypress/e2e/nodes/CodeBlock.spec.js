/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../../utils/index.js'

const user = randUser()

describe('Front matter support', function() {
	before(function() {
		initUserAndFiles(user, 'codeblock.md', 'empty.md')
	})

	beforeEach(function() {
		cy.login(user)
	})

	it('See existing code block', function() {
		cy.isolateTest({ sourceFile: 'codeblock.md' })
		cy.openFile('codeblock.md').then(() => {
			// Plain text block
			cy.getContent().find('code').eq(0).find('.hljs-keyword').should('not.exist')

			// Javascript block
			cy.getContent().find('code').eq(1).find('.hljs-keyword').eq(0).contains('const')
			cy.getContent().find('code').eq(1).find('.hljs-string').eq(0).contains('"bar"')
			cy.getContent().find('code').eq(1).find('.hljs-keyword').eq(1).contains('function')

			cy.getContent().find('.code-block').eq(1).find('[data-cy="copy-code"]').click()

			// Copy code to clipboard
			cy.getContent().find('code').eq(1).invoke('text')
				.then(code =>
					cy.window().then(win => {
						win.navigator.clipboard.readText()
							.then(copiedCode => {
								expect(copiedCode).to.equal(code)
							})
					}),
				)

			// Remove language
			cy.getContent().find('.code-block').eq(1).find('[data-cy="code-action-group"]').find('div:first-child').click()
			// FIXME: Label behaviour changed, should be back once https://github.com/nextcloud-libraries/nextcloud-vue/pull/4484 is merged
			// cy.get('.action-input__text-label').contains('Code block language')
			cy.get('.input-field__input:visible').clear()

			cy.getContent().find('code').eq(1).click()

			cy.getContent().find('code').eq(1).find('.hljs-keyword').should('not.exist')

			// Re-add language
			cy.getContent().find('.code-block').eq(1).find('[data-cy="code-action-group"]').find('div:first-child').click()
			cy.get('.input-field__input:visible').type('javascript')

			cy.getContent().find('code').eq(1).find('.hljs-keyword').eq(0).contains('const')
			cy.getContent().find('code').eq(1).find('.hljs-string').eq(0).contains('"bar"')
			cy.getContent().find('code').eq(1).find('.hljs-keyword').eq(1).contains('function')
		})
	})

	it('Show a code block in a public read only link', function() {
		cy.shareFile('/codeblock.md')
			.then((token) => {
				cy.logout()
				cy.visit(`/s/${token}`)
			})
			.then(() => {
				cy.getEditor().should('be.visible')
				// Plain text block
				cy.getContent().find('code').eq(0).find('.hljs-keyword').should('not.exist')

				// Javascript block
				cy.getContent().find('code').eq(1).find('.hljs-keyword').eq(0).contains('const')
				cy.getContent().find('code').eq(1).find('.hljs-string').eq(0).contains('"bar"')
				cy.getContent().find('code').eq(1).find('.hljs-keyword').eq(1).contains('function')

				// Mermaid diagram
				cy.get('#app-content').scrollTo('bottom')
				cy.getContent().find('.split-view__preview').eq(2).should('be.visible')
				cy.get('.code-block').eq(2).find('code').should('not.be.visible')
				cy.get('.split-view__preview').find('svg .entityTitleText')
					.contains('Order example')
			})
	})

	it('Add a code block', function() {
		cy.isolateTest({ sourceFile: 'codeblock.md' })
		cy.openFile('codeblock.md').then(() => {
			cy.clearContent()
			cy.insertLine('```javascript')
			cy.getContent().type('const foo = "bar"{enter}{enter}{enter}')
			cy.getContent().find('.hljs-keyword').first().contains('const')
		})
	})

	it('See a mermaid diagram', function() {
		cy.isolateTest({ sourceFile: 'codeblock.md' })
		cy.openFile('codeblock.md').then(() => {
			cy.getContent().find('.split-view__preview').find('svg').should('be.visible')
			cy.get('.code-block').eq(2).find('code').should('not.be.visible')
			cy.get('.split-view__preview').find('svg .entityTitleText')
				.contains('Order example')
		})
	})

	it('Add an invalid mermaid block', function() {
		cy.isolateTest()
		cy.openFile('empty.md').then(() => {
			cy.insertLine('```mermaid')
			cy.getContent().find('code').should('exist')
			cy.getContent().get('.split-view__preview').should('be.visible')
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(250)
			cy.getContent().type('invalid{enter}{enter}')

			cy.get('.split-view__code').find('code').should('be.visible')
			cy.get('.split-view__preview').find('svg').should('not.exist')
		})
	})

	it('Add a valid mermaid block', function() {
		cy.isolateTest()
		cy.openFile('empty.md').then(() => {
			cy.insertLine('```mermaid')
			cy.getContent().find('code').should('exist')
			cy.getContent().get('.split-view__preview').should('be.visible')
			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(250)
			// Tab key does not work in cypress, using spaces instead
			cy.getContent().type('flowchart LR{enter}    entry{enter}')

			cy.get('.split-view__code').find('code').should('be.visible')
			cy.get('.split-view__preview').find('svg').should('be.visible')

			cy.getContent().find('.code-block').eq(0).find('.view-switch div div button').click()
			cy.get('.action-button').eq(0).contains('Source code').click()
			cy.get('.split-view__code').find('code').should('be.visible')
			cy.get('.split-view__preview').find('svg').should('not.be.visible')

			cy.getContent().find('.code-block').eq(0).find('.view-switch div div button').click()
			cy.get('.action-button').eq(1).contains('Diagram').click()
			cy.get('.split-view__code').find('code').should('not.be.visible')
			cy.get('.split-view__preview').find('svg').should('be.visible')

			cy.getContent().find('.code-block').eq(0).find('.view-switch div div button').click()
			cy.get('.action-button').eq(2).contains('Both').click()
			cy.get('.split-view__code').find('code').should('be.visible')
			cy.get('.split-view__preview').find('svg').should('be.visible')
		})
	})
})
