/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { MarkdownSerializerState } from '@tiptap/pm/markdown'
import { Node } from '@tiptap/pm/model'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'

type Cell = {
	md: string
	lines: string[]
	align: string
}

type Row = {
	node: Node
	header: boolean
	cells: Cell[]
	length: number
}

/**
 * Serialize a table row to markdown line by line
 *
 * @param state - Markdown serializer state
 * @param row - Table row to serialize
 * @param columnWidths - Array of column widths
 */
function rowToMarkdown(
	state: MarkdownSerializerState,
	row: Row,
	columnWidths: number[],
) {
	const normalizedCells = row.cells.map((cell, cellIdx) => {
		// Normalize cells to have the same number of lines
		while (cell.lines.length < row.length) cell.lines.push('')
		// Normalize lines in cell to have the same length
		cell.lines.forEach((line, lineIdx) => {
			cell.lines[lineIdx] = line.padEnd(columnWidths[cellIdx])
		})
		return cell
	})

	// Write row line by line
	for (let lineIdx = 0; lineIdx < row.length; lineIdx++) {
		state.write('| ')
		normalizedCells.forEach((cell, cellIdx) => {
			state.write(cell.lines[lineIdx])
			if (cellIdx < normalizedCells.length - 1) {
				state.write(' | ')
			} else {
				state.write(' |')
			}
		})

		// If this is a multline row and not the last line, add '\'
		if (lineIdx < row.length - 1) {
			state.write(' \\')
		}
		state.write('\n')
	}
}

/**
 * Serialize a table header row to markdown
 *
 * @param state - Markdown serializer state
 * @param row - Table header row to serialize
 * @param columnWidths - Array of column widths
 */
function headerRowToMarkdown(
	state: MarkdownSerializerState,
	row: Row,
	columnWidths: number[],
) {
	rowToMarkdown(state, row, columnWidths)

	// Write horizontal separator line
	// No space padding next to pipes in horizontal separator
	state.write('|')
	row.cells.forEach((cell, cellIdx) => {
		const separatorWidth = columnWidths[cellIdx] + 2
		let separator = ''
		switch (cell.align) {
			case 'center':
				separator = ':' + state.repeat('-', separatorWidth - 2) + ':'
				break
			case 'right':
				separator = state.repeat('-', separatorWidth - 1) + ':'
				break
			default:
				separator = state.repeat('-', separatorWidth)
				break
		}
		state.write(separator)
		state.write('|')
	})

	state.write('\n')
}

/**
 * Serialize a table to markdown
 *
 * @param state - Markdown serializer state
 * @param node - Table node to serialize
 */
function tableToMarkdown(state: MarkdownSerializerState, node: Node) {
	const serializer = createMarkdownSerializer(node.type.schema)
	const rows = node.content.content.map((row): Row => {
		return {
			node: row,
			header: row.type.name === 'tableHeadRow',
			cells: [],
			length: 0,
		}
	})

	// Get markdown for all cells and max line width + length
	const columnWidths: number[] = []
	rows.forEach((row) => {
		const cellNodes = row.node.content.content
		cellNodes.forEach((node, cellIdx) => {
			columnWidths[cellIdx] = columnWidths[cellIdx] ?? 0
			const md = serializer.serialize(node)
			const lines = md.split(/\r?\n/).map((line) => {
				// Escape pipe character
				line = line.replace(/\|/, '\\$&')
				return line.trim()
			})
			row.length = Math.max(row.length, lines.length)
			const lineLength = Math.max(...lines.map((line) => line.length))
			columnWidths[cellIdx] = Math.max(columnWidths[cellIdx], lineLength)
			const align = node.attrs?.textAlign ?? ''
			row.cells.push({ md, lines, align })
		})
	})

	// Render header row
	const headerRow = rows.find((r) => r.header)
	if (!headerRow) {
		// Cannot serialize table without header
		return
	}
	headerRowToMarkdown(state, headerRow, columnWidths)

	// Render body rows
	rows.filter((r) => !r.header).forEach((row) => {
		rowToMarkdown(state, row, columnWidths)
	})

	state.closeBlock(node)
}

export { tableToMarkdown }
