/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { afterAll, describe, expect, it } from 'vitest'
import Search from '../../extensions/Search'
import HardBreak from '../../nodes/HardBreak.js'
import { searchDecorationsPluginKey } from '../../plugins/searchDecorations.js'
import lorem from '../fixtures/lorem.txt?raw'
import createCustomEditor from '../testHelpers/createCustomEditor'

describe('editor search highlighting', () => {
	const editor = createCustomEditor(lorem, [Search, HardBreak])

	afterAll(() => {
		editor.destroy()
	})

	it('can highlight a match', () => {
		const searchQuery = 'Lorem'
		editor.commands.setSearchQuery(searchQuery)
		const decorationSet = searchDecorationsPluginKey.getState(editor.state)
		expect(decorationSet.find().length).toBe(1)
		for (const decoration of decorationSet.find()) {
			const content = editor.state.doc.textBetween(
				decoration.from,
				decoration.to,
			)
			expect(content.toLowerCase()).to.equal(searchQuery.toLowerCase())
		}
	})

	it('can highlight multiple matches', () => {
		const searchQuery = 'quod'
		editor.commands.setSearchQuery(searchQuery)
		const decorationSet = searchDecorationsPluginKey.getState(editor.state)
		expect(decorationSet.find().length).toBe(3)
		for (const decoration of decorationSet.find()) {
			const content = editor.state.doc.textBetween(
				decoration.from,
				decoration.to,
			)
			expect(content.toLowerCase()).to.equal(searchQuery.toLowerCase())
		}
	})

	it('can toggle highlight all', () => {
		const searchQuery = 'quod'
		editor.commands.setSearchQuery(searchQuery, false)
		const decorationSet = searchDecorationsPluginKey.getState(editor.state)
		expect(decorationSet.find().length).toBe(1)
	})

	it('can move to next occurrence', () => {
		const searchQuery = 'quod'
		editor.commands.setSearchQuery(searchQuery, true)
		editor.commands.nextMatch()
		const decorationSet = searchDecorationsPluginKey.getState(editor.state)
		expect(decorationSet.find().length).toBe(1)
	})

	it('can move to previous occurrence', () => {
		const searchQuery = 'quod'
		editor.commands.setSearchQuery(searchQuery, true)
		editor.commands.previousMatch()
		const decorationSet = searchDecorationsPluginKey.getState(editor.state)
		expect(decorationSet.find().length).toBe(1)
	})
})
