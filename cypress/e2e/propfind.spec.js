/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()

describe('Text PROPFIND extension ', function() {
	const richWorkspace = '{http://nextcloud.org/ns}rich-workspace'

	before(function() {
		cy.createUser(user)
	})

	beforeEach(function() {
		cy.login(user)
	})

	describe('with workspaces enabled', function() {

		beforeEach(function() {
			cy.configureText('workspace_enabled', 1)
		})

		// Android app relies on this to detect rich workspace availability
		it('always adds rich workspace property', function() {
			cy.uploadFile('empty.md', 'text/markdown', '/Readme.md')
			// FIXME: Ideally we do not need a page context for those tests at all
			// For now the dashboard avoids that we have failing requests due to conflicts when updating the file
			cy.visit('/apps/dashboard')
			cy.propfindFolder('/')
				.should('have.property', richWorkspace, '')
			cy.uploadFile('test.md', 'text/markdown', '/Readme.md')
			cy.propfindFolder('/')
				.should('have.property', richWorkspace, '## Hello world\n')
			cy.deleteFile('/Readme.md')
			cy.propfindFolder('/')
				.should('have.property', richWorkspace, '')
		})

		// Android app relies on this when navigating nested folders
		it('adds rich workspace property to nested folders', function() {
			cy.createFolder('/workspace')
			// FIXME: Ideally we do not need a page context for those tests at all
			// For now the dashboard avoids that we have failing requests due to conflicts when updating the file
			cy.visit('/apps/dashboard')
			cy.propfindFolder('/', 1)
				.then(results => results.pop().propStat[0].properties)
				.should('have.property', richWorkspace, '')
			cy.uploadFile('test.md', 'text/markdown', '/workspace/Readme.md')
			cy.propfindFolder('/', 1)
				.then(results => results.pop().propStat[0].properties)
				.should('have.property', richWorkspace, '## Hello world\n')
		})

	})

	describe('with workspaces disabled', function() {

		beforeEach(function() {
			cy.configureText('workspace_enabled', 0)
		})

		it('does not return a rich workspace property', function() {
			// FIXME: Ideally we do not need a page context for those tests at all
			// For now the dashboard avoids that we have failing requests due to conflicts when updating the file
			cy.visit('/apps/dashboard')
			cy.propfindFolder('/')
				.should('not.have.property', richWorkspace)
			cy.uploadFile('test.md', 'text/markdown', '/Readme.md')
			cy.propfindFolder('/')
				.should('not.have.property', richWorkspace)
			cy.createFolder('/without-workspace')
			cy.propfindFolder('/', 1)
				.then(results => results.pop().propStat[0].properties)
				.should('not.have.property', richWorkspace)
		})

	})
})
