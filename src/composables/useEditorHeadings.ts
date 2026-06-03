/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { InjectionKey, Ref, ShallowRef } from 'vue'

import { emit, subscribe } from '@nextcloud/event-bus'
import { inject, provide, ref, shallowRef } from 'vue'
import { headingAnchorPluginKey } from '../plugins/headingAnchor.js'

export type Heading = {
	id: string
	level: number
	offset: number
	text: string
	previous?: number
}

export const headingsKey = Symbol('text:headings') as InjectionKey<
	ShallowRef<Heading[]>
>
export const displayTocKey = Symbol('text:displaytoc') as InjectionKey<Ref<boolean>>

/**
 *
 * @param editor instance to extract headings from
 */
export function provideEditorHeadings(editor: Editor) {
	const headings = shallowRef<Heading[]>([])
	const displayToc = ref<boolean>(false)

	const updateHeadings = () => {
		headings.value
			= headingAnchorPluginKey.getState(editor.state)?.headings ?? []
	}
	updateHeadings() // Initial sync on setup
	editor.on('update', ({ transaction }) => {
		if (transaction.docChanged) {
			updateHeadings()
		}
	})

	provide(headingsKey, headings)
	provide(displayTocKey, displayToc)
	subscribe('text:toc:toggle', (event) => {
		if (event?.visible !== undefined) {
			displayToc.value = event.visible
		} else {
			displayToc.value = !displayToc.value
		}
		emit('text:toc:toggled', displayToc.value)
	})

	return { displayToc, headings, updateHeadings }
}

/**
 *
 */
export function useEditorHeadings() {
	const headings = inject(headingsKey)
	const displayToc = inject(displayTocKey)
	return { displayToc, headings }
}
