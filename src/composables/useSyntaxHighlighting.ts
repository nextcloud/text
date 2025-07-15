/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { loadSyntaxHighlight } from '../EditorFactory.js'
import { extensionHighlight } from '../helpers/mappings'

/**
 * Determine the language of the file and load the syntax highlighting
 * @param isRichEditor Is the editor a rich editor?
 * @param props Props of the editor component.
 * @param props.relativePath Relative path to the file.
 */
export function useSyntaxHighlighting(
	isRichEditor: boolean,
	props: { relativePath: string },
) {
	if (isRichEditor) {
		return { language: 'md', lowlightLoaded: Promise.resolve() }
	}
	const filename = props.relativePath.split('/').pop()
	const extension = filename?.split('.').pop() ?? 'txt'
	const language = extensionHighlight[extension] || extension
	const lowlightLoaded = loadSyntaxHighlight(language)
	return { language, lowlightLoaded }
}
