/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Mark, Node } from '@tiptap/pm/model'
import type {
	ComparisonNodeSearchAudit,
	LocatedComparisonNode,
} from './comparisonDocumentIndex.ts'
import type {
	ComparisonAttributeCode,
	ComparisonContext,
	ComparisonContextCode,
	ComparisonContextLocation,
	ComparisonDescriptor,
	ComparisonFacet,
	ComparisonMarkCode,
	ComparisonOperation,
	ComparisonPreviewAtom,
	ComparisonRange,
	ComparisonSignal,
} from './markdownComparisonTypes.ts'

import { getTextDirection } from '../extensions/TextDirection.ts'
import {
	comparisonRangeText,
	findComparisonNodes,
} from './comparisonDocumentIndex.ts'

interface AttributeRecord {
	key: string
	nodeName: string
	attribute: string
	value: unknown
	textContent: string
}

interface ExcludedAttributePaths {
	before: readonly number[]
	after: readonly number[]
}

const marksCache = new WeakMap<readonly Mark[], string>()
const nodeShapeCache = new WeakMap<Node, string>()
const graphemeSegmenter = typeof Intl.Segmenter === 'function'
	? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
	: null

const contextCodes: Record<string, ComparisonContextCode> = {
	frontMatter: 'front-matter',
	paragraph: 'paragraph',
	heading: 'heading',
	bulletList: 'list-item',
	orderedList: 'list-item',
	taskList: 'list-item',
	listItem: 'list-item',
	taskItem: 'task',
	tableCell: 'table-cell',
	tableHeader: 'table-cell',
	codeBlock: 'code-block',
	blockquote: 'quote',
	callout: 'callout',
	details: 'details',
	detailsContent: 'details',
	detailsSummary: 'details',
	footnotes: 'footnote',
	footnote: 'footnote',
	footnoteReference: 'footnote-reference',
	image: 'image',
	imageInline: 'image',
	mention: 'mention',
	inlineMath: 'mathematics',
	blockMath: 'mathematics',
	preview: 'preview',
}

const contextPriority: Record<ComparisonContextCode, number> = {
	'footnote-reference': 100,
	image: 95,
	mention: 95,
	mathematics: 95,
	preview: 95,
	footnote: 90,
	'table-cell': 85,
	task: 80,
	'list-item': 75,
	'front-matter': 70,
	'code-block': 70,
	callout: 65,
	details: 65,
	quote: 60,
	heading: 50,
	paragraph: 40,
	unknown: 0,
}

const markCodes: Record<string, ComparisonMarkCode> = {
	strong: 'bold',
	em: 'italic',
	strike: 'strike',
	highlight: 'highlight',
	underline: 'underline',
	code: 'inline-code',
}

const meaningfulAttributes: Record<string, Record<string, ComparisonAttributeCode>> = {
	heading: { level: 'heading-level' },
	orderedList: { start: 'list-start' },
	taskItem: { checked: 'task-state' },
	codeBlock: { language: 'code-language' },
	image: { src: 'image-target', alt: 'image-alt' },
	imageInline: { src: 'image-target', alt: 'image-alt' },
	mention: { id: 'mention-identity', label: 'mention-identity' },
	inlineMath: { latex: 'mathematics' },
	blockMath: { latex: 'mathematics' },
	preview: { href: 'preview-target' },
	footnoteReference: { referenceId: 'footnote-reference' },
	footnote: { referenceId: 'footnote-reference' },
	callout: { type: 'callout-type' },
	details: { openDetails: 'details-state' },
	tableCell: { align: 'table-alignment', colspan: 'table-span', rowspan: 'table-span' },
	tableHeader: { align: 'table-alignment', colspan: 'table-span', rowspan: 'table-span' },
}

/**
 * Deterministically encode values found in ProseMirror attributes.
 *
 * @param value Attribute value
 */
export function stableSerialize(value: unknown): string {
	if (value === null || typeof value !== 'object') {
		return JSON.stringify(value) ?? String(value)
	}
	if (Array.isArray(value)) {
		return `[${value.map(stableSerialize).join(',')}]`
	}
	return `{${Object.entries(value)
		.toSorted(([a], [b]) => compareCodeUnits(a, b))
		.map(([key, child]) => `${JSON.stringify(key)}:${stableSerialize(child)}`)
		.join(',')}}`
}

/**
 * Compare strings by UTF-16 code units without locale-dependent collation.
 *
 * @param a Left value
 * @param b Right value
 */
