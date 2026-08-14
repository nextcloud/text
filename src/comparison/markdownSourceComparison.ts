/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Change } from 'diff'
import type {
	SourceComparisonWorkerRequest,
	SourceComparisonWorkerResponse,
} from './markdownSourceComparisonProtocol.ts'

import { diffWordsWithSpace } from 'diff'
import { compareMarkdownSourceLines } from './markdownSourceComparisonProtocol.ts'

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
	eolChanged: boolean
	segments: readonly SourceDiffSegment[]
	hasTab: boolean
	hasTrailingWhitespace: boolean
	hasZeroWidth: boolean
	missingFinalNewline: boolean
}

export interface SourceDiffHunk {
	id: string
	beforeStart: number
	afterStart: number
	before: readonly SourceDiffLine[]
	after: readonly SourceDiffLine[]
}

export interface SourceLineEndingChange {
	before: SourceLineEnding
	after: SourceLineEnding
}

export interface SourceDiffGap {
	id: string
	slot: number
	before: readonly SourceDiffLine[]
	after: readonly SourceDiffLine[]
	count: number
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

interface SourceLine extends SourceDiffLine {
	start: number
	end: number
}

interface ChangedRun {
	before: LineSpan | null
	after: LineSpan | null
	beforeAnchor: number
	afterAnchor: number
}

interface LineSpan {
	from: number
	to: number
}

interface SourceCoreRun {
	before: LineSpan | null
	after: LineSpan | null
}

interface MutableHunkRange {
	cores: SourceCoreRun[]
	before: LineSpan | null
	after: LineSpan | null
}

export const SOURCE_DIFF_LIMITS = Object.freeze({
	maximumCharacters: 2_000_000,
	maximumLines: 60_000,
	maximumEditLength: 50_000,
	timeoutMilliseconds: 2_000,
	contextLines: 3,
	maximumDisplayedRows: 5_000,
	maximumWordDiffLines: 20,
	maximumWordDiffPairs: 200,
	maximumWordDiffCharacters: 2_000,
	maximumWordDiffMilliseconds: 100,
	maximumWordDiffPairMilliseconds: 10,
})

/**
 * Build an asynchronous, bounded Markdown source diff.
 *
 * @param before Earlier stored Markdown
 * @param after Later stored Markdown
 * @param signal Optional caller cancellation signal
 */
export async function createMarkdownSourceComparison(
	before: string,
	after: string,
	signal?: AbortSignal,
): Promise<SourceDiffModel> {
	if (before.length + after.length > SOURCE_DIFF_LIMITS.maximumCharacters
		|| sourceLineCount(before) + sourceLineCount(after) > SOURCE_DIFF_LIMITS.maximumLines) {
		return { status: 'limited', reason: 'size' }
	}
	if (signal?.aborted) {
		throw abortError()
	}

	const comparisonBefore = normalizeLineEndings(before)
	const comparisonAfter = normalizeLineEndings(after)
	const changes = await computeLineChanges(comparisonBefore, comparisonAfter, signal)
	if (!changes) {
		return { status: 'limited', reason: 'complexity' }
	}
	return buildSourceModel(before, after, comparisonBefore, comparisonAfter, changes)
}

/**
 * Keep the bounded Myers traversal off the UI thread. jsdiff's callback mode
 * advances through zero-delay timers, which browsers throttle in background
 * tabs and can therefore reject small documents at the wall-clock limit.
 *
 * @param before Earlier stored Markdown
 * @param after Later stored Markdown
 * @param signal Optional caller cancellation signal
 */
async function computeLineChanges(before: string, after: string, signal?: AbortSignal) {
	if (typeof Worker === 'undefined') {
		const result = compareMarkdownSourceLines({
			before,
			after,
			maximumEditLength: SOURCE_DIFF_LIMITS.maximumEditLength,
			timeoutMilliseconds: SOURCE_DIFF_LIMITS.timeoutMilliseconds,
		})
		if (signal?.aborted) {
			throw abortError()
		}
		return result.status === 'ready' ? result.changes : undefined
	}

	const worker = new Worker(new URL('./markdownSourceComparison.worker.ts', import.meta.url), { type: 'module' })
	return new Promise<Change[] | undefined>((resolve, reject) => {
		const onAbort = () => {
			signal?.removeEventListener('abort', onAbort)
			worker.terminate()
			reject(abortError())
		}
		const cleanup = () => {
			signal?.removeEventListener('abort', onAbort)
			worker.terminate()
		}
		worker.addEventListener('message', ({ data }: MessageEvent<SourceComparisonWorkerResponse>) => {
			cleanup()
			resolve(data.status === 'ready' ? data.changes : undefined)
		}, { once: true })
		worker.addEventListener('error', () => {
			cleanup()
			reject(new Error('Source comparison worker failed'))
		}, { once: true })
		signal?.addEventListener('abort', onAbort, { once: true })
		if (signal?.aborted) {
			onAbort()
			return
		}
		worker.postMessage({
			before,
			after,
			maximumEditLength: SOURCE_DIFF_LIMITS.maximumEditLength,
			timeoutMilliseconds: SOURCE_DIFF_LIMITS.timeoutMilliseconds,
		} satisfies SourceComparisonWorkerRequest)
	})
}

/**
 * Build the bounded source comparison model.
 *
 * @param before Earlier literal Markdown
 * @param after Later literal Markdown
 * @param comparisonBefore Earlier Markdown with normalized line endings
 * @param comparisonAfter Later Markdown with normalized line endings
 * @param changes Ordered line-diff changes
 */
function buildSourceModel(
	before: string,
	after: string,
	comparisonBefore: string,
	comparisonAfter: string,
	changes: Change[],
): SourceDiffModel {
	const beforeLines = splitSourceLines(before)
	const afterLines = splitSourceLines(after)
	const runs = changedRuns(changes)
	const ranges = mergeHunkRanges(runs.map((run) => hunkRange(
		run,
		beforeLines.length,
		afterLines.length,
	)))
	const displayedRows = ranges.reduce((count, range) => count
		+ (range.before ? range.before.to - range.before.from + 1 : 0)
		+ (range.after ? range.after.to - range.after.from + 1 : 0), 0)
	if (displayedRows > SOURCE_DIFF_LIMITS.maximumDisplayedRows) {
		return { status: 'limited', reason: 'complexity' }
	}
	const wordDiffBudget = {
		deadline: Date.now() + SOURCE_DIFF_LIMITS.maximumWordDiffMilliseconds,
		remaining: SOURCE_DIFF_LIMITS.maximumWordDiffPairs,
	}
	const hunks = ranges.map((range, index) => createHunk(
		`source-hunk-${index.toString(36)}`,
		range,
		beforeLines,
		afterLines,
		wordDiffBudget,
	))
	const gaps = createGaps(ranges, beforeLines, afterLines)
	return {
		status: 'ready',
		hunks,
		gaps,
		lineEndingChange: summarizeLineEndingChange(
			beforeLines,
			afterLines,
			comparisonBefore === comparisonAfter,
		),
	}
}

/**
 * Compare line content independently from the file's newline convention.
 *
 * @param source Literal Markdown source
 */
function normalizeLineEndings(source: string) {
	return source.replace(/\r\n?|\n/gu, '\n')
}

/**
 * Report a newline convention change once instead of on every line.
 *
 * @param before Earlier source lines
 * @param after Later source lines
 * @param equalContent Whether normalized source content is equal
 */
function summarizeLineEndingChange(
	before: readonly SourceLine[],
	after: readonly SourceLine[],
	equalContent: boolean,
): SourceLineEndingChange | null {
	const sameEndings = before.length === after.length
		&& before.every(({ eol }, index) => eol === after[index]!.eol)
	if (sameEndings) {
		return null
	}

	const beforeEol = lineEndingConvention(before)
	const afterEol = lineEndingConvention(after)
	// ceiling: equal mixed conventions are attributed only for EOL-only edits;
	// upgrade when source diffs must align EOL changes across content edits.
	if (!beforeEol || !afterEol || (!equalContent && beforeEol === afterEol)) {
		return null
	}
	return { before: beforeEol, after: afterEol }
}

/**
 * Return the newline convention for terminated lines.
 *
 * @param lines Source lines
 */
function lineEndingConvention(lines: readonly SourceLine[]): SourceLineEnding | null {
	const endings = new Set(lines
		.map(({ eol }) => eol)
		.filter((eol): eol is Exclude<SourceEol, 'none'> => eol !== 'none'))
	if (endings.size === 0) {
		return null
	}
	return endings.size === 1 ? [...endings][0]! : 'mixed'
}

/**
 * Group adjacent line-diff changes into changed runs.
 *
 * @param changes Ordered line-diff changes
 */
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
				current = null
			}
			beforeLine += count
			afterLine += count
			continue
		}
		current ??= {
			before: null,
			after: null,
			beforeAnchor: beforeLine,
			afterAnchor: afterLine,
		}
		if (change.removed) {
			current.before = mergeSpans(current.before, {
				from: beforeLine,
				to: beforeLine + count - 1,
			})
			beforeLine += count
		} else {
			current.after = mergeSpans(current.after, {
				from: afterLine,
				to: afterLine + count - 1,
			})
			afterLine += count
		}
	}
	if (current) {
		runs.push(current)
	}
	return runs
}

