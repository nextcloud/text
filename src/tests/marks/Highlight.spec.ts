/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import createCustomEditor from '../testHelpers/createCustomEditor'
import Highlight from './../../marks/Highlight'

describe('Highlight extension unit', () => {
	it('exposes toMarkdown function', () => {
		// @ts-expect-error - toMarkdown is a custom field not part of the official Tiptap API
		const toMarkdown = Highlight.config.toMarkdown
		expect(JSON.stringify(toMarkdown)).to.equal(
			JSON.stringify({
				open: '==',
				close: '==',
				mixable: true,
				expelEnclosingWhitespace: true,
			}),
		)
	})
})

describe('Highlight extension integrated in the editor', () => {
	it('is not active by default', () => {
		const editor = createCustomEditor('<p>Test</p>', [Highlight])
		expect(editor.isActive('highlight')).to.equal(false)
		editor.destroy()
	})

	it('is active within <mark> tags', () => {
		const editor = createCustomEditor('<p><mark>Test</mark></p>', [Highlight])
		expect(editor.isActive('highlight')).to.equal(true)
		editor.destroy()
	})
})
