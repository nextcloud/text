/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { slugify } from './slug.js'

/**
 * Extract heading data structure from doc
 *
 * @param {Document} doc - the prosemirror doc
 * @return {Array} headings found in the doc
 */
export default function extractHeadings(doc) {
	const counter = new Map()
	const headings = []

	const getId = text => {
		const id = slugify(text)
		if (counter.has(id)) {
			const next = counter.get(id)
			// increment counter
			counter.set(id, next + 1)
			return `h-${id}--${next}`
		}
		// define counter
		counter.set(id, 1)
		return 'h-' + id
	}

	doc.descendants((node, offset) => {
		if (node.type.name !== 'heading') {
			return
		}
		const text = node.textContent
		// ignore empty headings
		if (!text) return
		const id = getId(text)
		headings.push(Object.freeze({
			level: node.attrs.level,
			text,
			id,
			offset,
		}))
	})

	return headings
}
