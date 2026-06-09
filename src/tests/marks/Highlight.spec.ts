/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'
import Highlight from './../../marks/Highlight.ts'

describe('Highlight extension unit', () => {
	it('exposes toMarkdown function', () => {
		const toMarkdown = Highlight.config.toMarkdown
		expect(JSON.stringify(toMarkdown)).to.equal(JSON.stringify({
			open: '==',
			close: '==',
			mixable: true,
			expelEnclosingWhitespace: true,
		}))
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
