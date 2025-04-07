/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { slugify } from './slug.js'

/**
 * Extract heading data structure from doc
 *
 * @param {Document} doc - the prosemirror doc
 * @param {Array} oldVal - the previous headings
 * @return {Array} headings found in the doc
 */
export default function extractHeadings(doc, oldVal = []) {
	const counter = new Map()
	const headings = []

	const getId = (text) => {
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

	doc.descendants((node, offset, _parent, index) => {
		if (node.type.name !== 'heading') {
			return
		}
		const text = node.textContent
		// ignore empty headings
		if (!text) return
		const id = getId(text)
		const old = oldVal.at(index)
		const prev = old?.id === id ? { previous: old.level } : {}
		const heading = Object.freeze({
			level: node.attrs.level,
			text,
			id,
			offset,
			...prev,
		})
		headings.push(heading)
	})

	return headings
}
