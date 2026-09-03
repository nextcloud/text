/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Change } from 'diff'
import type { SourceComparisonWorkerRequest as WorkerRequest, SourceComparisonWorkerResponse as WorkerResponse } from './markdownSourceComparisonProtocol.ts'

import { diffWordsWithSpace } from 'diff'
import { compareMarkdownSourceLines } from './markdownSourceComparisonProtocol.ts'
import { displayBoundedMarkdownSource } from './markdownSourceDisplay.ts'

export type SourceEol = 'lf' | 'crlf' | 'cr' | 'none'
export type SourceLineEnding = Exclude<SourceEol, 'none'> | 'mixed'

export interface SourceDiffSegment {
	text: string
	changed: boolean
}
export interface SourceDiffLine {
	number: number
	text: string
	eol: SourceEol
	changed: boolean
	segments: readonly SourceDiffSegment[]
}
export interface SourceDiffRow {
	before?: SourceDiffLine
	after?: SourceDiffLine
}
export interface SourceDiffHunk {
	id: string
	beforeStart: number
	afterStart: number
	rows: readonly SourceDiffRow[]
}
export interface SourceDiffGap {
	id: string
	slot: number
	beforeFrom: number
	beforeTo: number
	afterFrom: number
	afterTo: number
	count: number
}
export interface SourceLineEndingChange {
	before: SourceLineEnding
	after: SourceLineEnding
}
export interface SourceDiffReadyModel {
	status: 'ready'
	hunks: readonly SourceDiffHunk[]
	gaps: readonly SourceDiffGap[]
	lineEndingChange: SourceLineEndingChange | null
}
export interface SourceDiffLimitedModel {
	status: 'limited'
	reason: 'size' | 'complexity'
}
export type SourceDiffModel = SourceDiffReadyModel | SourceDiffLimitedModel
export type SourceGapMaterializer = typeof materializeSourceDiffGap

type SourceLine = SourceDiffLine
interface ChangedRun {
	beforeFrom: number
	beforeTo: number
	afterFrom: number
	afterTo: number
}
interface HunkRange extends ChangedRun {
	beforeContextFrom: number
	beforeContextTo: number
	afterContextFrom: number
	afterContextTo: number
}

export const SOURCE_DIFF_LIMITS = Object.freeze({
	maximumCharacters: 2_000_000,
	maximumLines: 60_000,
	maximumEditLength: 50_000,
	timeoutMilliseconds: 2_000,
	contextLines: 3,
	maximumDisplayedRows: 5_000,
	maximumGapPageRows: 500,
	maximumWordDiffLines: 20,
	maximumWordDiffCharacters: 2_000,
	maximumWordDiffMilliseconds: 100,
	maximumWordDiffPairMilliseconds: 10,
})
const LIMITS = SOURCE_DIFF_LIMITS

export async function createMarkdownSourceComparison(before: string, after: string, signal?: AbortSignal): Promise<SourceDiffModel> {
	if (
		before.length + after.length > LIMITS.maximumCharacters
		|| sourceLineCount(before) + sourceLineCount(after)
		> LIMITS.maximumLines
		|| displayBoundedMarkdownSource(before).truncated
		|| displayBoundedMarkdownSource(after).truncated
	) {
		return { status: 'limited', reason: 'size' }
	}
	checkAbort(signal)
	const normalizedBefore = normalize(before)
	const normalizedAfter = normalize(after)
	const changes = await computeLineChanges(
		normalizedBefore,
		normalizedAfter,
		signal,
	)
	if (!changes) {
		return { status: 'limited', reason: 'complexity' }
	}
	checkAbort(signal)
	return buildSourceModel(
		before,
		after,
		normalizedBefore === normalizedAfter,
		changes,
	)
}

