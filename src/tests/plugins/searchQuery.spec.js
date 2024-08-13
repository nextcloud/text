/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { searchQuery } from '../../plugins/searchQuery.js'
import { Plugin, EditorState } from '@tiptap/pm/state'
import { schema } from '@tiptap/pm/schema-basic'
import { setSearchQuery, nextMatch, previousMatch } from '../../plugins/searchQuery.js'

describe('searchQuery plugin', () => {
	it('can set up plugin and state', () => {
		const { plugin, state } = pluginSetup()

		expect(plugin).toBeInstanceOf(Plugin)
		expect(state.plugins).toContain(plugin)
	})

	it('has default search query state', () => {
		const { plugin, state } = pluginSetup()
		const defaultState = {
			query: '',
			matchAll: true,
			index: 0,
		}

		expect(plugin.getState(state)).toEqual(defaultState)
	})

	it('can accept new search query state', () => {
		const { plugin, state } = pluginSetup()

		const setSearch = setSearchQuery('lorem')(state)
		let newState = state.apply(setSearch)

		expect(plugin.getState(newState)).toEqual({
			query: 'lorem',
			matchAll: true,
			index: 0,
		})
	})

	it('can accept next match state', () => {
		const { plugin, state } = pluginSetup()

		const setSearch = setSearchQuery('lorem')(state)
		const nextSearch = nextMatch()(state)

		let newState = state.apply(setSearch)

		expect(plugin.getState(newState)).toEqual({
			query: 'lorem',
			matchAll: true,
			index: 0,
		})

		newState = newState.apply(nextSearch)

		expect(plugin.getState(newState)).toEqual({
			query: 'lorem',   // search query should be the same
			matchAll: false,  // matchAll is set to false
			index: 1,         // index is incremented to the next match
		})
	})

	it ('can accept previous match state', () => {
		const { plugin, state } = pluginSetup()

		const setSearch = setSearchQuery('lorem')(state)
		const previousSearch = previousMatch()(state)

		let newState = state.apply(setSearch)

		expect(plugin.getState(newState)).toEqual({
			query: 'lorem',
			matchAll: true,
			index: 0,
		})
		
		newState = newState.apply(previousSearch)

		expect(plugin.getState(newState)).toEqual({
			query: 'lorem',
			matchAll: false,
			index: -1,
		})
	})
})

function pluginSetup() {
	const plugin = new searchQuery()
	const state = EditorState.create({
		schema,
		plugins: [plugin],
	})

	return { plugin, state }
}