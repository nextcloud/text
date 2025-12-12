/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed } from 'vue'
import {
	getAssistantMenuEntries,
	getMenuEntries,
	getOutlineEntries,
	readOnlyDoneEntries,
	readOnlyEditEntries,
} from '../components/Menu/entries'
import { useEditorFlags } from './useEditorFlags'
import { useEditorHeadings } from './useEditorHeadings'

export const useMenuEntries = () => {
	const { displayToc } = useEditorHeadings()
	const { isRichWorkspace } = useEditorFlags()

	const assistantMenuEntries = getAssistantMenuEntries()
	const menuEntries = computed(() =>
		getMenuEntries(displayToc?.value ?? false, isRichWorkspace),
	)
	const outlineEntries = computed(() =>
		getOutlineEntries(displayToc?.value ?? false),
	)

	return {
		assistantMenuEntries,
		menuEntries,
		outlineEntries,
		readOnlyDoneEntries,
		readOnlyEditEntries,
	}
}
