/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// Copied from https://github.com/atlassian/prosemirror-utils/tree/1b97ff08f1bbaea781f205744588a3dfd228b0d1/src

// Iterates over parent nodes starting from the given `$pos`, returning the closest node and its start position `predicate` returns truthy for. `start` points to the start position of the node, `pos` points directly before the node.
//
// ```javascript
// const predicate = node => node.type === schema.nodes.blockquote;
// const parent = findParentNodeClosestToPos(state.doc.resolve(5), predicate);
// ```
export const findParentNodeClosestToPos = ($pos, predicate) => {
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

// Flattens descendants of a given `node`. It doesn't descend into a node when descend argument is `false` (defaults to `true`).
//
// ```javascript
// const children = flatten(node);
// ```
export const flatten = (node, descend = true) => {
	if (!node) {
		throw new Error('Invalid "node" parameter')
	}
	const result = []
	node.descendants((child, pos) => {
		result.push({ node: child, pos })
		if (!descend) {
			return false
		}
	})
	return result
}

// Iterates over descendants of a given `node`, returning child nodes predicate returns truthy for. It doesn't descend into a node when descend argument is `false` (defaults to `true`).
//
// ```javascript
// const textNodes = findChildren(node, child => child.isText, false);
// ```
export const findChildren = (node, predicate, descend) => {
	if (!node) {
		throw new Error('Invalid "node" parameter')
	} else if (!predicate) {
		throw new Error('Invalid "predicate" parameter')
	}
	return flatten(node, descend).filter(child => predicate(child.node))
}
