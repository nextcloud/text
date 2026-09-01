/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Schema } from '@tiptap/pm/model'

import { Editor } from '@tiptap/vue-3'
import { renderEditorContent } from '../composables/useEditorMethods.ts'
import RichText from '../extensions/RichText.ts'

interface ComparisonEditorOptions {
	ariaLabel?: string
	filePath?: string
	noLazyImages?: boolean
	openLink?: (href: string) => void
	schema?: Schema
}

export function createComparisonEditor(content: string, options: ComparisonEditorOptions = {}) {
	if (typeof content !== 'string') {
		throw new TypeError('Comparison content must be a string')
	}
	const editor = new Editor({
		content: renderEditorContent(content, true),
		editable: false,
		editorProps: options.ariaLabel ? { attributes: { 'aria-label': options.ariaLabel } } : {},
		extensions: [RichText.configure({
			editing: false,
			extensions: [],
			isEmbedded: true,
			noLazyImages: options.noLazyImages ?? false,
			openLink: options.openLink,
			relativePath: options.filePath,
		})],
		onBeforeCreate: ({ editor }) => {
			if (options.schema) {
				editor.schema = options.schema
				editor.extensionManager.schema = options.schema
			}
		},
	})
	return editor
}
