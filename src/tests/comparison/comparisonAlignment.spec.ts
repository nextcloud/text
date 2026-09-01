/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import {
	alignComparisonAxis,
	createComparisonWorkLedger,
	DEFAULT_COMPARISON_CELL_LEDGER,
	DEFAULT_COMPARISON_TOKEN_LEDGER,
	forcedIncreasingPairs,
} from '../../comparison/comparisonAlignment.ts'

function options(work = createComparisonWorkLedger()) {
	return {
		work,
		fingerprint: (value: string) => value,
		profile: (value: string) => [...value],
		compatible: () => true,
	}
}

interface EvidencedItem {
	id: number
	side: 'before' | 'after'
}

function evidencedOptions(work = createComparisonWorkLedger()) {
	return {
		work,
		fingerprint: ({ id, side }: EvidencedItem) => `${side}:${id}`,
		profile: ({ id, side }: EvidencedItem) => [`item:${id}`, side],
		compatible: () => true,
	}
}

function evidencedAxis(size: number, side: EvidencedItem['side']): EvidencedItem[] {
	return Array.from({ length: size }, (_value, id) => ({ id, side }))
}

const FINAL_CELL_LEDGER = DEFAULT_COMPARISON_CELL_LEDGER
const FINAL_TOKEN_LEDGER = DEFAULT_COMPARISON_TOKEN_LEDGER
const FINAL_SQUARE_SIZE = Math.floor(Math.sqrt(FINAL_CELL_LEDGER))

function permutations(values: readonly number[]): number[][] {
	if (values.length < 2) {
		return [Array.from(values)]
	}
	return values.flatMap((value, index) => permutations(values.toSpliced(index, 1))
		.map((suffix) => [value, ...suffix]))
}

function exhaustiveForcedPairs(values: readonly number[]) {
	let maximum = 0
	const optimal: number[][] = []
	for (let mask = 0; mask < 2 ** values.length; mask++) {
		const indices = values.flatMap((_value, index) => mask & (1 << index) ? [index] : [])
		if (!indices.every((index, offset) => offset === 0 || values[indices[offset - 1]!]! < values[index]!)) {
			continue
		}
		if (indices.length > maximum) {
			maximum = indices.length
			optimal.length = 0
		}
		if (indices.length === maximum) {
			optimal.push(indices)
		}
	}
	return optimal[0]!.filter((index) => optimal.every((candidate) => candidate.includes(index)))
		.map((before) => ({ before, after: values[before]! }))
}

