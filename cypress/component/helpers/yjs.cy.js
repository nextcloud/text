/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
