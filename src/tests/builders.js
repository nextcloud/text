/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect } from '@jest/globals';
import { Mark, Node } from '@tiptap/pm/model'
import { builders } from 'prosemirror-test-builder'
import createEditor from '../EditorFactory'


export function getBuilders() {
	const editor = createEditor({
		content: '',
		enableRichEditing: true
	})
	return builders(editor.schema, {
		tr: { nodeType: 'tableRow' },
		td: { nodeType: 'tableCell' },
		th: { nodeType: 'tableHeader' },
		em: { markType: 'italic' },
		thead: { nodeType: 'tableHeadRow' },
		br: { nodeType: 'hardBreak' },
		p: { nodeType: 'paragraph' },
	})
}

export const p = getBuilders().p
export const br = getBuilders().br
export const em = getBuilders().em
export const tr = getBuilders().tr
export const td = getBuilders().td
export const th = getBuilders().th
export const doc = getBuilders().doc
export const table = getBuilders().table
export const thead = getBuilders().thead

/**
 * Create string representation of prosemirror / TipTap Node with attributes
 * @param {Node} node
 * @returns {string}
 */
function createDocumentString(node) {
	/**
	 * Extract attributes of node or mark
	 * @param {Node|Mark} node
	 * @returns {string}
	 */
	const extractAttributes = (node) => {
		const attrs = node.attrs || {}
		const attrString = Object.keys(attrs)
			.map((key) => {
				// null is the TipTap default so we ignore it (e.g. a value of `unknown` must be manually set by the application)
				if (attrs[key] !== null) {
					return key + '=' + (typeof attrs[key] === 'string' ? `"${attrs[key]}"` : attrs[key])
				}
			})
			.filter(v => !!v)
			.join(',')
		return attrString ? `<${attrString}>` : ''
	}

	/**
	 * Create string representation of a single Node
	 * @param {Node} node
	 * @returns {string}
	 */
	const stringifyNode = (node) => {
		const name = node.type.name
		if (name === 'text') return '"' + node.text.replace('"', '\\"').replace('\n', '\\n') + '"'

		const children = node.content.content.map(createDocumentString)
		return name + extractAttributes(node) + '(' + children.join(',') + ')'
	}

	// First extract marks and place them like nodes in the string
	const marks = node.marks.map(mark => mark.type.name + extractAttributes(mark) + '(')
	return marks.join('') + stringifyNode(node) + ')'.repeat(marks.length)
}

/**
 * Compare given document from editor with builders
 *
 * @param {Node} subject The editor document
 * @param {Node} expected The expected document
 * @example
 * const editor = createEditor()
 * expectDocument(editor.state.doc, table(
 * 	tr(
 * 		td('foo')
 * 	)
 * ))
 */
export function expectDocument(subject, expected) {
	expect(typeof subject).toBe('object')
	expect(typeof expected).toBe('object')
	expect(createDocumentString(subject)).toBe(createDocumentString(doc(expected, p())))
}
