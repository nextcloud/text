/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import TrackState from './tracking/TrackState.js'
import { Span } from './tracking/models.js'

const UserColor = Extension.create({

	name: 'users',

	addOptions() {
		return {
			clientID: 0,
			color: (clientID) => {
				return '#' + Math.floor((Math.abs(Math.sin(clientID) * 16777215)) % 16777215).toString(16) + 'aa'
			},
			name: (clientID) => {
				return 'Unknown user ' + clientID
			},
		}
	},

	addProseMirrorPlugins() {
		let viewReference = null
		return [
			new Plugin({
				clientID: this.options.clientID,
				color: this.options.color,
				name: this.options.name,
				view: (editorView) => {
					viewReference = editorView
					return {}
				},
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
							if (!tr.getMeta('clientID')) {
								// we have an undefined client id for own transactions
								tr.setMeta('clientID', tr.steps.map(i => this.spec.clientID))
							}
							// Don't apply transaction when in composition (Github issue #2871)
							if (!viewReference.composing) {
								tracked = tracked.applyTransform(tr)
								tState = tracked
							}
						}
						decos = tState.blameMap
							.map(span => {
								const clientID = span.author
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
	},

})

export default UserColor
