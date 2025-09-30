/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'
import { documentState, sync1, sync2 } from '../fixtures/failedSync.js'

const user = randUser()

describe('Sync', () => {
	before(() => {
		cy.createUser(user)
	})

	for (var i = 0; i < 9; i++) {
	it(`reproduces the sync failure - ${i}`, () => {
		cy.login(user)
		cy.uploadTestFile('empty.md')
		cy.visit('/apps/files')

		cy.intercept(
			{
				method: 'POST',
				url: '**/apps/text/session/*/push',
				times: 1,
			},
			(req) => {
				req.continue((res) => {
					res.send({
						...res.body,
						documentState,
					})
				})
			},
		).as('init')

		cy.openTestFile()
		cy.wait('@init', { timeout: 10_000 })

		cy.intercept(
			{
				method: 'POST',
				url: '**/apps/text/session/*/sync',
				times: 1,
			},
			(req) => {
				req.continue((res) => {
					res.send({
						...res.body,
						...sync1,
					})
				})
			},
		).as('sync1')
		cy.wait('@sync1', { timeout: 10_000 })

		cy.intercept(
			{
				method: 'POST',
				url: '**/apps/text/session/*/push',
				times: 1,
			},
			(req) => {
				req.continue((res) => {
					res.send({
						...res.body,
						documentState,
					})
				})
			},
		).as('push')

		cy.intercept(
			{
				method: 'POST',
				url: '**/apps/text/session/*/sync',
				times: 1,
			},
			(req) => {
				req.continue((res) => {
					res.send({
						...res.body,
						...sync2,
					})
				})
			},
		).as('sync2')
		cy.wait('@sync2', { timeout: 10_000 })
		cy.wait('@push', { timeout: 20_000 }).its('request.body.steps.length').should('eq', 0)
	})
	}

})
