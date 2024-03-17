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

import { linkBubble } from '../../plugins/links.js'
import { Plugin, EditorState } from '@tiptap/pm/state'
import { schema } from '@tiptap/pm/schema-basic'

describe('linkBubble prosemirror plugin', () => {

	test('signature', () => {
		expect(linkBubble).toBeInstanceOf(Function)
		expect(new linkBubble('key')).toBeInstanceOf(Plugin)
	})

	test('usage as plugin', () => {
		const plugin = new linkBubble('linkBubble')
		const state = createState({ plugins: [ plugin ] })
		expect(state.plugins).toContain(plugin)
		expect(plugin.getState(state)).toEqual({"clicked": null})
	})

	test('updates plugin state clicked on transaction', () => {
		const plugin = new linkBubble('linkBubble')
		const state = createState({ plugins: [ plugin ] })
		const dummy = { was: 'clicked' }
		const tr = state.tr.setMeta(plugin, { clicked: dummy })
		const after = state.apply(tr)
		expect(plugin.getState(after)).toEqual({"clicked": dummy})
	})

})

function createState(options = {}) {
	return EditorState.create({
		schema,
		...options,
	})
}
