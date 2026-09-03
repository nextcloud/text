/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { ComparisonRange as Range } from './markdownComparisonTypes.ts'

export interface LocatedComparisonNode {
	node: Node
	path: readonly number[]
	index: number
	from: number
	to: number
	parent: Location | null
	children: readonly Location[]
}
type Location = LocatedComparisonNode

export interface ComparisonDocumentIndex {
	children: readonly Location[]
	nodeAtPath: (path: readonly number[]) => Location
}

interface Mutable extends Omit<Location, 'children'> {
	children: Mutable[]
}

const minimalRootsCache = new WeakMap<readonly Location[], readonly Location[]>()

export function createComparisonDocumentIndex(doc: Node): ComparisonDocumentIndex {
	const byPath = new Map<string, Mutable>()
	const locateChildren = (
		parentNode: Node,
		parentLocation: Mutable | null,
		parentPath: readonly number[],
		contentFrom: number,
	) => {
		const children: Mutable[] = []
		parentNode.forEach((node, offset, index) => {
			const from = contentFrom + offset
			const path = [...parentPath, index]
			const location: Mutable = {
				node,
				path,
				index,
				from,
				to: from + node.nodeSize,
				parent: parentLocation,
				children: [],
			}
			children.push(location)
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
		nodeAtPath(path) {
			const location = byPath.get(pathKey(path))
			if (!location) {
				throw new Error(`Comparison document path does not exist: ${path.join('.')}`)
			}
			return location
		},
	}
}

export function findComparisonNodes(range: Range, roots: readonly Location[]) {
	const found = new Map<string, Location>()
	const add = (location: Location) => found.set(pathKey(location.path), location)
	const visit = (location: Location) => {
		if (!touches(location, range)) {
			return
		}
		add(location)
		visitChildren(location.children, range, visit)
	}
	visitChildren(minimalRoots(roots), range, (root) => {
		for (let ancestor = root.parent; ancestor; ancestor = ancestor.parent) {
			add(ancestor)
		}
		visit(root)
	})
	return [...found.values()].toSorted((a, b) => a.from - b.from || a.path.length - b.path.length)
}

export function comparisonRangeText(range: Range, roots: readonly Location[]) {
	if (range.from === range.to) {
		return ''
	}
	return minimalRoots(roots)
		.filter((root) => touches(root, range))
		.map((root) => textFromRoot(root, range))
		.join('\n')
}

function visitChildren(children: readonly Location[], range: Range, visit: (location: Location) => void) {
	let lower = 0
	let upper = children.length
	while (lower < upper) {
		const middle = (lower + upper) >>> 1
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
		if (range.from === range.to ? child.from > range.from : child.from >= range.to) {
			break
		}
		visit(child)
	}
}

function touches(location: Location, range: Range) {
	return range.from === range.to
		? range.from >= location.from && range.from <= location.to
		: range.from < location.to && range.to > location.from
}

function minimalRoots(roots: readonly Location[]) {
	const cached = minimalRootsCache.get(roots)
	if (cached) {
		return cached
	}
	const rootPaths = new Set(roots.map(({ path }) => pathKey(path)))
	const minimal = roots.filter((root) => {
		for (let ancestor = root.parent; ancestor; ancestor = ancestor.parent) {
			if (rootPaths.has(pathKey(ancestor.path))) {
				return false
			}
		}
		return true
	})
	minimalRootsCache.set(roots, minimal)
	return minimal
}

function textFromRoot(root: Location, range: Range) {
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
function pathKey(path: readonly number[]) {
	return path.join('.')
}
