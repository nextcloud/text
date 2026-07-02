/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Mark, Node } from '@tiptap/pm/model'

/**
 * Create string representation of prosemirror / TipTap Node with attributes
 * @param node to serialize
 */
export function createDocumentString(node: Node) {
	const extractAttributes = (node: Node | Mark) => {
		const attrs = node.attrs || {}
		const attrString = Object.keys(attrs)
			.map((key) => {
				// null is the TipTap default so we ignore it (e.g. a value of `unknown` must be manually set by the application)
				return attrs[key] === null
					? undefined
					: key
						+ '='
						+ (typeof attrs[key] === 'string'
							? `"${attrs[key]}"`
							: attrs[key])
			})
			.filter((v) => !!v)
			.join(',')
		return attrString ? `<${attrString}>` : ''
	}

	const stringifyNode = (node: Node) => {
		const name = node.type.name
		if (name === 'text') {
			const text = node.text ?? ''
			return `"${text.replace('"', '\\"').replace('\n', '\\n')}"`
		}

		const children: string[] = node.content.content.map(createDocumentString)
		return name + extractAttributes(node) + '(' + children.join(',') + ')'
	}

	// First extract marks and place them like nodes in the string
	const marks = node.marks.map((mark) => mark.type.name + extractAttributes(mark) + '(')
	return marks.join('') + stringifyNode(node) + ')'.repeat(marks.length)
}
