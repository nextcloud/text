/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { shallowRef, type ShallowRef } from 'vue'
import TocContainer from '../../../components/Editor/TableOfContents/TocContainer.vue'
import { editorKey } from '../../../composables/useEditor'
import {
	displayTocKey,
	headingsKey,
	provideEditorHeadings,
	type Heading as HeadingType,
} from '../../../composables/useEditorHeadings'
import Heading from '../../../nodes/Heading.js'
import createCustomEditor from '../../testHelpers/createCustomEditor'

interface TocContainerInstance {
	headings: ShallowRef<HeadingType[]>
	displayToc: ShallowRef<boolean>
	isMobile: ShallowRef<boolean>
	intersectionObserver: IntersectionObserver | null
	disconnectIntersectionObserver: () => void
}

const text1 = 'Level 1 heading'
const text2 = 'Level 2 heading'
const content = `<h1>${text1}</h1>\n<h2>${text2}</h2>`
const headingsForContent = [
	{ id: 'h-level-1-heading', level: 1, offset: 0, text: text1 },
	{ id: 'h-level-2-heading', level: 2, offset: 17, text: text2 },
]

const createEditor = (content = '') => createCustomEditor(content, [Heading])
const mountWithEditor = (editor: Editor, displayToc = false) => {
	const { headings, displayToc: displayTocRef } = provideEditorHeadings(editor)
	displayTocRef.value = displayToc

	return mount(TocContainer, {
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
	expect(wrapper.text()).toEqual('')
	expect((wrapper.vm as unknown as TocContainerInstance).headings).toEqual([])
	editor.destroy()
})

test('renders nothing for editor with just one heading', () => {
	const editor = createEditor('# Heading 1')
	const wrapper = mountWithEditor(editor)
	expect(wrapper.find('[data-text-el="editor-outline"]').exists()).toBe(false)
	expect(wrapper.text()).toEqual('')
	editor.destroy()
})

test('renders outline with two headings', async () => {
	const editor = createEditor(content)
	const wrapper = mountWithEditor(editor)
	expect(wrapper.find('[data-text-el="editor-outline"]').exists()).toBe(true)
	expect((wrapper.vm as unknown as TocContainerInstance).headings).toEqual(
		headingsForContent,
	)
	editor.destroy()
})

test('displays table of contents when displayToc is true', async () => {
	const editor = createEditor(content)
	const wrapper = mountWithEditor(editor, true)
	expect(wrapper.text()).toContain(text1)
	expect(wrapper.text()).toContain(text2)
	expect((wrapper.vm as unknown as TocContainerInstance).headings).toEqual(
		headingsForContent,
	)
	editor.destroy()
})

test('updates according to editor changes', async () => {
	const editor = createEditor()
	const wrapper = mountWithEditor(editor)
	expect((wrapper.vm as unknown as TocContainerInstance).headings).toEqual([])
	editor.commands.insertContent(content)
	expect((wrapper.vm as unknown as TocContainerInstance).headings).toEqual(
		headingsForContent,
	)
	editor.destroy()
})
