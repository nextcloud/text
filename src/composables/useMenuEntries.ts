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
import { useEditorFlags } from './useEditorFlags.ts'

/**
 *
 */
export function useMenuEntries() {
	const { isRichWorkspace } = useEditorFlags()

	const assistantMenuEntries = getAssistantMenuEntries()
	const menuEntries = getMenuEntries(isRichWorkspace)

	return {
		assistantMenuEntries,
		menuEntries,
		outlineEntries,
		readOnlyDoneEntries,
		readOnlyEditEntries,
	}
}
