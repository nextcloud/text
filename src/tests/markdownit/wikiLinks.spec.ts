/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit/index.js'

describe('wiki image links (markdown-it)', () => {
	it('renders a standalone wiki image as a figure', () => {
		expect(markdownit.render('![[Pasted image.png]]')).to.equal(
			'<figure><img src="Pasted image.png" alt="Pasted image.png" data-wiki-image="true" /></figure>\n',
		)
	})

	it('renders an inline wiki image inside a paragraph', () => {
		expect(markdownit.render('text ![[test.png]] more text')).to.equal(
			'<p>text <img src="test.png" alt="test.png" data-wiki-image="true" /> more text</p>\n',
		)
	})

	it('renders a wiki image after a paragraph', () => {
		expect(markdownit.render('Hello\n\n![[test.png]]')).to.equal(
			'<p>Hello</p>\n<figure><img src="test.png" alt="test.png" data-wiki-image="true" /></figure>\n',
		)
	})

	it('does not match an empty wiki image ![[]]', () => {
		expect(markdownit.render('![[]]')).not.to.contain('data-wiki-image')
	})

	it('does not match a partial opening ![[', () => {
		expect(markdownit.render('![[no closing')).not.to.contain('data-wiki-image')
	})

	it('does not match a wiki image with a newline in the filename', () => {
		expect(markdownit.render('![[foo\nbar]]')).not.to.contain('data-wiki-image')
	})
})