export function materializeSourceDiffGap(before: string, after: string, gap: SourceDiffGap, maximumRows: number = LIMITS.maximumGapPageRows, offset: number = 0) {
	const finiteMaximum = Number.isFinite(maximumRows)
		? Math.trunc(maximumRows)
		: LIMITS.maximumGapPageRows
	const rowLimit = Math.max(
		0,
		Math.min(finiteMaximum, LIMITS.maximumGapPageRows),
	)
	const finiteOffset = Number.isFinite(offset) ? Math.trunc(offset) : 0
	const rowOffset = Math.max(0, Math.min(finiteOffset, gap.count))
	const beforeFrom = Math.min(gap.beforeFrom + rowOffset, gap.beforeTo)
	const afterFrom = Math.min(gap.afterFrom + rowOffset, gap.afterTo)
	const beforeGap = splitRange(
		before,
		beforeFrom,
		Math.min(beforeFrom + rowLimit, gap.beforeTo),
		rowLimit,
	)
	const afterGap = splitRange(
		after,
		afterFrom,
		Math.min(afterFrom + rowLimit, gap.afterTo),
		rowLimit,
	)
	return pairSourceRows(beforeGap, afterGap)
}

async function computeLineChanges(before: string, after: string, signal?: AbortSignal) {
	const request: WorkerRequest = {
		before,
		after,
		maximumEditLength: LIMITS.maximumEditLength,
		timeoutMilliseconds: LIMITS.timeoutMilliseconds,
	}
	if (typeof Worker === 'undefined') {
		const response = compareMarkdownSourceLines(request)
		return response.status === 'ready' ? response.changes : undefined
	}
	const worker = new Worker(
		new URL('./markdownSourceComparison.worker.ts', import.meta.url),
		{ type: 'module' },
	)
	return new Promise<Change[] | undefined>((resolve, reject) => {
		let settled = false
		const settle = (action: () => void) => {
			if (settled) {
				return
			}
			settled = true
			signal?.removeEventListener('abort', abort)
			try {
				worker.terminate()
			} finally {
				action()
			}
		}
		const fail = (error: unknown) => settle(() => reject(error))
		function abort() {
			fail(abortError())
		}
		const workerError = () => fail(new Error('Source comparison worker failed'))
		worker.onmessage = ({ data }: MessageEvent<unknown>) => {
			if (!isSourceComparisonWorkerResponse(data)) {
				workerError()
				return
			}
			settle(() => resolve(data.status === 'ready' ? data.changes : undefined))
		}
		worker.onerror = workerError
		worker.onmessageerror = workerError
		signal?.addEventListener('abort', abort, { once: true })
		if (signal?.aborted) {
			abort()
			return
		}
		try {
			worker.postMessage(request)
		} catch (error) {
			fail(error)
		}
	})
}

function isSourceComparisonWorkerResponse(response: unknown): response is WorkerResponse {
	if (!response || typeof response !== 'object') {
		return false
	}
	const candidate = response as { status?: unknown, changes?: unknown }
	return (
		candidate.status === 'limited'
		|| (candidate.status === 'ready' && Array.isArray(candidate.changes))
	)
}

function buildSourceModel(before: string, after: string, normalizedEqual: boolean, changes: Change[]): SourceDiffModel {
	const beforeLines = splitRange(before)
	const afterLines = splitRange(after)
	const ranges = mergeRanges(changedRuns(changes).map((run) => withContext(run, beforeLines.length, afterLines.length)))
	const displayedRows = ranges.reduce(
		(total, range) => total
			+ Math.max(0, range.beforeContextTo - range.beforeContextFrom)
			+ Math.max(0, range.afterContextTo - range.afterContextFrom),
		0,
	)
	if (displayedRows > LIMITS.maximumDisplayedRows) {
		return { status: 'limited', reason: 'complexity' }
	}
	const hunks = ranges.map((range, index) => createHunk(range, beforeLines, afterLines, index))
	return {
		status: 'ready',
		hunks,
		gaps: createGaps(ranges, beforeLines, afterLines),
		lineEndingChange: summarizeLineEndingChange(
			beforeLines,
			afterLines,
			normalizedEqual,
		),
	}
}

function changedRuns(changes: Change[]) {
	const runs: ChangedRun[] = []
	let beforeLine = 0
	let afterLine = 0
	let current: ChangedRun | null = null
	for (const change of changes) {
		const count = change.count ?? sourceLineCount(change.value)
		if (!change.added && !change.removed) {
			if (current) {
				runs.push(current)
			}
			current = null
			beforeLine += count
			afterLine += count
			continue
		}
		current ??= {
			beforeFrom: beforeLine,
			beforeTo: beforeLine,
			afterFrom: afterLine,
			afterTo: afterLine,
		}
		if (change.removed) {
			current.beforeTo += count
			beforeLine += count
		} else {
			current.afterTo += count
			afterLine += count
		}
	}
	if (current) {
		runs.push(current)
	}
	return runs
}

