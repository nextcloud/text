/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { nextTick, shallowRef } from 'vue'
import { mount } from '@vue/test-utils'
import TableOfContents from '../../../components/Editor/TableOfContents.vue'
import { editorKey } from '../../../composables/useEditor.ts'
import createCustomEditor from '../../testHelpers/createCustomEditor.ts'
import Heading from '../../../nodes/Heading.js'
import { test, vi } from 'vitest'

const text = 'Level 1 heading'
const content = `<h1>${text}</h1>`
const headingsForContent = [
	{ id: 'h-level-1-heading', level: 1, offset: 0, text },
]

const createEditor = (content = '') => createCustomEditor(content, [Heading])
const mountWithEditor = (editor) => {
	return mount(TableOfContents, {
		provide: { [editorKey]: shallowRef(editor) },
	})
}

test('renders nothing for editor without headings', () => {
	const editor = createEditor('no heading here')
	const wrapper = mountWithEditor(editor)
	expect(wrapper.text()).toEqual('')
	expect(wrapper.vm.headings).toEqual([])
})

test('renders initial heading', async () => {
	const editor = createEditor(content)
	const wrapper = mountWithEditor(editor)
	await nextTick()
	expect(wrapper.text()).toEqual(text)
	expect(wrapper.vm.headings).toEqual(headingsForContent)
})

test('updates according to editor changes', async () => {
	const editor = createEditor()
	const wrapper = mountWithEditor(editor)
	await nextTick()
	editor.commands.insertContent(content)
	await nextTick()
	expect(wrapper.text()).toEqual(text)
	expect(wrapper.vm.headings).toEqual(headingsForContent)
})

test('disconnects on destroy', async () => {
	const editor = { on: vi.fn(), off: vi.fn(), state: {} }
	const wrapper = mountWithEditor(editor)
	expect(editor.on).toHaveBeenCalledWith('update', expect.any(Function))
	wrapper.destroy()
	expect(editor.off).toHaveBeenCalledWith('update', expect.any(Function))
})
