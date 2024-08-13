/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import Search from '../../../src/extensions/Search.js'
import Paragraph from '../../../src/nodes/Paragraph.js'
import HardBreak from '../../../src/nodes/HardBreak.js'

describe('editor search highlighting', () => {
	let editor = null

	before(() => {
		cy.fixture('lorem.txt').then((text) => {
			editor = new Editor({
				element: document.querySelector('div[data-cy-root]'),
				content: text,
				extensions: [Document, Text, Search, Paragraph, HardBreak],
			})
		})
	})

	it('can highlight a match', () => {
		const searchQuery = 'Lorem ipsum dolor sit amet'
		editor.commands.setSearchQuery(searchQuery)

		const highlightedElements = document.querySelectorAll('span[data-text-el="search-decoration"]')
		expect(highlightedElements).to.have.lengthOf(1)
		verifyHighlights(highlightedElements, searchQuery)
	})

	it('can highlight multiple matches', () => {
		const searchQuery = 'quod'
		editor.commands.setSearchQuery(searchQuery)

		const highlightedElements = document.querySelectorAll('span[data-text-el="search-decoration"]')
		expect(highlightedElements).to.have.lengthOf(3)
		verifyHighlights(highlightedElements, searchQuery)
	})

	it('can toggle highlight all', () => {
		const searchQuery = 'quod'
		let highlightedElements = []

		// Highlight only first occurrence
		editor.commands.setSearchQuery(searchQuery, false)
		highlightedElements = document.querySelectorAll('span[data-text-el="search-decoration"]')

		expect(highlightedElements).to.have.lengthOf(1)
		verifyHighlights(highlightedElements, searchQuery)
	})

	it('can move to next occurrence', () => {
		const searchQuery = 'quod'

		editor.commands.setSearchQuery(searchQuery, true)
		const allHighlightedElements = document.querySelectorAll('span[data-text-el="search-decoration"]')

		editor.commands.nextMatch()
		const currentlyHighlightedElement = document.querySelectorAll('span[data-text-el="search-decoration"]')

		expect(currentlyHighlightedElement).to.have.lengthOf(1)
		expect(allHighlightedElements[1]).to.deep.equal(currentlyHighlightedElement[0])
	})

	it('can move to previous occurrence', () => {
		const searchQuery = 'quod'

		editor.commands.setSearchQuery(searchQuery, true)
		const allHighlightedElements = document.querySelectorAll('span[data-text-el="search-decoration"]')

		editor.commands.previousMatch()
		const currentlyHighlightedElement = document.querySelectorAll('span[data-text-el="search-decoration"]')

		expect(currentlyHighlightedElement).to.have.lengthOf(1)
		expect(allHighlightedElements[0]).to.deep.equal(currentlyHighlightedElement[0])
	})
})

/**
 * Verifies the Nodes in the given NodeList match the search query
 * @param {NodeList} highlightedElements - NodeList of highlighted elements
 * @param {string} searchQuery - search query
 */
function verifyHighlights(highlightedElements, searchQuery) {
	for (const element of highlightedElements) {
		expect(element.innerText.toLowerCase()).to.equal(searchQuery.toLowerCase())
	}
}