export function compareCodeUnits(a: string, b: string) {
	return a < b ? -1 : a > b ? 1 : 0
}

/**
 * Encode a mark set independent of mark order.
 *
 * @param marks ProseMirror marks
 */
function encodeMarks(marks: readonly Mark[]) {
	const cached = marksCache.get(marks)
	if (cached !== undefined) {
		return cached
	}
	const encoded = marks
		.map((mark) => `${mark.type.name}:${stableSerialize(mark.attrs)}`)
		.toSorted()
		.join('|')
	marksCache.set(marks, encoded)
	return encoded
}

/** Token encoder that treats formatting and all schema attributes as semantics. */
export const semanticTokenEncoder = {
	encodeCharacter(character: number, marks: readonly Mark[]) {
		return `character:${character}:${encodeMarks(marks)}`
	},
	encodeNodeStart(node: Node) {
		return `node-start:${node.type.name}:${stableSerialize(node.attrs)}:${encodeMarks(node.marks)}`
	},
	encodeNodeEnd(node: Node) {
		return `node-end:${node.type.name}`
	},
	compareTokens(a: string, b: string) {
		return a === b
	},
}

/**
 * Classify one existing ChangeSet range without recomputing it.
 *
 * @param beforeDoc Earlier complete document
 * @param afterDoc Later complete document
 * @param before Earlier range
 * @param after Later range
 * @param beforeRoots Known earlier range roots
 * @param afterRoots Known later range roots
 * @param sourceOrder Stable provisional order
 * @param detail Inline or whole-block detail
 * @param excludedAttributePaths Root paths whose attributes were classified separately
 * @param audit Optional operation counter for structural regression tests
 */
export function classifyComparisonDescriptor(
	beforeDoc: Node,
	afterDoc: Node,
	before: ComparisonRange,
	after: ComparisonRange,
	beforeRoots: readonly LocatedComparisonNode[],
	afterRoots: readonly LocatedComparisonNode[],
	sourceOrder: number,
	detail: ComparisonDescriptor['detail'] = 'inline',
	excludedAttributePaths?: ExcludedAttributePaths,
	audit?: ComparisonNodeSearchAudit,
): ComparisonDescriptor {
	const boundedBefore = boundedRange(before, beforeDoc.content.size)
	const boundedAfter = boundedRange(after, afterDoc.content.size)
	const beforeNodes = findComparisonNodes(boundedBefore, beforeRoots, audit)
	const afterNodes = findComparisonNodes(boundedAfter, afterRoots, audit)
	const context: ComparisonContext = {
		before: resolveContext(beforeNodes),
		after: resolveContext(afterNodes),
	}
	const facets = new Set<ComparisonFacet>()
	const signals: ComparisonSignal[] = []
	const beforeText = comparisonRangeText(boundedBefore, beforeRoots)
	const afterText = comparisonRangeText(boundedAfter, afterRoots)

	if (beforeText !== afterText) {
		facets.add('text')
	}

	classifyMarks(beforeDoc, afterDoc, boundedBefore, boundedAfter, beforeNodes, afterNodes, facets, signals)
	classifyNodes(beforeNodes, afterNodes, boundedBefore, boundedAfter, facets, signals, audit)
	classifyAttributes(
		excludePath(beforeNodes, excludedAttributePaths?.before),
		excludePath(afterNodes, excludedAttributePaths?.after),
		facets,
		signals,
	)

	if (facets.size === 0) {
		facets.add('unknown')
	}

	return {
		id: `change-${sourceOrder.toString(36)}`,
		sourceOrder,
		operation: operationFor(before, after),
		detail,
		facets: orderedFacets(facets),
		before: boundedBefore,
		after: boundedAfter,
		context,
		preview: {
			before: previewAtom(boundedBefore, beforeText, beforeNodes),
			after: previewAtom(boundedAfter, afterText, afterNodes),
		},
		signals: deduplicateSignals(signals),
	}
}

/**
 * Classify direct node markup without reclassifying changed descendant content.
 *
 * @param beforeDoc Earlier complete document
 * @param afterDoc Later complete document
 * @param before Earlier node range
 * @param after Later node range
 * @param beforeNode Earlier paired node
 * @param afterNode Later paired node
 * @param beforeRoots Known earlier range roots
 * @param afterRoots Known later range roots
 * @param sourceOrder Stable provisional order
 * @param audit Optional operation counter for structural regression tests
 */