/**
 * Resolve source line spans for one changed run.
 *
 * @param run Adjacent changed run
 * @param beforeLineCount Earlier line count
 * @param afterLineCount Later line count
 */
function hunkRange(
	run: ChangedRun,
	beforeLineCount: number,
	afterLineCount: number,
): MutableHunkRange {
	const beforeAnchor = run.before ?? anchorLine(beforeLineCount, run.beforeAnchor)
	const afterAnchor = run.after ?? anchorLine(afterLineCount, run.afterAnchor)
	return {
		cores: [{ before: run.before, after: run.after }],
		before: withContext(beforeAnchor, beforeLineCount),
		after: withContext(afterAnchor, afterLineCount),
	}
}

/**
 * Merge overlapping source hunk ranges.
 *
 * @param ranges Ordered source hunk ranges
 */
function mergeHunkRanges(ranges: MutableHunkRange[]) {
	const merged: MutableHunkRange[] = []
	for (const range of ranges) {
		const previous = merged.at(-1)
		if (previous && (spansOverlap(previous.before, range.before) || spansOverlap(previous.after, range.after))) {
			previous.cores.push(...range.cores)
			previous.before = mergeSpans(previous.before, range.before)
			previous.after = mergeSpans(previous.after, range.after)
		} else {
			merged.push({ ...range, cores: [...range.cores] })
		}
	}
	return merged
}