function withContext(run: ChangedRun, beforeLength: number, afterLength: number): HunkRange {
	const context = (from: number, to: number, length: number) => ({
		from: Math.max(0, from - LIMITS.contextLines),
		to: Math.min(length, Math.max(to, from + 1) + LIMITS.contextLines),
	})
	const before = context(run.beforeFrom, run.beforeTo, beforeLength)
	const after = context(run.afterFrom, run.afterTo, afterLength)
	return {
		...run,
		beforeContextFrom: before.from,
		beforeContextTo: before.to,
		afterContextFrom: after.from,
		afterContextTo: after.to,
	}
}

function mergeRanges(ranges: HunkRange[]) {
	const merged: HunkRange[] = []
	for (const range of ranges) {
		const previous = merged.at(-1)
		if (
			previous
			&& range.beforeContextFrom <= previous.beforeContextTo
			&& range.afterContextFrom <= previous.afterContextTo
		) {
			previous.beforeTo = Math.max(previous.beforeTo, range.beforeTo)
			previous.afterTo = Math.max(previous.afterTo, range.afterTo)
			previous.beforeContextTo = Math.max(
				previous.beforeContextTo,
				range.beforeContextTo,
			)
			previous.afterContextTo = Math.max(
				previous.afterContextTo,
				range.afterContextTo,
			)
		} else {
			merged.push({ ...range })
		}
	}
	return merged
}

function createHunk(range: HunkRange, before: SourceLine[], after: SourceLine[], index: number): SourceDiffHunk {
	const select = (lines: SourceLine[], contextFrom: number, contextTo: number, from: number, to: number) => lines
		.slice(contextFrom, contextTo)
		.map((line, offset) => cloneLine(line, contextFrom + offset >= from && contextFrom + offset < to))
	const beforeHunk = select(before, range.beforeContextFrom, range.beforeContextTo, range.beforeFrom, range.beforeTo)
	const afterHunk = select(after, range.afterContextFrom, range.afterContextTo, range.afterFrom, range.afterTo)
	addWordEmphasis(
		beforeHunk.filter(({ changed }) => changed),
		afterHunk.filter(({ changed }) => changed),
	)
	return {
		id: `source-hunk-${index.toString(36)}`,
		beforeStart: beforeHunk[0]?.number ?? 0,
		afterStart: afterHunk[0]?.number ?? 0,
		rows: pairSourceRows(beforeHunk, afterHunk),
	}
}

function pairSourceRows(before: readonly SourceLine[], after: readonly SourceLine[]) {
	const rows: SourceDiffRow[] = []
	let left = 0
	let right = 0
	while (left < before.length || right < after.length) {
		if (before[left]?.changed || after[right]?.changed) {
			const removed: SourceLine[] = []
			const added: SourceLine[] = []
			while (before[left]?.changed) {
				removed.push(before[left++]!)
			}
			while (after[right]?.changed) {
				added.push(after[right++]!)
			}
			for (
				let index = 0;
				index < Math.max(removed.length, added.length);
				index++
			) {
				rows.push({ before: removed[index], after: added[index] })
			}
		} else {
			rows.push({ before: before[left++], after: after[right++] })
		}
	}
	return rows
}

function addWordEmphasis(before: SourceLine[], after: SourceLine[]) {
	const count = Math.min(
		before.length,
		after.length,
		LIMITS.maximumWordDiffLines,
	)
	const deadline = Date.now() + LIMITS.maximumWordDiffMilliseconds
	for (
		let index = 0;
		index < count;
		index++
	) {
		const left = before[index]!
		const right = after[index]!
		if (
			left.text.length + right.text.length
			> LIMITS.maximumWordDiffCharacters
			|| Date.now() > deadline
		) {
			continue
		}
		const pairDeadline
			= Date.now() + LIMITS.maximumWordDiffPairMilliseconds
		const words = diffWordsWithSpace(left.text, right.text)
		if (Date.now() > pairDeadline) {
			continue
		}
		left.segments = words
			.filter(({ added }) => !added)
			.map(({ value, removed }) => ({ text: value, changed: Boolean(removed) }))
		right.segments = words
			.filter(({ removed }) => !removed)
			.map(({ value, added }) => ({ text: value, changed: Boolean(added) }))
	}
}

