/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapHeading from '@tiptap/extension-heading'
import headingAnchor from '../plugins/headingAnchor.js'

const Heading = TipTapHeading.extend({
	addKeyboardShortcuts() {
		return this.options.levels.reduce(
			(items, level) => ({
				...items,
				[`Mod-Shift-${level}`]: () =>
					this.editor.commands.toggleHeading({ level }),
			}),
			{},
		)
	},

	addProseMirrorPlugins() {
		return [headingAnchor()]
	},
})

export default Heading