/**
 * Build one source comparison hunk.
 *
 * @param id Stable model ID
 * @param range Source hunk range
 * @param beforeLines Earlier source lines
 * @param afterLines Later source lines
 * @param wordDiffBudget Remaining line pairs eligible for word emphasis
 * @param wordDiffBudget.deadline Time when word emphasis must stop
 * @param wordDiffBudget.remaining Remaining line-pair count
 */
function createHunk(
	id: string,
	range: MutableHunkRange,
	beforeLines: SourceLine[],
	afterLines: SourceLine[],
	wordDiffBudget: { deadline: number, remaining: number },
): SourceDiffHunk {
	const before = linesInSpan(beforeLines, range.before, range.cores.map(({ before }) => before))
	const after = linesInSpan(afterLines, range.after, range.cores.map(({ after }) => after))
	for (const core of range.cores) {
		addWordEmphasis(before, after, core.before, core.after, range.before, range.after, wordDiffBudget)
	}
	return {
		id,
		beforeStart: before[0]?.number ?? 0,
		afterStart: after[0]?.number ?? 0,
		before,
		after,
	}
}

/**
 * Build collapsible gaps around source hunks.
 *
 * @param ranges Ordered source hunk ranges
 * @param beforeLines Earlier source lines
 * @param afterLines Later source lines
 */
function createGaps(
	ranges: MutableHunkRange[],
	beforeLines: SourceLine[],
	afterLines: SourceLine[],
) {
	if (ranges.length === 0) {
		return []
	}
	const gaps: SourceDiffGap[] = []
	for (let slot = 0; slot <= ranges.length; slot++) {
		const before = gapLines(beforeLines, ranges, slot, 'before')
		const after = gapLines(afterLines, ranges, slot, 'after')
		if (before.length === 0 && after.length === 0) {
			continue
		}
		gaps.push({
			id: `source-gap-${slot.toString(36)}`,
			slot,
			before,
			after,
			count: Math.max(before.length, after.length),
		})
	}
	return gaps
}