export function classifyNodeMarkupDescriptor(
	beforeDoc: Node,
	afterDoc: Node,
	before: ComparisonRange,
	after: ComparisonRange,
	beforeNode: Node,
	afterNode: Node,
	beforeRoots: readonly LocatedComparisonNode[],
	afterRoots: readonly LocatedComparisonNode[],
	sourceOrder: number,
	audit?: ComparisonNodeSearchAudit,
): ComparisonDescriptor | null {
	const boundedBefore = boundedRange(before, beforeDoc.content.size)
	const boundedAfter = boundedRange(after, afterDoc.content.size)
	const beforeNodes = findComparisonNodes(boundedBefore, beforeRoots, audit)
	const afterNodes = findComparisonNodes(boundedAfter, afterRoots, audit)
	const facets = new Set<ComparisonFacet>()
	const signals: ComparisonSignal[] = []
	classifyDirectAttributes(beforeNode, afterNode, facets, signals)
	classifyDirectMarks(beforeNode, afterNode, facets, signals)
	if (beforeNode.type.name !== afterNode.type.name) {
		facets.add('structure')
		signals.push({ type: 'node' })
	}
	if (facets.size === 0) {
		return null
	}
	return {
		id: `change-${sourceOrder.toString(36)}`,
		sourceOrder,
		operation: 'replace',
		detail: 'block',
		facets: orderedFacets(facets),
		before: boundedBefore,
		after: boundedAfter,
		context: {
			before: resolveContext(beforeNodes),
			after: resolveContext(afterNodes),
		},
		preview: {
			before: previewAtom(boundedBefore, comparisonRangeText(boundedBefore, beforeRoots), beforeNodes),
			after: previewAtom(boundedAfter, comparisonRangeText(boundedAfter, afterRoots), afterNodes),
		},
		signals: deduplicateSignals(signals),
	}
}

/**
 * Resolve the comparison operation from both ranges.
 *
 * @param before Earlier comparison range
 * @param after Later comparison range
 */
function operationFor(before: ComparisonRange, after: ComparisonRange): ComparisonOperation {
	if (before.from === before.to && after.from !== after.to) {
		return 'insert'
	}
	if (after.from === after.to && before.from !== before.to) {
		return 'delete'
	}
	return 'replace'
}

/**
 * Classify mark differences across touched nodes.
 *
 * @param beforeDoc Earlier complete document
 * @param afterDoc Later complete document
 * @param before Earlier range
 * @param after Later range
 * @param beforeNodes Earlier touched nodes
 * @param afterNodes Later touched nodes
 * @param facets Mutable descriptor facets
 * @param signals Mutable descriptor signals
 */
function classifyMarks(
	beforeDoc: Node,
	afterDoc: Node,
	before: ComparisonRange,
	after: ComparisonRange,
	beforeNodes: readonly LocatedComparisonNode[],
	afterNodes: readonly LocatedComparisonNode[],
	facets: Set<ComparisonFacet>,
	signals: ComparisonSignal[],
) {
	const beforeMarks = collectMarks(beforeDoc, before, beforeNodes)
	const afterMarks = collectMarks(afterDoc, after, afterNodes)
	const names = new Set([...beforeMarks.keys(), ...afterMarks.keys()])
	for (const name of [...names].toSorted()) {
		const previous = beforeMarks.get(name)
		const next = afterMarks.get(name)
		if (stableSerialize(previous) === stableSerialize(next)) {
			continue
		}
		const change = previous === undefined ? 'added' : next === undefined ? 'removed' : 'changed'
		if (name === 'link') {
			facets.add('attribute')
			signals.push({
				type: 'attribute',
				attribute: previous === undefined || next === undefined ? 'link' : 'link-target',
				change,
			})
		} else if (markCodes[name]) {
			facets.add('formatting')
			signals.push({ type: 'mark', mark: markCodes[name], change })
		} else {
			facets.add('unknown')
		}
	}
}

/**
 * Classify structural differences across touched nodes.
 *
 * @param beforeNodes Earlier touched nodes
 * @param afterNodes Later touched nodes
 * @param before Earlier changed range
 * @param after Later changed range
 * @param facets Mutable descriptor facets
 * @param signals Mutable descriptor signals
 * @param audit Optional operation counter for structural regression tests
 */
function classifyNodes(
	beforeNodes: readonly LocatedComparisonNode[],
	afterNodes: readonly LocatedComparisonNode[],
	before: ComparisonRange,
	after: ComparisonRange,
	facets: Set<ComparisonFacet>,
	signals: ComparisonSignal[],
	audit?: ComparisonNodeSearchAudit,
) {
	const beforeShape = structuralShape(beforeNodes, before, audit)
	const afterShape = structuralShape(afterNodes, after, audit)
	if (beforeShape === afterShape) {
		return
	}
	// A text split caused only by marks is intentionally absent from structuralShape.
	facets.add('structure')
	signals.push({ type: 'node' })
}

