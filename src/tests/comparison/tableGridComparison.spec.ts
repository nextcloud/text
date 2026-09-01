/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Schema } from '@tiptap/pm/model'
import type { ComparisonEdit, ComparisonSide } from '../../comparison/markdownComparisonTypes.ts'

import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { describe, expect, it, vi } from 'vitest'
import {
	alignComparisonColumns,
	DEFAULT_COMPARISON_TOKEN_LEDGER,
} from '../../comparison/comparisonAlignment.ts'
import { createHierarchicalMarkdownComparisonModel } from '../../comparison/hierarchicalMarkdownComparisonModel.ts'
import { comparisonTestDocument, createComparisonTestEditor } from './comparisonTestEditor.ts'

function markdownTable(header: readonly string[], rows: readonly (readonly string[])[]) {
	return [
		`| ${header.join(' | ')} |`,
		`|${header.map(() => '---').join('|')}|`,
		...rows.map((row) => `| ${row.join(' | ')} |`),
	].join('\n')
}

function compare(before: string, after: string) {
	return createHierarchicalMarkdownComparisonModel(
		comparisonTestDocument(before),
		comparisonTestDocument(after),
	)
}

interface TableSpec {
	header: readonly { text: string, colspan?: number, rowspan?: number }[]
	rows: readonly (readonly { text: string, colspan?: number, rowspan?: number }[])[]
}

function tableNode(schema: Schema, spec: TableSpec) {
	const text = (value: string) => value ? schema.text(value) : undefined
	const cell = (name: 'tableHeader' | 'tableCell', value: TableSpec['header'][number]) => schema.nodes[name]!.create(
		{ colspan: value.colspan ?? 1, rowspan: value.rowspan ?? 1 },
		name === 'tableHeader' ? text(value.text) : schema.nodes.paragraph!.create(null, text(value.text)),
	)
	const header = schema.nodes.tableHeadRow!.create(null, spec.header.map((value) => cell('tableHeader', value)))
	const rows = spec.rows.map((row) => schema.nodes.tableRow!.create(null, row.map((value) => cell('tableCell', value))))
	return schema.nodes.table!.create(null, [header, ...rows])
}

function tableDocument(schema: Schema, spec: TableSpec) {
	return schema.nodes.doc!.create(null, tableNode(schema, spec))
}

function compareTableSpecs(before: TableSpec, after: TableSpec) {
	const editor = createComparisonTestEditor('placeholder')
	try {
		return createHierarchicalMarkdownComparisonModel(
			tableDocument(editor.schema, before),
			tableDocument(editor.schema, after),
		)
	} finally {
		editor.destroy()
	}
}

function malformedTableDocument(
	schema: Schema,
	children: readonly ('caption' | 'header' | 'body' | 'header-with-body-cell' | 'body-with-header-cell')[],
) {
	const text = (value: string) => schema.text(value)
	const headerCell = () => schema.nodes.tableHeader!.create(null, text('header'))
	const bodyCell = () => schema.nodes.tableCell!.create(null, schema.nodes.paragraph!.create(null, text('body')))
	const nodes = children.map((kind) => {
		if (kind === 'caption') {
			return schema.nodes.tableCaption!.create(null, text('caption'))
		}
		if (kind === 'header') {
			return schema.nodes.tableHeadRow!.create(null, headerCell())
		}
		if (kind === 'body') {
			return schema.nodes.tableRow!.create(null, bodyCell())
		}
		if (kind === 'header-with-body-cell') {
			return schema.nodes.tableHeadRow!.create(null, bodyCell())
		}
		return schema.nodes.tableRow!.create(null, headerCell())
	})
	return schema.nodes.doc!.create(null, schema.nodes.table!.create(null, nodes))
}