/**
 * Select lines for one side of a collapsible gap.
 *
 * @param lines Source lines
 * @param ranges Ordered source hunk ranges
 * @param slot Gap boundary index
 * @param side Source document side
 */
function gapLines(
	lines: SourceLine[],
	ranges: MutableHunkRange[],
	slot: number,
	side: 'before' | 'after',
) {
	if (slot === 0) {
		const first = ranges[0]![side]
		return first ? lines.slice(0, first.from) : []
	}
	if (slot === ranges.length) {
		const last = ranges.at(-1)![side]
		return last ? lines.slice(last.to + 1) : []
	}
	return betweenSpans(lines, ranges[slot - 1]![side], ranges[slot]![side])
}

/**
 * Split literal source while preserving line endings.
 *
 * @param source Literal Markdown source
 */
function splitSourceLines(source: string) {
	if (source.length === 0) {
		return []
	}
	const lines: SourceLine[] = []
	const pattern = /([^\r\n]*)(\r\n|\n|\r|$)/g
	let match: RegExpExecArray | null
	while ((match = pattern.exec(source)) !== null) {
		const text = match[1]!
		const rawEol = match[2]!
		if (text === '' && rawEol === '' && match.index === source.length) {
			break
		}
		const eol: SourceEol = rawEol === '\r\n' ? 'crlf' : rawEol === '\n' ? 'lf' : rawEol === '\r' ? 'cr' : 'none'
		const start = match.index
		const end = start + text.length + rawEol.length
		lines.push({
			number: lines.length + 1,
			text,
			eol,
			changed: false,
			eolChanged: false,
			segments: [{ text, changed: false }],
			hasTab: text.includes('\t'),
			hasTrailingWhitespace: /[\t ]+$/u.test(text),
			hasZeroWidth: /[\u200B-\u200D\u2060\uFEFF]/u.test(text),
			missingFinalNewline: eol === 'none',
			start,
			end,
		})
		if (rawEol === '') {
			break
		}
	}
	return lines
}

/**
 * Count display lines without materializing them.
 *
 * @param source Literal Markdown source
 */
function sourceLineCount(source: string) {
	let count = 0
	for (let index = 0; index < source.length; index++) {
		if (source[index] === '\r') {
			count++
			if (source[index + 1] === '\n') {
				index++
			}
		} else if (source[index] === '\n') {
			count++
		}
	}
	if (source.length && !source.endsWith('\n') && !source.endsWith('\r')) {
		count++
	}
	return count
}

/**
 * Resolve the nearest line for an empty source range.
 *
 * @param lineCount Source line count
 * @param index Source line boundary
 */
function anchorLine(lineCount: number, index: number): LineSpan | null {
	if (lineCount === 0) {
		return null
	}
	const anchored = Math.min(index, lineCount - 1)
	return { from: anchored, to: anchored }
}

/**
 * Expand a line span with bounded context.
 *
 * @param span Changed line span
 * @param lineCount Total source line count
 */
function withContext(span: LineSpan | null, lineCount: number) {
	if (!span || lineCount === 0) {
		return null
	}
	return {
		from: Math.max(0, span.from - SOURCE_DIFF_LIMITS.contextLines),
		to: Math.min(lineCount - 1, span.to + SOURCE_DIFF_LIMITS.contextLines),
	}
}

/**
 * Build display lines for a source span.
 *
 * @param lines Source lines
 * @param span Display line span
 * @param cores Changed core spans
 */
function linesInSpan(lines: SourceLine[], span: LineSpan | null, cores: readonly (LineSpan | null)[]) {
	if (!span) {
		return []
	}
	return lines.slice(span.from, span.to + 1).map((line) => ({
		...line,
		segments: [...line.segments],
		changed: cores.some((core) => core !== null && line.number - 1 >= core.from && line.number - 1 <= core.to),
	}))
}

