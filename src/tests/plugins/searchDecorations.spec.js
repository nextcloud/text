/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { highlightResults, runSearch } from '../../plugins/searchDecorations.js'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

describe('search plugin', () => {
	it('finds no matches in empty document', () => {
		const expected = {
			results: [],
			total: 0,
			index: 0,
		}

		testSearch('', 'hello', expected)
	})

	it('finds no matches for empty search query', () => {
		const expected = {
			results: [],
			total: 0,
			index: 0,
		}

		testSearch('<p>Hallo Welt</p>', '', expected)
	})

	it('finds matches regardless of case', () => {
		const expected = {
			results: [
				{ from: 1, to: 5 },
				{ from: 23, to: 27 },
				{ from: 37, to: 41 },
			],
			total: 3,
			index: 0,
		}

		testSearch(
			'<p>CATS birds crocodiles cats platypus CAts</p>',
			'cAtS',
			expected,
		)
	})

	it('finds matches in one block', () => {
		const expected = {
			results: [
				{ from: 1, to: 4 },
				{ from: 23, to: 26 },
			],
			total: 2,
			index: 0,
		}

		testSearch('<p>cat dinosaur bird dog cat</p>', 'cat', expected)
	})

	it('finds matches in separate blocks', () => {
		const doc =
			'<p>cat dinosaur bird dog cat</p>'
			+ '<p>dinosaur cat bird <i>dinosaur cat</i></p>'

		const expected = {
			results: [
				{ from: 1, to: 4 },
				{ from: 23, to: 26 },
				{ from: 37, to: 40 },
				{ from: 55, to: 58 },
			],
			total: 5,
			index: 0,
		}

		testSearch(doc, 'cat', expected)
	})
})

const testSearch = (content, query, expectedSearchResults) => {
	const doc = createCustomEditor(content).state.doc
	const searched = runSearch(doc, query)
	expect(searched).toHaveProperty('results', expectedSearchResults.results)
	expect(highlightResults(doc, searched.results)).toEqual(
		highlightResults(doc, expectedSearchResults.results),
	)
}
