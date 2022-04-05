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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

const optimalPath = function(from, to) {
	const current = from.split('/')
	const target = to.split('/')
	current.pop() // ignore filename
	while (current[0] === target[0]) {
		current.shift()
		target.shift()
	}
	const relativePath = current.fill('..').concat(target)
	const absolutePath = to.split('/')
	return relativePath.length < absolutePath.length
		? relativePath.join('/')
		: to
}

export {
	optimalPath,
}
