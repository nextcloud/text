/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Mark, Node } from '@tiptap/pm/model'

import { ChangeSet, simplifyChanges } from '@tiptap/pm/changeset'
import { StepMap } from '@tiptap/pm/transform'
import { diffArrays } from 'diff'

export type ChangeOperation = 'insert' | 'delete' | 'replace'
export type ChangeCategory = 'text' | 'formatting' | 'attribute' | 'structure'
export type ChangeAttribute = 'heading-level' | 'task-state' | 'link' | 'image' | 'code-language' | 'list-start' | 'other'

export interface ChangeRange {
	from: number
	to: number
}

export interface Change {
	id: string
	operation: ChangeOperation
	category: ChangeCategory
	/** Which attribute changed, only for the attribute category. */
	attribute?: ChangeAttribute
	/** True when the ranges cover whole nodes, false for inline ranges inside a textblock. */
	block: boolean
	/** Node type name of the changed node or of the textblock containing the inline change. */
	context: string
	/** Positions in the before document; empty for insertions. */
	before: ChangeRange
	/** Positions in the after document; empty for deletions. */
	after: ChangeRange
	preview: { before: string, after: string }
}

type PendingChange = Omit<Change, 'id'>

interface Child {
	node: Node
	from: number
	to: number
}

const PREVIEW_LENGTH = 80
const LEAF_TEXT = '￼'

const attributeNames: Record<string, ChangeAttribute> = {
	heading: 'heading-level',
	codeBlock: 'code-language',
	orderedList: 'list-start',
	taskItem: 'task-state',
	image: 'image',
	imageInline: 'image',
}

/**
 * Compare two documents and describe the differences in document positions.
 *
 * Sibling nodes are aligned with a diff on node equality, paired nodes are compared
 * recursively and textblocks are compared inline. Changes are ordered by position.
 *
 * @param before Earlier document.
 * @param after Later document.
 */
export function compareDocuments(before: Node, after: Node): Change[] {
	const changes: PendingChange[] = []
	compareChildren(before, sameSchema(before, after), 0, 0, changes)
	return changes
		.sort((a, b) => a.after.from - b.after.from || a.before.from - b.before.from)
		.map((change, index) => ({ ...change, id: `change-${index}` }))
}

// Node equality requires one schema instance. Rebuilding the after document
// in the before schema keeps all positions.
function sameSchema(before: Node, after: Node) {
	return before.type.schema === after.type.schema
		? after
		: before.type.schema.nodeFromJSON(after.toJSON())
}

function compareChildren(before: Node, after: Node, beforeFrom: number, afterFrom: number, changes: PendingChange[]) {
	const beforeChildren = children(before, beforeFrom)
	const afterChildren = children(after, afterFrom)
	const parts = diffArrays(beforeChildren, afterChildren, {
		comparator: (a, b) => a.node.eq(b.node),
	})
	let beforeIndex = 0
	let afterIndex = 0
	let beforeCursor = beforeFrom
	let afterCursor = afterFrom
	let removed: Child[] = []
	let added: Child[] = []

	const flush = () => {
		const paired = Math.min(removed.length, added.length)
		for (let index = 0; index < paired; index++) {
			compareNodes(removed[index]!, added[index]!, changes)
		}
		const afterPosition = added.at(-1)?.to ?? afterCursor
		const beforePosition = removed.at(-1)?.to ?? beforeCursor
		for (const child of removed.slice(paired)) {
			changes.push(blockChange(child, null, afterPosition))
		}
		for (const child of added.slice(paired)) {
			changes.push(blockChange(null, child, beforePosition))
		}
		removed = []
		added = []
	}

	for (const part of parts) {
		if (part.removed) {
			removed.push(...part.value)
			beforeIndex += part.value.length
		} else if (part.added) {
			added.push(...part.value)
			afterIndex += part.value.length
		} else {
			flush()
			beforeIndex += part.value.length
			afterIndex += part.value.length
			beforeCursor = beforeChildren[beforeIndex - 1]!.to
			afterCursor = afterChildren[afterIndex - 1]!.to
		}
	}
	flush()
}

function children(parent: Node, contentFrom: number): Child[] {
	const result: Child[] = []
	parent.forEach((node, offset) => {
		const from = contentFrom + offset
		result.push({ node, from, to: from + node.nodeSize })
	})
	return result
}

function compareNodes(before: Child, after: Child, changes: PendingChange[]) {
	if (before.node.eq(after.node)) {
		return
	}
	if (before.node.type.name !== after.node.type.name) {
		changes.push({ ...blockChange(before, after, 0), category: 'structure' })
		return
	}
	if (before.node.isLeaf) {
		changes.push(attributeChange(before, after))
		return
	}
	if (!sameAttributes(before.node, after.node)) {
		changes.push(attributeChange(before, after))
	}
	if (before.node.content.eq(after.node.content)) {
		return
	}
	if (before.node.isTextblock) {
		compareInline(before, after, changes)
	} else {
		compareChildren(before.node, after.node, before.from + 1, after.from + 1, changes)
	}
}

