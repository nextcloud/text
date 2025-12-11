/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { useEditorFlags } from './useEditorFlags'
import { useEditorHeadings } from './useEditorHeadings'
import {
	getAssistantMenuEntries,
	getMenuEntries,
	getOutlineEntries,
	readOnlyDoneEntries,
	readOnlyEditEntries,
} from '../components/Menu/entries'

export const useMenuEntries = () => {
	const { displayToc } = useEditorHeadings()
	const { isRichWorkspace } = useEditorFlags()

	const assistantMenuEntries = getAssistantMenuEntries()
	const menuEntries = getMenuEntries(displayToc?.value ?? false, isRichWorkspace)
	const outlineEntries = getOutlineEntries(displayToc?.value ?? false)

	return {
		assistantMenuEntries,
		menuEntries,
		outlineEntries,
		readOnlyDoneEntries,
		readOnlyEditEntries,
	}
}
