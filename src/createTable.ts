/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { TextEditorEmbed } from './TextEditorEmbed.ts'

import { createApp, defineAsyncComponent, h, reactive, useTemplateRef } from 'vue'
import { TextEditorEmbedBuilder } from './TextEditorEmbed.ts'

interface CreateTableOptions {
	/**
	 * Element to render the editor to
	 */
	el: HTMLElement
	content?: string
	readOnly?: boolean
	onCreate?: ({ markdown }: { markdown: string }) => void
	onLoaded?: () => void
	onUpdate?: ({ markdown }: { markdown: string }) => void
}

/**
 * Create an editable table
 *
 * Currently used by the whiteboard app.
 *
 * @param options Options for the created table
 */
export function createTable(options: CreateTableOptions): TextEditorEmbed {
	const PlainTableContentEditor = defineAsyncComponent(() => import('./components/Editor/PlainTableContentEditor.vue'))
	const data = reactive({
		content: options.content ?? '',
		readOnly: options.readOnly ?? false,
	})

	const vm = createApp({
		setup() {
			const editorContainer = useTemplateRef('editor-container')
			defineExpose(editorContainer)
			return () => h(PlainTableContentEditor, {
				ref: 'editor-container',
				content: data.content,
				readOnly: data.readOnly,
				onReady: options.onLoaded ?? (() => { }),
				'onCreate:content': options.onCreate ?? (() => { }),
				'onUpdate:content': options.onUpdate ?? (() => { }),
			})
		},
	})

	return new TextEditorEmbedBuilder(vm)
		.render(options.el, data)
}
