import { createCustomEditor } from '../../support/components.js'
import Search from '../../../src/extensions/Search.js'

describe('editor search highlighting', () => {
	const editor = createCustomEditor({
		content: 'lorem ipsum',
		extensions: [Search],
	})

	before(() => {
		editor.setOptions({
			element: document.querySelector('div[data-cy-root]')
		})
	})

	beforeEach(() => editor.createView())

	it('can highlight a search', () => {
		editor.commands.setSearchQuery('lorem')

		const highlightElements = document.querySelector('span[data-text-el]')

		expect(highlightElements)
	})
})