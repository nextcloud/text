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

import { Extension, Plugin } from 'tiptap'
import { Decoration, DecorationSet } from 'prosemirror-view'

export default class Cursors extends Extension {

	get name() {
		return 'cursors'
	}

	get defaultOptions() {
		return {
			update: sessions => {
				const { tr } = this.editor.state
				const transaction = tr
					.setMeta('selections', sessions
						.filter(({ cursor, lastContact }) => cursor !== -1 && lastContact > (Math.floor(Date.now() / 1000 - 60)))
						.map((session) => ({ ...session, clientID: session.id, from: session.cursor, to: session.cursor })))
					.setMeta('addToHistory', false)

				this.editor.view.dispatch(transaction)
			},
			color: (clientID) => {
				return '#' + Math.floor((Math.abs(Math.sin(clientID) * 16777215)) % 16777215).toString(16) + 'aa'
			},
			name: (clientID) => {
				return 'Unknown user ' + clientID
			},
		}
	}

	getDecorations({ doc, selections, transaction }) {
		const ownClientID = this.editor.extensions.options.collaboration.clientID
		const ownCursor = selections.find(selection => selection.clientID === ownClientID)
		const decorations = selections
			.filter(selection => {
				return selection.clientID !== ownClientID
			})
			.map(selection => {
				let newFrom = selection.from
				if (transaction.mapping.from === transaction.mapping.to) {
					return selection
				}

				if (selection.from > transaction.mapping.from) {
					newFrom += transaction.mapping.to - transaction.mapping.from +1
				}

				return {
					...selection,
					from: newFrom,
					to: newFrom,
				}
			})
			.map(selection => {
				const { from, clientID } = selection
				let cursorclass = 'author-tooltip'
				if (clientID === ownClientID) {
					cursorclass += ' me'
				}
				const span = document.createElement('span')
				span.className = 'prosemirror-cursor'
				span.title = (this.options ? this.options.name(clientID) : 'none')
				span.style.setProperty('--background', this.options ? this.options.color(clientID) : '')
				const tooltip = document.createElement('span')
				tooltip.innerText = span.title
				tooltip.className = cursorclass
				span.appendChild(tooltip)
				// add class for recent ones to always show tehm while typing
				return Decoration.widget(from, span)
			})

		return DecorationSet.create(doc, decorations)
	}

	get plugins() {
		return [
			new Plugin({
				color: this.options.color,
				name: this.options.name,
				state: {
					init: (_, { doc }) => this.getDecorations({ doc, selections: [] }),
					apply: (transaction, decorationSet) => {
						const { mapping, doc } = transaction
						const selections = transaction.getMeta('selections')

						if (selections) {
							return this.getDecorations({ doc, selections, transaction })
						}

						return decorationSet.map(mapping, doc)
					},
				},
				props: {
					decorations(state) {
						return this.getState(state)
					},
				},
			}),
		]
	}

}
