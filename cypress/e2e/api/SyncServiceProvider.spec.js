/*
 * @copyright Copyright (c) 2023 Max <max@nextcloud.com>
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

import { randUser } from '../../utils/index.js'
import SessionApi from '../../../src/services/SessionApi.js'
import { SyncService } from '../../../src/services/SyncService.js'
import createSyncServiceProvider from '../../../src/services/SyncServiceProvider.js'
import { Doc } from 'yjs'

const user = randUser()

describe('Sync service provider', function() {
	let fileId

	before(function() {
		cy.createUser(user)
	})

	beforeEach(function() {
		cy.login(user)
		cy.uploadTestFile('test.md')
			.then(id => {
				fileId = id
			})
		cy.wrap(new Doc()).as('source')
		cy.wrap(new Doc()).as('target')
		cy.get('@source').then(source => createProvider(source)).as('sourceProvider')
		cy.get('@target').then(target => createProvider(target)).as('targetProvider')
	})

	afterEach(function() {
		this.sourceProvider?.destroy()
		this.targetProvider?.destroy()
	})

	/**
	 * @param {object} ydoc Yjs document
	 */
	function createProvider(ydoc) {
		const queue = []
		const api = new SessionApi()
		const syncService = new SyncService({
			serialize: () => 'Serialized',
			getDocumentState: () => null,
			api,
		})
		syncService.on('opened', () => syncService.startSync())
		return createSyncServiceProvider({
			ydoc,
			syncService,
			fileId,
			initialSession: null,
			queue,
			disableBc: true,
		})
	}

	it('recovers from a dropped message', function() {
		const sourceMap = this.source.getMap()
		const targetMap = this.target.getMap()
		cy.intercept({ method: 'POST', url: '**/apps/text/session/*/push' })
			.as('push')
		cy.intercept({ method: 'POST', url: '**/apps/text/session/*/sync' })
			.as('sync')
		cy.wait('@push')
		cy.then(() => {
			sourceMap.set('keyA', 'valueA')
			expect(targetMap.get('keyB')).to.be.eq(undefined)
		})
		cy.wait('@sync')
		cy.wait('@sync')
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(1000)
		cy.then(() => {
			expect(targetMap.get('keyA')).to.be.eq('valueA')
		})
		cy.intercept({
			method: 'POST',
			url: '**/apps/text/session/*/push',
		}, req => {
			if (req.body.steps) {
				req.reply({ forceNetworkError: true })
				req.alias = 'dead'
			} else {
				req.continue()
			}
		})
		cy.then(() => {
			sourceMap.set('keyB', 'valueB')
			expect(targetMap.get('keyB')).to.be.eq(undefined)
		})
		cy.wait('@dead')
		cy.then(() => {
			expect(targetMap.get('keyB')).to.be.eq(undefined)
		})
		cy.intercept({
			method: 'POST',
			url: '**/apps/text/session/*/push',
		}, req => {
			if (req.body.steps) {
				req.alias = 'alive'
				req.continue()
			} else {
				req.continue()
			}
		})
		cy.then(() => {
			sourceMap.set('keyC', 'valueC')
			expect(targetMap.get('keyB')).to.be.eq(undefined)
		})
		cy.wait('@alive')
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(1000)
		cy.then(() => {
			expect(targetMap.get('keyC')).to.be.eq('valueC')
			expect(targetMap.get('keyB')).to.be.eq('valueB')
		})
	})

	/*
	 * Counts the amount of push and sync requests in one minute.
	 * Skipped per default, useful for comparison before/after changes to SyncProvider or PollingBackend.
	 */
	it.skip('is not too chatty', function() {
		const sourceMap = this.source.getMap()
		const targetMap = this.target.getMap()
		cy.intercept({ method: 'POST', url: '**/apps/text/session/*/push' })
			.as('push')
		cy.intercept({ method: 'POST', url: '**/apps/text/session/*/sync' })
			.as('sync')
		cy.wait('@push')
		cy.then(() => {
			sourceMap.set('keyA', 'valueA')
			expect(targetMap.get('keyB')).to.be.eq(undefined)
		})
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(60000)
		cy.then(() => {
			expect(targetMap.get('keyA')).to.be.eq('valueA')
		})
		// 2 clients push awareness updates every 15 seconds -> 2*5 = 10. Actual 15.
		cy.get('@push.all').its('length').should('be.lessThan', 30)
		// 2 clients sync fast first and then every 5 seconds -> 2*12 = 24. Actual 32.
		cy.get('@sync.all').its('length').should('be.lessThan', 60)
	})
})
