/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'

let ownPaused = false

const toggleFocusTrap = ({ editor }) => {
	const trapStack = window._nc_focus_trap ?? []
	const activeTrap = trapStack[trapStack.length - 1]

	const possibleEditorTabCommand = editor.can().sinkListItem('listItem')
		|| editor.can().goToNextCell()
		|| editor.can().goToPreviousCell()

	if (possibleEditorTabCommand) {
		activeTrap?.pause()
		ownPaused = true
	} else {
		if (ownPaused) {
			ownPaused = false
			activeTrap?.unpause()
		}
	}
}

const unpauseFocusTrap = ({ editor }) => {
	const trapStack = window._nc_focus_trap ?? []
	const activeTrap = trapStack[trapStack.length - 1]

	activeTrap?.unpause()
}

/**
 * The viewer focus trap needs to be paused on the fly in order to properly handle tab commands in the editor,
 * as we have no control over if a tab key event is reaching the editor otherwise. This is because the focus trap
 * registeres a capture listener (https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#capture), so whenever we reach a tab command in the editor the focus trap will already have captured the event.
 *
 * We also cannot work around this by pushing our own focus trap to the stack, as the focus trap package does not offer any reliable way to programmatically focus the next element of the parent trap if we allow tabbing out of the editor.
 */
const FocusTrap = Extension.create({
	name: 'focustrap',
	onFocus: toggleFocusTrap,
	onBlur: unpauseFocusTrap,
	onSelectionUpdate: toggleFocusTrap,
	onTransaction: toggleFocusTrap,
	onUpdate: toggleFocusTrap,
})

export default FocusTrap
