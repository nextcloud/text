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

	it('can highlight a search', () => {
		const searchQuery = 'Lorem ipsum dolor sit amet'
		editor.commands.setSearchQuery(searchQuery)

		const highlightedElement = document.querySelector('span[data-text-el]')
		expect(highlightedElement.innerText).to.equal(searchQuery)
	})
})
