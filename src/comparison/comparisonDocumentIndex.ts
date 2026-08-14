/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { ComparisonRange } from './markdownComparisonTypes.ts'

export interface LocatedComparisonNode {
	node: Node
	path: readonly number[]
	index: number
	from: number
	to: number
	parent: LocatedComparisonNode | null
	children: readonly LocatedComparisonNode[]
}

export interface ComparisonDocumentIndex {
	children: readonly LocatedComparisonNode[]
	nodes: readonly LocatedComparisonNode[]
	nodeAtPath: (path: readonly number[]) => LocatedComparisonNode
}

export interface ComparisonNodeSearchAudit {
	examinedNodes: number
}

interface MutableLocatedComparisonNode extends Omit<LocatedComparisonNode, 'children'> {
	children: MutableLocatedComparisonNode[]
}

/**
 * Build one reusable position and path index for an immutable document.
 *
 * @param doc Immutable ProseMirror document
 * @param audit Optional operation counter for structural regression tests
 */
export function createComparisonDocumentIndex(
	doc: Node,
	audit?: ComparisonNodeSearchAudit,
): ComparisonDocumentIndex {
	const nodes: MutableLocatedComparisonNode[] = []
	const byPath = new Map<string, MutableLocatedComparisonNode>()
	const locateChildren = (
		parentNode: Node,
		parentLocation: MutableLocatedComparisonNode | null,
		parentPath: readonly number[],
		contentFrom: number,
	) => {
		const children: MutableLocatedComparisonNode[] = []
		parentNode.forEach((node, offset, index) => {
			if (audit) {
				audit.examinedNodes++
			}
			const from = contentFrom + offset
			const path = [...parentPath, index]
			const location: MutableLocatedComparisonNode = {
				node,
				path,
				index,
				from,
				to: from + node.nodeSize,
				parent: parentLocation,
				children: [],
			}
			children.push(location)
			nodes.push(location)
			byPath.set(pathKey(path), location)
			if (!node.isLeaf) {
				location.children = locateChildren(node, location, path, from + 1)
			}
		})
		return children
	}
	const children = locateChildren(doc, null, [], 0)
	return {
		children,
		nodes,
		nodeAtPath(path) {
			const location = byPath.get(pathKey(path))
			if (!location) {
				throw new Error(`Comparison document path does not exist: ${path.join('.')}`)
			}
			return location
		},
	}
}

/**
 * Find touched nodes without scanning unrelated siblings.
 *
 * @param range Absolute document range
 * @param roots Smallest known roots for the range
 * @param audit Optional operation counter for structural regression tests
 */
export function findComparisonNodes(
	range: ComparisonRange,
	roots: readonly LocatedComparisonNode[],
	audit?: ComparisonNodeSearchAudit,
) {
	const found = new Map<string, LocatedComparisonNode>()
	const add = (location: LocatedComparisonNode) => found.set(pathKey(location.path), location)
	const visit = (location: LocatedComparisonNode) => {
		if (audit) {
			audit.examinedNodes++
		}
		if (!touches(location, range)) {
			return
		}
		add(location)
		visitChildren(location.children, range, visit, audit)
	}
	for (const root of minimalRoots(roots)) {
		for (let ancestor = root.parent; ancestor; ancestor = ancestor.parent) {
			add(ancestor)
		}
		visit(root)
	}
	return [...found.values()].toSorted((a, b) => a.from - b.from || a.path.length - b.path.length)
}

/**
 * Read text from the known roots instead of resolving the range from the document root.
 *
 * @param range Absolute document range
 * @param roots Known range roots
 */
export function comparisonRangeText(range: ComparisonRange, roots: readonly LocatedComparisonNode[]) {
	if (range.from === range.to) {
		return ''
	}
	return minimalRoots(roots)
		.filter((root) => touches(root, range))
		.map((root) => textFromRoot(root, range))
		.join('\n')
}

/**
 * Visit child nodes that can intersect the requested range.
 *
 * @param children Candidate child nodes
 * @param range Absolute document range
 * @param visit Callback for each matching node
 * @param audit Optional operation counter for structural regression tests
 */
function visitChildren(
	children: readonly LocatedComparisonNode[],
	range: ComparisonRange,
	visit: (location: LocatedComparisonNode) => void,
	audit?: ComparisonNodeSearchAudit,
) {
	let lower = 0
	let upper = children.length
	while (lower < upper) {
		const middle = (lower + upper) >>> 1
		if (audit) {
			audit.examinedNodes++
		}
		const beforeRange = range.from === range.to
			? children[middle]!.to < range.from
			: children[middle]!.to <= range.from
		if (beforeRange) {
			lower = middle + 1
		} else {
			upper = middle
		}
	}
	for (let index = lower; index < children.length; index++) {
		const child = children[index]!
		if (audit) {
			audit.examinedNodes++
		}
		if (range.from === range.to ? child.from > range.from : child.from >= range.to) {
			break
		}
		visit(child)
	}
}

/**
 * Check whether a located node intersects a document range.
 *
 * @param location Located document node
 * @param range Absolute document range
 */
function touches(location: LocatedComparisonNode, range: ComparisonRange) {
	return range.from === range.to
		? range.from >= location.from && range.from <= location.to
		: range.from < location.to && range.to > location.from
}

/**
 * Remove roots whose ancestor is already present.
 *
 * @param roots Known range roots
 */
function minimalRoots(roots: readonly LocatedComparisonNode[]) {
	const rootPaths = new Set(roots.map(({ path }) => pathKey(path)))
	return roots.filter((root) => {
		for (let ancestor = root.parent; ancestor; ancestor = ancestor.parent) {
			if (rootPaths.has(pathKey(ancestor.path))) {
				return false
			}
		}
		return true
	})
}

/**
 * Read the requested text from one known root.
 *
 * @param root Known range root
 * @param range Absolute document range
 */
function textFromRoot(root: LocatedComparisonNode, range: ComparisonRange) {
	if (root.node.isText) {
		return root.node.text?.slice(
			Math.max(0, range.from - root.from),
			Math.min(root.node.nodeSize, range.to - root.from),
		) ?? ''
	}
	if (root.node.isLeaf) {
		return '\ufffc'
	}
	const contentFrom = root.from + 1
	return root.node.textBetween(
		Math.max(0, range.from - contentFrom),
		Math.min(root.node.content.size, range.to - contentFrom),
		'\n',
		'\ufffc',
	)
}

/**
 * Encode a document path for map lookup.
 *
 * @param path Document child-index path
 */
function pathKey(path: readonly number[]) {
	return path.join('.')
}