const markTokens = new WeakMap<readonly Mark[], string>()

function encodeMarks(marks: readonly Mark[]) {
	let encoded = markTokens.get(marks)
	if (encoded === undefined) {
		encoded = marks
			.map((mark) => `${mark.type.name}${JSON.stringify(mark.attrs)}`)
			.sort()
			.join('|')
		markTokens.set(marks, encoded)
	}
	return encoded
}

const tokenEncoder = {
	encodeCharacter: (character: number, marks: readonly Mark[]) => `${character}:${encodeMarks(marks)}`,
	encodeNodeStart: (node: Node) => `${node.type.name}:${JSON.stringify(node.attrs)}:${encodeMarks(node.marks)}`,
	encodeNodeEnd: () => 'end',
	compareTokens: (a: string, b: string) => a === b,
}

function compareInline(before: Child, after: Child, changes: PendingChange[]) {
	const map = new StepMap([0, before.node.content.size, after.node.content.size])
	const inlineChanges = simplifyChanges(
		ChangeSet.create(before.node, undefined, tokenEncoder)
			.addSteps(after.node, [map], null)
			.changes,
		after.node,
	)
	for (const { fromA, toA, fromB, toB } of inlineChanges) {
		const beforeText = before.node.textBetween(fromA, toA, '', LEAF_TEXT)
		const afterText = after.node.textBetween(fromB, toB, '', LEAF_TEXT)
		changes.push({
			operation: operationFor(fromA < toA, fromB < toB),
			block: false,
			context: after.node.type.name,
			before: { from: before.from + 1 + fromA, to: before.from + 1 + toA },
			after: { from: after.from + 1 + fromB, to: after.from + 1 + toB },
			preview: { before: preview(beforeText), after: preview(afterText) },
			...inlineCategory(before.node, after.node, { from: fromA, to: toA }, { from: fromB, to: toB }, beforeText, afterText),
		})
	}
}

function inlineCategory(before: Node, after: Node, beforeRange: ChangeRange, afterRange: ChangeRange, beforeText: string, afterText: string): Pick<Change, 'category' | 'attribute'> {
	if (beforeText !== afterText) {
		return { category: 'text' }
	}
	const beforeMarks = marksIn(before, beforeRange)
	const afterMarks = marksIn(after, afterRange)
	const differing = [...beforeMarks, ...afterMarks]
		.filter((mark) => !beforeMarks.has(mark) || !afterMarks.has(mark))
	if (differing.length > 0) {
		return differing.some((mark) => mark.startsWith('link:'))
			? { category: 'attribute', attribute: 'link' }
			: { category: 'formatting' }
	}
	const leaf = leafIn(after, afterRange) ?? leafIn(before, beforeRange)
	return { category: 'attribute', attribute: attributeNames[leaf?.type.name ?? ''] ?? 'other' }
}

function marksIn(node: Node, range: ChangeRange) {
	const marks = new Set<string>()
	node.nodesBetween(range.from, range.to, (child) => {
		for (const mark of child.marks) {
			marks.add(mark.type.name === 'link' ? `link:${mark.attrs.href}` : mark.type.name)
		}
	})
	return marks
}

function leafIn(node: Node, range: ChangeRange) {
	let leaf: Node | null = null
	node.nodesBetween(range.from, range.to, (child) => {
		if (!leaf && child.isLeaf && !child.isText) {
			leaf = child
		}
	})
	return leaf as Node | null
}

function blockChange(before: Child | null, after: Child | null, absentPosition: number): PendingChange {
	const node = (after ?? before)!.node
	return {
		operation: operationFor(before !== null, after !== null),
		category: 'text',
		block: true,
		context: node.type.name,
		before: before ? { from: before.from, to: before.to } : { from: absentPosition, to: absentPosition },
		after: after ? { from: after.from, to: after.to } : { from: absentPosition, to: absentPosition },
		preview: {
			before: preview(before?.node.textContent ?? ''),
			after: preview(after?.node.textContent ?? ''),
		},
	}
}

function attributeChange(before: Child, after: Child): PendingChange {
	return {
		...blockChange(before, after, 0),
		category: 'attribute',
		attribute: attributeNames[after.node.type.name] ?? 'other',
	}
}

function sameAttributes(before: Node, after: Node) {
	const names = new Set([...Object.keys(before.attrs), ...Object.keys(after.attrs)])
	names.delete('dir')
	return [...names].every((name) => JSON.stringify(before.attrs[name]) === JSON.stringify(after.attrs[name]))
}

function operationFor(hasBefore: boolean, hasAfter: boolean): ChangeOperation {
	return hasBefore && hasAfter ? 'replace' : hasBefore ? 'delete' : 'insert'
}

function preview(text: string) {
	const normalized = text.replaceAll(LEAF_TEXT, '').replace(/\s+/g, ' ').trim()
	return normalized.length > PREVIEW_LENGTH
		? `${normalized.slice(0, PREVIEW_LENGTH)}…`
		: normalized
}
