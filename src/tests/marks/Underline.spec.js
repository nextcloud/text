/**
 * SPDX-FileCopyrightText: 2021-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Underline from './../../marks/Underline.js'
import { getExtensionField } from '@tiptap/core'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

describe('Underline extension unit', () => {
	it('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(Underline, 'toMarkdown', Underline)
		expect(toMarkdown).toEqual({
			open: '__',
			close: '__',
			mixable: true,
			expelEnclosingWhitespace: true,
		})
	})
})

describe('Underline extension integrated in the editor', () => {

	it('is not active by default', () => {
		const editor = createCustomEditor('<p>Test</p>', [Underline])
		expect(editor.isActive('underline')).toBe(false)
	})

	it('is active within <u> tags', () => {
		const editor = createCustomEditor('<p><u>Test</u></p>', [Underline])
		expect(editor.isActive('underline')).toBe(true)
	})

})
