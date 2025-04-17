/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()

describe('Text PROPFIND extension ', function() {
	const PROPERTY_WORKSPACE = '{http://nextcloud.org/ns}rich-workspace'
	const PROPERTY_WORKSPACE_FILE = '{http://nextcloud.org/ns}rich-workspace-file'
	const PROPERTY_WORKSPACE_FLAT = '{http://nextcloud.org/ns}rich-workspace-flat'
	const PROPERTY_WORKSPACE_FILE_FLAT = '{http://nextcloud.org/ns}rich-workspace-file-flat'

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

		it('always adds rich workspace property', function() {
			const properties = [PROPERTY_WORKSPACE_FLAT, PROPERTY_WORKSPACE_FILE_FLAT]
			cy.uploadFile('empty.md', 'text/markdown', '/Readme.md')
			// FIXME: Ideally we do not need a page context for those tests at all
			// For now the dashboard avoids that we have failing requests due to conflicts when updating the file
			cy.visit('/apps/dashboard')
			cy.propfindFolder('/', 0, properties)
				.should('have.property', PROPERTY_WORKSPACE_FLAT, '')
			cy.uploadFile('test.md', 'text/markdown', '/Readme.md')
			cy.propfindFolder('/', 0, properties)
				.should('have.property', PROPERTY_WORKSPACE_FLAT, '## Hello world\n')
			cy.deleteFile('/Readme.md')
			cy.propfindFolder('/', 0, properties)
				.should('have.property', PROPERTY_WORKSPACE_FLAT, '')
		})

		it('never adds rich workspace property to nested folders for flat properties', function() {
			const properties = [PROPERTY_WORKSPACE_FLAT, PROPERTY_WORKSPACE_FILE_FLAT]
			// FIXME: Ideally we do not need a page context for those tests at all
			// For now the dashboard avoids that we have failing requests due to conflicts when updating the file
			cy.visit('/apps/dashboard')
			cy.createFolder('/workspace-flat')
			cy.propfindFolder('/', 1, properties)
				.then(results => results.pop().propStat[0].properties)
				.should('have.property', PROPERTY_WORKSPACE_FLAT, '')
			cy.uploadFile('test.md', 'text/markdown', '/workspace-flat/Readme.md')
			cy.propfindFolder('/', 1, properties)
				.then(results => results.pop().propStat[0].properties)
				.should('not.have.property', PROPERTY_WORKSPACE_FLAT)
			cy.deleteFile('/workspace-flat/Readme.md')
			cy.propfindFolder('/', 1, properties)
				.then(results => results.pop().propStat[0].properties)
				.should('have.property', PROPERTY_WORKSPACE_FLAT, '')
		})

		// Android app relies on this to detect rich workspace availability in subfolders properly
		it('adds rich workspace property to nested folders for the default properties', function() {
			const properties = [PROPERTY_WORKSPACE, PROPERTY_WORKSPACE_FILE]
			cy.createFolder('/workspace')
			// FIXME: Ideally we do not need a page context for those tests at all
			// For now the dashboard avoids that we have failing requests due to conflicts when updating the file
			cy.visit('/apps/dashboard')
			cy.propfindFolder('/', 1, properties)
				.then(results => results.pop().propStat[0].properties)
				.should('have.property', PROPERTY_WORKSPACE, '')
			cy.uploadFile('test.md', 'text/markdown', '/workspace/Readme.md')
			cy.propfindFolder('/', 1, properties)
				.then(results => results.pop().propStat[0].properties)
				.should('not.property', PROPERTY_WORKSPACE, 'Hello world\n')
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
			cy.propfindFolder('/', 1, [PROPERTY_WORKSPACE_FLAT, PROPERTY_WORKSPACE_FILE_FLAT])
				.should('not.have.property', PROPERTY_WORKSPACE_FLAT)
			cy.uploadFile('test.md', 'text/markdown', '/Readme.md')
			cy.propfindFolder('/', 1, [PROPERTY_WORKSPACE_FLAT, PROPERTY_WORKSPACE_FILE_FLAT])
				.should('not.have.property', PROPERTY_WORKSPACE_FLAT)
			cy.createFolder('/without-workspace')
			cy.propfindFolder('/', 1)
				.then(results => results.pop().propStat[0].properties)
				.should('not.have.property', PROPERTY_WORKSPACE_FLAT)
		})

	})
})
