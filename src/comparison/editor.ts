/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Editor } from '@tiptap/vue-3'
import { useEditorMethods } from '../composables/useEditorMethods.ts'
import RichText from '../extensions/RichText.ts'

interface ComparisonEditorOptions {
	ariaLabel?: string
	filePath?: string
	noLazyImages?: boolean
	openLink?: (href: string) => void
}

/**
 * Create a read-only editor showing one side of a comparison.
 *
 * @param content Markdown content.
 * @param options Accessibility, attachment and link settings.
 */
export function createComparisonEditor(content: string, options: ComparisonEditorOptions = {}) {
	const editor = new Editor({
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
	})
	useEditorMethods(editor).setContent(content, { addToHistory: false })
	return editor
}
