/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'

type AnnotationsVisibilityStorage = {
	hidden: boolean
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		annotationsVisibility: {
			toggleAnnotationsVisibility: () => ReturnType
		}
	}
	interface Storage {
		annotationsVisibility: AnnotationsVisibilityStorage
	}
}

const AnnotationsVisibility = Extension.create({
	name: 'annotationsVisibility',

	addStorage(): AnnotationsVisibilityStorage {
		return {
			hidden: false,
		}
	},

	addCommands() {
		return {
			toggleAnnotationsVisibility: () => ({ tr, dispatch }) => {
				if (dispatch) {
					// Storage is not part of the ProseMirror doc, so mutating it does not
					// iself trigger a transaction. Dispatch an empty tr so subscribers re-read
					// storage and refresh their reactive views.
					this.storage.hidden = !this.storage.hidden
					tr.setMeta('addToHistory', false)
					dispatch(tr)
				}
				return true
			},
		}
	},
})

export default AnnotationsVisibility
