/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonAlignmentStep, ComparisonWorkLedger } from '../../comparison/comparisonAlignment.ts'

import { describe, expect, it } from 'vitest'
import {
	DEFAULT_COMPARISON_CELL_LEDGER,
	DEFAULT_COMPARISON_TOKEN_LEDGER,
	solveWeightedGap,
} from '../../comparison/comparisonAlignment.ts'

interface OracleItem {
	fingerprint: string
	profile: readonly string[]
}

interface Rational {
	numerator: bigint
	denominator: bigint
}

interface OracleMatch {
	before: number
	after: number
}

function compareRational(a: Rational, b: Rational) {
	const difference = a.numerator * b.denominator - b.numerator * a.denominator
	return difference < 0n ? -1 : difference > 0n ? 1 : 0
}

function addRational(a: Rational, b: Rational): Rational {
	return {
		numerator: a.numerator * b.denominator + b.numerator * a.denominator,
		denominator: a.denominator * b.denominator,
	}
}

function oraclePairScore(before: OracleItem, after: OracleItem): Rational {
	if (before.fingerprint === after.fingerprint) {
		return { numerator: 3n, denominator: 1n }
	}
	let prefix = 0
	while (prefix < before.profile.length
		&& prefix < after.profile.length
		&& before.profile[prefix] === after.profile[prefix]) {
		prefix++
	}
	let suffix = 0
	const maximumSuffix = Math.min(before.profile.length, after.profile.length) - prefix
	while (suffix < maximumSuffix
		&& before.profile[before.profile.length - suffix - 1] === after.profile[after.profile.length - suffix - 1]) {
		suffix++
	}
	const denominator = BigInt(Math.max(before.profile.length, after.profile.length, 1))
	return { numerator: denominator + BigInt(prefix + suffix), denominator }
}

function enumerateMatchings(
	beforeCount: number,
	afterCount: number,
	beforeStart = 0,
	afterStart = 0,
): OracleMatch[][] {
	const matchings: OracleMatch[][] = [[]]
	for (let before = beforeStart; before < beforeCount; before++) {
		for (let after = afterStart; after < afterCount; after++) {
			for (const suffix of enumerateMatchings(beforeCount, afterCount, before + 1, after + 1)) {
				matchings.push([{ before, after }, ...suffix])
			}
		}
	}
	return matchings
}

function oracleAlignment(before: readonly OracleItem[], after: readonly OracleItem[]) {
	let bestScore: Rational = { numerator: -1n, denominator: 1n }
	let best: OracleMatch[][] = []
	for (const matching of enumerateMatchings(before.length, after.length)) {
		const score = matching.reduce(
			(total, pair) => addRational(total, oraclePairScore(before[pair.before]!, after[pair.after]!)),
			{ numerator: 0n, denominator: 1n },
		)
		const order = compareRational(score, bestScore)
		if (order > 0) {
			bestScore = score
			best = [matching]
		} else if (order === 0) {
			best.push(matching)
		}
	}
	const signatures = new Map(best.map((matching) => [
		matching.map(({ before: a, after: b }) => `${a}:${b}`).join(','),
		matching,
	]))
	if (signatures.size > 1) {
		return { coarseReason: 'ambiguous-attribution' as const }
	}
	return { steps: alignmentSteps(before.length, after.length, [...signatures.values()][0]!) }
}

function alignmentSteps(beforeCount: number, afterCount: number, matches: readonly OracleMatch[]) {
	const steps: ComparisonAlignmentStep[] = []
	let before = 0
	let after = 0
	for (const match of matches) {
		while (before < match.before) {
			steps.push({ before: before++, after: null })
		}
		while (after < match.after) {
			steps.push({ before: null, after: after++ })
		}
		steps.push({ before: before++, after: after++ })
	}
	while (before < beforeCount) {
		steps.push({ before: before++, after: null })
	}
	while (after < afterCount) {
		steps.push({ before: null, after: after++ })
	}
	return steps
}

function axes(items: readonly OracleItem[], maximumLength: number): OracleItem[][] {
	const result: OracleItem[][] = [[]]
	for (let length = 1; length <= maximumLength; length++) {
		for (const prefix of result.filter((axis) => axis.length === length - 1)) {
			for (const item of items) {
				result.push([...prefix, item])
			}
		}
	}
	return result
}

function freshWork(): ComparisonWorkLedger {
	return {
		remainingCells: DEFAULT_COMPARISON_CELL_LEDGER,
		remainingTokenComparisons: DEFAULT_COMPARISON_TOKEN_LEDGER,
	}
}

describe('comparison alignment exact oracles', () => {
	it('matches an independent exact-rational and signature oracle exhaustively', () => {
		const items: OracleItem[] = [
			{ fingerprint: 'a', profile: ['shared', 'a'] },
			{ fingerprint: 'b', profile: ['shared', 'b'] },
			{ fingerprint: 'c', profile: ['c'] },
		]
		const candidates = axes(items, 3)
		for (const before of candidates) {
			for (const after of candidates) {
				const actual = solveWeightedGap(before, after, {
					work: freshWork(),
					fingerprint: (item) => item.fingerprint,
					profile: (item) => item.profile,
					compatible: () => true,
				})
				expect(actual, `${before.map(({ fingerprint }) => fingerprint)} -> ${after.map(({ fingerprint }) => fingerprint)}`)
					.toEqual(oracleAlignment(before, after))
			}
		}
	})
})