/**
 * Classify attribute differences across touched nodes.
 *
 * @param beforeNodes Earlier touched nodes
 * @param afterNodes Later touched nodes
 * @param facets Mutable descriptor facets
 * @param signals Mutable descriptor signals
 */
function classifyAttributes(
	beforeNodes: readonly LocatedComparisonNode[],
	afterNodes: readonly LocatedComparisonNode[],
	facets: Set<ComparisonFacet>,
	signals: ComparisonSignal[],
) {
	const previous = collectAttributes(beforeNodes)
	const next = collectAttributes(afterNodes)
	const keys = new Set([...previous.keys()].filter((key) => next.has(key)))
	for (const key of [...keys].toSorted()) {
		const before = previous.get(key)!
		const after = next.get(key)!
		if (stableSerialize(before?.value) === stableSerialize(after?.value)) {
			continue
		}
		// Do not turn a node replacement into an arbitrary attribute comparison.
		if (before.nodeName !== after.nodeName) {
			continue
		}
		const record = after
		// Ignore a neutral transition when both values match content inference.
		if (record.attribute === 'dir' && isInferredDirectionTransition(
			before.value,
			after.value,
			before.textContent,
			after.textContent,
		)) {
			continue
		}
		const code = record.attribute === 'dir'
			? 'text-direction'
			: meaningfulAttributes[record.nodeName]?.[record.attribute]
		facets.add('attribute')
		if (!code) {
			facets.add('unknown')
		}
		signals.push({
			type: 'attribute',
			attribute: code ?? 'unknown-attribute',
			change: 'changed',
		})
	}
}

/**
 * @param before Earlier paired node
 * @param after Later paired node
 * @param facets Descriptor facets
 * @param signals Descriptor signals
 */
function classifyDirectAttributes(
	before: Node,
	after: Node,
	facets: Set<ComparisonFacet>,
	signals: ComparisonSignal[],
) {
	const names = new Set([...Object.keys(before.attrs), ...Object.keys(after.attrs)])
	for (const attribute of [...names].toSorted()) {
		const previous = before.attrs[attribute]
		const next = after.attrs[attribute]
		if (stableSerialize(previous) === stableSerialize(next)) {
			continue
		}
		if (attribute === 'dir' && isInferredDirectionTransition(
			previous,
			next,
			before.textContent,
			after.textContent,
		)) {
			continue
		}
		const code = attribute === 'dir'
			? 'text-direction'
			: meaningfulAttributes[after.type.name]?.[attribute]
		facets.add('attribute')
		if (!code) {
			facets.add('unknown')
		}
		signals.push({
			type: 'attribute',
			attribute: code ?? 'unknown-attribute',
			change: previous === undefined ? 'added' : next === undefined ? 'removed' : 'changed',
		})
	}
}

/**
 * @param before Earlier paired node
 * @param after Later paired node
 * @param facets Descriptor facets
 * @param signals Descriptor signals
 */
function classifyDirectMarks(
	before: Node,
	after: Node,
	facets: Set<ComparisonFacet>,
	signals: ComparisonSignal[],
) {
	const previous = new Map(before.marks.map((mark) => [mark.type.name, stableSerialize(mark.attrs)]))
	const next = new Map(after.marks.map((mark) => [mark.type.name, stableSerialize(mark.attrs)]))
	const names = new Set([...previous.keys(), ...next.keys()])
	for (const name of [...names].toSorted()) {
		if (previous.get(name) === next.get(name)) {
			continue
		}
		const change = !previous.has(name) ? 'added' : !next.has(name) ? 'removed' : 'changed'
		if (name === 'link') {
			facets.add('attribute')
			signals.push({ type: 'attribute', attribute: 'link-target', change })
		} else if (markCodes[name]) {
			facets.add('formatting')
			signals.push({ type: 'mark', mark: markCodes[name], change })
		} else {
			facets.add('unknown')
		}
	}
}

/**
 * Collect marks that intersect a changed range.
 *
 * @param doc Complete document
 * @param range Changed range
 * @param nodes Touched nodes
 */
