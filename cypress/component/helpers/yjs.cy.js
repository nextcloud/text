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
import { getDocumentState, documentStateToStep, applyStep } from '../../../src/helpers/yjs.js'

describe('Yjs base64 wrapped with our helpers', function() {
	it('applies step generated from document state', function() {
		const source = new Y.Doc()
		const target = new Y.Doc()
		const sourceMap = source.getMap()
		const targetMap = target.getMap()

		target.on('afterTransaction', (tr, doc) => {
			// console.log('afterTransaction', tr)
		})

		// Add keyA to source and apply to target
		sourceMap.set('keyA', 'valueA')

		const stateA = getDocumentState(source)
		const step0A = documentStateToStep(stateA)
		applyStep(target, step0A)
		expect(targetMap.get('keyA')).to.be.eq('valueA')

		// Add keyB to source, don't apply to target yet
		sourceMap.set('keyB', 'valueB')
		const stateB = getDocumentState(source)
		const step0B = documentStateToStep(stateB)

		// Add keyC to source, apply to target
		sourceMap.set('keyC', 'valueC')

		// Apply keyB to target
		applyStep(target, step0B)
		expect(targetMap.get('keyB')).to.be.eq('valueB')
		expect(targetMap.get('keyC')).to.be.eq(undefined)
	})

})
