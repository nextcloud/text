/**
 * @copyright Copyright (c) 2024 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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

import { isLinkToSelfWithHash } from '../helpers/links.js'

/**
 * Get the link mark applied at the current selection or next to it.
 *
 * @param {object} state the prosemirror state
 * @param {object} state.selection - the current selection
 * @param {object} state.doc - the current doc
 */
export function activeLinkFromSelection({ selection, doc }) {
	// support for CellSelections
	const { ranges } = selection
	const from = Math.min(...ranges.map(range => range.$from.pos))
	const to = Math.max(...ranges.map(range => range.$to.pos))

	const resolved = doc.resolve(from)

	// ignore links in previews
	if (resolved.parent.type.name === 'preview') {
		return false
	}

	const node = resolved.parent.maybeChild(resolved.index())
	const nodeStart = resolved.pos - resolved.textOffset
	const nodeEnd = nodeStart + node?.nodeSize
	if (to > nodeEnd) {
		// Selection spans further than one text node
		return null
	}
	const active = activeLink(node, nodeStart)
	if (active) {
		return active
	}
	const nodeBefore = resolved.nodeBefore
	if (nodeBefore) {
		return activeLink(nodeBefore, nodeStart - nodeBefore.nodeSize)
	}
	return null
}

/**
 * Active link object for the given node and nodeStart
 * @param {object} node - node to check
 * @param {number} nodeStart - offset in the document
 */
function activeLink(node, nodeStart) {
	const mark = linkMark(node)
	return mark ? { mark, nodeStart } : null
}

/**
 * Get the link mark for the given node
 * @param {object} node - node to check
 */
function linkMark(node) {
	const linkMark = node?.marks.find(m => m.type.name === 'link')
	if (!linkMark) {
		return undefined
	}
	// Don't open link bubble for anchor links
	if (isLinkToSelfWithHash(linkMark.attrs.href)) {
		return undefined
	} else {
		return linkMark
	}
}
