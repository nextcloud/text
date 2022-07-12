/**
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { randHash } from '../utils/index.js'
const randUser = randHash()

describe('Text PROPFIND extension ', function() {
	const richWorkspace = '{http://nextcloud.org/ns}rich-workspace'

	before(function() {
		cy.nextcloudCreateUser(randUser, 'password')
	})

	beforeEach(function() {
		cy.login(randUser, 'password')
	})

	describe('with workspaces enabled', function() {

		beforeEach(function() {
			cy.configureText('workspace_enabled', 1)
		})

		// Android app relies on this to detect rich workspace availability
		it('always adds rich workspace property', function() {
			cy.uploadFile('empty.md', 'text/markdown', '/Readme.md')
			cy.propfindFolder('/')
				.should('have.property', richWorkspace, '')
			cy.uploadFile('test.md', 'text/markdown', '/Readme.md')
			cy.propfindFolder('/')
				.should('have.property', richWorkspace, '## Hello world\n')
			cy.removeFile('/Readme.md')
			cy.propfindFolder('/')
				.should('have.property', richWorkspace, '')
		})

		// Android app relies on this when navigating nested folders
		it('adds rich workspace property to nested folders', function() {
			cy.createFolder('/workspace')
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
