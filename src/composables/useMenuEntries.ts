/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	getAssistantMenuEntries,
	getMenuEntries,
	outlineEntries,
	readOnlyDoneEntries,
	readOnlyEditEntries,
} from '../components/Menu/entries.ts'
import { useAnnotationsHidden } from './useAnnotationsHidden.ts'
import { useEditor } from './useEditor.ts'
import { useEditorFlags } from './useEditorFlags.ts'

/**
 *
 */
export function useMenuEntries() {
	const { isRichWorkspace } = useEditorFlags()
	const { editor } = useEditor()
	const annotationsHidden = useAnnotationsHidden(editor)

	const assistantMenuEntries = getAssistantMenuEntries()
	const menuEntries = getMenuEntries(isRichWorkspace, annotationsHidden)

	return {
		assistantMenuEntries,
		menuEntries,
		outlineEntries,
		readOnlyDoneEntries,
		readOnlyEditEntries,
	}
}