function collectMarks(
	doc: Node,
	range: ComparisonRange,
	nodes: readonly LocatedComparisonNode[],
) {
	const marks = new Map<string, string[]>()
	const add = (mark: Mark) => {
		const values = marks.get(mark.type.name) ?? []
		const encoded = stableSerialize(mark.attrs)
		if (!values.includes(encoded)) {
			values.push(encoded)
			values.sort()
		}
		marks.set(mark.type.name, values)
	}
	if (range.from === range.to) {
		for (const mark of doc.resolve(range.from).marks()) {
			add(mark)
		}
	} else {
		for (const { node } of nodes) {
			for (const mark of node.marks) {
				add(mark)
			}
		}
	}
	return marks
}

/**
 * @param nodes Located nodes
 * @param path Exact path to exclude
 */
function excludePath(nodes: readonly LocatedComparisonNode[], path: readonly number[] | undefined) {
	if (!path) {
		return nodes
	}
	return nodes.filter((node) => node.path.length !== path.length
		|| node.path.some((index, depth) => index !== path[depth]))
}

/**
 * Resolve the strongest semantic context for touched nodes.
 *
 * @param nodes Located document nodes
 */
function resolveContext(nodes: readonly LocatedComparisonNode[]): ComparisonContextLocation | null {
	const candidate = nodes
		.filter(({ node }) => contextCodes[node.type.name] !== undefined)
		.toSorted(compareContextCandidates)[0]
	if (!candidate) {
		return nodes[0]
			? {
					code: 'unknown',
					path: nodes[0].path,
					from: nodes[0].from,
					to: nodes[0].to,
				}
			: null
	}
	return {
		code: contextCodes[candidate.node.type.name],
		path: candidate.path,
		from: candidate.from,
		to: candidate.to,
	}
}

/**
 * Encode the top-level structural shape of touched nodes.
 *
 * @param nodes Located document nodes
 * @param range Changed range
 * @param audit Optional operation counter for structural regression tests
 */
function structuralShape(
	nodes: readonly LocatedComparisonNode[],
	range: ComparisonRange,
	audit?: ComparisonNodeSearchAudit,
) {
	const contained = nodes.filter(({ node, from, to }) => !node.isText
		&& range.from <= from
		&& range.to >= to)
	const containedNodes = new Set(contained)
	const roots = contained.filter(({ parent }) => !parent || !containedNodes.has(parent))
	return roots.map(({ node }) => nodeShape(node, audit)).join('|')
}

/**
 * Identify a direction transition consistent with parsed-content inference.
 *
 * @param before Earlier direction
 * @param after Later direction
 * @param beforeText Earlier node text
 * @param afterText Later node text
 */
function isInferredDirectionTransition(
	before: unknown,
	after: unknown,
	beforeText: string,
	afterText: string,
) {
	return (!before || !after)
		&& beforeText !== afterText
		&& before === getTextDirection(beforeText)
		&& after === getTextDirection(afterText)
}

/**
 * Encode and cache one immutable node shape.
 *
 * @param node Immutable ProseMirror node
 * @param audit Optional operation counter for structural regression tests
 */
function nodeShape(node: Node, audit?: ComparisonNodeSearchAudit): string {
	const cached = nodeShapeCache.get(node)
	if (cached !== undefined) {
		return cached
	}
	if (node.isText) {
		return ''
	}
	if (audit) {
		audit.examinedNodes++
	}
	const children: string[] = []
	node.forEach((child) => {
		const shape = nodeShape(child, audit)
		if (shape && children.at(-1) !== shape) {
			children.push(shape)
		}
	})
	const shape = `${node.type.name}(${children.join(',')})`
	nodeShapeCache.set(node, shape)
	return shape
}

/**
 * Collect stable attribute records from touched nodes.
 *
 * @param nodes Located document nodes
 */
function collectAttributes(nodes: readonly LocatedComparisonNode[]) {
	const records = new Map<string, AttributeRecord>()
	const topLevelIndices = [...new Set(nodes.map(({ path }) => path[0]).filter((index): index is number => index !== undefined))]
		.toSorted((a, b) => a - b)
	const topLevelOrder = new Map(topLevelIndices.map((index, order) => [index, order]))
	for (const { node, path } of nodes) {
		if (node.isText) {
			continue
		}
		const relativePath = path.length
			? [topLevelOrder.get(path[0]!) ?? 0, ...path.slice(1)]
			: []
		for (const [attribute, value] of Object.entries(node.attrs)) {
			const key = `${relativePath.join('.')}:${node.type.name}:${attribute}`
			records.set(key, {
				key,
				nodeName: node.type.name,
				attribute,
				value,
				textContent: node.textContent,
			})
		}
	}
	return records
}

