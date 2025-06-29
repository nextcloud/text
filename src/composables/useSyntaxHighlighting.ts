/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Ref } from 'vue'
import { extensionHighlight } from '../helpers/mappings'
import { loadSyntaxHighlight } from '../EditorFactory.js'

/**
 * Determine the language of the file and load the syntax highlighting
 * @param isRichEditor Is the editor a rich editor?
 * @param props Props of the editor component.
 * @param props.relativePath Relative path to the file.
 */
export function useSyntaxHighlighting(
	isRichEditor: Ref<boolean>,
	props: { relativePath: Ref<string> },
) {
	if (isRichEditor.value) {
		return { language: 'md', lowlightLoaded: Promise.resolve() }
	}
	const filename = props.relativePath.value?.split('/').pop()
	const extension = filename?.split('.').pop() ?? 'txt'
	const language = extensionHighlight[extension] || extension
	const lowlightLoaded = loadSyntaxHighlight(language)
	return { language, lowlightLoaded }
}
