/*
 * @copyright Copyright (c) 2021 Julius Härtl <jus@bitgrid.net>
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
 *
 */

import { Collaboration as TiptapCollaboration } from 'tiptap-extensions'
import { sendableSteps } from 'prosemirror-collab'
export default class Collaboration extends TiptapCollaboration {

	init() {
		this.getSendableSteps = this.debounce(({ state, transaction }) => {
			const sendable = sendableSteps(state)
			if (sendable || transaction.selectionSet) {
				const selection = {
					from: transaction.selection.from,
					to: transaction.selection.to,
				}
				this.options.onSendable({
					editor: this.editor,
					sendable: {
						version: sendable.version,
						steps: sendable.steps.map(step => step.toJSON()),
						clientID: sendable.clientID,
						selection,
					},
				})
			}
		}, this.options.debounce)

		this.editor.on('transaction', ({ state, transaction }) => {
			this.getSendableSteps({ state, transaction })
		})
	}

}
