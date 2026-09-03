/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Mark, Node } from '@tiptap/pm/model'
import type { LocatedComparisonNode as Location } from './comparisonDocumentIndex.ts'
import type { ComparisonAttributeCode as Attr, ComparisonContext as Context, ComparisonContextCode as ContextCode, ComparisonContextLocation as ContextLocation, ComparisonDescriptor as Descriptor, ComparisonFacet as Facet, ComparisonMarkCode as MarkCode, ComparisonOperation as Operation, ComparisonPreviewAtom as Preview, ComparisonRange as Range, ComparisonSignal as Signal } from './markdownComparisonTypes.ts'

import { getTextDirection } from '../extensions/TextDirection.ts'
import { findComparisonNodes as findNodes, comparisonRangeText as rangeText } from './comparisonDocumentIndex.ts'

interface AttributeRecord {
	nodeName: string
	attribute: string
	value: unknown
	textContent: string
}
const marksCache = new WeakMap<readonly Mark[], string>()
const fingerprints = new WeakMap<Node, string>()
const nodeShapeCache = new WeakMap<Node, string>()
const graphemeSegmenter = typeof Intl.Segmenter === 'function'
	? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
	: null

const contextCodes: Record<string, ContextCode> = {
	frontMatter: 'front-matter',
	paragraph: 'paragraph',
	heading: 'heading',
	bulletList: 'list-item',
	orderedList: 'list-item',
	taskList: 'list-item',
	listItem: 'list-item',
	taskItem: 'task',
	table: 'table',
	tableRow: 'table-row',
	tableHeadRow: 'table-row',
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
const contextPriority: Record<ContextCode, number> = {
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
	'table-row': 20,
	table: 10,
	unknown: 0,
}
const markCodes: Record<string, MarkCode> = {
	strong: 'bold',
	em: 'italic',
	strike: 'strike',
	highlight: 'highlight',
	underline: 'underline',
	code: 'inline-code',
}
const meaningfulAttributes: Record<string, Record<string, Attr>> = {
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
	details: { open: 'details-state' },
	tableCell: { align: 'table-alignment', colspan: 'table-span', rowspan: 'table-span' },
	tableHeader: { align: 'table-alignment', colspan: 'table-span', rowspan: 'table-span' },
}
function serialize(value: unknown): string {
	if (value === null || typeof value !== 'object') {
		return JSON.stringify(value) ?? String(value)
	}
	if (Array.isArray(value)) {
		return `[${value.map(serialize).join(',')}]`
	}
	return `{${Object.entries(value)
		.toSorted(([a], [b]) => compareCodeUnits(a, b))
		.map(([key, child]) => `${JSON.stringify(key)}:${serialize(child)}`)
		.join(',')}}`
}
export { serialize as stableSerialize }

function fingerprint(node: Node) {
	let value = fingerprints.get(node)
	if (value === undefined) {
		value = serialize(node.toJSON())
		fingerprints.set(node, value)
	}
	return value
}
export { fingerprint as nodeFingerprint }

export function compareCodeUnits(a: string, b: string) {
	return a < b ? -1 : a > b ? 1 : 0
}
function encodeMarks(marks: readonly Mark[]) {
	const cached = marksCache.get(marks)
	if (cached !== undefined) {
		return cached
	}
	const encoded = marks
		.map((mark) => `${mark.type.name}:${serialize(mark.attrs)}`)
		.toSorted()
		.join('|')
	marksCache.set(marks, encoded)
	return encoded
}
export const semanticTokenEncoder = {
	encodeCharacter(character: number, marks: readonly Mark[]) {
		return `character:${character}:${encodeMarks(marks)}`
	},
	encodeNodeStart(node: Node) {
		return `node-start:${node.type.name}:${serialize(node.attrs)}:${encodeMarks(node.marks)}`
	},
	encodeNodeEnd(node: Node) {
		return `node-end:${node.type.name}`
	},
	compareTokens(a: string, b: string) {
		return a === b
	},
}
export function classifyComparisonDescriptor(beforeDoc: Node, afterDoc: Node, before: Range, after: Range, beforeRoots: readonly Location[], afterRoots: readonly Location[], detail: Descriptor['detail'] = 'inline', excluded: readonly Attr[] = []): Descriptor {
	const safeBefore = boundedRange(before, beforeDoc.content.size)
	const safeAfter = boundedRange(after, afterDoc.content.size)
	const beforeNodes = findNodes(safeBefore, beforeRoots)
	const afterNodes = findNodes(safeAfter, afterRoots)
	const context: Context = {
		before: resolveContext(beforeNodes, safeBefore),
		after: resolveContext(afterNodes, safeAfter),
	}
	const facets = new Set<Facet>()
	const signals: Signal[] = []
	const beforeText = rangeText(safeBefore, beforeRoots)
	const afterText = rangeText(safeAfter, afterRoots)

	if (beforeText !== afterText) {
		facets.add('text')
	}
	classifyMarks(beforeDoc, afterDoc, safeBefore, safeAfter, beforeNodes, afterNodes, facets, signals)
	classifyNodes(beforeNodes, afterNodes, safeBefore, safeAfter, facets, signals)
	classifyAttributes(beforeNodes, afterNodes, facets, signals, excluded)

	if (facets.size === 0) {
		facets.add('unknown')
	}
	return {
		id: '',
		operation: operationFor(safeBefore, safeAfter),
		detail,
		facets: orderedFacets(facets),
		before: safeBefore,
		after: safeAfter,
		context,
		preview: {
			before: previewAtom(safeBefore, beforeText, beforeNodes),
			after: previewAtom(safeAfter, afterText, afterNodes),
		},
		signals: deduplicateSignals(signals),
	}
}
export function classifyNodeMarkupDescriptor(beforeDoc: Node, afterDoc: Node, before: Range, after: Range, beforeRoot: Location, afterRoot: Location): Descriptor | null {
	const safeBefore = boundedRange(before, beforeDoc.content.size)
	const safeAfter = boundedRange(after, afterDoc.content.size)
	const beforeNodes = findNodes(safeBefore, [beforeRoot])
	const afterNodes = findNodes(safeAfter, [afterRoot])
	const facets = new Set<Facet>()
	const signals: Signal[] = []
	classifyDirectAttributes(beforeRoot.node, afterRoot.node, facets, signals)
	classifyDirectMarks(beforeRoot.node, afterRoot.node, facets, signals)
	if (beforeRoot.node.type.name !== afterRoot.node.type.name) {
		facets.add('structure')
		signals.push({ type: 'node' })
	}
	if (facets.size === 0) {
		return null
	}
	return {
		id: '',
		operation: 'replace',
		detail: 'block',
		facets: orderedFacets(facets),
		before: safeBefore,
		after: safeAfter,
		context: {
			before: resolveContext(beforeNodes, safeBefore),
			after: resolveContext(afterNodes, safeAfter),
		},
		preview: {
			before: previewAtom(safeBefore, rangeText(safeBefore, [beforeRoot]), beforeNodes),
			after: previewAtom(safeAfter, rangeText(safeAfter, [afterRoot]), afterNodes),
		},
		signals: deduplicateSignals(signals),
	}
}
function operationFor(before: Range, after: Range): Operation {
	const beforeEmpty = before.from === before.to
	const afterEmpty = after.from === after.to
	return beforeEmpty !== afterEmpty ? (beforeEmpty ? 'insert' : 'delete') : 'replace'
}
function classifyMarks(beforeDoc: Node, afterDoc: Node, before: Range, after: Range, beforeNodes: readonly Location[], afterNodes: readonly Location[], facets: Set<Facet>, signals: Signal[]) {
	classifyMarkMaps(
		collectMarks(beforeDoc, before, beforeNodes),
		collectMarks(afterDoc, after, afterNodes),
		false,
		facets,
		signals,
	)
}
function classifyMarkMaps(previous: ReadonlyMap<string, unknown>, next: ReadonlyMap<string, unknown>, direct: boolean, facets: Set<Facet>, signals: Signal[]) {
	const names = new Set([...previous.keys(), ...next.keys()])
	for (const name of [...names].toSorted()) {
		const before = previous.get(name)
		const after = next.get(name)
		if (serialize(before) === serialize(after)) {
			continue
		}
		const change = before === undefined ? 'added' : after === undefined ? 'removed' : 'changed'
		if (name === 'link') {
			facets.add('attribute')
			signals.push({
				type: 'attribute',
				attribute: direct || change === 'changed' ? 'link-target' : 'link',
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
function classifyNodes(beforeNodes: readonly Location[], afterNodes: readonly Location[], before: Range, after: Range, facets: Set<Facet>, signals: Signal[]) {
	if (structuralShape(beforeNodes, before) === structuralShape(afterNodes, after)) {
		return
	}
	facets.add('structure')
	signals.push({ type: 'node' })
}
function classifyAttributes(beforeNodes: readonly Location[], afterNodes: readonly Location[], facets: Set<Facet>, signals: Signal[], excluded: readonly Attr[]) {
	const previous = collectAttributes(beforeNodes)
	const next = collectAttributes(afterNodes)
	const keys = [...previous.keys()].filter((key) => next.has(key)).toSorted()
	for (const key of keys) {
		const before = previous.get(key)!
		const after = next.get(key)!
		if (serialize(before.value) === serialize(after.value)) {
			continue
		}
		if (before.nodeName !== after.nodeName) {
			continue
		}
		if (after.attribute === 'dir' && isInferredDirectionTransition(
			before.value,
			after.value,
			before.textContent,
			after.textContent,
		)) {
			continue
		}
		const code = attributeCode(after.nodeName, after.attribute)
		if (code && excluded.includes(code)) {
			continue
		}
		addAttributeSignal(code, 'changed', facets, signals)
	}
}
function classifyDirectAttributes(before: Node, after: Node, facets: Set<Facet>, signals: Signal[]) {
	const names = new Set([...Object.keys(before.attrs), ...Object.keys(after.attrs)])
	for (const attribute of [...names].toSorted()) {
		const previous = before.attrs[attribute]
		const next = after.attrs[attribute]
		if (serialize(previous) === serialize(next)) {
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
		addAttributeSignal(
			attributeCode(after.type.name, attribute),
			previous === undefined ? 'added' : next === undefined ? 'removed' : 'changed',
			facets,
			signals,
		)
	}
}
function attributeCode(nodeName: string, attribute: string) {
	return attribute === 'dir' ? 'text-direction' : meaningfulAttributes[nodeName]?.[attribute]
}
function addAttributeSignal(code: Attr | undefined, change: 'added' | 'removed' | 'changed', facets: Set<Facet>, signals: Signal[]) {
	facets.add('attribute')
	if (!code) {
		facets.add('unknown')
	}
	signals.push({ type: 'attribute', attribute: code ?? 'unknown-attribute', change })
}
function classifyDirectMarks(before: Node, after: Node, facets: Set<Facet>, signals: Signal[]) {
	const previous = new Map(before.marks.map((mark) => [mark.type.name, serialize(mark.attrs)]))
	const next = new Map(after.marks.map((mark) => [mark.type.name, serialize(mark.attrs)]))
	classifyMarkMaps(previous, next, true, facets, signals)
}
function collectMarks(doc: Node, range: Range, nodes: readonly Location[]) {
	const marks = new Map<string, string[]>()
	const add = (mark: Mark) => {
		const values = marks.get(mark.type.name) ?? []
		const encoded = serialize(mark.attrs)
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
function resolveContext(nodes: readonly Location[], range: Range): ContextLocation | null {
	const candidate = contextCandidates(nodes).toSorted((a, b) => compareContextCandidates(a, b, range))[0]
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
		code: contextCodes[candidate.node.type.name]!,
		path: candidate.path,
		from: candidate.from,
		to: candidate.to,
	}
}
function contextCandidates(nodes: readonly Location[]) {
	return nodes.filter(({ node }) => contextCodes[node.type.name] !== undefined)
}
function structuralShape(nodes: readonly Location[], range: Range) {
	const contained = nodes.filter(({ node, from, to }) => !node.isText
		&& range.from <= from
		&& range.to >= to)
	const containedNodes = new Set(contained)
	const roots = contained.filter(({ parent }) => !parent || !containedNodes.has(parent))
	return roots.map(({ node }) => nodeShape(node)).join('|')
}
function isInferredDirectionTransition(before: unknown, after: unknown, beforeText: string, afterText: string) {
	return (!before || !after)
		&& beforeText !== afterText
		&& before === getTextDirection(beforeText)
		&& after === getTextDirection(afterText)
}
function nodeShape(node: Node): string {
	const cached = nodeShapeCache.get(node)
	if (cached !== undefined) {
		return cached
	}
	if (node.isText) {
		return ''
	}
	const children: string[] = []
	node.forEach((child) => {
		const shape = nodeShape(child)
		if (shape && children.at(-1) !== shape) {
			children.push(shape)
		}
	})
	const shape = `${node.type.name}(${children.join(',')})`
	nodeShapeCache.set(node, shape)
	return shape
}
function collectAttributes(nodes: readonly Location[]) {
	const records = new Map<string, AttributeRecord>()
	const topLevelIndices = [...new Set(nodes.map(({ path }) => path[0]).filter((index) => index !== undefined))]
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
			records.set(`${relativePath.join('.')}:${node.type.name}:${attribute}`, {
				nodeName: node.type.name,
				attribute,
				value,
				textContent: node.textContent,
			})
		}
	}
	return records
}
function previewAtom(range: Range, rangeText: string, nodes: readonly Location[]): Preview | null {
	if (range.from === range.to) {
		return null
	}
	const text = frontMatterPreview(range, nodes)
		|| normalizePreview(rangeText.replaceAll('\ufffc', ''))
	if (text) {
		return { kind: 'text', text: truncateGraphemes(text, 96) }
	}
	const contextNode = contextCandidates(nodes).toSorted(compareContextCandidates)[0] ?? nodes[0]
	const contextText = normalizePreview(contextNode?.node.textContent ?? '')
	if (contextText) {
		return { kind: 'text', text: truncateGraphemes(contextText, 96) }
	}
	const nodeName = contextNode?.node.type.name
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
function frontMatterPreview(range: Range, nodes: readonly Location[]) {
	const frontMatter = nodes.find(({ node, from, to }) => (
		node.type.name === 'frontMatter' && range.from <= to && range.to >= from
	))
	if (!frontMatter) {
		return ''
	}
	const content = frontMatter.node.textContent
	const contentStart = frontMatter.from + 1
	const from = clamp(range.from - contentStart, 0, content.length)
	const to = clamp(range.to - contentStart, from, content.length)
	const lineStart = content.lastIndexOf('\n', Math.max(0, from - 1)) + 1
	const nextBreak = content.indexOf('\n', to)
	return normalizePreview(content.slice(lineStart, nextBreak < 0 ? content.length : nextBreak))
}
function compareContextCandidates(a: Location, b: Location, range?: Range) {
	const aCode = contextCodes[a.node.type.name]!
	const bCode = contextCodes[b.node.type.name]!
	return Number(coversRange(b, bCode, range)) - Number(coversRange(a, aCode, range))
		|| contextPriority[bCode] - contextPriority[aCode]
		|| b.path.length - a.path.length
		|| a.from - b.from
}
function coversRange(location: Location, code: ContextCode, range: Range | undefined) {
	return range !== undefined
		&& (code === 'table' || code === 'table-row')
		&& location.from === range.from
		&& location.to === range.to
}
function normalizePreview(value: string) {
	return value.replace(/\s+/gu, ' ').trim()
}
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
function orderedFacets(facets: Set<Facet>) {
	const order: Facet[] = ['text', 'formatting', 'attribute', 'structure', 'unknown']
	return order.filter((facet) => facets.has(facet))
}
function deduplicateSignals(signals: Signal[]) {
	const byValue = new Map(signals.map((signal) => [serialize(signal), signal]))
	return [...byValue.values()].toSorted((a, b) => compareCodeUnits(serialize(a), serialize(b)))
}
function boundedRange(range: Range, maximum: number) {
	const from = clamp(range.from, 0, maximum)
	return { from, to: clamp(range.to, from, maximum) }
}
function clamp(value: number, minimum: number, maximum: number) {
	return Math.min(Math.max(value, minimum), maximum)
}
export function deepFreeze<T>(value: T): T {
	if (value && typeof value === 'object' && !Object.isFrozen(value)) {
		Object.freeze(value)
		for (const child of Object.values(value)) {
			deepFreeze(child)
		}
	}
	return value
}
