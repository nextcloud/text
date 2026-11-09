/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { EditorState, Plugin, TextSelection } from '@tiptap/pm/state'
import { schema } from 'prosemirror-schema-basic'
import { hideLinkBubble, linkBubble, linkBubbleKey, setActiveLink } from '../../plugins/links.ts'

describe('linkBubble prosemirror plugin', () => {
	test('signature', () => {
		expect(linkBubble).toBeInstanceOf(Function)
		expect(linkBubble()).toBeInstanceOf(Plugin)
	})

	test('usage as plugin', () => {
		const plugin = linkBubble()
		const state = createState({ plugins: [plugin] })
		expect(state.plugins).toContain(plugin)
		expect(plugin.getState(state)).toEqual({ active: null, focusInput: false })
	})

	test('updates plugin state active on transaction', () => {
		const plugin = linkBubble()
		const state = createState({ plugins: [plugin] })
		const dummy = { was: 'active' }
		const tr = state.tr.setMeta(plugin, { active: dummy })
		const after = state.apply(tr)
		expect(plugin.getState(after)).toEqual({ active: dummy, focusInput: false })
	})

	test('setActiveLink requires a link mark', () => {
		const noMarks = { marks: () => [] }
		expect(setActiveLink(noMarks)(null, null)).toBe(false)
		const otherMark = { marks: () => [{ type: { name: 'other' } }] }
		expect(setActiveLink(otherMark)(null, null)).toBe(false)
		const mark = { marks: () => [{ type: { name: 'link' } }] }
		expect(setActiveLink(mark)(null, null)).toBe(true)
	})

	test('setActiveLink extracts the link mark', () => {
		const plugin = linkBubble()
		const state = createState({ plugins: [plugin] })
		const flow = createFlow(state)
		const mark = { type: { name: 'link' } }
		const resolved = { marks: () => [mark] }
		setActiveLink(resolved)(flow.state, flow.dispatch)
		expect(plugin.getState(flow.state).active.mark).toEqual(mark)
	})

	test('hideLinkBubble requires an active menu bubble', () => {
		const plugin = linkBubble()
		const state = createState({ plugins: [plugin] })
		expect(hideLinkBubble(state, null)).toBe(false)
	})

	test('hideLinkBubble clears the active state', () => {
		const plugin = linkBubble()
		const state = createState({ plugins: [plugin] })
		const flow = createFlow(state)
		const mark = { type: { name: 'link' } }
		const resolved = { marks: () => [mark] }
		setActiveLink(resolved)(flow.state, flow.dispatch)
		hideLinkBubble(flow.state, flow.dispatch)
		expect(plugin.getState(flow.state).active).toEqual(null)
	})
})

describe('linkBubble state derived from selection', () => {
	const linkMark = schema.marks.link.create({ href: 'https://example.org' })
	const doc = schema.node('doc', null, [
		schema.node('paragraph', null, [
			schema.text('foo '),
			schema.text('link', [linkMark]),
		]),
	])

	const createLinkState = () => createState({ doc, plugins: [linkBubble()] })
	const select = (state, pos) => state.apply(state.tr.setSelection(TextSelection.create(state.doc, pos)))
	const active = (state) => linkBubbleKey.getState(state).active

	test('sets active link when selection moves into a link', () => {
		const state = select(createLinkState(), 7)
		expect(active(state)).toEqual({ mark: linkMark, nodeStart: 5 })
	})

	test('clears active link when selection moves out of a link', () => {
		const state = select(select(createLinkState(), 7), 2)
		expect(active(state)).toBe(null)
	})

	test('keeps explicit state if selection and doc are unchanged', () => {
		const state = select(createLinkState(), 7)
		const hidden = state.apply(state.tr.setMeta(linkBubbleKey, { active: null }))
		const after = hidden.apply(hidden.tr.setMeta('foo', 'bar'))
		expect(active(after)).toBe(null)
	})

	test('keeps explicit state on remote changes', () => {
		const state = select(createLinkState(), 7)
		const hidden = state.apply(state.tr.setMeta(linkBubbleKey, { active: null }))
		const remote = hidden.tr.insertText('!', hidden.doc.content.size - 1)
			.setMeta('addToHistory', false)
		expect(active(hidden.apply(remote))).toBe(null)
	})

	test('updates active link on local changes', () => {
		const state = select(createLinkState(), 7)
		const hidden = state.apply(state.tr.setMeta(linkBubbleKey, { active: null }))
		const after = hidden.apply(hidden.tr.insertText('x', 7))
		expect(active(after)?.mark.eq(linkMark)).toBe(true)
	})

	test('explicit state takes precedence over selection', () => {
		const state = createLinkState()
		const tr = state.tr.setSelection(TextSelection.create(state.doc, 7))
			.setMeta(linkBubbleKey, { active: null, focusInput: true })
		expect(linkBubbleKey.getState(state.apply(tr))).toEqual({ active: null, focusInput: true })
	})

	test('does not open bubble on editor initialisation', () => {
		const state = createState({ plugins: [linkBubble()] })
		const tr = state.tr.replaceWith(0, state.doc.content.size, doc.content)
		tr.setSelection(TextSelection.create(tr.doc, 7))
		expect(active(state.apply(tr))).toBe(null)
	})
})

// simulate the data flow in prosemirror
function createFlow(initialState) {
	let state = initialState
	return {
		get state() {
			return state
		},
		dispatch: (tr) => {
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
