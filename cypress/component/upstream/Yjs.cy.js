/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
