/*
 * @copyright Copyright (c) 2023 Jonas <jonas@nextcloud.com>
 *
 * @author Jonas <jonas@nextcloud.com>
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

import * as Y from 'yjs'
import { getDocumentState, getUpdateMessage, applyUpdateMessage } from '../../../src/helpers/yjs.js'

describe('Yjs base64 wrapped with our helpers', function() {
	it('applies step in wrong order', function() {
		const source = new Y.Doc()
		const target = new Y.Doc()
		const sourceMap = source.getMap()
		const targetMap = target.getMap()

		target.on('afterTransaction', (tr, doc) => {
			// console.log('afterTransaction', tr)
		})

		const state0 = getDocumentState(source)

		// Add keyA to source and apply to target
		sourceMap.set('keyA', 'valueA')

		const stateA = getDocumentState(source)
		const update0A = getUpdateMessage(source, state0)
		applyUpdateMessage(target, update0A)
		expect(targetMap.get('keyA')).to.be.eq('valueA')

		// Add keyB to source, don't apply to target yet
		sourceMap.set('keyB', 'valueB')
		const stateB = getDocumentState(source)
		const updateAB = getUpdateMessage(source, stateA)

		// Add keyC to source, apply to target
		sourceMap.set('keyC', 'valueC')
		const updateBC = getUpdateMessage(source, stateB)
		applyUpdateMessage(target, updateBC)
		expect(targetMap.get('keyB')).to.be.eq(undefined)
		expect(targetMap.get('keyC')).to.be.eq(undefined)

		// Apply keyB to target
		applyUpdateMessage(target, updateAB)
		expect(targetMap.get('keyB')).to.be.eq('valueB')
		expect(targetMap.get('keyC')).to.be.eq('valueC')
	})

	it('update message is empty if no additional state exists', function() {
		const source = new Y.Doc()
		const sourceMap = source.getMap()
		const state0 = getDocumentState(source)
		sourceMap.set('keyA', 'valueA')
		const stateA = getDocumentState(source)
		const update0A = getUpdateMessage(source, state0)
		const updateAA = getUpdateMessage(source, stateA)
		expect(update0A.length).to.be.eq(29)
		expect(updateAA).to.be.eq(undefined)
	})

})
