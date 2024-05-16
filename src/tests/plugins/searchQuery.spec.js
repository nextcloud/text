import { searchQuery } from '../../plugins/searchQuery.js'
import { Plugin, EditorState } from '@tiptap/pm/state'
import { schema } from '@tiptap/pm/schema-basic'
import { setSearchQuery } from '../../plugins/searchQuery.js'

describe('searchQuery plugin', () => {
	it('can set up plugin and state', () => {
		const { plugin, state } = pluginSetup()

		expect(plugin).toBeInstanceOf(Plugin)
		expect(state.plugins).toContain(plugin)
	})

	it('has default search query state of empty string', () => {
		const { plugin, state } = pluginSetup()

		expect(plugin.getState(state)).toEqual({ query: '' })
	})

	it('can accept new search query state', () => {
		const { plugin, state } = pluginSetup()

		const tr = setSearchQuery('lorem')(state)
		const newState = state.apply(tr)

		expect(plugin.getState(newState)).toEqual({ query: 'lorem' })
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