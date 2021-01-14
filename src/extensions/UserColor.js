/*
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
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
import TrackState from './tracking/TrackState'
import { Span } from './tracking/models'

export default class UserColor extends Extension {

	get name() {
		return 'users'
	}

	get defaultOptions() {
		return {
			clientID: 0,
			color: (clientID) => {
				return '#' + Math.floor((Math.abs(Math.sin(clientID) * 16777215)) % 16777215).toString(16) + 'aa'
			},
			name: (clientID) => {
				return 'Unknown user ' + clientID
			},
		}
	}

	get plugins() {
		return [
			new Plugin({
				clientID: this.options.clientID,
				color: this.options.color,
				name: this.options.name,
				state: {
					init(_, instance) {
						return {
							tracked: new TrackState([new Span(0, instance.doc.content.size, null)], [], [], []),
							deco: DecorationSet.empty,
						}
					},
					apply(tr, instance, oldState, state) {
						let { tracked, decos } = instance
						let tState = this.getState(oldState).tracked
						if (tr.docChanged) {
							tracked = tracked.applyTransform(tr)
							const clientID = tr.getMeta('clientID') ? tr.getMeta('clientID') : this.spec.clientID
							tracked = tracked.applyCommit(clientID, new Date(tr.time), {
								clientID,
								color: this.spec.color(clientID),
								name: this.spec.name(clientID),
							})
							tState = tracked
						}
						decos = tState.blameMap
							.filter(span => typeof tState.commits[span.commit]?.author?.color !== 'undefined')
							.map(span => {
								const commit = tState.commits[span.commit]
								const clientID = commit.author.clientID
								return Decoration.inline(span.from, span.to, {
									class: 'author-annotation',
									style: 'background-color: ' + this.spec.color(clientID) + '66;',
									title: this.spec.name(clientID),
								})
							}).filter(dec => dec !== null)
						return { tracked, deco: DecorationSet.create(state.doc, decos) }
					},
				},
				props: {
					decorations(state) {
						return this.getState(state).deco
					},
				},
			}),
		]
	}

}
