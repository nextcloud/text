/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { ComparisonWorkLedger as Ledger, ComparisonAlignmentOptions as Options, ComparisonAlignmentRegion as Region, ComparisonAlignmentStep as Step } from './comparisonAlignment.ts'
import type { ComparisonDocumentIndex as DocumentIndex, LocatedComparisonNode as Location } from './comparisonDocumentIndex.ts'
import type { ReservedExactMovePair as MovePair } from './markdownComparisonMoves.ts'
import type { ComparisonAttributeCode as Attr, ComparisonDescriptor as Descriptor, ComparisonEdit as Edit, ComparisonEditKind as EditKind, MarkdownComparisonModel as Model, ComparisonRange as Range, ComparisonCoarseReason as Reason, ComparisonSide as Side } from './markdownComparisonTypes.ts'

import { ChangeSet, simplifyChanges } from '@tiptap/pm/changeset'
import { StepMap } from '@tiptap/pm/transform'
import { alignComparisonAxis as alignAxis, alignComparisonColumns as alignColumns, createComparisonWorkLedger as createLedger } from './comparisonAlignment.ts'
import { createComparisonDocumentIndex as indexDocument, comparisonRangeText as rangeText } from './comparisonDocumentIndex.ts'
import { classifyComparisonDescriptor as classify, classifyNodeMarkupDescriptor as classifyMarkup, compareCodeUnits, deepFreeze, nodeFingerprint as nodeKey, semanticTokenEncoder, stableSerialize as serialize } from './markdownComparisonClassification.ts'
import { confirmReservedExactMoves as confirmMoves } from './markdownComparisonMoves.ts'

export const MAX_INLINE_ENVELOPE_SIZE = 4500
export const MAX_RENDERED_COMPARISON_DESCRIPTORS = 10_000
export const MAX_TABLE_ROWS = 512
export const MAX_TABLE_PHYSICAL_CELLS = 10_000

export class ComparisonModelLimitError extends Error {
	constructor() {
		super('Rendered comparison change limit reached')
		this.name = 'ComparisonModelLimitError'
	}
}
interface ComparisonModelOptions {
	maximumDescriptors?: number
}
type PendingEdit = Omit<Edit, 'id'>

interface Builder {
	originalBefore: Node
	originalAfter: Node
	originalBeforeIndex: DocumentIndex
	originalAfterIndex: DocumentIndex
	comparisonBefore: Node
	edits: PendingEdit[]
	descriptorCount: number
	maximumDescriptors: number
	work: Ledger
}
interface AxisEntry {
	before: readonly Location[]
	after: readonly Location[]
	coarseReason?: Reason
}
interface TableRow {
	location: Location
	kind: 'header' | 'body'
	cells: readonly Location[]
}
interface RowPair {
	before: TableRow
	after: TableRow
	slot: number
}
interface Column {
	index: number
	fingerprint: string
	profile: () => readonly string[]
	cells: ReadonlyMap<number, Location>
}
interface AxisNode {
	location: Location
	fingerprint: string
	profile: () => readonly string[]
}
const NODE_TOKEN = '\u0000'
const CHARACTER_TOKEN = '\u0001'
const PAIR_COUNT_TOKEN = '\u0002'
const ORDINAL_TOKEN = '\u0003'
const ROW_KIND_TOKEN = '\u0004'
const COLUMN_TOKEN = '\u0005'
const ABSENT_CELL_TOKEN = '\u0006'

const profileCache = new WeakMap<Node, readonly string[]>()

