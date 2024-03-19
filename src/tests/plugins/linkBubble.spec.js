/**
 * @copyright Copyright (c) 2024 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { linkBubble, setActiveLink, hideLinkBubble } from '../../plugins/links.js'
import { Plugin, EditorState } from '@tiptap/pm/state'
import { schema } from '@tiptap/pm/schema-basic'

describe('linkBubble prosemirror plugin', () => {

	test('signature', () => {
		expect(linkBubble).toBeInstanceOf(Function)
		expect(new linkBubble()).toBeInstanceOf(Plugin)
	})

	test('usage as plugin', () => {
		const plugin = new linkBubble()
		const state = createState({ plugins: [ plugin ] })
		expect(state.plugins).toContain(plugin)
		expect(plugin.getState(state)).toEqual({"active": null})
	})

	test('updates plugin state active on transaction', () => {
		const plugin = new linkBubble()
		const state = createState({ plugins: [ plugin ] })
		const dummy = { was: 'active' }
		const tr = state.tr.setMeta(plugin, { active: dummy })
		const after = state.apply(tr)
		expect(plugin.getState(after)).toEqual({"active": dummy})
	})

	test('setActiveLink requires a link mark', () => {
		const noMarks = { marks: () => [] }
		expect(setActiveLink(noMarks)(null, null)).toBe(false)
		const otherMark = { marks: () => [{type: {name: 'other'}}] }
		expect(setActiveLink(otherMark)(null, null)).toBe(false)
		const mark = { marks: () => [{type: {name: 'link'}}] }
		expect(setActiveLink(mark)(null, null)).toBe(true)
	})

	test('setActiveLink extracts the link mark', () => {
		const plugin = new linkBubble()
		const state = createState({ plugins: [ plugin ] })
		const flow = createFlow(state)
		const mark = { type: { name: 'link' } }
		const resolved = { marks: () => [mark] }
		setActiveLink(resolved)(flow.state, flow.dispatch)
		expect(plugin.getState(flow.state).active.mark)
			.toEqual(mark)
	})

	test('hideLinkBubble requires an active menu bubble', () => {
		const plugin = new linkBubble()
		const state = createState({ plugins: [ plugin ] })
		expect(hideLinkBubble(state, null)).toBe(false)
	})

	test('hideLinkBubble clears the active state', () => {
		const plugin = new linkBubble()
		const state = createState({ plugins: [ plugin ] })
		const flow = createFlow(state)
		const mark = { type: { name: 'link' } }
		const resolved = { marks: () => [mark] }
		setActiveLink(resolved)(flow.state, flow.dispatch)
		hideLinkBubble(flow.state, flow.dispatch)
		expect(plugin.getState(flow.state).active)
			.toEqual(null)
	})

})

// simulate the data flow in prosemirror
function createFlow(initialState) {
	let state = initialState
	return {
		get state() {
			return state
		},
		dispatch: tr => {
			state = state.apply(tr)
		},
	}
}

function createState(options = {}) {
	return EditorState.create({
		schema,
		...options,
	})
}
