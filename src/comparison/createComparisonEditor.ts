/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Schema } from '@tiptap/pm/model'

import { Editor } from '@tiptap/vue-3'
import { renderEditorContent } from '../composables/useEditorMethods.ts'
import RichText from '../extensions/RichText.ts'
import { registerStateOnlyComparisonEditor } from './comparisonEditorLifecycle.ts'

interface ComparisonEditorOptions {
	filePath?: string
	noLazyImages?: boolean
	openLink?: (href: string) => void
	schema?: Schema
}

/**
 * Create one normalized, immutable Text editor for comparison rendering.
 *
 * @param content Markdown content
 * @param options Rendering options
 */
export function createComparisonEditor(content: string, options: ComparisonEditorOptions = {}) {
	if (typeof content !== 'string') {
		throw new TypeError('Comparison content must be a string')
	}

	const editor = new Editor({
		content: renderEditorContent(content, true),
		editable: false,
		element: null,
		extensions: [
			RichText.configure({
				editing: false,
				emitAttachmentEvents: false,
				extensions: [],
				inferTextDirectionOnParse: true,
				isEmbedded: true,
				keymap: false,
				noLazyImages: options.noLazyImages ?? false,
				openLink: options.openLink,
				relativePath: options.filePath,
				search: false,
			}),
		],
		onBeforeCreate: ({ editor }) => {
			if (options.schema) {
				editor.schema = options.schema
				editor.extensionManager.schema = options.schema
			}
		},
	})
	registerStateOnlyComparisonEditor(editor)
	return editor
}
