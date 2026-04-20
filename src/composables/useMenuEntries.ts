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
} from '../components/Menu/entries'
import { useEditorFlags } from './useEditorFlags'

export const useMenuEntries = () => {
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
