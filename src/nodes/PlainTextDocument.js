/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Node } from '@tiptap/core'

export default Node.create({
	name: 'doc',
	content: 'block',
	addKeyboardShortcuts() {
		return {
			Tab: () => this.editor.commands.insertContent('\t'),
		}
	},

})
