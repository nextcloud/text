/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../../utils/index.js'

const user = randUser()
const fileName = 'empty.md'

describe('Details plugin', () => {
	before(() => {
		initUserAndFiles(user)
	})

	beforeEach(() => {
		cy.login(user)

		cy.isolateTest({
			sourceFile: fileName,
		})

		return cy.openFile(fileName, { force: true })
	})

	it('inserts and removes details', () => {
		cy.getContent()
			.type('content{selectAll}')

		cy.getMenuEntry('details').click()

		cy.getContent()
			.find('div[data-text-el="details"]')
			.should('exist')

		cy.getContent()
			.type('summary')

		cy.getContent()
			.find('div[data-text-el="details"]')
			.find('summary')
			.should('contain', 'summary')

		cy.getContent()
			.find('div[data-text-el="details"]')
			.find('.details-content')
			.should('contain', 'content')

		cy.getMenuEntry('details').click()

		cy.getContent()
			.find('div[data-text-el="details"]')
			.should('not.exist')

		cy.getContent()
			.should('contain', 'content')
	})
})