describe('comparison alignment', () => {
	it('uses the authoritative comparison-wide shipping ledgers', () => {
		expect(createComparisonWorkLedger()).toEqual({
			remainingCells: 40_000,
			remainingTokenComparisons: 84_000_000,
		})
	})

	it('pairs a whole equal axis without weighted work', () => {
		const work = createComparisonWorkLedger()

		expect(alignComparisonAxis(['alpha', 'beta'], ['alpha', 'beta'], options(work))).toEqual([
			{ before: 0, after: 0 },
			{ before: 1, after: 1 },
		])
		expect(work).toEqual({
			remainingCells: DEFAULT_COMPARISON_CELL_LEDGER,
			remainingTokenComparisons: DEFAULT_COMPARISON_TOKEN_LEDGER,
		})
	})

	it('A03 uses ordered unique fingerprints as exact anchors', () => {
		const work = createComparisonWorkLedger()

		expect(alignComparisonAxis(['alpha', 'omega'], ['new', 'alpha', 'omega'], options(work))).toEqual([
			{ before: null, after: 0 },
			{ before: 0, after: 1 },
			{ before: 1, after: 2 },
		])
		expect(work.remainingCells).toBe(40_000)
	})

	it('matches exhaustive forced-LIS anchors for crossing candidates', () => {
		for (let size = 1; size <= 6; size++) {
			for (const values of permutations(Array.from({ length: size }, (_value, index) => index))) {
				const pairs = values.map((after, before) => ({ before, after }))
				expect(forcedIncreasingPairs(pairs), values.join(','))
					.toEqual(exhaustiveForcedPairs(values))
			}
		}
	})

	it('aligns around the forced subset of crossing exact candidates', () => {
		expect(alignComparisonAxis(['alpha', 'beta', 'gamma'], ['beta', 'gamma', 'alpha'], options())).toEqual([
			{ before: 0, after: null },
			{ before: 1, after: 0 },
			{ before: 2, after: 1 },
			{ before: null, after: 2 },
		])
	})

	it('retains the first exact duplicate when one is inserted', () => {
		expect(alignComparisonAxis(['same'], ['same', 'same'], options())).toEqual([
			{ before: 0, after: 0 },
			{ before: null, after: 1 },
		])
	})

	it('retains the first exact duplicate when one is deleted', () => {
		expect(alignComparisonAxis(['same', 'same'], ['same'], options())).toEqual([
			{ before: 0, after: 0 },
			{ before: 1, after: null },
		])
	})

	it('A09 pairs one compatible changed item without weighted work', () => {
		const work = createComparisonWorkLedger()

		expect(alignComparisonAxis(['before'], ['after'], options(work))).toEqual([
			{ before: 0, after: 0 },
		])
		expect(work.remainingCells).toBe(DEFAULT_COMPARISON_CELL_LEDGER)
		expect(work.remainingTokenComparisons).toBe(DEFAULT_COMPARISON_TOKEN_LEDGER)
	})

	it('leaves one incompatible changed item unmatched', () => {
		const incompatible = {
			...options(),
			compatible: () => false,
		}

		expect(alignComparisonAxis(['list'], ['quote'], incompatible)).toEqual([
			{ before: 0, after: null },
			{ before: null, after: 0 },
		])
	})

	it('A10 coarsens a multi-item rewrite with ambiguous exact attribution', () => {
		expect(alignComparisonAxis(['aa', 'bb', 'cc'], ['xx', 'yy'], options())).toEqual([{
			before: { from: 0, to: 3 },
			after: { from: 0, to: 2 },
			coarseReason: 'ambiguous-attribution',
		}])
	})

	it.each([
		Math.floor(FINAL_SQUARE_SIZE / 2),
		FINAL_SQUARE_SIZE - 1,
	])('A11 keeps a final-ledger-derived unique-evidence %i square gap precise', (size) => {
		const result = alignComparisonAxis(
			evidencedAxis(size, 'before'),
			evidencedAxis(size, 'after'),
			evidencedOptions(),
		)

		expect(result).toHaveLength(size)
		expect(result.every((step, index) => step.before === index && step.after === index)).toBe(true)
	})

	it('A12 keeps the largest default-ledger square gap precise', () => {
		const work = createComparisonWorkLedger()
		const size = FINAL_SQUARE_SIZE
		const result = alignComparisonAxis(
			evidencedAxis(size, 'before'),
			evidencedAxis(size, 'after'),
			evidencedOptions(work),
		)

		expect(result).toHaveLength(size)
		expect(work.remainingCells).toBe(0)
		expect(work.remainingTokenComparisons).toBe(FINAL_TOKEN_LEDGER - 4 * size ** 2)
	})

	it('A13 refuses the first generated cell and token overflows atomically', () => {
		const cellWork = createComparisonWorkLedger()
		const size = FINAL_SQUARE_SIZE
		expect(alignComparisonAxis(
			evidencedAxis(size + 1, 'before'),
			evidencedAxis(size, 'after'),
			evidencedOptions(cellWork),
		)).toEqual([{
			before: { from: 0, to: size + 1 },
			after: { from: 0, to: size },
			coarseReason: 'comparison-limit',
		}])
		expect(cellWork).toEqual(createComparisonWorkLedger())

		const tokenWork = createComparisonWorkLedger()
		const longProfile = Array.from({ length: Math.floor(FINAL_TOKEN_LEDGER / (2 * size * size)) + 1 }, () => 'x')
		expect(alignComparisonAxis(
			evidencedAxis(size, 'before'),
			evidencedAxis(size, 'after'),
			{
				...evidencedOptions(tokenWork),
				profile: () => longProfile,
			},
		)).toEqual([{
			before: { from: 0, to: size },
			after: { from: 0, to: size },
			coarseReason: 'comparison-limit',
		}])
		expect(tokenWork).toEqual(createComparisonWorkLedger())
	})

	it('A14 allocates final-ledger cell work by axis order without debiting a refused gap', () => {
		interface Item {
			fingerprint: string
			profile: readonly string[]
		}
		const gap = (size: number, name: string, side: 'before' | 'after'): Item[] => (
			Array.from({ length: size }, (_value, id) => ({
				fingerprint: `${name}:${side}:${id}`,
				profile: [`${name}:${id}`, side],
			}))
		)
		const anchor = (name: string): Item => ({ fingerprint: name, profile: [name] })
		const firstSize = Math.floor(FINAL_SQUARE_SIZE / 2)
		const refusedSize = FINAL_SQUARE_SIZE
		const lastSize = Math.max(2, Math.floor(firstSize / 10))
		const before = [
			...gap(firstSize, 'first', 'before'),
			anchor('anchor-1'),
			...gap(refusedSize, 'refused', 'before'),
			anchor('anchor-2'),
			...gap(lastSize, 'last', 'before'),
		]
		const after = [
			...gap(firstSize, 'first', 'after'),
			anchor('anchor-1'),
			...gap(refusedSize, 'refused', 'after'),
			anchor('anchor-2'),
			...gap(lastSize, 'last', 'after'),
		]
		const work = createComparisonWorkLedger()
		const result = alignComparisonAxis(before, after, {
			work,
			fingerprint: (item) => item.fingerprint,
			profile: (item) => item.profile,
			compatible: () => true,
		})
		const refusedStart = firstSize + 1

		expect(result).toContainEqual({
			before: { from: refusedStart, to: refusedStart + refusedSize },
			after: { from: refusedStart, to: refusedStart + refusedSize },
			coarseReason: 'comparison-limit',
		})
		expect(result.at(-1)).toEqual({ before: before.length - 1, after: after.length - 1 })
		expect(work.remainingCells).toBe(FINAL_CELL_LEDGER - firstSize ** 2 - lastSize ** 2)
	})

	it('A14 retains token and tie debits while preserving work after a refused token gap', () => {
		interface Item {
			fingerprint: string
			profile: readonly string[]
		}
		const gapSize = Math.floor(FINAL_SQUARE_SIZE / 2)
		const firstAfterSize = gapSize - 1
		const lastSize = Math.max(2, Math.floor(gapSize / 10))
		const firstProduct = gapSize * firstAfterSize
		const firstProfileLength = Math.floor(FINAL_TOKEN_LEDGER / (4 * firstProduct))
		const firstProfile = Array.from({ length: firstProfileLength }, () => 'same')
		const tieCharge = 2 * firstProduct * firstProfileLength
		const refusedProfileLength = Math.floor((FINAL_TOKEN_LEDGER - tieCharge) / (2 * gapSize ** 2)) + 1
		const refusedProfile = Array.from({ length: refusedProfileLength }, () => 'refused')
		const gap = (size: number, name: string, side: 'before' | 'after', profile?: readonly string[]): Item[] => (
			Array.from({ length: size }, (_value, id) => ({
				fingerprint: `${name}:${side}:${id}`,
				profile: profile ?? [`${name}:${id}`, side],
			}))
		)
		const anchor = (name: string): Item => ({ fingerprint: name, profile: [name] })
		const before = [
			...gap(gapSize, 'tie', 'before', firstProfile),
			anchor('anchor-1'),
			...gap(gapSize, 'refused', 'before', refusedProfile),
			anchor('anchor-2'),
			...gap(lastSize, 'last', 'before'),
		]
		const after = [
			...gap(firstAfterSize, 'tie', 'after', firstProfile),
			anchor('anchor-1'),
			...gap(gapSize, 'refused', 'after', refusedProfile),
			anchor('anchor-2'),
			...gap(lastSize, 'last', 'after'),
		]
		const work = createComparisonWorkLedger()
		const result = alignComparisonAxis(before, after, {
			work,
			fingerprint: (item) => item.fingerprint,
			profile: (item) => item.profile,
			compatible: () => true,
		})
		const lastCharge = 4 * lastSize ** 2

		expect(result[0]).toMatchObject({ coarseReason: 'ambiguous-attribution' })
		expect(result).toContainEqual({
			before: { from: gapSize + 1, to: 2 * gapSize + 1 },
			after: { from: firstAfterSize + 1, to: firstAfterSize + gapSize + 1 },
			coarseReason: 'comparison-limit',
		})
		expect(result.at(-1)).toEqual({ before: before.length - 1, after: after.length - 1 })
		expect(work).toEqual({
			remainingCells: FINAL_CELL_LEDGER - firstProduct - lastSize ** 2,
			remainingTokenComparisons: FINAL_TOKEN_LEDGER - tieCharge - lastCharge,
		})
	})

	it('P05 admits a skewed one-by-many gap by its exact cell charge', () => {
		const work = createComparisonWorkLedger()
		const result = alignComparisonAxis(
			evidencedAxis(1, 'before'),
			evidencedAxis(20_000, 'after'),
			evidencedOptions(work),
		)

		expect(result).not.toContainEqual(expect.objectContaining({ coarseReason: 'comparison-limit' }))
		expect(work.remainingCells).toBe(20_000)
	})
})
