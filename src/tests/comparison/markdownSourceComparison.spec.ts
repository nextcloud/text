/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	createMarkdownSourceComparison,
	SOURCE_DIFF_LIMITS,
} from '../../comparison/markdownSourceComparison.ts'
import { compareMarkdownSourceLines } from '../../comparison/markdownSourceComparisonProtocol.ts'
import {
	ATLAS_CURRENT_CONTENT,
	ATLAS_INITIAL_CONTENT,
	ATLAS_SYNTAX_ONLY_CONTENT,
} from './fixtures/atlasComparison.ts'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('Markdown source comparison', () => {
	it('uses one bounded result contract in the worker and synchronous fallback', () => {
		expect(compareMarkdownSourceLines({
			after: 'new\n',
			before: 'old\n',
			maximumEditLength: 10,
			timeoutMilliseconds: 1000,
		})).toMatchObject({ status: 'ready' })
		expect(compareMarkdownSourceLines({
			after: 'new\n',
			before: 'old\n',
			maximumEditLength: 0,
			timeoutMilliseconds: 1000,
		})).toEqual({ status: 'limited' })
	})

	it.each(['', '# Same\n', 'line 1\r\nline 2'])('returns no hunks for identical raw source', async (source) => {
		await expect(createMarkdownSourceComparison(source, source)).resolves.toMatchObject({
			status: 'ready',
			hunks: [],
		})
	})

	it('summarizes a file-wide line-ending change without presenting a rewrite', async () => {
		const model = await createMarkdownSourceComparison('first\nsecond\n', 'first\r\nsecond\r\n')
		expect(model).toMatchObject({
			status: 'ready',
			hunks: [],
			lineEndingChange: { before: 'lf', after: 'crlf' },
		})
	})

	it.each([
		['uniform to mixed', 'first\nsecond\n', 'first\r\nsecond\n', { before: 'lf', after: 'mixed' }],
		['mixed pattern', 'first\r\nsecond\n', 'first\nsecond\r\n', { before: 'mixed', after: 'mixed' }],
	] as const)('does not hide a %s line-ending-only change', async (_name, before, after, lineEndingChange) => {
		await expect(createMarkdownSourceComparison(before, after)).resolves.toMatchObject({
			status: 'ready',
			hunks: [],
			lineEndingChange,
		})
	})

	it('does not report equal mixed conventions across content edits', async () => {
		await expect(createMarkdownSourceComparison(
			'first\r\nold\nthird\r\n',
			'first\nnew\r\nthird\r\n',
		)).resolves.toMatchObject({
			status: 'ready',
			lineEndingChange: null,
		})
	})

	it('preserves exact line content and adds bounded intra-line emphasis', async () => {
		const model = await createMarkdownSourceComparison('one old value\n', 'one new value\n')
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		expect(model.hunks).toHaveLength(1)
		expect(model.hunks[0]?.before[0]).toMatchObject({ number: 1, text: 'one old value', changed: true, eol: 'lf' })
		expect(model.hunks[0]?.after[0]).toMatchObject({ number: 1, text: 'one new value', changed: true, eol: 'lf' })
		expect(model.hunks[0]?.before[0]?.segments).toContainEqual({ text: 'old', changed: true })
		expect(model.hunks[0]?.after[0]?.segments).toContainEqual({ text: 'new', changed: true })
	})

	it('keeps line-level changes when word emphasis exceeds its time limit', async () => {
		let now = 0
		const clock = vi.spyOn(Date, 'now').mockImplementation(() => now += 11)
		try {
			const before = `${'a '.repeat(999)}a`
			const after = `${'b '.repeat(999)}b`
			const model = await createMarkdownSourceComparison(before, after)
			expect(model.status).toBe('ready')
			if (model.status !== 'ready') {
				return
			}
			expect(model.hunks[0]?.before[0]?.changed).toBe(true)
			expect(model.hunks[0]?.after[0]?.changed).toBe(true)
			expect(model.hunks[0]?.before[0]?.segments.some(({ changed }) => changed)).toBe(false)
			expect(model.hunks[0]?.after[0]?.segments.some(({ changed }) => changed)).toBe(false)
		} finally {
			clock.mockRestore()
		}
	})

	it('keeps syntax-only equivalent Markdown visible', async () => {
		const model = await createMarkdownSourceComparison('# Heading', '# Heading #')
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		expect(model.hunks.length).toBeGreaterThan(0)
		expect(model.hunks[0]?.before.some(({ text }) => text === '# Heading')).toBe(true)
		expect(model.hunks[0]?.after.some(({ text }) => text === '# Heading #')).toBe(true)
	})

	it.each([
		['insertion at the start', 'two\nthree\n', 'one\ntwo\nthree\n', 0, 1],
		['line insertion', 'one\nthree\n', 'one\ntwo\nthree\n', 0, 1],
		['insertion at the end', 'one\ntwo\n', 'one\ntwo\nthree\n', 0, 1],
		['deletion at the start', 'one\ntwo\nthree\n', 'two\nthree\n', 1, 0],
		['line deletion', 'one\ntwo\nthree\n', 'one\nthree\n', 1, 0],
		['deletion at the end', 'one\ntwo\nthree\n', 'one\ntwo\n', 1, 0],
		['line replacement', 'one\nold\nthree\n', 'one\nnew\nthree\n', 1, 1],
	] as const)('preserves a simple %s', async (_name, before, after, removed, added) => {
		const model = await createMarkdownSourceComparison(before, after)
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		expect(model.hunks).toHaveLength(1)
		expect(model.lineEndingChange).toBeNull()
		expect(model.hunks[0]?.before.filter(({ changed }) => changed)).toHaveLength(removed)
		expect(model.hunks[0]?.after.filter(({ changed }) => changed)).toHaveLength(added)
	})

	it('preserves changed blank lines as source lines', async () => {
		const model = await createMarkdownSourceComparison('one\n\ntwo\n', 'one\n \ntwo\n')
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		expect(model.hunks.flatMap(({ before }) => before)).toContainEqual(expect.objectContaining({ text: '' }))
		expect(model.hunks.flatMap(({ after }) => after)).toContainEqual(expect.objectContaining({ text: ' ', changed: true, hasTrailingWhitespace: true }))
	})

	it('exposes spaces, tabs, zero-width characters, EOL changes, and missing final newline', async () => {
		const before = 'tab\tvalue  \r\nzero\u200Bwidth\nlast'
		const after = 'tab value \nzero width\nlast\n'
		const model = await createMarkdownSourceComparison(before, after)
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		const beforeLines = model.hunks.flatMap(({ before }) => before)
		const afterLines = model.hunks.flatMap(({ after }) => after)
		expect(beforeLines[0]).toMatchObject({ hasTab: true, hasTrailingWhitespace: true, eol: 'crlf' })
		expect(beforeLines.some(({ hasZeroWidth }) => hasZeroWidth)).toBe(true)
		expect(beforeLines.at(-1)).toMatchObject({ missingFinalNewline: true, eol: 'none' })
		expect(afterLines.at(-1)).toMatchObject({ missingFinalNewline: false, eol: 'lf' })
		expect(beforeLines.some(({ eolChanged }) => eolChanged)).toBe(true)
	})

	it.each([
		['CJK', '发布计划', '发布方案'],
		['RTL and bidi', 'English', '\u2067العربية\u2069'],
		['emoji', '👩‍💻', '👨‍💻'],
		['combining marks', 'e\u0301', 'é'],
		['HTML-like source', '<script>globalThis.pwned = true</script>', '<img src=x onerror=alert(1)>'],
	])('returns %s as literal source text', async (_name, before, after) => {
		const model = await createMarkdownSourceComparison(before, after)
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		expect(model.hunks[0]?.before.map(({ text }) => text).join('\n')).toContain(before)
		expect(model.hunks[0]?.after.map(({ text }) => text).join('\n')).toContain(after)
	})

	it('groups distant changes into hunks with an expandable gap payload', async () => {
		const before = Array.from({ length: 20 }, (_, index) => `line ${index}`)
		const after = [...before]
		after[1] = 'changed one'
		after[18] = 'changed eighteen'
		const model = await createMarkdownSourceComparison(before.join('\n'), after.join('\n'))
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		expect(model.hunks).toHaveLength(2)
		expect(model.gaps).toHaveLength(1)
		expect(model.gaps[0]?.count).toBeGreaterThan(0)
		expect(model.gaps[0]?.before.every(({ changed }) => !changed)).toBe(true)
	})

	it('keeps changed cores disjoint when their context merges', async () => {
		const before = Array.from({ length: 12 }, (_, index) => `line ${index}`)
		const after = [...before]
		before[1] = 'first old value'
		after[1] = 'first new value'
		before[8] = 'second old value'
		after[8] = 'second new value'
		const model = await createMarkdownSourceComparison(before.join('\n'), after.join('\n'))
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}

		expect(model.hunks).toHaveLength(1)
		const hunk = model.hunks[0]!
		expect(hunk.before.filter(({ changed }) => changed).map(({ number }) => number)).toEqual([2, 9])
		expect(hunk.after.filter(({ changed }) => changed).map(({ number }) => number)).toEqual([2, 9])
		expect(hunk.before.find(({ text }) => text === 'line 5')).toMatchObject({
			changed: false,
			eolChanged: false,
			segments: [{ text: 'line 5', changed: false }],
		})
		expect(hunk.after.find(({ text }) => text === 'line 5')).toMatchObject({
			changed: false,
			eolChanged: false,
			segments: [{ text: 'line 5', changed: false }],
		})
		expect(hunk.before.find(({ text }) => text === 'first old value')?.segments)
			.toContainEqual({ text: 'old', changed: true })
		expect(hunk.after.find(({ text }) => text === 'second new value')?.segments)
			.toContainEqual({ text: 'new', changed: true })
	})

	it('exposes unchanged source before and after a middle hunk', async () => {
		const before = Array.from({ length: 25 }, (_, index) => `line ${index}`)
		const after = [...before]
		after[10] = 'changed ten'
		const model = await createMarkdownSourceComparison(before.join('\n'), after.join('\n'))
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		expect(model.hunks).toHaveLength(1)
		expect(model.gaps.map(({ slot }) => slot)).toEqual([0, 1])
		expect(model.gaps[0]?.before[0]?.text).toBe('line 0')
		expect(model.gaps[1]?.before.at(-1)?.text).toBe('line 24')
		expect(model.gaps.every(({ before: left, after: right }) => (
			left.every(({ changed }) => !changed)
			&& right.every(({ changed }) => !changed)
		))).toBe(true)
	})

	it('returns an explicit size limit and supports caller cancellation', async () => {
		const large = 'x'.repeat(SOURCE_DIFF_LIMITS.maximumCharacters + 1)
		await expect(createMarkdownSourceComparison(large, '')).resolves.toEqual({ status: 'limited', reason: 'size' })

		const controller = new AbortController()
		controller.abort()
		await expect(createMarkdownSourceComparison('before', 'after', controller.signal))
			.rejects.toMatchObject({ name: 'AbortError' })
	})

	it('rejects excessive line-object cardinality below the character limit', async () => {
		const manyShortLines = 'x\n'.repeat(SOURCE_DIFF_LIMITS.maximumLines + 1)
		expect(manyShortLines.length).toBeLessThan(SOURCE_DIFF_LIMITS.maximumCharacters)
		await expect(createMarkdownSourceComparison(manyShortLines, ''))
			.resolves.toEqual({ status: 'limited', reason: 'size' })
	})

	it('terminates an in-flight worker when the caller cancels', async () => {
		const terminate = vi.fn()
		class WorkerMock {
			addEventListener() {}

			postMessage() {}
			terminate = terminate
		}
		vi.stubGlobal('Worker', WorkerMock)
		const controller = new AbortController()
		const result = createMarkdownSourceComparison('before', 'after', controller.signal)
		controller.abort()
		await expect(result).rejects.toMatchObject({ name: 'AbortError' })
		expect(terminate).toHaveBeenCalledOnce()
	})

	it('observes cancellation that occurs while the worker is created', async () => {
		const controller = new AbortController()
		const postMessage = vi.fn()
		const terminate = vi.fn()
		class WorkerMock {
			listeners = new Map<string, EventListener>()

			constructor() {
				controller.abort()
			}

			addEventListener(type: string, listener: EventListener) {
				this.listeners.set(type, listener)
			}

			removeEventListener(type: string) {
				this.listeners.delete(type)
			}

			postMessage = postMessage.mockImplementation(() => {
				this.listeners.get('message')?.({ data: { status: 'ready', changes: [] } } as unknown as Event)
			})

			terminate = terminate
		}
		vi.stubGlobal('Worker', WorkerMock)

		await expect(createMarkdownSourceComparison('before', 'after', controller.signal))
			.rejects.toMatchObject({ name: 'AbortError' })
		expect(postMessage).not.toHaveBeenCalled()
		expect(terminate).toHaveBeenCalledOnce()
	})

	it('bounds word emphasis across fragmented changed runs', async () => {
		const clock = vi.spyOn(Date, 'now').mockReturnValue(0)
		try {
			const changedLineCount = SOURCE_DIFF_LIMITS.maximumWordDiffPairs + 1
			const before = Array.from({ length: changedLineCount }, (_, index) => [
				`old value ${index}`,
				`unchanged ${index}`,
			]).flat()
			const after = before.map((line) => line.replace('old', 'new'))
			const model = await createMarkdownSourceComparison(before.join('\n'), after.join('\n'))
			expect(model.status).toBe('ready')
			if (model.status !== 'ready') {
				return
			}

			const changedLines = model.hunks.flatMap(({ after }) => after).filter(({ changed }) => changed)
			const emphasizedLines = changedLines.filter(({ segments }) => segments.some(({ changed }) => changed))
			expect(changedLines).toHaveLength(changedLineCount)
			expect(emphasizedLines).toHaveLength(SOURCE_DIFF_LIMITS.maximumWordDiffPairs)
		} finally {
			clock.mockRestore()
		}
	})

	it('returns an explicit complexity limit for a total rewrite beyond the edit budget', async () => {
		const lineCount = SOURCE_DIFF_LIMITS.maximumEditLength / 2 + 1
		const before = Array.from({ length: lineCount }, () => 'before').join('\n')
		const after = Array.from({ length: lineCount }, () => 'after').join('\n')
		await expect(createMarkdownSourceComparison(before, after)).resolves.toEqual({ status: 'limited', reason: 'complexity' })
	})

	it('does not return more source rows than the view can render safely', async () => {
		const lineCount = SOURCE_DIFF_LIMITS.maximumDisplayedRows + 1
		const before = Array.from({ length: lineCount }, (_, index) => `before ${index}`).join('\n')
		const after = Array.from({ length: lineCount }, (_, index) => `after ${index}`).join('\n')

		await expect(createMarkdownSourceComparison(before, after))
			.resolves.toEqual({ status: 'limited', reason: 'complexity' })
	})

	it('counts removal-heavy and addition-heavy runs in one displayed-row bound', async () => {
		const lineCount = SOURCE_DIFF_LIMITS.maximumDisplayedRows / 2 + 1
		const before = [
			...Array.from({ length: lineCount }, (_, index) => `removed ${index}`),
			'shared anchor',
		].join('\n')
		const after = [
			'shared anchor',
			...Array.from({ length: lineCount }, (_, index) => `added ${index}`),
		].join('\n')

		await expect(createMarkdownSourceComparison(before, after))
			.resolves.toEqual({ status: 'limited', reason: 'complexity' })
	})

	it('preserves the Atlas syntax-only EOL, whitespace, and final-newline differences', async () => {
		const model = await createMarkdownSourceComparison(ATLAS_INITIAL_CONTENT, ATLAS_SYNTAX_ONLY_CONTENT)
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		const before = model.hunks.flatMap(({ before }) => before)
		const after = model.hunks.flatMap(({ after }) => after)
		const beforeLineCount = before.length + model.gaps.flatMap(({ before }) => before).length
		const afterLineCount = after.length + model.gaps.flatMap(({ after }) => after).length
		expect(model.hunks.length).toBeGreaterThan(0)
		expect(model.lineEndingChange).toEqual({ before: 'lf', after: 'crlf' })
		expect(before.filter(({ changed }) => changed).length).toBeLessThan(beforeLineCount)
		expect(after.filter(({ changed }) => changed).length).toBeLessThan(afterLineCount)
		expect(after.some(({ eol }) => eol === 'crlf')).toBe(true)
		expect(after.some(({ hasTrailingWhitespace }) => hasTrailingWhitespace)).toBe(true)
		expect(after.at(-1)).toMatchObject({ eol: 'none', missingFinalNewline: true })
	})

	it('keeps changed Atlas code literal in the source model', async () => {
		const model = await createMarkdownSourceComparison(ATLAS_INITIAL_CONTENT, ATLAS_CURRENT_CONTENT)
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		expect(model.hunks.flatMap(({ after }) => after).map(({ text }) => text))
			.toContain('const rollbackThreshold = 0.015')
	})
})
