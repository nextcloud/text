/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../utils/index.js'

const currentUser = randUser()

const versionFileName = 'versioned.md'

describe('Versions', () => {
	before(() => {
		initUserAndFiles(currentUser, 'empty.md')
	})

	beforeEach(() => {
		cy.login(currentUser)
		cy.visit('/apps/files')
	})

	it('View versions with close timestamps', () => {
		cy.isolateTest().then(({ folderName, fileName }) => {
			const fullPath = folderName + '/' + versionFileName
			cy.createFile(fullPath, '# V1', 'text/markdown', { 'x-oc-mtime': 1691420501 })
			cy.createFile(fullPath, '# V2', 'text/markdown', { 'x-oc-mtime': 1691420521 })
			cy.createFile(fullPath, '# V3', 'text/markdown')

			cy.reloadFileList()

			cy.get('[data-cy-files-list-row-name="' + versionFileName + '"] [data-cy-files-list-row-mtime]').click()
			cy.get('.app-sidebar-header').should('be.visible').should('contain', versionFileName)
			cy.get('.app-sidebar-tabs__tab:contains("Versions")').click()
			cy.get('[data-files-versions-versions-list] li a').should('have.length', 3)

			cy.get('[data-files-versions-versions-list] li a').eq(1).click()
			cy.getContent()
				.find('h1')
				.should('contain.text', 'V2')

			cy.get('[data-files-versions-versions-list] li a').eq(2).click()
			cy.getContent()
				.find('h1')
				.should('contain.text', 'V1')

			cy.get('[data-files-versions-versions-list] li a').eq(0).click()
			cy.getContent()
				.find('h1')
				.should('contain.text', 'V3')
		})
	})

	it('View versions', () => {
		cy.isolateTest().then(({ folderName, fileName }) => {
			const fullPath = folderName + '/' + versionFileName
			cy.createFile(fullPath, '# V1', 'text/markdown', { 'x-oc-mtime': 1691420521 })
			cy.createFile(fullPath, '# V2', 'text/markdown', { 'x-oc-mtime': 1691521521 })
			cy.createFile(fullPath, '# V3')

			cy.reloadFileList()

			cy.get('[data-cy-files-list-row-name="' + versionFileName + '"] [data-cy-files-list-row-mtime]').click()

			cy.get('.app-sidebar-header').should('be.visible').should('contain', versionFileName)

			cy.get('.app-sidebar-tabs__tab:contains("Versions")').click()

			cy.get('[data-files-versions-versions-list] li a').should('have.length', 3)

			cy.get('[data-files-versions-versions-list] li a').eq(1).click()
			cy.getContent()
				.find('h1')
				.should('contain.text', 'V2')

			cy.get('[data-files-versions-versions-list] li a').eq(2).click()
			cy.getContent()
				.find('h1')
				.should('contain.text', 'V1')

			cy.get('[data-files-versions-versions-list] li a').eq(0).click()
			cy.getContent()
				.find('h1')
				.should('contain.text', 'V3')

			cy.getContent()
				.type('Hello')
		})
	})

	it('Compare versions', () => {
		cy.isolateTest().then(({ folderName, fileName }) => {
			const fullPath = folderName + '/' + versionFileName
			cy.createFile(fullPath, '# V1', 'text/markdown', { 'x-oc-mtime': 1691420521 })
			cy.createFile(fullPath, '# V2', 'text/markdown', { 'x-oc-mtime': 1691521521 })
			cy.createFile(fullPath, '# V3')

			cy.reloadFileList()

			cy.get('[data-cy-files-list-row-name="' + versionFileName + '"] [data-cy-files-list-row-mtime]').click()

			cy.get('.app-sidebar-header').should('be.visible').should('contain', versionFileName)

			cy.get('.app-sidebar-tabs__tab:contains("Versions")').click()

			cy.get('[data-files-versions-versions-list] li a').should('have.length', 3)

			cy.get('[data-files-versions-versions-list] li').eq(2)
				.find('button.action-item__menutoggle').first().click({ force: true })

			cy.get('.v-popper__inner')
				.find('button')
				.eq(1)
				.should('contain', 'Compare to current version')
				.click()

			cy.getContent()
				.find('h1')
				.should('contain.text', '#V1')

			cy.get('.viewer__content .viewer__file--active .ProseMirror')
				.find('h1')
				.should('contain.text', 'V3')
		})
	})
})
