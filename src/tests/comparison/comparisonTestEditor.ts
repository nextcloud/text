/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'

export function createComparisonTestEditor(content: string) {
	return createComparisonEditor(content, { noLazyImages: true })
}

export function comparisonTestDocument(content: string) {
	const editor = createComparisonEditor(content, { noLazyImages: true })
	try {
		return editor.state.doc
	} finally {
		editor.destroy()
	}
}
