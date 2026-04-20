/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { Heading } from '../composables/useEditorHeadings'
import { slugify } from './slug.js'

/**
 * Extract heading data structure from doc
 *
 * @param doc - the prosemirror doc
 * @return headings found in the doc
 */
export default function extractHeadings(doc: Node) {
	const counter = new Map()
	const headings: Heading[] = []

	const getId = (text: string) => {
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
		const heading = Object.freeze({
			level: node.attrs.level,
			text,
			id,
			offset,
		})
		headings.push(heading)
	})

	return headings
}
