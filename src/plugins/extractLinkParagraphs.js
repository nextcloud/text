/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { isLinkToSelfWithHash } from './../helpers/links.js'

/**
 * Get a list of all paragraphs that can be converted into a preview.
 *
 * @param {Document} doc - the prosemirror doc
 * @return {Array} paragraphs with one link only found in the doc
 */
export default function extractLinkParagraphs(doc) {
	const paragraphs = []

	doc.descendants((node, offset) => {
		if (previewPossible(node)) {
			paragraphs.push(Object.freeze({
				offset,
				nodeSize: node.nodeSize,
				type: 'text-only',
			}))
		} else if (node.type.name === 'preview') {
			paragraphs.push(Object.freeze({
				offset,
				nodeSize: node.nodeSize,
				type: 'link-preview',
			}))
		}
	})

	return paragraphs
}

/**
 * Is it possible to convert the node into a preview?
 * @param {object} node the node in question
 * @return {boolean}
 */
function previewPossible(node) {
	if (node.type.name !== 'paragraph' || hasOtherContent(node)) {
		return false
	}
	const href = extractHref(node.firstChild)
	if (!href || isLinkToSelfWithHash(href)) {
		return false
	}
	return true
}

/**
 * Does the node contain more content than the first child
 * @param {object} node node to inspect
 * @return {boolean}
 */
function hasOtherContent(node) {
	return node.childCount > 2
		|| (node.childCount === 2 && node.lastChild.textContent.trim())
}

/**
 * Get the link href of the given node
 * @param {object} node to inspect
 * @return {string} The href of the link mark of the node
 */
function extractHref(node) {
	if (!node) {
		return undefined
	}
	const link = node.marks.find(mark => mark.type.name === 'link')
	return link?.attrs.href
}
