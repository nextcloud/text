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

const contrastRatio = (value) => {
	const hexCode = value.charAt(0) === '#'
		? value.substr(1, 6)
		: value

	const hexR = parseInt(hexCode.substr(0, 2), 16)
	const hexG = parseInt(hexCode.substr(2, 2), 16)
	const hexB = parseInt(hexCode.substr(4, 2), 16)
	return (hexR + hexG + hexB) / (255 * 3)
}
function updateBlameMap(map, transform, id) {
	const result = []; const mapping = transform.mapping
	for (let i = 0; i < map.length; i++) {
		const span = map[i]
		const from = mapping.map(span.from, 1); const to = mapping.map(span.to, -1)
		if (from < to) result.push(new Span(from, to, span.commit))
	}

	for (let i = 0; i < mapping.maps.length; i++) {
		const map = mapping.maps[i]; const after = mapping.slice(i + 1)
		map.forEach((_s, _e, start, end) => {
			insertIntoBlameMap(result, after.map(start, 1), after.map(end, -1), id)
		})
	}

	return result
}

function insertIntoBlameMap(map, from, to, commit) {
	if (from >= to) {
		return
	}
	let pos = 0
	let next
	for (; pos < map.length; pos++) {
		next = map[pos]
		if (next.commit === commit) {
			if (next.to >= from) break
		} else if (next.to > from) { // Different commit, not before
			if (next.from < from) { // Sticks out to the left (loop below will handle right side)
				const left = new Span(next.from, from, next.commit)
				if (next.to > to) map.splice(pos++, 0, left)
				else map[pos++] = left
			}
			break
		}
	}

	// eslint-ignore
	while ((next = map[pos])) {
		if (next.commit === commit) {
			if (next.from > to) break
			from = Math.min(from, next.from)
			to = Math.max(to, next.to)
			map.splice(pos, 1)
		} else {
			if (next.from >= to) break
			if (next.to > to) {
				map[pos] = new Span(to, next.to, next.commit)
				break
			} else {
				map.splice(pos, 1)
			}
		}
	}

	map.splice(pos, 0, new Span(from, to, commit))
}

class TrackState {

	constructor(blameMap, commits, uncommittedSteps, uncommittedMaps) {
		// The blame map is a data structure that lists a sequence of
		// document ranges, along with the commit that inserted them. This
		// can be used to, for example, highlight the part of the document
		// that was inserted by a commit.
		this.blameMap = blameMap
		// The commit history, as an array of objects.
		this.commits = commits
		// Inverted steps and their maps corresponding to the changes that
		// have been made since the last commit.
		this.uncommittedSteps = uncommittedSteps
		this.uncommittedMaps = uncommittedMaps
	}

	// Apply a transform to this state
	applyTransform(transform) {
		// Invert the steps in the transaction, to be able to save them in
		// the next commit
		const inverted
			= transform.steps.map((step, i) => step.invert(transform.docs[i]))
		const newBlame = updateBlameMap(this.blameMap, transform, this.commits.length)
		// Create a new state—since these are part of the editor state, a
		// persistent data structure, they must not be mutated.
		return new TrackState(newBlame, this.commits,
			this.uncommittedSteps.concat(inverted),
			this.uncommittedMaps.concat(transform.mapping.maps))
	}

	// When a transaction is marked as a commit, this is used to put any
	// uncommitted steps into a new commit.
	applyCommit(message, time, author) {
		if (this.uncommittedSteps.length === 0) return this
		const commit = new Commit(message, time, this.uncommittedSteps, this.uncommittedMaps, author)
		return new TrackState(this.blameMap, this.commits.concat(commit), [], [])
	}

}

class Span {

	constructor(from, to, commit) {
		this.from = from; this.to = to; this.commit = commit
	}

}

class Commit {

	constructor(message, time, steps, maps, author) {
		this.message = message
		this.time = time
		this.steps = steps
		this.maps = maps
		this.author = author
	}

}

class UserColor extends Extension {

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
				return null
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
							.filter(span => typeof tState.commits[span.commit] !== 'undefined')
							.map(span => {
								const commit = tState.commits[span.commit]
								return Decoration.inline(span.from, span.to, {
									class: 'author-annotation',
									style: 'background-color: ' + commit.author.color + '; color:' + (contrastRatio(commit.author.color) > 0.4 ? '#fff' : '#000'),
									title: commit.author.name,
								})
							})
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

export default UserColor
