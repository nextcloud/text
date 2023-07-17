/*
 * @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import { Extension } from '@tiptap/core'

export default Extension.create({
	addOptions() {
		return {
			fileId: null,
		}
	},
	addStorage() {
		return {
			started: false,
		}
	},
	onCreate() {
		if (this.options.fileId === null) {
			throw new Error('fileId needs to be provided')
		}
		this.storage.started = true
	},
	onSelectionUpdate({ editor }) {
		if (!this.storage.started) {
			return
		}

		const pos = editor.state.selection.$anchor.pos
		sessionStorage.setItem('text-lastPos-' + this.options.fileId, pos)
	},
	addCommands() {
		return {
			autofocus: () => ({ commands, editor }) => {
				const pos = sessionStorage.getItem('text-lastPos-' + this.options.fileId)
				if (pos) {
					return commands.focus(pos)
				}

				return commands.focus('start')
			},
		}
	},
})
