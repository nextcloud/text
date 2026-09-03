/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { PluginKey, Plugin as ProseMirrorPlugin } from '@tiptap/pm/state'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import ComparisonEditorContent from '../../components/ComparisonEditorContent.vue'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'

describe('comparison editor lifecycle boundary', () => {
	it('mounts the detached editor with its comparison plugin and node views', async () => {
		const editor = createComparisonEditor('::: info\nBefore\n:::')
		const plugin = new ProseMirrorPlugin({ key: new PluginKey('comparison') })
		const wrapper = mount(ComparisonEditorContent, { props: { editor, plugins: [plugin] } })
		try {
			await vi.waitFor(() => expect(wrapper.emitted('ready')).toHaveLength(1))
			const content = wrapper.get('.text-comparison__content')
			expect(editor.view.dom.parentElement).toBe(content.element)
			expect(content.find('[data-node-view-wrapper][data-text-el="callout"]').exists()).toBe(true)
			expect(plugin.spec.key?.get(editor.state)).toBeDefined()
		} finally {
			wrapper.unmount()
			editor.destroy()
		}
	})
})
