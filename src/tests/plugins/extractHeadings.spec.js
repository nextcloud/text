/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import extractHeadings from '../../plugins/extractHeadings.js'
import Heading from '../../nodes/Heading.js'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

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

	it('includes previous level', () => {
		const before = prepareDoc('<h1>heading 1->3</h1>')
		const previousHeadings = extractHeadings(before)
		const after = prepareDoc('<h3>heading 1->3</h3>')
		const headings = extractHeadings(after, previousHeadings)
		expect(headings).toEqual([{
			id: 'h-heading-1-3',
			level: 3,
			offset: 0,
			previous: 1,
			text: 'heading 1->3',
		}])
	})

})

const prepareDoc = (content) => {
	const editor = createCustomEditor(content, [Heading])
	return editor.state.doc
}
