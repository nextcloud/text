/**
 * SPDX-FileCopyrightText: 2021-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Underline from './../../marks/Underline';
import { getExtensionField } from '@tiptap/core'
import { createCustomEditor } from '../helpers'

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
		const editor = createCustomEditor({
			content: '<p>Test</p>',
			extensions: [Underline],
		})
		expect(editor.isActive('underline')).toBe(false)
	})

	it('is active within <u> tags', () => {
		const editor = createCustomEditor({
			content: '<p><u>Test</u></p>',
			extensions: [Underline],
		})
		expect(editor.isActive('underline')).toBe(true)
	})

})
