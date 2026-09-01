/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SourceDiffHunk, SourceDiffLine } from '../../comparison/markdownSourceComparison.ts'

import { afterEach, describe, expect, it, vi } from 'vitest'
import { createMarkdownSourceComparison, materializeSourceDiffGap, SOURCE_DIFF_LIMITS } from '../../comparison/markdownSourceComparison.ts'
import { compareMarkdownSourceLines } from '../../comparison/markdownSourceComparisonProtocol.ts'

afterEach(() => vi.unstubAllGlobals())

describe('literal Markdown source comparison', () => {
	const lines = (hunks: readonly SourceDiffHunk[], side: 'before' | 'after') => hunks
		.flatMap(({ rows }) => rows.flatMap((row) => row[side] ? [row[side]] : []))

	it('V10 normalizes EOL only for matching while retaining literal line facts', async () => {
		const model = await createMarkdownSourceComparison('tab\tvalue  \r\nzero\u200Bwidth\nlast', 'tab value \nzero width\nlast\n')
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		const before = lines(model.hunks, 'before')
		const after = lines(model.hunks, 'after')
		expect(before[0]).toMatchObject({ text: 'tab\tvalue  ', eol: 'crlf' })
		expect(before.some(({ text }) => text.includes('\u200b'))).toBe(true)
		expect(before.at(-1)?.eol).toBe('none')
		expect(after.at(-1)?.eol).toBe('lf')
	})

	it('AUD-14 materializes stable paired row records with the source model', async () => {
		const model = await createMarkdownSourceComparison('old\nsame\n', 'new\nsame\n')
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		const hunk = model.hunks[0]!

		expect(hunk.rows.map(({ before, after }) => [before?.text, after?.text])).toEqual([['old', 'new'], ['same', 'same']])
		expect(hunk.rows).toBe(hunk.rows)
	})

	it('AUD-08 represents large collapsed gaps without retained line clones', async () => {
		const source = Array.from({ length: 10_000 }, (_value, index) => `line ${index}`).join('\n')
		const model = await createMarkdownSourceComparison(source, source)
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}

		expect(model.gaps).toEqual([{
			id: 'source-gap-0',
			slot: 0,
			beforeFrom: 0,
			beforeTo: 10_000,
			afterFrom: 0,
			afterTo: 10_000,
			count: 10_000,
		}])
	})

	it('AUD-08 materializes large gaps in bounded observable pages', async () => {
		const source = Array.from({ length: 10_000 }, (_value, index) => `line ${index}`).join('\n')
		const model = await createMarkdownSourceComparison(source, source)
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		const gap = model.gaps[0]!

		const firstPage = materializeSourceDiffGap(source, source, gap, Number.POSITIVE_INFINITY)
		const secondPage = materializeSourceDiffGap(source, source, gap, SOURCE_DIFF_LIMITS.maximumGapPageRows, SOURCE_DIFF_LIMITS.maximumGapPageRows)

		expect(firstPage).toHaveLength(SOURCE_DIFF_LIMITS.maximumGapPageRows)
		expect(firstPage[0]?.before).toMatchObject({ number: 1, text: 'line 0' })
		expect(firstPage.at(-1)?.after).toMatchObject({ number: SOURCE_DIFF_LIMITS.maximumGapPageRows, text: `line ${SOURCE_DIFF_LIMITS.maximumGapPageRows - 1}` })
		expect(secondPage).toHaveLength(SOURCE_DIFF_LIMITS.maximumGapPageRows)
		expect(secondPage[0]?.before).toMatchObject({ number: SOURCE_DIFF_LIMITS.maximumGapPageRows + 1, text: `line ${SOURCE_DIFF_LIMITS.maximumGapPageRows}` })
		expect(secondPage.at(-1)?.after).toMatchObject({ number: SOURCE_DIFF_LIMITS.maximumGapPageRows * 2, text: `line ${SOURCE_DIFF_LIMITS.maximumGapPageRows * 2 - 1}` })
	})

	it('falls back when visible controls exceed the source display limit', async () => {
		const source = `${'\t'.repeat(200_000)}😀`

		await expect(createMarkdownSourceComparison(source, source)).resolves.toEqual({
			status: 'limited',
			reason: 'size',
		})
	})

	it('retains complete literal lines when only line endings differ', async () => {
		const beforeSource = 'same\r\nbytes\r\n'
		const afterSource = 'same\nbytes\n'
		const model = await createMarkdownSourceComparison(beforeSource, afterSource)
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		expect(model.hunks).toEqual([])
		expect(model.gaps).toHaveLength(1)
		const rows = materializeSourceDiffGap(beforeSource, afterSource, model.gaps[0]!)
		expect(rows.map(({ before }: { before?: SourceDiffLine }) => ({ text: before?.text, eol: before?.eol }))).toEqual([
			{ text: 'same', eol: 'crlf' },
			{ text: 'bytes', eol: 'crlf' },
		])
		expect(rows.map(({ after }: { after?: SourceDiffLine }) => ({ text: after?.text, eol: after?.eol }))).toEqual([
			{ text: 'same', eol: 'lf' },
			{ text: 'bytes', eol: 'lf' },
		])
	})

	it('keeps syntax-only and HTML-like changes as literal text', async () => {
		const model = await createMarkdownSourceComparison('# Heading\n<script>x</script>', '# Heading #\n<img onerror=x>')
		expect(model.status).toBe('ready')
		if (model.status !== 'ready') {
			return
		}
		expect(lines(model.hunks, 'before').map(({ text }) => text)).toContain('<script>x</script>')
		expect(lines(model.hunks, 'after').map(({ text }) => text)).toContain('<img onerror=x>')
	})

	it('reports limits and aborts without losing the caller fallback contract', async () => {
		await expect(createMarkdownSourceComparison('x'.repeat(SOURCE_DIFF_LIMITS.maximumCharacters + 1), ''))
			.resolves.toEqual({ status: 'limited', reason: 'size' })
		const controller = new AbortController()
		controller.abort()
		await expect(createMarkdownSourceComparison('before', 'after', controller.signal)).rejects.toMatchObject({ name: 'AbortError' })
	})

	it('V11 terminates an in-flight worker when the caller aborts', async () => {
		const terminate = vi.fn()
		vi.stubGlobal('Worker', class {
			addEventListener() {}
			removeEventListener() {}
			postMessage() {}
			terminate() { terminate() }
		})
		const controller = new AbortController()
		const comparison = createMarkdownSourceComparison('before', 'after', controller.signal)
		controller.abort()
		await expect(comparison).rejects.toMatchObject({ name: 'AbortError' })
		expect(terminate).toHaveBeenCalledOnce()
	})

	it('terminates the worker when posting the comparison request throws', async () => {
		const failure = new Error('post failure')
		const terminate = vi.fn()
		vi.stubGlobal('Worker', class {
			addEventListener() {}
			removeEventListener() {}
			postMessage() {
				throw failure
			}

			terminate() { terminate() }
		})

		await expect(createMarkdownSourceComparison('before', 'after')).rejects.toBe(failure)
		expect(terminate).toHaveBeenCalledOnce()
	})

	it('rejects message decoding errors once and ignores a late success', async () => {
		const workers: Array<{ onmessage?: EventListener, onmessageerror?: EventListener }> = []
		const terminate = vi.fn()
		vi.stubGlobal('Worker', class {
			onmessage?: EventListener
			onmessageerror?: EventListener
			constructor() {
				workers.push(this)
			}

			postMessage() {}

			terminate() { terminate() }
		})
		const comparison = createMarkdownSourceComparison('before', 'after')

		expect(workers[0]!.onmessageerror).toBeTypeOf('function')
		workers[0]!.onmessageerror!(new MessageEvent('messageerror'))
		workers[0]!.onmessage!(new MessageEvent('message', { data: { status: 'ready', changes: [] } }))

		await expect(comparison).rejects.toThrow('Source comparison worker failed')
		expect(terminate).toHaveBeenCalledOnce()
	})

	it('rejects malformed worker responses after cleanup', async () => {
		const workers: Array<{ onmessage?: EventListener }> = []
		const terminate = vi.fn()
		vi.stubGlobal('Worker', class {
			onmessage?: EventListener
			constructor() {
				workers.push(this)
			}

			postMessage() {}

			terminate() { terminate() }
		})
		const comparison = createMarkdownSourceComparison('before', 'after')

		workers[0]!.onmessage!(new MessageEvent('message', { data: null }))

		await expect(comparison).rejects.toThrow('Source comparison worker failed')
		expect(terminate).toHaveBeenCalledOnce()
	})

	it('uses the same bounded line protocol for main-thread and worker paths', () => {
		expect(compareMarkdownSourceLines({ before: 'old\n', after: 'new\n', maximumEditLength: 10, timeoutMilliseconds: 1000 }))
			.toMatchObject({ status: 'ready' })
		expect(compareMarkdownSourceLines({ before: 'old\n', after: 'new\n', maximumEditLength: 0, timeoutMilliseconds: 1000 }))
			.toEqual({ status: 'limited' })
	})
})
