/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'

import { onBeforeUnmount, ref } from 'vue'

/**
 * @param editor the Tiptap editor object
 */
export function useAnnotationsHidden(editor: Editor) {
	const hidden = ref(editor.storage.annotationsVisibility?.hidden || false)
	const update = () => {
		hidden.value = editor.storage.annotationsVisibility?.hidden || false
	}
	editor.on('transaction', update)
	onBeforeUnmount(() => editor.off('transaction', update))
	return hidden
}