function expectColumnEdit(
	edit: ComparisonEdit,
	operation: 'delete' | 'insert',
	column: number,
	rows: number,
) {
	const side: ComparisonSide = operation === 'delete' ? 'before' : 'after'
	expect(edit.kind).toBe('table-column')
	expect(edit.primary.operation).toBe(operation)
	expect(edit.descriptors).toHaveLength(rows)
	expect(edit.descriptors.every((descriptor) => descriptor.operation === operation)).toBe(true)
	expect(edit.descriptors.map((descriptor) => descriptor.context[side]?.path.at(-1)))
		.toEqual(Array.from({ length: rows }, () => column))
	expect(edit.descriptors).toContain(edit.primary)
}

describe('sparse table comparison', () => {
	it('AUD-14 does not materialize table profiles before matrix budget admission', () => {
		const editor = createComparisonTestEditor('placeholder')
		const columns = 201
		const before = tableDocument(editor.schema, {
			header: Array.from({ length: columns }, (_value, index) => ({ text: `before-${index}` })),
			rows: [],
		})
		const after = tableDocument(editor.schema, {
			header: Array.from({ length: columns }, (_value, index) => ({ text: `after-${index}` })),
			rows: [],
		})
		const textContent = vi.spyOn(ProseMirrorNode.prototype, 'textContent', 'get')
		try {
			const model = createHierarchicalMarkdownComparisonModel(before, after)

			expect(model.edits[0]!.primary.coarseReason).toBe('comparison-limit')
			const tableCellReads = textContent.mock.contexts.filter((node) => (
				(node as ProseMirrorNode).type.name === 'tableHeader'
			)).length
			expect(tableCellReads).toBeLessThanOrEqual(columns * 2 * 5)
		} finally {
			textContent.mockRestore()
			editor.destroy()
		}
	})

	it.each([
		['first', 0],
		['middle', 1],
		['last', 2],
	] as const)('T01 attributes the %s duplicate-body column deletion', (_name, column) => {
		const widerHeader = ['A', 'B', 'C']
		const narrowerHeader = widerHeader.filter((_value, index) => index !== column)
		const wider = markdownTable(widerHeader, Array.from({ length: 2 }, () => ['x', 'x', 'x']))
		const narrower = markdownTable(narrowerHeader, Array.from({ length: 2 }, () => ['x', 'x']))

		const deletion = compare(wider, narrower)
		expect(deletion.edits).toHaveLength(1)
		expectColumnEdit(deletion.edits[0]!, 'delete', column, 3)
	})

	it.each([
		['first', 0],
		['middle', 1],
		['last', 2],
	] as const)('T02 attributes the %s duplicate-body column insertion', (_name, column) => {
		const widerHeader = ['A', 'B', 'C']
		const narrowerHeader = widerHeader.filter((_value, index) => index !== column)
		const wider = markdownTable(widerHeader, Array.from({ length: 2 }, () => ['x', 'x', 'x']))
		const narrower = markdownTable(narrowerHeader, Array.from({ length: 2 }, () => ['x', 'x']))

		const insertion = compare(narrower, wider)
		expect(insertion.edits).toHaveLength(1)
		expectColumnEdit(insertion.edits[0]!, 'insert', column, 3)
	})

	it('T03 distinguishes duplicate headers with an exact body row', () => {
		const model = compare(
			markdownTable(['X', 'X', 'X'], [['a', 'b', 'c'], ['x', 'x', 'x']]),
			markdownTable(['X', 'X'], [['a', 'b'], ['x', 'x']]),
		)

		expect(model.edits).toHaveLength(1)
		expectColumnEdit(model.edits[0]!, 'delete', 2, 3)
	})

	it('T04 pairs equal duplicate-vector multiplicity by rank beside a unique deletion', () => {
		const model = compare(
			markdownTable(['A', 'X', 'X', 'C'], [['x', 'x', 'x', 'x']]),
			markdownTable(['A', 'X', 'X'], [['x', 'x', 'x']]),
		)

		expect(model.edits).toHaveLength(1)
		expectColumnEdit(model.edits[0]!, 'delete', 3, 2)
	})

	it('T05 keeps unequal identical-column multiplicity coarse', () => {
		const model = compare(
			markdownTable(['X', 'X', 'X'], [['', '', ''], ['x', 'x', 'x']]),
			markdownTable(['X', 'X'], [['', ''], ['x', 'x']]),
		)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]).toMatchObject({
			kind: 'content',
			primary: {
				operation: 'replace',
				coarseReason: 'ambiguous-attribution',
				context: { before: { code: 'table' }, after: { code: 'table' } },
			},
		})
	})

	it('T06 keeps a crossing exact column reorder coarse', () => {
		const model = compare(
			markdownTable(['A', 'B', 'C'], [['a', 'b', 'c']]),
			markdownTable(['C', 'B', 'A'], [['c', 'b', 'a']]),
		)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]).toMatchObject({
			kind: 'content',
			primary: {
				operation: 'replace',
				coarseReason: 'table-evidence-conflict',
				context: { before: { code: 'table' }, after: { code: 'table' } },
			},
		})
	})

	it('T07 keeps one edited retained column precise at cell altitude', () => {
		const model = compare(
			markdownTable(['A', 'B', 'C'], [['1', '2', '3']]),
			markdownTable(['A', 'X', 'C'], [['1', 'changed', '3']]),
		)
		const descriptors = model.edits.flatMap(({ descriptors }) => descriptors)

		expect(model.edits).toHaveLength(2)
		expect(model.edits.every(({ kind }) => kind === 'content')).toBe(true)
		expect(descriptors).toHaveLength(2)
		expect(descriptors.map(({ context }) => context.before?.path)).toEqual([
			[0, 0, 1],
			[0, 1, 1],
		])
		expect(descriptors.map(({ before, after }) => ({ before, after }))).toEqual([
			{ before: { from: 6, to: 7 }, after: { from: 6, to: 7 } },
			{ before: { from: 20, to: 21 }, after: { from: 20, to: 27 } },
		])
		expect(descriptors.every(({ context }) => (
			context.before?.code === 'table-cell' && context.after?.code === 'table-cell'
		))).toBe(true)
	})

	it('T08 keeps two adjacent edited columns precise when the optimum is unique', () => {
		const model = compare(
			markdownTable(['A', 'B old', 'C old', 'D'], [['1', 'before b', 'before c', '4']]),
			markdownTable(['A', 'B new', 'C new', 'D'], [['1', 'after b', 'after c', '4']]),
		)
		const descriptors = model.edits.flatMap(({ descriptors }) => descriptors)

		expect(descriptors).toHaveLength(4)
		expect(model.edits.every(({ kind }) => kind === 'content')).toBe(true)
		expect(descriptors.every(({ coarseReason }) => coarseReason === undefined)).toBe(true)
		expect(descriptors.every(({ context }) => (
			context.before?.code === 'table-cell' && context.after?.code === 'table-cell'
		))).toBe(true)
	})

	it('groups one column alignment change across its physical cells without duplicating content edits', () => {
		const model = compare([
			'# Evidence matrix',
			'',
			'| Signal | Evidence | State |',
			'| :--- | :---: | ---: |',
			'| API \\| worker | **Draft** [runbook](https://example.org/draft) | 10% |',
			'| Screenshot | ![Audit thumbnail](demo-assets/table-thumbnail.jpg) | Pending |',
		].join('\n'), [
			'# Evidence matrix',
			'',
			'| Signal | Evidence | State |',
			'| ---: | :--- | :---: |',
			'| API \\| worker | **Approved** [runbook](https://example.org/approved) | 25% |',
			'| Screenshot | ![Approved audit thumbnail](demo-assets/table-thumbnail.jpg) | Complete |',
		].join('\n'))
		const alignmentEdits = model.edits.filter(({ primary }) => primary.signals.some((signal) => (
			signal.type === 'attribute' && signal.attribute === 'table-alignment'
		)))
		expect(model.edits).toHaveLength(7)
		expect(alignmentEdits).toHaveLength(3)
		expect(alignmentEdits.map(({ descriptors }) => descriptors.length)).toEqual([3, 3, 3])
		expect(alignmentEdits.every(({ descriptors }) => descriptors.every(({ signals }) => signals.some((signal) => (
			signal.type === 'attribute' && signal.attribute === 'table-alignment'
		))))).toBe(true)
	})

	it('T09 combines an edited retained column with one adjacent column deletion', () => {
		const model = compare(
			markdownTable(['A', 'B old', 'C'], [['1', 'before', '3']]),
			markdownTable(['A', 'B new'], [['1', 'after']]),
		)
		const columnEdits = model.edits.filter(({ kind }) => kind === 'table-column')
		const cellEdits = model.edits.filter(({ kind }) => kind === 'content')

		expect(columnEdits).toHaveLength(1)
		expectColumnEdit(columnEdits[0]!, 'delete', 2, 2)
		expect(cellEdits).toHaveLength(2)
		expect(cellEdits.flatMap(({ descriptors }) => descriptors).every(({ context }) => (
			context.before?.code === 'table-cell' && context.after?.code === 'table-cell'
		))).toBe(true)
	})

	it('T10 keeps a row insertion at row altitude beside a column deletion', () => {
		const model = compare(
			markdownTable(['A', 'B', 'C'], [['one', 'x', 'x'], ['two', 'x', 'x']]),
			markdownTable(['A', 'B'], [['one', 'x'], ['inserted row', 'unique'], ['two', 'x']]),
		)
		const columnEdits = model.edits.filter(({ kind }) => kind === 'table-column')
		const rowInsertions = model.edits.filter(({ primary }) => (
			primary.operation === 'insert' && primary.context.after?.code === 'table-row'
		))

		expect(columnEdits).toHaveLength(1)
		expectColumnEdit(columnEdits[0]!, 'delete', 2, 3)
		expect(rowInsertions).toHaveLength(1)
	})

	it('T10 keeps a row deletion at row altitude beside a column insertion', () => {
		const model = compare(
			markdownTable(['A', 'B'], [['one', 'x'], ['deleted row', 'unique'], ['two', 'x']]),
			markdownTable(['A', 'B', 'C'], [['one', 'x', 'x'], ['two', 'x', 'x']]),
		)
		const columnEdits = model.edits.filter(({ kind }) => kind === 'table-column')
		const rowDeletions = model.edits.filter(({ primary }) => (
			primary.operation === 'delete' && primary.context.before?.code === 'table-row'
		))

		expect(columnEdits).toHaveLength(1)
		expectColumnEdit(columnEdits[0]!, 'insert', 2, 3)
		expect(rowDeletions).toHaveLength(1)
	})

	it('T11 keeps a ragged typo precise at physical-cell altitude', () => {
		const model = compare(
			markdownTable(['A', 'B', 'C'], [['one', 'before']]),
			markdownTable(['A', 'B', 'C'], [['one', 'after']]),
		)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]).toMatchObject({
			kind: 'content',
			primary: {
				operation: 'replace',
				context: { before: { code: 'table-cell' }, after: { code: 'table-cell' } },
			},
		})
	})

	it.each([
		['fills', 'insert', ['one'], ['one', 'two']],
		['removes', 'delete', ['one', 'two'], ['one']],
	] as const)('T12 %s a ragged absent-present slot as one local cell change', (_name, operation, beforeRow, afterRow) => {
		const model = compare(
			markdownTable(['A', 'B'], [beforeRow]),
			markdownTable(['A', 'B'], [afterRow]),
		)
		const side: ComparisonSide = operation === 'delete' ? 'before' : 'after'

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]).toMatchObject({ kind: 'content', primary: { operation } })
		expect(model.edits[0]!.primary.context[side]?.code).toBe('table-cell')
	})

	it('T13 groups only present physical cells from a deleted ragged column', () => {
		const wider = markdownTable(['A', 'B', 'C'], [
			['x', 'x'],
			['x', 'x', 'distinct C'],
		])
		const narrower = markdownTable(['A', 'B'], [
			['x', 'x'],
			['x', 'x'],
		])
		const model = compare(wider, narrower)

		expect(model.edits).toHaveLength(1)
		expectColumnEdit(model.edits[0]!, 'delete', 2, 2)
	})

	it.each(['deletion', 'insertion'] as const)('T14 fails a ragged middle identity conflict transactionally on %s', (direction) => {
		const wider = markdownTable(['A', 'B', 'C'], [
			['x', 'x', 'x'],
			['x', 'x'],
		])
		const narrower = markdownTable(['A', 'C'], [
			['x', 'x'],
			['x'],
		])
		const model = direction === 'deletion'
			? compare(wider, narrower)
			: compare(narrower, wider)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]).toMatchObject({
			kind: 'content',
			primary: {
				operation: 'replace',
				coarseReason: 'table-evidence-conflict',
				context: { before: { code: 'table' }, after: { code: 'table' } },
			},
		})
		expect(model.edits[0]!.descriptors).toHaveLength(1)
	})

	it.each(['deletion', 'insertion'] as const)('AUD-01 fails closed when a ragged width change creates cross-row exact identity on %s', (direction) => {
		for (const width of [2, 3, 4]) {
			const wider = markdownTable(
				Array.from({ length: width + 1 }, () => 'N'),
				[
					Array.from({ length: width }, () => 'x'),
					Array.from({ length: width + 1 }, () => 'x'),
				],
			)
			const narrower = markdownTable(
				Array.from({ length: width }, () => 'N'),
				[
					Array.from({ length: width - 1 }, () => 'x'),
					Array.from({ length: width }, () => 'x'),
				],
			)
			const model = direction === 'deletion'
				? compare(wider, narrower)
				: compare(narrower, wider)
			const rowOperations = model.edits.filter(({ primary }) => (
				primary.context.before?.code === 'table-row' || primary.context.after?.code === 'table-row'
			))

			expect(rowOperations).toHaveLength(0)
			expect(model.edits).toHaveLength(1)
			expect(model.edits[0]).toMatchObject({
				kind: 'content',
				primary: {
					operation: 'replace',
					coarseReason: 'table-evidence-conflict',
					context: { before: { code: 'table' }, after: { code: 'table' } },
				},
			})
			expect(model.edits[0]!.descriptors).toHaveLength(1)
		}
	})

	it.each(['deletion', 'insertion'] as const)('AUD-01 reconciles the complete row basis when row count and width change on %s', (direction) => {
		const wider = markdownTable(['N', 'N', 'N'], [
			['x', 'x'],
			['x', 'x', 'x'],
		])
		const narrower = markdownTable(['N', 'N'], [
			['inserted', 'unique'],
			['x'],
			['x', 'x'],
		])
		const model = direction === 'deletion'
			? compare(wider, narrower)
			: compare(narrower, wider)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]).toMatchObject({
			kind: 'content',
			primary: {
				operation: 'replace',
				coarseReason: 'table-evidence-conflict',
				context: { before: { code: 'table' }, after: { code: 'table' } },
			},
		})
		expect(model.edits[0]!.descriptors).toHaveLength(1)
	})

	it.each(['deletion', 'insertion'] as const)('AUD-01 keeps a genuine ragged row replacement beside a column %s', (direction) => {
		const wider = markdownTable(['A', 'B', 'C'], [
			['retained', 'x'],
			['deleted', 'y', 'z'],
		])
		const narrower = markdownTable(['A', 'B'], [
			['inserted', 'q'],
			['retained', 'x'],
		])
		const model = direction === 'deletion'
			? compare(wider, narrower)
			: compare(narrower, wider)
		const columnEdits = model.edits.filter(({ kind }) => kind === 'table-column')
		const rowOperations = model.edits.filter(({ primary }) => (
			primary.context.before?.code === 'table-row' || primary.context.after?.code === 'table-row'
		))

		expect(columnEdits).toHaveLength(1)
		expectColumnEdit(columnEdits[0]!, direction === 'deletion' ? 'delete' : 'insert', 2, 1)
		expect(rowOperations.map(({ primary }) => primary.operation).toSorted()).toEqual(['delete', 'insert'])
		expect(model.edits.every(({ primary }) => primary.coarseReason === undefined)).toBe(true)
	})

	it.each([
		['deletes', 'delete', 3, 2],
		['inserts', 'insert', 3, 4],
	] as const)('T15 %s the outer repeated row after retaining the first exact copies', (_name, operation, beforeCount, afterCount) => {
		const rows = (count: number) => Array.from({ length: count }, () => ['Same', 'x'])
		const model = compare(
			markdownTable(['H1', 'H2'], rows(beforeCount)),
			markdownTable(['H1', 'H2'], rows(afterCount)),
		)
		const side: ComparisonSide = operation === 'delete' ? 'before' : 'after'

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]).toMatchObject({ kind: 'content', primary: { operation } })
		expect(model.edits[0]!.primary.context[side]?.code).toBe('table-row')
		expect(model.edits[0]!.primary.context[side]?.path.at(-1)).toBe(operation === 'delete' ? 3 : 4)
	})

	it.each([
		['span', { header: [{ text: 'changed', colspan: 2 }], rows: [] }],
		['row span', { header: [{ text: 'changed', rowspan: 2 }], rows: [[{ text: 'body' }]] }],
		['malformed empty row', { header: [{ text: 'changed' }], rows: [[]] }],
		['more than 512 rows', {
			header: [{ text: 'changed' }],
			rows: Array.from({ length: 512 }, (_value, index) => [{ text: `row ${index}` }]),
		}],
		['more than 10000 physical cells', {
			header: Array.from({ length: 100 }, (_value, index) => ({ text: index === 0 ? 'changed' : `head ${index}` })),
			rows: Array.from({ length: 100 }, (_value, row) => (
				Array.from({ length: 100 }, (_cell, column) => ({ text: `cell ${row}:${column}` }))
			)),
		}],
	] as const)('T16 emits one unsupported-table edit for %s geometry', (_name, invalid) => {
		const valid = { header: [{ text: 'valid' }], rows: [] }
		const model = compareTableSpecs(valid, invalid)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]).toMatchObject({
			kind: 'content',
			primary: {
				operation: 'replace',
				coarseReason: 'unsupported-table',
				context: { before: { code: 'table' }, after: { code: 'table' } },
			},
		})
		expect(model.edits[0]!.descriptors).toHaveLength(1)
	})

	it.each([
		['a missing header', ['body']],
		['duplicate headers', ['header', 'header']],
		['a header after a body row', ['body', 'header']],
		['a misplaced caption', ['header', 'caption']],
		['duplicate captions', ['caption', 'caption', 'header']],
		['a body cell in the header', ['header-with-body-cell']],
		['a header cell in a body row', ['header', 'body-with-header-cell']],
	] as const)('T16 rejects %s transactionally', (_name, children) => {
		const editor = createComparisonTestEditor('placeholder')
		try {
			const valid = tableDocument(editor.schema, { header: [{ text: 'valid' }], rows: [] })
			const invalid = malformedTableDocument(editor.schema, children)
			const model = createHierarchicalMarkdownComparisonModel(valid, invalid)

			expect(model.edits).toHaveLength(1)
			expect(model.edits[0]).toMatchObject({
				kind: 'content',
				primary: {
					operation: 'replace',
					coarseReason: 'unsupported-table',
					context: { before: { code: 'table' }, after: { code: 'table' } },
				},
			})
			expect(model.edits[0]!.descriptors).toHaveLength(1)
		} finally {
			editor.destroy()
		}
	})

	it('T17 rejects a 10001-column table before attempting column alignment', () => {
		const valid = { header: [{ text: 'valid' }], rows: [] }
		const hugeWidth = {
			header: Array.from({ length: 10_001 }, (_value, index) => ({ text: `column ${index}` })),
			rows: [],
		}
		const model = compareTableSpecs(valid, hugeWidth)

		expect(model.edits).toHaveLength(1)
		expect(model.edits[0]!.primary.coarseReason).toBe('unsupported-table')
		expect(model.edits[0]!.descriptors).toHaveLength(1)
	})

	it('F09 retains solved table work without partial edits when a later exact-evidence veto coarsens the table', () => {
		const editor = createComparisonTestEditor('placeholder')
		try {
			const columnCount = 100
			const bodyTextLength = Math.floor(DEFAULT_COMPARISON_TOKEN_LEDGER / (4 * columnCount ** 2)) - 6
			const body = (suffix: string) => Array.from({ length: columnCount }, (_value, index) => ({
				text: `${String.fromCodePoint(0x100 + index).repeat(bodyTextLength - 1)}${suffix}`,
			}))
			const beforeHeader = Array.from({ length: columnCount }, (_value, index) => ({ text: index === 0 ? 'q' : 'a' }))
			const afterHeader = Array.from({ length: columnCount }, (_value, index) => ({ text: index === columnCount - 1 ? 'q' : 'b' }))
			const headerRowProfileLength = 2 * columnCount
			const bodyRowProfileLength = (bodyTextLength + 2) * columnCount
			const rowCharge = 2 * (3 * headerRowProfileLength + bodyRowProfileLength)
			const columnProfileLength = bodyTextLength + 6
			const columnCharge = 2 * columnCount ** 2 * columnProfileLength
			const remainingTokens = DEFAULT_COMPARISON_TOKEN_LEDGER - rowCharge - columnCharge
			const laterProfileLength = Math.floor(remainingTokens / (2 * columnCount ** 2)) + 1
			const laterTextLength = laterProfileLength - 3
			const repeatedHeaders = (character: string) => Array.from(
				{ length: columnCount },
				() => ({ text: character.repeat(laterTextLength) }),
			)
			const anchor = editor.schema.nodes.paragraph!.create(null, editor.schema.text('exact veto boundary anchor'))
			const before = editor.schema.nodes.doc!.create(null, [
				tableNode(editor.schema, { header: beforeHeader, rows: [body('x')] }),
				anchor,
				tableNode(editor.schema, { header: repeatedHeaders('c'), rows: [] }),
			])
			const after = editor.schema.nodes.doc!.create(null, [
				tableNode(editor.schema, { header: afterHeader, rows: [body('y')] }),
				anchor,
				tableNode(editor.schema, { header: repeatedHeaders('d'), rows: [] }),
			])
			const model = createHierarchicalMarkdownComparisonModel(before, after)

			expect(2 * columnCount ** 2 * laterProfileLength).toBeGreaterThan(remainingTokens)
			expect(2 * columnCount ** 2 * laterProfileLength).toBeLessThan(DEFAULT_COMPARISON_TOKEN_LEDGER)
			expect(model.edits.map(({ primary }) => primary.coarseReason)).toEqual([
				'table-evidence-conflict',
				'comparison-limit',
			])
			expect(model.edits.every(({ descriptors }) => descriptors.length === 1)).toBe(true)
		} finally {
			editor.destroy()
		}
	})

	it('T18 shares table token work across consecutive column plans', () => {
		interface Column {
			key: string
			profile: readonly string[]
		}
		const before: Column[] = [
			{ key: 'before-a', profile: ['a', 'same-a'] },
			{ key: 'before-b', profile: ['b', 'same-b'] },
		]
		const after: Column[] = [
			{ key: 'after-a', profile: ['a', 'same-a'] },
			{ key: 'after-b', profile: ['b', 'same-b'] },
		]
		const work = { remainingCells: 8, remainingTokenComparisons: 20 }
		const options = {
			work,
			fingerprint: ({ key }: Column) => key,
			profile: ({ profile }: Column) => profile,
			compatible: () => true,
		}

		const first = alignComparisonColumns(before, after, options)
		expect(first.every((region) => !('coarseReason' in region && region.coarseReason === 'comparison-limit'))).toBe(true)
		expect(work).toEqual({ remainingCells: 4, remainingTokenComparisons: 4 })

		const second = alignComparisonColumns(before, after, options)
		expect(second).toEqual([{
			before: { from: 0, to: 2 },
			after: { from: 0, to: 2 },
			coarseReason: 'comparison-limit',
		}])
		expect(work).toEqual({ remainingCells: 4, remainingTokenComparisons: 4 })
	})
})
