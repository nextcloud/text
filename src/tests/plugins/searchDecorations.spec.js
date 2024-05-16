import { runSearch, highlightResults } from '../../plugins/searchDecorations.js'
import { createCustomEditor } from '../helpers.js'

describe('search plugin', () => {
	it('finds no matches in empty document', () => {
		testSearch(
			'',
			'hello',
			[],
		)
	})

	it('finds no matches for empty search query', () => {
		testSearch(
			'<p>Hallo Welt</p>',
			'',
			[],
		)
	})

	it('finds matches regardless of case', () => {
		testSearch(
			'<p>CATS birds crocodiles cats platypus CAts</p>',
			'cAtS',
			[
				{ from: 1, to: 5 },
				{ from: 23, to: 27 },
				{ from: 37, to: 41 },
			]
		)
	})

	it('finds matches in one block', () => {
		testSearch(
			'<p>cat dinosaur bird dog cat</p>',
			'cat',
			[
				{ from: 1, to: 4 },
				{ from: 23, to: 26 }
			],
		)
	})

	it('finds matches in separate blocks', () => {
		const doc = '<p>cat dinosaur bird dog cat</p>' +
					'<p>dinosaur cat bird <i>dinosaur cat</i></p>'

		testSearch(
			doc,
			'cat',
			[
				{ from: 1, to: 4 },
				{ from: 23, to: 26 },
				{ from: 37, to: 40 },
				{ from: 55, to: 58 }
			],
		)
	})
})

function testSearch(doc, query, expectedSearchResults) {
	const editor = createCustomEditor({
		content: doc,
		extensions: [],
	})

	const searchResults = {
		expected: expectedSearchResults,
		actual: runSearch(editor.state.doc, query),
	}

	const decorationResults = {
		expected: highlightResults(editor.state.doc, searchResults.expected),
		actual: highlightResults(editor.state.doc, searchResults.actual),
	}


	expect(searchResults.actual).toEqual(searchResults.expected)
	expect(decorationResults.actual).toEqual(decorationResults.expected)
}
