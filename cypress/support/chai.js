/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export default _chai => {
	_chai.Assertion.addMethod('inViewport', function() {
		const subject = this._obj

		const height = Cypress.$(cy.state('window')).height()
		const width = Cypress.$(cy.state('window')).width()
		const rect = subject[0].getBoundingClientRect()

		this.assert(
			rect.top < height && rect.bottom > 0 && rect.right <= width && rect.left >= 0,
			'expected #{this} to be in the viewport',
			'expected #{this} to not be in the viewport',
			this._obj,
		)
	})
}
