/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { subscribe } from '@nextcloud/event-bus'
import { loadState } from '@nextcloud/initial-state'
import type { Editor } from '@tiptap/core'
import { mount } from '@vue/test-utils'
import { beforeEach, expect, test, vi } from 'vitest'
import { nextTick, shallowRef } from 'vue'
import TranslateButton from '../../../components/Menu/TranslateButton.vue'
import { editorKey } from '../../../composables/useEditor'
import Heading from '../../../nodes/Heading.js'
import createCustomEditor from '../../testHelpers/createCustomEditor'

const text = 'Level 1 heading'
const content = `<h1>${text}</h1>`

const createEditor = (content = '') => createCustomEditor(content, [Heading])
const mountWithEditor = (editor: Editor) => {
	return mount(TranslateButton, {
		provide: {
			[editorKey as symbol]: shallowRef(editor),
		},
	})
}

beforeEach(() => {
	vi.mock('@nextcloud/initial-state')
})

test('does not render without state', async () => {
	vi.mocked(loadState).mockReturnValue({ from: [], to: [] })
	const editor = createEditor(content)
	const wrapper = mountWithEditor(editor)
	await nextTick()
	expect(wrapper.find('button').exists()).toBe(false)
})

test('does render with translations', async () => {
	vi.mocked(loadState).mockReturnValue({ from: ['en'], to: ['fr'] })
	const editor = createEditor(content)
	const wrapper = mountWithEditor(editor)
	await nextTick()
	expect(wrapper.find('button').exists()).toBe(true)
})

test('emits the full content when clicked', async () => {
	vi.mocked(loadState).mockReturnValue({ from: ['en'], to: ['fr'] })
	const listen = vi.fn()
	subscribe('text:translate-modal:show', listen)
	const editor = createEditor(content)
	const wrapper = mountWithEditor(editor)
	await nextTick()
	wrapper.find('button').trigger('click')
	await nextTick()
	expect(listen).toHaveBeenCalledWith({ content: text })
})
