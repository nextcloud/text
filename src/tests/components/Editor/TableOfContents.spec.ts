/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import { shallowMount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { nextTick, shallowRef } from 'vue'
import TableOfContents from '../../../components/Editor/TableOfContents/TableOfContents.vue'
import TocContainer from '../../../components/Editor/TableOfContents/TocContainer.vue'
import TocOutline from '../../../components/Editor/TableOfContents/TocOutline.vue'
import { editorKey } from '../../../composables/useEditor'
import {
	displayTocKey,
	headingsKey,
	provideEditorHeadings,
} from '../../../composables/useEditorHeadings'
import Heading from '../../../nodes/Heading.js'
import createCustomEditor from '../../testHelpers/createCustomEditor'

const text1 = 'Level 1 heading'
const text2 = 'Level 2 heading'
const content = `<h1>${text1}</h1>\n<h2>${text2}</h2>`

const createEditor = (content = '') => createCustomEditor(content, [Heading])
const mountWithEditor = (editor: Editor, displayToc = false) => {
	const { headings, displayToc: displayTocRef } = provideEditorHeadings(editor)
	displayTocRef.value = displayToc

	return shallowMount(TocContainer, {
		provide: {
			[editorKey as symbol]: shallowRef(editor),
			[displayTocKey as symbol]: displayTocRef,
			[headingsKey as symbol]: headings,
		},
	})
}

test('renders nothing for editor without headings', () => {
	const editor = createEditor('no heading here')
	const wrapper = mountWithEditor(editor)
	expect(wrapper.findComponent(TocOutline).exists()).toBe(false)
	expect(wrapper.text()).toEqual('')
	editor.destroy()
})

test('renders nothing for editor with just one heading', () => {
	const editor = createEditor('# Heading 1')
	const wrapper = mountWithEditor(editor)
	expect(wrapper.findComponent(TocOutline).exists()).toBe(false)
	expect(wrapper.text()).toEqual('')
	editor.destroy()
})

test('renders outline with two headings', async () => {
	const editor = createEditor(content)
	const wrapper = mountWithEditor(editor)
	expect(wrapper.findComponent(TocOutline).exists()).toBe(true)
	expect(wrapper.text()).toEqual('')
	editor.destroy()
})

test('displays table of contents when displayToc is true', async () => {
	const editor = createEditor(content)
	const wrapper = mountWithEditor(editor, true)
	expect(wrapper.findComponent(TocOutline).exists()).toBe(false)
	expect(wrapper.findComponent(TableOfContents).exists()).toBe(true)
	editor.destroy()
})

test('updates according to editor changes', async () => {
	const editor = createEditor()
	const wrapper = mountWithEditor(editor)
	editor.commands.insertContent(content)
	await nextTick()
	expect(wrapper.findComponent(TocOutline).exists()).toBe(true)
	editor.destroy()
})
