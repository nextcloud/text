/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

class Authority {
	constructor(doc) {
		this.doc = doc
		this.steps = []
		this.stepClientIDs = []
		this.onNewSteps = []
	}

	receiveSteps(version, steps, clientID) {
		if (version !== this.steps.length) return

		// Apply and accumulate new steps
		steps.forEach(step => {
			this.doc = step.apply(this.doc).doc
			const stepSerialized = JSON.parse(JSON.stringify(steps))
			this.steps.push(stepSerialized)
			this.stepClientIDs.push(clientID)
		})
		// Signal listeners
		this.onNewSteps.forEach(function(f) { f() })
	}

	stepsSince(version) {
		return {
			steps: this.steps.slice(version),
			clientIDs: this.stepClientIDs.slice(version)
		}
	}
}

export default Authority;
