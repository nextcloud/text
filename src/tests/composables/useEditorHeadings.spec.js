/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import {
	provideEditorHeadings,
	useEditorHeadings,
} from '../../composables/useEditorHeadings.ts'
import Heading from '../../nodes/Heading.js'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

const ChildComponent = defineComponent({
	template: '<span id="child">{{ { headings, displayToc } }}</span>',
	setup() {
		const { headings, displayToc } = useEditorHeadings()
		return { headings, displayToc }
	},
})

const ParentComponent = defineComponent({
	template: '<div><slot /></div>',
	props: ['editor'],
	setup(props) {
		const { headings, displayToc } = provideEditorHeadings(props.editor)
		return { headings, displayToc }
	},
})

const createWrapper = (editor) =>
	mount(ParentComponent, {
		propsData: { editor },
		slots: { default: ChildComponent },
	})

const text1 = 'Level 1 heading'
const text2 = 'Level 2 heading'
const content = `<h1>${text1}</h1>\n<h2>${text2}</h2>`
const headingsForContent = [
	{ id: 'h-level-1-heading', level: 1, offset: 0, text: text1 },
	{ id: 'h-level-2-heading', level: 2, offset: 17, text: text2 },
]

test('provides and injects empty headings', async () => {
	const editor = createCustomEditor('', [Heading])
	const wrapper = createWrapper(editor)
	expect(wrapper.vm.headings).toEqual([])
	const injected = JSON.parse(wrapper.get('#child').text())
	expect(injected.headings).toEqual([])
	editor.destroy()
})

test('updates headings', async () => {
	const editor = createCustomEditor('', [Heading])
	const wrapper = createWrapper(editor)
	editor.commands.insertContent(content)
	await nextTick()
	const injected = JSON.parse(wrapper.get('#child').text())
	expect(wrapper.vm.headings).toEqual(headingsForContent)
	expect(injected.headings).toEqual(headingsForContent)
	editor.destroy()
})
