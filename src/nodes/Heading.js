/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapHeading from '@tiptap/extension-heading'
import headingAnchor, { headingAnchorPluginKey } from '../plugins/headingAnchor.js'
import store from '../store/index.js'

const setHeadings = (val) => store.dispatch('text/setHeadings', val)

const Heading = TipTapHeading.extend({

	addKeyboardShortcuts() {
		return this.options.levels.reduce((items, level) => ({
			...items,
			[`Mod-Shift-${level}`]: () => this.editor.commands.toggleHeading({ level }),
		}), {})
	},

	// sync heading data structure to the vuex store
	onUpdate({ editor }) {
		const headings = headingAnchorPluginKey
			.getState(editor.state)?.headings ?? []
		setHeadings(headings)
	},

	addProseMirrorPlugins() {
		return [headingAnchor()]
	},

})

export default Heading