function createGaps(ranges: HunkRange[], before: SourceLine[], after: SourceLine[]) {
	const gaps: SourceDiffGap[] = []
	for (let slot = 0; slot <= ranges.length; slot++) {
		const beforeFrom = slot === 0 ? 0 : ranges[slot - 1]!.beforeContextTo
		const beforeTo
			= slot === ranges.length ? before.length : ranges[slot]!.beforeContextFrom
		const afterFrom = slot === 0 ? 0 : ranges[slot - 1]!.afterContextTo
		const afterTo
			= slot === ranges.length ? after.length : ranges[slot]!.afterContextFrom
		const beforeCount = beforeTo - beforeFrom
		const afterCount = afterTo - afterFrom
		if (beforeCount || afterCount) {
			gaps.push({
				id: `source-gap-${slot.toString(36)}`,
				slot,
				beforeFrom,
				beforeTo,
				afterFrom,
				afterTo,
				count: Math.max(beforeCount, afterCount),
			})
		}
	}
	return gaps
}

function splitRange(source: string, from = 0, to = Number.POSITIVE_INFINITY, maximumLines = Number.POSITIVE_INFINITY) {
	if (!source || from >= to || maximumLines <= 0) {
		return []
	}
	const lines: SourceLine[] = []
	const pattern = /([^\r\n]*)(\r\n|\n|\r|$)/gu
	let lineIndex = 0
	let match: RegExpExecArray | null
	while ((match = pattern.exec(source))) {
		if (!match[1] && !match[2] && match.index === source.length) {
			break
		}
		if (lineIndex >= to || lines.length >= maximumLines) {
			break
		}
		if (lineIndex >= from) {
			lines.push(createSourceLine(match[1]!, match[2]!, lineIndex + 1))
		}
		lineIndex++
		if (!match[2]) {
			break
		}
	}
	return lines
}

function createSourceLine(text: string, rawEol: string, number: number): SourceLine {
	const eol: SourceEol
		= rawEol === '\r\n'
			? 'crlf'
			: rawEol === '\n'
				? 'lf'
				: rawEol === '\r'
					? 'cr'
					: 'none'
	return {
		number,
		text,
		eol,
		changed: false,
		segments: [{ text, changed: false }],
	}
}
function cloneLine(line: SourceLine, changed: boolean): SourceLine {
	return { ...line, changed, segments: [{ text: line.text, changed: false }] }
}

function summarizeLineEndingChange(before: SourceLine[], after: SourceLine[], normalizedEqual: boolean): SourceLineEndingChange | null {
	if (
		before.length === after.length
		&& before.every(({ eol }, index) => eol === after[index]!.eol)
	) {
		return null
	}
	const left = lineEndingConvention(before)
	const right = lineEndingConvention(after)
	return left && right && (normalizedEqual || left !== right)
		? { before: left, after: right }
		: null
}

function lineEndingConvention(lines: SourceLine[]): SourceLineEnding | null {
	const endings = new Set(lines
		.map(({ eol }) => eol)
		.filter((eol): eol is Exclude<SourceEol, 'none'> => eol !== 'none'))
	return endings.size === 0
		? null
		: endings.size === 1
			? [...endings][0]!
			: 'mixed'
}
function normalize(source: string) {
	return source.replace(/\r\n?|\n/gu, '\n')
}

function sourceLineCount(source: string) {
	if (!source) {
		return 0
	}
	let count = 1
	for (let index = 0; index < source.length; index++) {
		if (
			source[index] === '\n'
			|| (source[index] === '\r' && source[index + 1] !== '\n')
		) {
			count++
		}
	}
	return count
}
function abortError() {
	return new DOMException('Source comparison aborted', 'AbortError')
}

function checkAbort(signal?: AbortSignal) {
	if (signal?.aborted) {
		throw abortError()
	}
}