export function createHierarchicalMarkdownComparisonModel(originalBefore: Node, originalAfter: Node, options: ComparisonModelOptions = {}): Model {
	const comparisonBefore = normalizeSchema(originalBefore, originalAfter)
	const originalBeforeIndex = indexDocument(originalBefore)
	const originalAfterIndex = indexDocument(originalAfter)
	const comparisonBeforeIndex = comparisonBefore === originalBefore
		? originalBeforeIndex
		: indexDocument(comparisonBefore)
	const builder: Builder = {
		originalBefore,
		originalAfter,
		originalBeforeIndex,
		originalAfterIndex,
		comparisonBefore,
		edits: [],
		descriptorCount: 0,
		maximumDescriptors: options.maximumDescriptors ?? MAX_RENDERED_COMPARISON_DESCRIPTORS,
		work: createLedger(),
	}
	compareSiblingAxis(
		builder,
		comparisonBeforeIndex.children,
		originalAfterIndex.children,
		0,
		comparisonBefore.content.size,
		0,
		originalAfter.content.size,
		true,
	)

	return deepFreeze({ edits: finalizeEdits(builder.edits) })
}
function normalizeSchema(before: Node, after: Node) {
	if (before.type.schema === after.type.schema) {
		return before
	}
	const rebuilt = after.type.schema.nodeFromJSON(before.toJSON())
	if (rebuilt.nodeSize !== before.nodeSize) {
		throw new Error('Markdown comparison schema normalization changed document positions')
	}
	if (rebuilt.textBetween(0, rebuilt.content.size, '\n', '\ufffc')
		!== before.textBetween(0, before.content.size, '\n', '\ufffc')) {
		throw new Error('Markdown comparison schema normalization changed document content')
	}
	if (serialize(rebuilt.toJSON()) !== serialize(before.toJSON())) {
		throw new Error('Markdown comparison schema normalization lost semantics')
	}
	return rebuilt
}
function compareSiblingAxis(builder: Builder, before: readonly Location[], after: readonly Location[], beforeStart: number, beforeEnd: number, afterStart: number, afterEnd: number, topLevel: boolean, excluded: readonly Attr[] = []) {
	const entries = axisEntries(before, after, alignAxis(before, after, axisOptions(builder)))
	const groups = topLevel ? confirmedMoveGroups(builder, entries) : []
	const moved = new Set(groups.flat().flatMap(({ before: a, after: b }) => [a, b]))
	const missingBefore = precomputeMissing(entries, 'before', beforeStart, beforeEnd)
	const missingAfter = precomputeMissing(entries, 'after', afterStart, afterEnd)
	for (const [index, entry] of entries.entries()) {
		if (entry.coarseReason) {
			emitCoarse(builder, entry.before, entry.after, entry.coarseReason, excluded)
		} else if (entry.before[0] && entry.after[0]) {
			compareNodes(builder, entry.before[0], entry.after[0], true, excluded)
		} else if (entry.before[0] && !moved.has(entry.before[0])) {
			const missing = missingAfter[index]!
			emitBlock(builder, entry.before[0], null, missing, excluded)
		} else if (entry.after[0] && !moved.has(entry.after[0])) {
			const missing = missingBefore[index]!
			emitBlock(builder, null, entry.after[0], missing, excluded)
		}
	}
	for (const group of groups) {
		emitMove(builder, group)
	}
}
function axisEntries(before: readonly Location[], after: readonly Location[], regions: readonly Region[]): readonly AxisEntry[] {
	return regions.map((region) => {
		if ('coarseReason' in region) {
			return {
				before: before.slice(region.before.from, region.before.to),
				after: after.slice(region.after.from, region.after.to),
				coarseReason: region.coarseReason,
			}
		}
		return {
			before: region.before === null ? [] : [before[region.before]!],
			after: region.after === null ? [] : [after[region.after]!],
		}
	})
}
function confirmedMoveGroups(builder: Builder, entries: readonly AxisEntry[]) {
	const deleted = entries.filter((entry) => !entry.coarseReason && entry.before[0] && !entry.after[0])
	const inserted = entries.filter((entry) => !entry.coarseReason && entry.after[0] && !entry.before[0])
	const insertedByFingerprint = new Map(inserted.map((entry) => [
		nodeKey(entry.after[0]!.node),
		entry.after[0]!,
	]))
	const candidates: MovePair[] = []
	for (const entry of deleted) {
		const fingerprint = nodeKey(entry.before[0]!.node)
		const match = insertedByFingerprint.get(fingerprint)
		if (match) {
			candidates.push({ before: entry.before[0]!, after: match, fingerprint })
		}
	}
	const groups = confirmMoves(builder.comparisonBefore, builder.originalAfter, candidates).groups
	const deletedNodes = new Map(deleted.map((entry) => [entry.before[0]!.index, entry.before[0]!]))
	const insertedNodes = new Map(inserted.map((entry) => [entry.after[0]!.index, entry.after[0]!]))
	return groups.map((group) => extendMovedHeadingGroup(group, deletedNodes, insertedNodes))
}
function extendMovedHeadingGroup(group: readonly MovePair[], deletedNodes: ReadonlyMap<number, Location>, insertedNodes: ReadonlyMap<number, Location>) {
	const first = group[0]!
	if (first.before.node.type.name !== 'heading' || first.after.node.type.name !== 'heading') {
		return [...group]
	}
	const extended = [...group]
	let beforeIndex = group.at(-1)!.before.index + 1
	let afterIndex = group.at(-1)!.after.index + 1
	while (true) {
		const before = deletedNodes.get(beforeIndex)
		const after = insertedNodes.get(afterIndex)
		if (!before || !after) {
			break
		}
		if (before.node.type.name === 'heading' || after.node.type.name === 'heading'
			|| !before.node.eq(after.node)) {
			break
		}
		extended.push({ before, after, fingerprint: nodeKey(before.node) })
		beforeIndex++
		afterIndex++
	}
	return extended
}
function precomputeMissing(entries: readonly AxisEntry[], side: Side, start: number, end: number) {
	const previousAt: Array<Location | null> = new Array(entries.length)
	let previous: Location | null = null
	for (const [index, entry] of entries.entries()) {
		previousAt[index] = previous
		previous = entry[side].at(-1) ?? previous
	}
	const locations = new Array<number>(entries.length)
	let next: Location | null = null
	for (let index = entries.length - 1; index >= 0; index--) {
		previous = previousAt[index]!
		locations[index] = next?.from
			?? previous?.to
			?? Math.min(Math.max(start, 0), end)
		next = entries[index]![side][0] ?? next
	}
	return locations
}
function compareNodes(builder: Builder, before: Location, after: Location, markup = true, excluded: readonly Attr[] = []) {
	if (before.node.eq(after.node)) {
		return
	}
	if (before.node.type.name === 'table' && after.node.type.name === 'table') {
		compareTables(builder, before, after)
		return
	}
	if (before.node.isTextblock && after.node.isTextblock) {
		compareTextblocks(builder, before, after, markup, excluded)
		return
	}
	if (before.node.isLeaf || after.node.isLeaf || before.node.isAtom || after.node.isAtom) {
		emitBlock(builder, before, after)
		return
	}
	const nestedExcludedAttributes = markup && !before.node.sameMarkup(after.node)
		? [...new Set([...excluded, ...emitMarkup(builder, before, after)])]
		: excluded
	compareSiblingAxis(
		builder,
		before.children,
		after.children,
		before.from + 1,
		before.to - 1,
		after.from + 1,
		after.to - 1,
		false,
		nestedExcludedAttributes,
	)
}
function compareTextblocks(builder: Builder, before: Location, after: Location, markup = true, excluded: readonly Attr[] = []) {
	const start = before.node.content.findDiffStart(after.node.content)
	if (start === null) {
		if (markup && !before.node.sameMarkup(after.node)) {
			emitMarkup(builder, before, after)
		}
		return
	}
	const diffEnd = before.node.content.findDiffEnd(after.node.content)
	if (!diffEnd) {
		emitBlock(builder, before, after, 0, excluded)
		return
	}
	let { a: endA, b: endB } = diffEnd
	if (endA < start) {
		endB += start - endA
		endA = start
	}
	if (endB < start) {
		endA += start - endB
		endB = start
	}
	if ((endA - start) + (endB - start) > MAX_INLINE_ENVELOPE_SIZE) {
		emitBlock(builder, before, after, 0, excluded)
		return
	}
	const map = new StepMap([0, before.node.content.size, after.node.content.size])
	const changes = simplifyChanges(
		ChangeSet.create(before.node, undefined, semanticTokenEncoder)
			.addSteps(after.node, [map], null)
			.changes,
		after.node,
	)
	const beforeRoot = originalLocation(builder, 'before', before)
	const afterRoot = originalLocation(builder, 'after', after)
	const inlineRanges = changes.map((change) => ({
		before: { from: before.from + 1 + change.fromA, to: before.from + 1 + change.toA },
		after: { from: after.from + 1 + change.fromB, to: after.from + 1 + change.toB },
		local: change,
	}))
	const valid = inlineRanges.length > 0 && inlineRanges.every(({ before: beforeRange, after: afterRange, local }) => (
		validLocalRange(local.fromA, local.toA, before.node.content.size)
		&& validLocalRange(local.fromB, local.toB, after.node.content.size)
		&& before.node.textBetween(local.fromA, local.toA, '\n', '\ufffc')
		=== rangeText(beforeRange, [beforeRoot])
		&& after.node.textBetween(local.fromB, local.toB, '\n', '\ufffc')
		=== rangeText(afterRange, [afterRoot])
	))
	if (!valid) {
		emitBlock(builder, before, after, 0, excluded)
		return
	}
	const contentExcludedAttributes = markup && !before.node.sameMarkup(after.node)
		? [...new Set([...excluded, ...emitMarkup(builder, before, after)])]
		: excluded
	for (const { before: beforeRange, after: afterRange } of inlineRanges) {
		pushContent(builder, descriptorFor(
			builder,
			beforeRange,
			afterRange,
			[before],
			[after],
			'inline',
			contentExcludedAttributes,
		))
	}
}
function validLocalRange(from: number, to: number, maximum: number) {
	return Number.isInteger(from) && Number.isInteger(to) && from >= 0 && to >= from && to <= maximum
}
function tableShape(table: Location) {
	const rows: TableRow[] = []
	let physicalCells = 0
	let index = table.children[0]?.node.type.name === 'tableCaption' ? 1 : 0
	if (table.children[index]?.node.type.name !== 'tableHeadRow') {
		return null
	}
	for (; index < table.children.length; index++) {
		const child = table.children[index]!
		const name = child.node.type.name
		const header = rows.length === 0
		if ((header ? name !== 'tableHeadRow' : name !== 'tableRow') || child.children.length === 0) {
			return null
		}
		const expectedCell = header ? 'tableHeader' : 'tableCell'
		for (const cell of child.children) {
			if (cell.node.type.name !== expectedCell
				|| (cell.node.attrs.colspan ?? 1) !== 1
				|| (cell.node.attrs.rowspan ?? 1) !== 1) {
				return null
			}
		}
		physicalCells += child.children.length
		rows.push({
			location: child,
			kind: header ? 'header' : 'body',
			cells: child.children,
		})
		if (rows.length > MAX_TABLE_ROWS || physicalCells > MAX_TABLE_PHYSICAL_CELLS) {
			return null
		}
	}
	return rows
}
function compareTables(builder: Builder, before: Location, after: Location) {
	const beforeRows = tableShape(before)
	const afterRows = tableShape(after)
	if (!beforeRows || !afterRows) {
		emitCoarse(builder, [before], [after], 'unsupported-table')
		return
	}
	const seedEntries = axisEntries(
		before.children,
		after.children,
		alignAxis(before.children, after.children, axisOptions(builder)),
	)
	const coarse = seedEntries.find(({ coarseReason }) => coarseReason)
	if (coarse) {
		emitCoarse(builder, [before], [after], coarse.coarseReason!)
		return
	}
	const beforeRowOf = new Map(beforeRows.map((row) => [row.location, row]))
	const afterRowOf = new Map(afterRows.map((row) => [row.location, row]))
	const seedRowPairs = pairedRows(seedEntries, beforeRowOf, afterRowOf)
	const seedPlan = tablePlan(builder, seedRowPairs, seedEntries.length)
	if ('coarseReason' in seedPlan) {
		emitCoarse(builder, [before], [after], seedPlan.coarseReason)
		return
	}
	const { beforeCols: seedBeforeColumns, afterCols: seedAfterColumns, steps: seedSteps } = seedPlan
	if (seedSteps.every((step) => step.before !== null && step.after !== null)) {
		if (exactEvidenceConflict(seedBeforeColumns, seedAfterColumns, seedSteps)) {
			emitCoarse(builder, [before], [after], 'table-evidence-conflict')
			return
		}
		emitTablePlan(
			builder,
			before,
			after,
			seedEntries,
			seedRowPairs,
			seedBeforeColumns,
			seedAfterColumns,
			seedSteps,
		)
		return
	}
	const beforeAxis = tableAxisRecords(before.children, beforeRowOf, seedSteps, 'before')
	const afterAxis = tableAxisRecords(after.children, afterRowOf, seedSteps, 'after')
	const entries = axisEntries(
		before.children,
		after.children,
		alignAxis(beforeAxis, afterAxis, {
			work: builder.work,
			fingerprint: ({ fingerprint }) => fingerprint,
			profile: ({ profile }) => profile(),
			compatible: (left, right) => left.location.node.type === right.location.node.type,
		}),
	)
	const sharedCoarse = entries.find(({ coarseReason }) => coarseReason)
	if (sharedCoarse) {
		emitCoarse(builder, [before], [after], tableConflictReason(sharedCoarse.coarseReason!))
		return
	}
	const rowPairs = pairedRows(entries, beforeRowOf, afterRowOf)
	const plan = tablePlan(builder, rowPairs, entries.length)
	if ('coarseReason' in plan) {
		emitCoarse(builder, [before], [after], tableConflictReason(plan.coarseReason))
		return
	}
	const { beforeCols, afterCols, steps } = plan
	if (!sameSteps(seedSteps, steps)
		|| exactEvidenceConflict(beforeCols, afterCols, steps)) {
		emitCoarse(builder, [before], [after], 'table-evidence-conflict')
		return
	}
	emitTablePlan(builder, before, after, entries, rowPairs, beforeCols, afterCols, steps)
}
function tableConflictReason(reason: Reason): Reason {
	return reason === 'comparison-limit' ? reason : 'table-evidence-conflict'
}
function pairedRows(entries: readonly AxisEntry[], beforeRows: ReadonlyMap<Location, TableRow>, afterRows: ReadonlyMap<Location, TableRow>) {
	return entries.flatMap((entry, slot) => {
		const before = entry.before[0] && beforeRows.get(entry.before[0])
		const after = entry.after[0] && afterRows.get(entry.after[0])
		return before && after ? [{ before, after, slot }] : []
	})
}
function tablePlan(builder: Builder, rows: readonly RowPair[], slots: number) {
	const beforeCols = columnRecords(rows, 'before', slots)
	const afterCols = columnRecords(rows, 'after', slots)
	const plan = tableColumnPlan(builder, beforeCols, afterCols)
	return 'coarseReason' in plan ? plan : { beforeCols, afterCols, steps: plan.steps }
}
function tableColumnPlan(builder: Builder, beforeCols: readonly Column[], afterCols: readonly Column[]): { steps: readonly Step[] } | { coarseReason: Reason } {
	const steps: Step[] = []
	for (const region of alignColumns(beforeCols, afterCols, {
		work: builder.work,
		fingerprint: ({ fingerprint }) => fingerprint,
		profile: ({ profile }) => profile(),
		compatible: () => true,
	})) {
		if ('coarseReason' in region) {
			return { coarseReason: region.coarseReason }
		}
		steps.push(region)
	}
	return { steps }
}
function columnRecords(rowPairs: readonly RowPair[], side: Side, slotCount: number): readonly Column[] {
	let width = 0
	for (const pair of rowPairs) {
		const row = pair[side]
		width = Math.max(width, row.cells.length)
	}
	const cellsByColumn = Array.from({ length: width }, () => new Map<number, Location>())
	const rowKinds = new Map<number, TableRow['kind']>()
	for (const pair of rowPairs) {
		const row = pair[side]
		rowKinds.set(pair.slot, row.kind)
		for (const [index, cell] of row.cells.entries()) {
			cellsByColumn[index]!.set(pair.slot, cell)
		}
	}
	return cellsByColumn.map((cells, index) => {
		const fingerprint = [
			`${slotCount}`,
			...[...cells].map(([slot, cell]) => `${slot}:${rowKinds.get(slot)!}:${nodeKey(cell.node)}`),
		].join('|')
		let materializedProfile: readonly string[] | undefined
		const profile = () => materializedProfile ??= [
			`${PAIR_COUNT_TOKEN}${slotCount}`,
			...[...cells].flatMap(([slot, cell]) => [
				`${ORDINAL_TOKEN}${slot}`,
				`${ROW_KIND_TOKEN}${rowKinds.get(slot)!}`,
				...[...cell.node.textContent.normalize('NFC')].map((character) => `${CHARACTER_TOKEN}${character}`),
			]),
		]
		return { index, fingerprint, profile, cells }
	})
}
function tableAxisRecords(locations: readonly Location[], rowOf: ReadonlyMap<Location, TableRow>, steps: readonly Step[], side: Side): readonly AxisNode[] {
	const retainedColumns = steps.flatMap((step) => {
		if (step.before === null || step.after === null) {
			return []
		}
		return [side === 'before' ? step.before : step.after]
	})
	return locations.map((location) => {
		const row = rowOf.get(location)
		if (!row) {
			return {
				location,
				fingerprint: nodeKey(location.node),
				profile: () => nodeProfile(location.node),
			}
		}
		const cells = retainedColumns.map((column) => row.cells[column])
		const fingerprint = serialize([
			row.kind,
			...cells.map((cell) => cell ? nodeKey(cell.node) : null),
		])
		let materializedProfile: readonly string[] | undefined
		const profile = () => materializedProfile ??= [
			`${ROW_KIND_TOKEN}${row.kind}`,
			...cells.flatMap((cell, column) => [
				`${COLUMN_TOKEN}${column}`,
				...(cell ? nodeProfile(cell.node) : [ABSENT_CELL_TOKEN]),
			]),
		]
		return { location, fingerprint, profile }
	})
}
function sameSteps(candidate: readonly Step[], refined: readonly Step[]) {
	return candidate.length === refined.length
		&& candidate.every((step, index) => (
			step.before === refined[index]!.before && step.after === refined[index]!.after
		))
}
function exactEvidenceConflict(beforeCols: readonly Column[], afterCols: readonly Column[], steps: readonly Step[]) {
	const unmatchedColumns = { before: [] as string[], after: [] as string[] }
	const unmatchedCells = { before: [] as string[], after: [] as string[] }
	for (const step of steps) {
		const columns = [
			step.before === null ? null : beforeCols[step.before]!,
			step.after === null ? null : afterCols[step.after]!,
		] as const
		if (!columns[0] || !columns[1]) {
			const side = columns[0] ? 'before' : 'after'
			const column = columns[0] ?? columns[1]!
			unmatchedColumns[side].push(column.fingerprint)
			unmatchedCells[side].push(...[...column.cells.values()].map(({ node }) => nodeKey(node)))
			continue
		}
		if (columns[0].fingerprint !== columns[1].fingerprint) {
			unmatchedColumns.before.push(columns[0].fingerprint)
			unmatchedColumns.after.push(columns[1].fingerprint)
		}
		for (const ordinal of new Set([...columns[0].cells.keys(), ...columns[1].cells.keys()])) {
			const cells = [columns[0].cells.get(ordinal), columns[1].cells.get(ordinal)] as const
			const fingerprints = cells.map((cell) => cell && nodeKey(cell.node))
			if (fingerprints[0] !== fingerprints[1]) {
				if (fingerprints[0]) {
					unmatchedCells.before.push(fingerprints[0])
				}
				if (fingerprints[1]) {
					unmatchedCells.after.push(fingerprints[1])
				}
			}
		}
	}
	return sharesValue(unmatchedColumns.before, unmatchedColumns.after)
		|| sharesValue(unmatchedCells.before, unmatchedCells.after)
}
function sharesValue(before: readonly string[], after: readonly string[]) {
	const known = new Set(before)
	return after.some((value) => known.has(value))
}
function emitTablePlan(builder: Builder, before: Location, after: Location, entries: readonly AxisEntry[], rowPairs: readonly RowPair[], beforeCols: readonly Column[], afterCols: readonly Column[], steps: readonly Step[]) {
	const pairedRows = new Set(rowPairs.map(({ before: row }) => row.location))
	const missingBefore = precomputeMissing(entries, 'before', before.from + 1, before.to - 1)
	const missingAfter = precomputeMissing(entries, 'after', after.from + 1, after.to - 1)
	for (const [index, entry] of entries.entries()) {
		if (entry.before[0] && entry.after[0]) {
			if (!pairedRows.has(entry.before[0])) {
				compareNodes(builder, entry.before[0], entry.after[0])
			}
		} else if (entry.before[0]) {
			const missing = missingAfter[index]!
			emitBlock(builder, entry.before[0], null, missing)
		} else if (entry.after[0]) {
			const missing = missingBefore[index]!
			emitBlock(builder, null, entry.after[0], missing)
		}
	}
	const slots = counterpartSlots(steps, beforeCols.length, afterCols.length)
	for (const step of steps) {
		if (step.before !== null && step.after !== null) {
			comparePairedColumn(builder, rowPairs, beforeCols[step.before]!, afterCols[step.after]!)
		} else if (step.before !== null) {
			emitColumnEdit(builder, rowPairs, beforeCols[step.before]!, 'before', slots.after[step.before]!)
		} else if (step.after !== null) {
			emitColumnEdit(builder, rowPairs, afterCols[step.after]!, 'after', slots.before[step.after]!)
		}
	}
}
function counterpartSlots(steps: readonly Step[], beforeCount: number, afterCount: number) {
	const after = new Array<number>(beforeCount).fill(afterCount)
	const before = new Array<number>(afterCount).fill(beforeCount)
	let pendingAfter = afterCount
	let pendingBefore = beforeCount
	for (const step of steps.toReversed()) {
		if (step.after !== null) {
			pendingAfter = step.after
		} else if (step.before !== null) {
			after[step.before] = pendingAfter
		}
		if (step.before !== null) {
			pendingBefore = step.before
		} else if (step.after !== null) {
			before[step.after] = pendingBefore
		}
	}
	return { before, after }
}
function comparePairedColumn(builder: Builder, rowPairs: readonly RowPair[], before: Column, after: Column) {
	const pairedCells = rowPairs.flatMap((pair) => {
		const beforeCell = before.cells.get(pair.slot)
		const afterCell = after.cells.get(pair.slot)
		return beforeCell && afterCell ? [{ pair, beforeCell, afterCell }] : []
	})
	const markup = pairedCells.flatMap(({ pair, beforeCell, afterCell }) => {
		const descriptor = markupDescriptor(builder, beforeCell, afterCell)
		return descriptor ? [{ descriptor, row: pair.before.kind }] : []
	})
	if (markup.length) {
		const header = markup.findIndex(({ row }) => row === 'header')
		pushEdit(
			builder,
			'content',
			markup[header < 0 ? 0 : header]!.descriptor,
			markup.map(({ descriptor }) => descriptor),
		)
	}
	for (const pair of rowPairs) {
		const beforeCell = before.cells.get(pair.slot)
		const afterCell = after.cells.get(pair.slot)
		if (beforeCell && afterCell) {
			compareNodes(builder, beforeCell, afterCell, false, ['table-alignment'])
		} else if (beforeCell) {
			const slot = cellSlot(pair.after, after.index)
			emitBlock(builder, beforeCell, null, slot)
		} else if (afterCell) {
			const slot = cellSlot(pair.before, before.index)
			emitBlock(builder, null, afterCell, slot)
		}
	}
}
function emitColumnEdit(builder: Builder, rowPairs: readonly RowPair[], column: Column, side: Side, counterpart: number) {
	const rowPairOf = new Map(rowPairs.map((pair) => [pair.slot, pair]))
	const present = [...column.cells].flatMap(([slot, cell]) => {
		const pair = rowPairOf.get(slot)
		return pair ? [{ pair, cell }] : []
	})
	if (present.length === 0) {
		return
	}
	const descriptors = present.map(({ pair, cell }) => {
		const slot = cellSlot(side === 'before' ? pair.after : pair.before, counterpart)
		return blockDescriptor(
			builder,
			side === 'before' ? cell : null,
			side === 'before' ? null : cell,
			slot,
		)
	})
	const header = present.findIndex(({ pair }) => pair[side].kind === 'header')
	pushEdit(builder, 'table-column', descriptors[header < 0 ? 0 : header]!, descriptors)
}
function cellSlot(row: TableRow, columnIndex: number) {
	const cell = row.cells[columnIndex]
	if (cell) {
		return cell.from
	}
	return row.location.to - 1
}
function emitMarkup(builder: Builder, before: Location, after: Location) {
	const descriptor = markupDescriptor(builder, before, after)
	pushContent(builder, descriptor)
	return descriptor?.signals.flatMap((signal) => signal.type === 'attribute' ? [signal.attribute] : []) ?? []
}
function emitBlock(builder: Builder, before: Location | null, after: Location | null, absentPosition = 0, excluded: readonly Attr[] = []) {
	pushContent(builder, blockDescriptor(builder, before, after, absentPosition, excluded))
}
function blockDescriptor(builder: Builder, before: Location | null, after: Location | null, absentPosition: number, excluded: readonly Attr[] = []) {
	return descriptorFor(
		builder,
		before ? rangeFor(before) : emptyRange(absentPosition),
		after ? rangeFor(after) : emptyRange(absentPosition),
		before ? [before] : [],
		after ? [after] : [],
		'block',
		excluded,
	)
}
function emitCoarse(builder: Builder, before: readonly Location[], after: readonly Location[], coarseReason: Reason, excluded: readonly Attr[] = []) {
	pushContent(builder, {
		...descriptorFor(
			builder,
			{ from: before[0]!.from, to: before.at(-1)!.to },
			{ from: after[0]!.from, to: after.at(-1)!.to },
			before,
			after,
			'block',
			excluded,
		),
		coarseReason,
	})
}
function emitMove(builder: Builder, group: readonly MovePair[]) {
	const first = group[0]!
	const last = group.at(-1)!
	pushContent(builder, {
		...descriptorFor(
			builder,
			{ from: first.before.from, to: last.before.to },
			{ from: first.after.from, to: last.after.to },
			group.map(({ before }) => before),
			group.map(({ after }) => after),
			'block',
		),
		operation: 'move',
		facets: ['structure'],
		signals: [{ type: 'node' }],
	})
}
function pushContent(builder: Builder, descriptor: Descriptor | null) {
	if (descriptor) {
		pushEdit(builder, 'content', descriptor, [descriptor])
	}
}
function pushEdit(builder: Builder, kind: EditKind, primary: Descriptor, descriptors: Descriptor[]) {
	builder.descriptorCount += descriptors.length
	if (builder.descriptorCount > builder.maximumDescriptors) {
		throw new ComparisonModelLimitError()
	}
	builder.edits.push({ kind, primary, descriptors })
}
function finalizeEdits(pending: readonly PendingEdit[]): readonly Edit[] {
	let descriptorCount = 0
	return pending
		.toSorted((a, b) => compareDescriptors(a.primary, b.primary))
		.map((edit, index) => {
			const identified = new Map(edit.descriptors
				.toSorted(compareDescriptors)
				.map((descriptor) => [descriptor, {
					...descriptor,
					id: `change-${(descriptorCount++).toString(36)}`,
				}]))
			return {
				id: `edit-${index.toString(36)}`,
				kind: edit.kind,
				primary: identified.get(edit.primary)!,
				descriptors: [...identified.values()],
			}
		})
}
function compareDescriptors(a: Descriptor, b: Descriptor) {
	return a.after.from - b.after.from
		|| a.before.from - b.before.from
		|| a.after.to - b.after.to
		|| a.before.to - b.before.to
		|| compareCodeUnits(a.operation, b.operation)
}
function axisOptions(builder: Builder): Options<Location> {
	return {
		work: builder.work,
		fingerprint: ({ node }) => nodeKey(node),
		profile: ({ node }) => nodeProfile(node),
		compatible: (before, after) => before.node.type === after.node.type
			|| (before.node.isTextblock && after.node.isTextblock),
	}
}
function nodeProfile(node: Node): readonly string[] {
	const cached = profileCache.get(node)
	if (cached !== undefined) {
		return cached
	}
	const profile = node.isTextblock
		? [...node.textContent.normalize('NFC').replace(/\s+/gu, ' ').trim()]
		: structuralTokens(node, [])
	profileCache.set(node, profile)
	return profile
}
function structuralTokens(node: Node, tokens: string[]) {
	node.forEach((child) => {
		if (child.isText) {
			for (const character of (child.text ?? '').normalize('NFC')) {
				tokens.push(`${CHARACTER_TOKEN}${character}`)
			}
		} else {
			tokens.push(`${NODE_TOKEN}${child.type.name}`)
			structuralTokens(child, tokens)
		}
	})
	return tokens
}
function descriptorFor(builder: Builder, before: Range, after: Range, beforeNodes: readonly Location[], afterNodes: readonly Location[], detail: Descriptor['detail'], excluded: readonly Attr[] = []) {
	return classify(
		builder.originalBefore,
		builder.originalAfter,
		before,
		after,
		originalLocations(builder, 'before', beforeNodes),
		originalLocations(builder, 'after', afterNodes),
		detail,
		excluded,
	)
}
function markupDescriptor(builder: Builder, before: Location, after: Location) {
	return classifyMarkup(
		builder.originalBefore,
		builder.originalAfter,
		rangeFor(before),
		rangeFor(after),
		originalLocation(builder, 'before', before),
		originalLocation(builder, 'after', after),
	)
}
function originalLocations(builder: Builder, side: Side, locations: readonly Location[]) {
	return locations.map((location) => originalLocation(builder, side, location))
}
function originalLocation(builder: Builder, side: Side, location: Location) {
	return (side === 'before' ? builder.originalBeforeIndex : builder.originalAfterIndex)
		.nodeAtPath(location.path)
}
function rangeFor(node: Location): Range {
	return { from: node.from, to: node.to }
}
function emptyRange(position: number): Range {
	return { from: position, to: position }
}
