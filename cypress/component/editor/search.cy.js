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

		const highlightedElements = document.querySelectorAll('span[data-text-el]')
		expect(highlightedElements.length).to.equal(1)
		verifyHighlights(highlightedElements, searchQuery)
	})

	it('can highlight multiple matches', () => {
		const searchQuery = 'et'
		editor.commands.setSearchQuery(searchQuery)

		const highlightedElements = document.querySelectorAll('span[data-text-el]')
		expect(highlightedElements.length).to.equal(16)
		verifyHighlights(highlightedElements, searchQuery)
	})

	it('can toggle highlight all', () => {
		const searchQuery = 'quod'
		let highlightedElements = []

		// Highlight all occurrences 
		editor.commands.setSearchQuery(searchQuery, true)
		highlightedElements = document.querySelectorAll('span[data-text-el]')

		expect(highlightedElements.length).to.equal(3)
		verifyHighlights(highlightedElements, searchQuery)

		// Highlight only first occurrence
		editor.commands.setSearchQuery(searchQuery, false)
		highlightedElements = document.querySelectorAll('span[data-text-el]')

		expect(highlightedElements.length).to.equal(1)
		verifyHighlights(highlightedElements, searchQuery)
	})
})

function verifyHighlights(highlightedElements, searchQuery) {
	for (const element of highlightedElements) {
		expect(element.innerText.toLowerCase()).to.equal(searchQuery.toLowerCase())
	}
}
