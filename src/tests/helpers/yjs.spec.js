/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import * as Y from 'yjs'
import {
	getDocumentState,
	applyDocumentState,
	getUpdateMessage,
	applyUpdateMessage,
	canApplyUpdateMessage,
	stateVectorToMap,
} from '../../helpers/yjs.js'

describe('handling document state', () => {

	test('emtpy doc creates deterministic state', () => {
		const doc = new Y.Doc()
		const state = getDocumentState(doc)
		expect(state).toBe('AAA=')
	})

	test('Changes are reflected in the state', () => {
		const doc = new Y.Doc()
		const ymap = doc.getMap('map')
		ymap.set('food', 'yummy')
		const state = getDocumentState(doc)
		expect(state).not.toBe('AAA=')
	})

	test('Document state can be applied to another ydoc', () => {
		const source = new Y.Doc()
		const target = new Y.Doc()
		const smap = source.getMap('map')
		smap.set('food', 'yummy')
		const state = getDocumentState(source)
		applyDocumentState(target, state, 'test')
		const tmap = target.getMap('map')
		expect(tmap.get('food')).toBe('yummy')
	})

})

describe('using update messages', () => {

	test('no update message without updates', () => {
		const doc = new Y.Doc()
		const state = getDocumentState(doc)
		const empty = getUpdateMessage(doc, state)
		expect(empty).toBe(undefined)
	})

	test('update message is a Uint8Array with content', () => {
		const doc = new Y.Doc()
		const state = getDocumentState(doc)
		const ymap = doc.getMap('map')
		ymap.set('food', 'yummy')
		const update = getUpdateMessage(doc, state)
		expect(update).toBeInstanceOf(Uint8Array)
		expect(update.length).toBeGreaterThan(20)
	})

	test('update message can be applied', () => {
		const source = new Y.Doc()
		const target = new Y.Doc()
		const state = getDocumentState(source)
		const smap = source.getMap('map')
		smap.set('food', 'yummy')
		const update = getUpdateMessage(source, state)
		applyUpdateMessage(target, update)
		const tmap = target.getMap('map')
		expect(tmap.get('food')).toBe('yummy')
	})

	test('update message cannot be applied if state is too old', () => {
		const source = new Y.Doc()
		const target = new Y.Doc()
		const smap = source.getMap('map')
		smap.set('food', 'yummy')
		const state = getDocumentState(source)
		smap.set('drinks', 'yummy')
		const update = getUpdateMessage(source, state)
		applyUpdateMessage(target, update)
		const tmap = target.getMap('map')
		expect(tmap.get('food')).toBe(undefined)
		expect(tmap.get('drinks')).toBe(undefined)
	})

	test.skip('check if update can be applied', () => {
		const source = new Y.Doc()
		const target = new Y.Doc()
		const smap = source.getMap('map')
		smap.set('food', 'yummy')
		const state = getDocumentState(source)
		smap.set('drinks', 'yummy')
		const update = getUpdateMessage(source, state)
		expect(canApplyUpdateMessage(target, update)).toBe(false)
	})

})

describe('handling state vectors', () => {

	test('empty state vector converts to empty map', () => {
		const ydoc = new Y.Doc()
		const docStateVector = Y.encodeStateVector(ydoc)
		const stateMap = stateVectorToMap(docStateVector)
		expect(stateMap).toBeInstanceOf(Map)
		expect(stateMap.size).toBe(0)
	})

	test('state vector with one client converts to map with one entry', () => {
		const ydoc = new Y.Doc()
		const ymap = ydoc.getMap('map')
		ymap.set('food', 'yummy')
		const docStateVector = Y.encodeStateVector(ydoc)
		const stateMap = stateVectorToMap(docStateVector)
		expect(stateMap).toBeInstanceOf(Map)
		expect(stateMap.size).toBe(1)
		const key = stateMap.keys().next().value
		expect(stateMap.get(key)).toBe(1)
	})

	test('clocks are reflected in the state vector map', () => {
		const ydoc = new Y.Doc()
		const ymap = ydoc.getMap('map')
		ymap.set('food', 'yummy')
		ymap.set('drinks', 'yummy')
		ymap.set('desert', 'yummy')
		const docStateVector = Y.encodeStateVector(ydoc)
		const stateMap = stateVectorToMap(docStateVector)
		const key = stateMap.keys().next().value
		expect(stateMap.get(key)).toBe(3)
	})

	test('multiple clients are reflected in the state vector map', () => {
		const source = new Y.Doc()
		const target = new Y.Doc()
		const smap = source.getMap('map')
		smap.set('food', 'yummy')
		const state = getDocumentState(source)
		applyDocumentState(target, state, 'test')
		const tmap = target.getMap('map')
		tmap.set('drinks', 'yummy')
		const docStateVector = Y.encodeStateVector(target)
		const stateMap = stateVectorToMap(docStateVector)
		expect(stateMap.size).toBe(2)
		const key = stateMap.keys().next().value
		expect(stateMap.get(key)).toBe(1)
		const secondKey = stateMap.keys().next().value
		expect(stateMap.get(secondKey)).toBe(1)
	})

	test('clocks are reflected in the state vector map', () => {
		const docStateVector = new Uint8Array([1, 2, 3]) // size: 1, {2: 3}
		const stateMap = stateVectorToMap(docStateVector)
		expect(stateMap.size).toBe(1)
		const key = stateMap.keys().next().value
		expect(key).toBe(2)
		expect(stateMap.get(key)).toBe(3)
	})

})
