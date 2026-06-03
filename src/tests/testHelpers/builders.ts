/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Mark, Node } from '@tiptap/pm/model'

import { builders } from 'prosemirror-test-builder'
import { expect } from 'vitest'
import { createRichEditor } from '../../EditorFactory.ts'

/**
 * Get node builders from the default rich editor.
 */
export function getBuilders() {
	const editor = createRichEditor()
	const nodeBuilders = builders(editor.schema, {
		tr: { nodeType: 'tableRow' },
		td: { nodeType: 'tableCell' },
		th: { nodeType: 'tableHeader' },
		em: { markType: 'italic' },
		thead: { nodeType: 'tableHeadRow' },
		br: { nodeType: 'hardBreak' },
		p: { nodeType: 'paragraph' },
	})
	editor.destroy()
	return nodeBuilders
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
 * @param node to serialize
 */
function createDocumentString(node: Node) {
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
	const marks = node.marks.map(
		(mark) => mark.type.name + extractAttributes(mark) + '(',
	)
	return marks.join('') + stringifyNode(node) + ')'.repeat(marks.length)
}

/**
 * Compare given document from editor with builders
 *
 * @param subject The editor document
 * @param expected The expected document
 * @example
 * const editor = createRichEditor()
 * expectDocument(editor.state.doc, table(
 *   tr(
 *     td('foo')
 *   )
 * ))
 */
export function expectDocument(subject: Node, expected: Node) {
	expect(typeof subject).toBe('object')
	expect(typeof expected).toBe('object')
	expect(createDocumentString(subject)).toBe(
		createDocumentString(doc(expected, p())),
	)
}
