/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// Adopted from https://github.com/atlassian/prosemirror-utils/blob/a29e575af5c8e8f67bfa4b8c9fa1a03cfd6dc946/src

import type { Node, ResolvedPos } from '@tiptap/pm/model'
type Predicate = (node: Node) => boolean
type FindNodesResult = Array<{
	node: Node
	pos: number
}>
type FindResult = {
	pos: number
	node: Node
	start: number
	depth: number
} | undefined

/**
 * Find the closest parent that fulfills predicate
 *
 * Iterates over parent nodes starting from the given `$pos`,
 * finds the closest node `predicate` returns truthy for.
 * returning the closest node and its start position
 * `start` points to the start position of the node,
 * `pos` points directly before the node.
 *
 * @example
 * ```javascript
 * const predicate = node => node.type === schema.nodes.blockquote;
 * const parent = findParentNodeClosestToPos(state.doc.resolve(5), predicate);
 * ```
 *
 * @param $pos resolved position to start from
 * @param predicate function to test the nodes with
 */
export function findParentNodeClosestToPos($pos: ResolvedPos, predicate: Predicate): FindResult {
	for (let i = $pos.depth; i > 0; i--) {
		const node = $pos.node(i)
		if (predicate(node)) {
			return {
				pos: i > 0 ? $pos.before(i) : 0,
				start: $pos.start(i),
				depth: i,
				node,
			}
		}
	}
}

/**
 * Flattens descendants of a given `node`.
 *
 * @example
 * ```javascript
 * const children = flatten(node);
 * ```
 * @param node to descend into
 * @param descend further into the node. (defaults to `true`).
 */
export function flatten(node: Node, descend: boolean = true): FindNodesResult {
	if (!node) {
		throw new Error('Invalid "node" parameter')
	}
	const result = [] as FindNodesResult
	node.descendants((child, pos) => {
		result.push({ node: child, pos })
		if (!descend) {
			return false
		}
	})
	return result
}

/**
 * Iterates over descendants of a given `node`.
 *
 * returning child nodes predicate returns truthy for.
 *
 * @example
 * ```javascript
 * const textNodes = findChildren(node, child => child.isText, false);
 * ```
 * @param node to descend into
 * @param predicate function to test the nodes with
 * @param descend further into the node. (defaults to `true`).
 */
export function findChildren(node: Node, predicate: Predicate, descend: boolean) {
	if (!node) {
		throw new Error('Invalid "node" parameter')
	} else if (!predicate) {
		throw new Error('Invalid "predicate" parameter')
	}
	return flatten(node, descend).filter((child) => predicate(child.node))
}
