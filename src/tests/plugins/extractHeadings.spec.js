/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import extractHeadings from '../../plugins/extractHeadings.js'
import Heading from '../../nodes/Heading.js'
import { createCustomEditor } from '../helpers.js'

describe('extractHeadings', () => {

	it('returns an empty array for an empty doc', () => {
		const doc = prepareDoc('')
		const headings = extractHeadings(doc)
		expect(headings).toEqual([])
	})

	it('returns headings', () => {
		const content = '<h1>Level 1 heading</h1>'
		const doc = prepareDoc(content)
		const headings = extractHeadings(doc)
		expect(headings).toEqual([{
			id: 'h-level-1-heading',
			level: 1,
			offset: 0,
			text: 'Level 1 heading',
		}])
	})

	it('ignores an empty heading', () => {
		const content = '<h1></h1>'
		const doc = prepareDoc(content)
		const headings = extractHeadings(doc)
		expect(headings).toEqual([])
	})

	it('creates unique ids with a counter', () => {
		const content = `
			<h1>Level 1 heading</h1>
			<h1>Level 1 heading</h1>
			`
		const doc = prepareDoc(content)
		const headings = extractHeadings(doc)
		expect(headings[1].id).toEqual('h-level-1-heading--1')
	})

})

function prepareDoc(content) {
	const editor = createCustomEditor({
		content,
		extensions: [ Heading ]
	})
	return editor.state.doc
}