/**
 * Build a short preview for a changed range.
 *
 * @param range Changed document range
 * @param rangeText Changed range text
 * @param nodes Located document nodes
 */
function previewAtom(
	range: ComparisonRange,
	rangeText: string,
	nodes: readonly LocatedComparisonNode[],
): ComparisonPreviewAtom | null {
	if (range.from === range.to) {
		return null
	}
	const text = normalizePreview(rangeText.replaceAll('\ufffc', ''))
	if (text) {
		return { kind: 'text', text: truncateGraphemes(text, 96) }
	}
	const contextText = normalizePreview(resolveContextNode(nodes)?.node.textContent ?? '')
	if (contextText) {
		return { kind: 'text', text: truncateGraphemes(contextText, 96) }
	}
	const nodeName = resolveContextNode(nodes)?.node.type.name
	const node = nodeName === 'frontMatter'
		? 'front-matter'
		: nodeName === 'image' || nodeName === 'imageInline'
			? 'image'
			: nodeName === 'mention'
				? 'mention'
				: nodeName === 'inlineMath' || nodeName === 'blockMath'
					? 'mathematics'
					: nodeName === 'footnoteReference'
						? 'footnote-reference'
						: nodeName === 'horizontalRule'
							? 'horizontal-rule'
							: 'changed-content'
	return { kind: 'node', node }
}

/**
 * Resolve the strongest context node.
 *
 * @param nodes Located document nodes
 */
function resolveContextNode(nodes: readonly LocatedComparisonNode[]) {
	return nodes
		.filter(({ node }) => contextCodes[node.type.name] !== undefined)
		.toSorted(compareContextCandidates)[0]
		?? nodes[0]
}

/**
 * Order context nodes by semantic priority.
 *
 * @param a First context candidate
 * @param b Second context candidate
 */
function compareContextCandidates(a: LocatedComparisonNode, b: LocatedComparisonNode) {
	const aCode = contextCodes[a.node.type.name]
	const bCode = contextCodes[b.node.type.name]
	return contextPriority[bCode] - contextPriority[aCode]
		|| b.path.length - a.path.length
		|| a.from - b.from
}

/**
 * Normalize whitespace in preview text.
 *
 * @param value Preview text
 */
function normalizePreview(value: string) {
	return value.replace(/\s+/gu, ' ').trim()
}

/**
 * Truncate text without splitting grapheme clusters.
 *
 * @param value Text to truncate
 * @param maximum Maximum grapheme count
 */
export function truncateGraphemes(value: string, maximum: number) {
	let count = 0
	let truncated = ''
	const segments = graphemeSegmenter?.segment(value) ?? value
	for (const item of segments) {
		if (count++ === maximum) {
			return `${truncated}…`
		}
		truncated += typeof item === 'string' ? item : item.segment
	}
	return value
}

/**
 * Return descriptor facets in presentation order.
 *
 * @param facets Mutable descriptor facets
 */
function orderedFacets(facets: Set<ComparisonFacet>) {
	const order: ComparisonFacet[] = ['text', 'formatting', 'attribute', 'structure', 'unknown']
	return order.filter((facet) => facets.has(facet))
}

/**
 * Deduplicate and deterministically order signals.
 *
 * @param signals Mutable descriptor signals
 */
function deduplicateSignals(signals: ComparisonSignal[]) {
	const byValue = new Map(signals.map((signal) => [stableSerialize(signal), signal]))
	return [...byValue.values()].toSorted((a, b) => compareCodeUnits(stableSerialize(a), stableSerialize(b)))
}

/**
 * Clamp a comparison range to a document size.
 *
 * @param range Changed document range
 * @param maximum Document content size
 */
function boundedRange(range: ComparisonRange, maximum: number) {
	const from = clamp(range.from, 0, maximum)
	return { from, to: clamp(range.to, from, maximum) }
}

/**
 * Constrain a number to an inclusive range.
 *
 * @param value Input number
 * @param minimum Inclusive lower bound
 * @param maximum Inclusive upper bound
 */
function clamp(value: number, minimum: number, maximum: number) {
	return Math.min(Math.max(value, minimum), maximum)
}

/**
 * Recursively freeze a comparison value.
 *
 * @param value Comparison value
 */
export function deepFreeze<T>(value: T): T {
	if (value && typeof value === 'object' && !Object.isFrozen(value)) {
		Object.freeze(value)
		for (const child of Object.values(value)) {
			deepFreeze(child)
		}
	}
	return value
}
