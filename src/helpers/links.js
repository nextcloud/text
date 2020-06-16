/*
 * @copyright Copyright (c) 2020 Azul <azul@riseup.net>
 *
 * @author Azul <azul@riseup.net>
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

const domHref = function(node) {
	const ref = node.attrs.href
	if (!ref) {
		return ref
	}
	if (ref.match(/^[a-zA-Z]*:/)) {
		return ref
	}
	const match = ref.match(/^([^?]*)\?fileId=(\d*)/)
	if (match) {
		const [, path, id] = match
		const dir = OC.Util.History.parseUrlQuery().dir
		return `?dir=${dir}&openfile=${id}&relPath=${path}`
	}
}

const parseHref = function(dom) {
	const ref = dom.getAttribute('href')
	if (!ref) {
		return ref
	}
	const match = ref.match(/^\?dir=([^&]*)&openfile=([^&]*)&relPath=([^&]*)/)
	if (match) {
		const [, , id, path] = match
		return `${path}?fileId=${id}`
	}
	return ref
}

export {
	domHref,
	parseHref,
}
