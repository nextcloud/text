/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import store from '../../store/index.js'
import { slugify } from './slug.js'
import { v4 as uuidv4 } from 'uuid'

const setHeadings = (val) => store.dispatch('text/setHeadings', val)

const extractHeadings = (editor) => {
	const counter = new Map()
	const headings = []
	const tr = editor.state.tr

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

	editor.state.doc.descendants((node, position) => {
		if (node.type.name === 'heading') {
			const text = node.textContent
			const id = getId(text)
			const uuid = node.attrs.uuid ?? uuidv4()

			if (node.attrs.id !== id || !node.attrs.uuid) {
				const attrs = {
					...node.attrs,
					uuid,
					id,
				}

				tr.setNodeMarkup(position, undefined, attrs)
			}

			headings.push(Object.freeze({
				level: node.attrs.level,
				position,
				text,
				id,
				uuid,
			}))
		}
	})

	tr.setMeta('addToHistory', false)
	tr.setMeta('preventUpdate', true)

	editor.view.dispatch(tr)

	setHeadings(headings)
}

export {
	extractHeadings,
	setHeadings,
}
