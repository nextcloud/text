/**
 * @copyright Copyright (c) 2020 Azul <azul@riseup.net>
 *
 * @author Azul <azul@riseup.net>
 *
 * @license AGPL-3.0-or-later
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

import { loadState } from '@nextcloud/initial-state'
import { generateUrl } from '@nextcloud/router'

const domHref = function(node, relativePath) {
	const ref = node.attrs.href
	if (!ref) {
		return ref
	}
	if (!window.OCA?.Viewer) {
		return ref
	}
	if (ref.match(/^[a-zA-Z]*:/)) {
		return ref
	}
	if (ref.startsWith('#')) {
		return ref
	}
	// Don't rewrite links in collectives app context
	if (loadState('core', 'active-app') === 'collectives') {
		return ref
	}
	// Don't rewrite links to the collectives app
	if (ref.includes('/apps/collectives/')) {
		return ref
	}

	// Rewrite links with old format from file picker to `/f/<fileId>`
	const match = ref.match(/^([^?]*)\?fileId=(\d+)/)
	if (match) {
		const [, , id] = match
		return (new URL(generateUrl(`/f/${id}`), window.origin)).href
	}
	return ref
}

const parseHref = function(dom) {
	const ref = dom.getAttribute('href')
	if (!ref) {
		return ref
	}
	const match = ref.match(/\?dir=([^&]*)&openfile=([^&]*)#relPath=([^&]*)/)
	if (match) {
		const [, , id] = match
		return (new URL(generateUrl(`/f/${id}`), window.origin)).href
	}
	return ref
}

export {
	domHref,
	parseHref,
}
