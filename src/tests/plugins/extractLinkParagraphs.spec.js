/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import extractLinkParagraphs from '../../plugins/extractLinkParagraphs.js'
import Link from '../../marks/Link.js'
import { createCustomEditor } from '../helpers.js'

describe('extractLinkParagraphs', () => {
	const link = '<a href="https://nextcloud.com">Link</a>'

	it('returns an empty array for an empty doc', () => {
		const doc = prepareDoc('')
		const paragraphs = extractLinkParagraphs(doc)
		expect(paragraphs).toEqual([])
	})

	it('returns paragraphs with a single link', () => {
		const content = `<p>${link}</p>`
		const doc = prepareDoc(content)
		const paragraphs = extractLinkParagraphs(doc)
		expect(paragraphs).toEqual([
			{ offset: 0 }
		])
	})

	it('returns paragraphs with a single link and whitespace', () => {
		const content = `<p>${link} </p>`
		const doc = prepareDoc(content)
		const paragraphs = extractLinkParagraphs(doc)
		expect(paragraphs).toEqual([
			{ offset: 0 }
		])
	})

	it('returns multiple paragraphs with a single link', () => {
		const paragraph = `<p>${link}</p>`
		const content = paragraph + paragraph
		const doc = prepareDoc(content)
		const paragraphs = extractLinkParagraphs(doc)
		expect(paragraphs).toEqual([
			{ offset: 0 },
			{ offset: 6 }
		])
	})

	it('ignores an empty paragraph', () => {
		const content = '<p></p>'
		const doc = prepareDoc(content)
		const paragraphs = extractLinkParagraphs(doc)
		expect(paragraphs).toEqual([])
	})

	it('ignores paragraphs with text after the link', () => {
		const content = `<p>${link} Hello</p>`
		const doc = prepareDoc(content)
		const paragraphs = extractLinkParagraphs(doc)
		expect(paragraphs).toEqual([])
	})

	it('ignores paragraphs with text before the link', () => {
		const content = `<p>Hello ${link}</p>`
		const doc = prepareDoc(content)
		const paragraphs = extractLinkParagraphs(doc)
		expect(paragraphs).toEqual([])
	})

	it('ignores paragraphs with multiple links', () => {
		const content = `<p>${link} ${link}</p>`
		const doc = prepareDoc(content)
		const paragraphs = extractLinkParagraphs(doc)
		expect(paragraphs).toEqual([])
	})

})

function prepareDoc(content) {
	const editor = createCustomEditor({
		content,
		extensions: [ Link ]
	})
	return editor.state.doc
}
