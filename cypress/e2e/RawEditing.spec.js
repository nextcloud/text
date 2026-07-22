/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()

describe('Raw Markdown editing', function() {
	before(function() {
		cy.createUser(user)
	})

	beforeEach(function() {
		cy.login(user)
		cy.uploadTestFile()
		cy.visit('/apps/files')
		cy.openTestFile()
		// Seed some rich content to round-trip.
		cy.getContent().type('# Hello{enter}World')
		cy.getContent().find('h1').should('contain.text', 'Hello')
	})

	const openRawEditor = function() {
		cy.getActionEntry('remain').click()
		cy.contains('Edit Markdown source').click()
		return cy.get('[data-text-el="raw-markdown-editor"]').should('exist')
	}

	const rawContent = function() {
		return cy.get('[data-text-el="raw-markdown-editor"] .ProseMirror')
	}

	it('shows the Markdown source when toggled on', function() {
		openRawEditor()
		rawContent().should('contain.text', '# Hello')
		// The rich formatting toolbar is hidden while editing raw.
		cy.get('div[data-text-el="menubar"] .text-menubar__entries').should('not.exist')
	})

	it('applies raw edits back into the rich editor', function() {
		openRawEditor()
		rawContent().type('{selectall}{del}## Changed heading{enter}{enter}body text')
		cy.get('[data-cy="exitRawEditing"]').click()
		cy.get('[data-text-el="raw-markdown-editor"]').should('not.exist')
		cy.getContent().find('h2').should('contain.text', 'Changed heading')
		cy.getContent().should('contain.text', 'body text')
		cy.getContent().find('h1').should('not.exist')
	})

	it('discards raw edits when requested', function() {
		openRawEditor()
		rawContent().type('{selectall}{del}throwaway content')
		cy.get('[data-cy="discardRawEditing"]').click()
		cy.get('[data-text-el="raw-markdown-editor"]').should('not.exist')
		cy.getContent().find('h1').should('contain.text', 'Hello')
		cy.getContent().should('not.contain.text', 'throwaway content')
	})

	describe('concurrent changes', function() {
		// Mimic a remote collaborator editing the live document while we are
		// detached in raw mode by mutating the still-connected rich editor
		// directly — the same effect a remote yjs update would have.
		const simulateConcurrentEdit = function(text) {
			return cy.window().then((win) => {
				const component = [...win.OCA.Text.editorComponents].find((c) => c.rawEditing)
				expect(component, 'component in raw editing mode').to.exist
				component.editor.commands.insertContentAt(1, text)
			})
		}

		const forkAndDiverge = function() {
			openRawEditor()
			simulateConcurrentEdit('CONCURRENT ')
			rawContent().type('{selectall}{del}mine rewrite')
			cy.get('[data-cy="exitRawEditing"]').click()
			// Drift detected: the collision resolver is shown instead of
			// silently overwriting the concurrent change.
			cy.get('#resolve-conflicts', { timeout: 10000 }).should('exist')
		}

		it('keeps the raw edits when choosing the local version', function() {
			forkAndDiverge()
			cy.get('[data-cy="useReaderVersion"]').click()
			cy.get('#resolve-conflicts').should('not.exist')
			cy.getContent().should('contain.text', 'mine rewrite')
			cy.getContent().should('not.contain.text', 'CONCURRENT')
		})

		it('keeps the concurrent version when discarding the raw edits', function() {
			forkAndDiverge()
			cy.get('[data-cy="useEditorVersion"]').click()
			cy.get('#resolve-conflicts').should('not.exist')
			cy.getContent().should('contain.text', 'CONCURRENT')
			cy.getContent().should('not.contain.text', 'mine rewrite')
		})
	})
})
