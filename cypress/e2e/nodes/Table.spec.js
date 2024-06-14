/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { findChildren } from './../../../src/helpers/prosemirrorUtils.js'
import { initUserAndFiles, randUser } from '../../utils/index.js'
import { createCustomEditor } from './../../support/components.js'

import markdownit from './../../../src/markdownit/index.js'
import EditableTable from './../../../src/nodes/EditableTable.js'
import Markdown, { createMarkdownSerializer } from './../../../src/extensions/Markdown.js'

// https://github.com/import-js/eslint-plugin-import/issues/1739
/* eslint-disable-next-line import/no-unresolved */
import testData from '../../fixtures/Table.md?raw'

const user = randUser()
const fileName = 'empty.md'

describe('table plugin', () => {
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

	it('inserts and removes a table', () => {
		cy.getContent()
			.type('Let\'s insert a Table')

		cy.getActionEntry('table').click()

		cy.getContent()
			.type('content')

		cy.getContent()
			.find('table tr:first-child th:first-child')
			.should('contain', 'content')

		cy.getContent()
			.find('[data-text-table-actions="settings"] [aria-label="Actions"]').click()

		cy.get('[data-text-table-action="delete"] [role="menuitem"]').click()
		cy.getContent()
			.should('not.contain', 'content')
	})

	it('Enter creates newline and navigates', () => {
		cy.getActionEntry('table').click()

		cy.getContent()
			.find('table tr')
			.should('have.length', 3)

		cy.getContent().type('first{Enter}row')
		cy.getContent().type('{Enter}{Enter}second row')
		cy.getContent().type('{Enter}{Enter}third row')
		cy.getContent().type('{Enter}{Enter}forth row')

		// Added a row
		cy.getContent()
			.find('table tr')
			.should('have.length', 4)

		// First cell now contains a hard break
		cy.getContent()
			.find('table tr:first-child th:first-child br')
			.should('exist')
	})

	it('Table column alignment', () => {
		cy.getActionEntry('table').click()

		cy.getContent()
			.type('center');

		['center', 'left', 'right'].forEach(align => {
			cy.getContent()
				.find('table tr:first-child th:first-child button')
				.click()
			cy.get(`[data-text-table-action="align-column-${align}"] [role="menuitemradio"]`)
				.click()
			// Check header has correct text align and text is preserved
			cy.getContent()
				.find('table tr:first-child th:first-child')
				.should('contain', 'center')
				.should('have.css', 'text-align', align)
			// Check every normal cell in this column to have the text align set
			cy.getContent()
				.find('table tr td:first-child')
				.should('have.length', 2)
				.each(td => cy.wrap(td).should('have.css', 'text-align', align))
		})
	})

	it('Keep alignment on new row', () => {
		cy.getActionEntry('table').click()

		cy.getContent()
			.find('table tr:first-child th:first-child button')
			.click()
		cy.get('[data-text-table-action="align-column-center"] [role="menuitemradio"]')
			.click()

		// Test before adding a row
		cy.getContent()
			.find('table tr td:first-child')
			.should('have.length', 2)
			.each(td => cy.wrap(td).should('have.css', 'text-align', 'center'))

		cy.getContent()
			.type('1{enter}{enter}2{enter}{enter}3{enter}{enter}new 4')

		// Test after the row was added
		cy.getContent()
			.find('table tr td:first-child')
			.should('have.length', 3)
			.each(td => cy.wrap(td).should('have.css', 'text-align', 'center'))
	})

	it('Creates table and add multilines', function() {
		const multilinesContent = 'Line 1\nLine 2\nLine 3'

		cy.getActionEntry('table').click()
		cy.getContent()
			.find('table:nth-of-type(1) tr:nth-child(2) td:nth-child(1)')
			.click()

		cy.getContent()
			.type(multilinesContent)

		cy.getContent()
			.find('table:nth-of-type(1) tr:nth-child(2) td:nth-child(1) .content')
			.then(($el) => {
				expect($el.get(0).innerHTML).to.equal(multilinesContent.replace(/\n/g, '<br>'))
			})
	})
})

describe('Table extension integrated in the editor', () => {

	const editor = createCustomEditor({
		content: '',
		extensions: [
			Markdown,
			EditableTable,
		],
	})

	for (const spec of testData.split(/#+\s+/)) {
		const [description, ...rest] = spec.split(/\n/)
		const [input, output] = rest.join('\n').split(/\n\n---\n\n/)
		if (!description) {
			continue
		}
		it(description, () => {
			expect(spec).to.include('\n')
			/* eslint-disable no-unused-expressions */
			expect(input).to.be.ok
			expect(output).to.be.ok
			/* eslint-enable no-unused-expressions */
			loadMarkdown(input)
			runCommands()
			expectMarkdown(output.replace(/\n*$/, ''))
		})
	}

	const loadMarkdown = (markdown) => {
		editor.commands.setContent(markdownit.render(markdown))
	}

	const runCommands = () => {
		let found
		while ((found = findCommand())) {
			const name = found.node.text
			editor.commands.setTextSelection(found.pos)
			editor.commands[name]()
			const updated = findCommand()
			if (updated) {
				editor.commands.setTextSelection(updated.pos)
				editor.commands.insertContent('did ')
			}
		}
	}

	const findCommand = () => {
		const doc = editor.state.doc
		return findChildren(doc, child => {
			return child.isText && Object.prototype.hasOwnProperty.call(editor.commands, child.text)
		})[0]
	}

	const expectMarkdown = (markdown) => {
		expect(getMarkdown().replace(/\n$/, '')).to.equal(markdown)
	}

	const getMarkdown = () => {
		const serializer = createMarkdownSerializer(editor.schema)
		return serializer.serialize(editor.state.doc)
	}
})