/**
 * Add word-level emphasis to aligned changed lines.
 *
 * @param before Earlier display lines
 * @param after Later display lines
 * @param coreBefore Earlier changed core span
 * @param coreAfter Later changed core span
 * @param spanBefore Earlier hunk span
 * @param spanAfter Later hunk span
 * @param wordDiffBudget Remaining line pairs eligible for word emphasis
 * @param wordDiffBudget.deadline Time when word emphasis must stop
 * @param wordDiffBudget.remaining Remaining line-pair count
 */
function addWordEmphasis(
	before: SourceDiffLine[],
	after: SourceDiffLine[],
	coreBefore: LineSpan | null,
	coreAfter: LineSpan | null,
	spanBefore: LineSpan | null,
	spanAfter: LineSpan | null,
	wordDiffBudget: { deadline: number, remaining: number },
) {
	if (!coreBefore || !coreAfter || !spanBefore || !spanAfter) {
		return
	}
	const removed = before.slice(coreBefore.from - spanBefore.from, coreBefore.to - spanBefore.from + 1)
	const added = after.slice(coreAfter.from - spanAfter.from, coreAfter.to - spanAfter.from + 1)
	markChangedEol(removed, added)
	if (removed.length > SOURCE_DIFF_LIMITS.maximumWordDiffLines
		|| added.length > SOURCE_DIFF_LIMITS.maximumWordDiffLines) {
		return
	}
	const lineCount = Math.min(removed.length, added.length)
	for (let index = 0; index < lineCount && wordDiffBudget.remaining > 0; index++) {
		const beforeLine = removed[index]!
		const afterLine = added[index]!
		if (beforeLine.text.length > SOURCE_DIFF_LIMITS.maximumWordDiffCharacters
			|| afterLine.text.length > SOURCE_DIFF_LIMITS.maximumWordDiffCharacters) {
			continue
		}
		const remainingMilliseconds = wordDiffBudget.deadline - Date.now()
		if (remainingMilliseconds <= 0) {
			wordDiffBudget.remaining = 0
			return
		}
		wordDiffBudget.remaining--
		const words = diffWordsWithSpace(beforeLine.text, afterLine.text, {
			timeout: Math.min(
				remainingMilliseconds,
				SOURCE_DIFF_LIMITS.maximumWordDiffPairMilliseconds,
			),
		})
		if (!words) {
			continue
		}
		beforeLine.segments = words
			.filter(({ added }) => !added)
			.map(({ value, removed }) => ({ text: value, changed: removed }))
		afterLine.segments = words
			.filter(({ removed }) => !removed)
			.map(({ value, added }) => ({ text: value, changed: added }))
	}
}

/**
 * Mark paired lines with different line endings.
 *
 * @param before Earlier display lines
 * @param after Later display lines
 */
function markChangedEol(before: SourceDiffLine[], after: SourceDiffLine[]) {
	for (let index = 0; index < Math.min(before.length, after.length); index++) {
		const left = before[index]!
		const right = after[index]!
		if (left.changed && right.changed && left.eol !== right.eol) {
			left.eolChanged = true
			right.eolChanged = true
		}
	}
}

/**
 * Check whether two line spans overlap or touch.
 *
 * @param left First optional line span
 * @param right Second optional line span
 */
function spansOverlap(left: LineSpan | null, right: LineSpan | null) {
	return left !== null && right !== null && right.from <= left.to + 1
}

/**
 * Merge two optional line spans.
 *
 * @param left First optional line span
 * @param right Second optional line span
 */
function mergeSpans(left: LineSpan | null, right: LineSpan | null): LineSpan | null {
	if (!left) {
		return right ? { ...right } : null
	}
	if (!right) {
		return { ...left }
	}
	return { from: Math.min(left.from, right.from), to: Math.max(left.to, right.to) }
}

/**
 * Select unchanged lines between two spans.
 *
 * @param lines Source display lines
 * @param left Earlier line span
 * @param right Later line span
 */
function betweenSpans(lines: SourceLine[], left: LineSpan | null, right: LineSpan | null) {
	if (!left || !right || right.from <= left.to + 1) {
		return []
	}
	return lines.slice(left.to + 1, right.from)
}

/** Create the standard source comparison abort error. */
function abortError() {
	return new DOMException('Source comparison aborted', 'AbortError')
}
