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

import { applyUpdate, Doc, encodeStateAsUpdate, encodeStateVector } from 'yjs'

describe('Yjs', function() {
	// Only tests that Yjs allows to apply steps in wrong order
	it('applies step in wrong order', function() {
		const source = new Doc()
		const target = new Doc()
		const sourceMap = source.getMap()
		const targetMap = target.getMap()

		target.on('afterTransaction', (tr, doc) => {
			// console.log('afterTransaction', tr)
		})

		// Add keyA to source and apply to target
		sourceMap.set('keyA', 'valueA')
		const update0A = encodeStateAsUpdate(source)
		const sourceVectorA = encodeStateVector(source)
		applyUpdate(target, update0A)
		expect(targetMap.get('keyA')).to.be.eq('valueA')

		// Add keyB to source, don't apply to target yet
		sourceMap.set('keyB', 'valueB')
		const updateAB = encodeStateAsUpdate(source, sourceVectorA)
		const sourceVectorB = encodeStateVector(source)

		// Add keyC to source, apply to target
		sourceMap.set('keyC', 'valueC')
		const updateBC = encodeStateAsUpdate(source, sourceVectorB)
		applyUpdate(target, updateBC)
		expect(targetMap.get('keyB')).to.be.eq(undefined)
		expect(targetMap.get('keyC')).to.be.eq(undefined)

		// Apply keyB to target
		applyUpdate(target, updateAB)
		expect(targetMap.get('keyB')).to.be.eq('valueB')
		expect(targetMap.get('keyC')).to.be.eq('valueC')
	})
})
