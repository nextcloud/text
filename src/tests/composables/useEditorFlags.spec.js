/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent } from 'vue'
import {
	provideEditorFlags,
	useEditorFlags,
} from '../../composables/useEditorFlags.ts'

const ChildComponent = defineComponent({
	template:
		'<span id="child-flags">{{ { isPublic, isRichEditor, isRichWorkspace } }}</span>',
	setup() {
		const { isPublic, isRichEditor, isRichWorkspace } = useEditorFlags()
		return { isPublic, isRichEditor, isRichWorkspace }
	},
})

const ParentComponent = defineComponent({
	template:
		'<div><span id="flags">{{ { isPublic, isRichEditor, isRichWorkspace } }}</span><slot /></div>',
	props: ['isDirectEditing', 'richWorkspace', 'mime'],
	setup(props) {
		const { isPublic, isRichEditor, isRichWorkspace } = provideEditorFlags(props)
		return { isPublic, isRichEditor, isRichWorkspace }
	},
})

test('provides and injects editor flags', () => {
	const wrapper = mount(ParentComponent, {
		propsData: { isDirectEditing: true },
		slots: { default: ChildComponent },
	})
	const parentFlags = JSON.parse(wrapper.get('#flags').text())
	const childFlags = JSON.parse(wrapper.get('#child-flags').text())
	expect(parentFlags).toEqual({
		isPublic: true,
		isRichEditor: false,
		isRichWorkspace: false,
	})
	expect(childFlags).toEqual(parentFlags)
})
