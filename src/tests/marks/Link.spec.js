/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import Link from './../../marks/Link.js'
import Underline from '../../marks/Underline.js'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

describe('Link extension integrated in the editor', () => {
	it('should have link available in commands', () => {
		const editor = createCustomEditor('<p><a href="nextcloud.com">Test</a> HELLO WORLD</p>', [Link])
		expect(editor.commands).toHaveProperty('insertOrSetLink')
	})

	it('should update link if anchor has mark', () => {
		const editor = createCustomEditor(
			'<p><a href="nextcloud.com">Te<u>s</u>t</a> HELLO WORLD</p>',
			[Link, Underline],
		)
		editor.commands.setTextSelection(3)
		editor.commands.insertOrSetLink('updated.de', { href: 'updated.de' })
		expect(editor.getJSON()).toMatchSnapshot()
	})

	it('Should only update link the anchor is on', () => {
		const editor = createCustomEditor(
			'<p><a href="nextcloud.com">Test</a><a href="not-nextcloud.com">second link</a></p>',
			[Link],
		)
		editor.commands.setTextSelection(3)
		editor.commands.insertOrSetLink('updated.de', { href: 'updated.de' })
		expect(editor.getJSON()).toMatchSnapshot()
	})

	it('should insert new link if none at anchor', () => {
		const editor = createCustomEditor(
			'<p><a href="nextcloud.com">Test</a> HELLO WORLD</p>',
			[Link],
		)
		editor.commands.setTextSelection(10)
		editor.commands.insertOrSetLink('new link', { href: 'https://nextcloud.com' })
		expect(editor.getJSON()).toMatchSnapshot()
	})
})
