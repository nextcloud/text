/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonCoarseReason as CoarseReason } from './markdownComparisonTypes.ts'

export const DEFAULT_COMPARISON_CELL_LEDGER = 40_000
export const DEFAULT_COMPARISON_TOKEN_LEDGER = 84_000_000

export interface ComparisonWorkLedger {
	remainingCells: number
	remainingTokenComparisons: number
}

export interface ComparisonAlignmentOptions<T> {
	work: ComparisonWorkLedger
	fingerprint: (item: T) => string
	profile: (item: T) => readonly string[]
	compatible: (before: T, after: T) => boolean
}

export interface ComparisonAlignmentStep {
	before: number | null
	after: number | null
}

export interface ComparisonCoarseAlignmentRegion {
	before: { from: number, to: number }
	after: { from: number, to: number }
	coarseReason: CoarseReason
}

export type ComparisonAlignmentRegion = ComparisonAlignmentStep | ComparisonCoarseAlignmentRegion

export interface ExactComparisonPair {
	before: number
	after: number
}
type Options<T> = ComparisonAlignmentOptions<T>
type Step = ComparisonAlignmentStep
type Region = ComparisonAlignmentRegion
type Pair = ExactComparisonPair
type Ledger = ComparisonWorkLedger

export function createComparisonWorkLedger(): Ledger {
	return {
		remainingCells: DEFAULT_COMPARISON_CELL_LEDGER,
		remainingTokenComparisons: DEFAULT_COMPARISON_TOKEN_LEDGER,
	}
}

export function forcedIncreasingPairs(pairs: readonly Pair[]): readonly Pair[] {
	if (pairs.length < 2) {
		return pairs
	}
	const ordered = pairs.toSorted((a, b) => a.before - b.before || a.after - b.after)
	const left = increasingSubsequence(ordered.map(({ after }) => after)).lengths
	const right = increasingSubsequence(ordered.toReversed().map(({ after }) => -after)).lengths.toReversed()
	let maximum = 0
	for (const length of left) {
		if (length > maximum) {
			maximum = length
		}
	}
	const candidatesPerLevel = new Uint32Array(maximum + 1)
	for (let index = 0; index < ordered.length; index++) {
		if (left[index]! + right[index]! - 1 === maximum) {
			candidatesPerLevel[left[index]!]++
		}
	}
	return ordered.filter((_pair, index) => left[index]! + right[index]! - 1 === maximum
		&& candidatesPerLevel[left[index]!] === 1)
}

export function increasingSubsequence(values: readonly number[]) {
	const tails: number[] = []
	const previous = new Int32Array(values.length).fill(-1)
	const lengths = values.map((value, candidate) => {
		let low = 0
		let high = tails.length
		while (low < high) {
			const middle = (low + high) >>> 1
			if (values[tails[middle]!]! < value) {
				low = middle + 1
			} else {
				high = middle
			}
		}
		if (low > 0) {
			previous[candidate] = tails[low - 1]!
		}
		tails[low] = candidate
		return low + 1
	})
	const indices: number[] = []
	for (let index = tails.at(-1) ?? -1; index >= 0; index = previous[index]!) {
		indices.push(index)
	}
	return { lengths, indices: indices.reverse() }
}

export function alignComparisonAxis<T>(before: readonly T[], after: readonly T[], options: Options<T>): readonly Region[] {
	const beforeKeys = before.map(options.fingerprint)
	const afterKeys = after.map(options.fingerprint)
	return equalAxis(beforeKeys, afterKeys)
		?? planAxis(before, after, beforeKeys, afterKeys, options, uniqueExactPairs(beforeKeys, afterKeys), true)
}

export function alignComparisonColumns<T>(before: readonly T[], after: readonly T[], options: Options<T>): readonly Region[] {
	const beforeKeys = before.map(options.fingerprint)
	const afterKeys = after.map(options.fingerprint)
	return equalAxis(beforeKeys, afterKeys)
		?? planAxis(before, after, beforeKeys, afterKeys, options, rankedExactPairs(beforeKeys, afterKeys), false)
}

function equalAxis(beforeKeys: readonly string[], afterKeys: readonly string[]) {
	if (beforeKeys.length !== afterKeys.length
		|| beforeKeys.some((key, index) => key !== afterKeys[index])) {
		return null
	}
	return beforeKeys.map((_key, index) => ({ before: index, after: index }))
}

function planAxis<T>(before: readonly T[], after: readonly T[], beforeKeys: readonly string[], afterKeys: readonly string[], options: Options<T>, exactPairs: readonly Pair[], trimEdges: boolean): readonly Region[] {
	const regions: Region[] = []
	let beforeStart = 0
	let afterStart = 0
	for (const anchor of [...forcedIncreasingPairs(exactPairs), { before: before.length, after: after.length }]) {
		let beforeEnd = anchor.before
		let afterEnd = anchor.after
		const suffix: Step[] = []
		if (trimEdges) {
			while (beforeStart < beforeEnd && afterStart < afterEnd
				&& beforeKeys[beforeStart] === afterKeys[afterStart]) {
				regions.push({ before: beforeStart++, after: afterStart++ })
			}
			while (beforeStart < beforeEnd && afterStart < afterEnd
				&& beforeKeys[beforeEnd - 1] === afterKeys[afterEnd - 1]) {
				suffix.unshift({ before: --beforeEnd, after: --afterEnd })
			}
		}
		if (beforeEnd - beforeStart === 1 && afterEnd - afterStart === 1) {
			if (options.compatible(before[beforeStart]!, after[afterStart]!)) {
				regions.push({ before: beforeStart, after: afterStart })
			} else {
				regions.push({ before: beforeStart, after: null })
				regions.push({ before: null, after: afterStart })
			}
			beforeStart++
			afterStart++
		} else if (beforeStart < beforeEnd && afterStart < afterEnd) {
			const solved = solveWeightedGap(
				before.slice(beforeStart, beforeEnd),
				after.slice(afterStart, afterEnd),
				options,
			)
			if ('coarseReason' in solved) {
				regions.push({
					before: { from: beforeStart, to: beforeEnd },
					after: { from: afterStart, to: afterEnd },
					coarseReason: solved.coarseReason,
				})
			} else {
				regions.push(...solved.steps.map((step) => ({
					before: step.before === null ? null : step.before + beforeStart,
					after: step.after === null ? null : step.after + afterStart,
				})))
			}
			beforeStart = beforeEnd
			afterStart = afterEnd
		}
		for (let index = beforeStart; index < beforeEnd; index++) {
			regions.push({ before: index, after: null })
		}
		for (let index = afterStart; index < afterEnd; index++) {
			regions.push({ before: null, after: index })
		}
		regions.push(...suffix)
		if (anchor.before < before.length) {
			regions.push(anchor)
		}
		beforeStart = anchor.before + 1
		afterStart = anchor.after + 1
	}
	return regions
}

function uniqueExactPairs(beforeKeys: readonly string[], afterKeys: readonly string[]) {
	const beforeIndices = groupIndices(beforeKeys)
	const afterIndices = groupIndices(afterKeys)
	return beforeKeys.flatMap((key, index) => (
		beforeIndices.get(key)!.length === 1 && afterIndices.get(key)?.length === 1
			? [{ before: index, after: afterIndices.get(key)![0]! }]
			: []
	))
}

function uniqueCompatiblePairs<T>(before: readonly T[], after: readonly T[], compatible: (before: T, after: T) => boolean) {
	const afterMatches = before.map((item) => after
		.map((candidate, index) => compatible(item, candidate) ? index : -1)
		.filter((index) => index >= 0))
	const beforeMatches = after.map((item) => before
		.map((candidate, index) => compatible(candidate, item) ? index : -1)
		.filter((index) => index >= 0))
	return afterMatches.flatMap((matches, beforeIndex) => {
		const afterIndex = matches[0]
		return matches.length === 1 && beforeMatches[afterIndex!]?.length === 1
			? [{ before: beforeIndex, after: afterIndex! }]
			: []
	})
}

function rankedExactPairs(beforeKeys: readonly string[], afterKeys: readonly string[]) {
	const beforeIndices = groupIndices(beforeKeys)
	const afterIndices = groupIndices(afterKeys)
	return [...beforeIndices].flatMap(([key, indices]) => {
		const matches = afterIndices.get(key)
		return matches?.length === indices.length
			? indices.map((before, rank) => ({ before, after: matches[rank]! }))
			: []
	})
}

function groupIndices(keys: readonly string[]) {
	const grouped = new Map<string, number[]>()
	for (const [index, key] of keys.entries()) {
		const indices = grouped.get(key)
		if (indices) {
			indices.push(index)
		} else {
			grouped.set(key, [index])
		}
	}
	return grouped
}

interface RationalScore {
	numerator: bigint
	denominator: bigint
}

interface AlignmentState {
	score: RationalScore
	signatures: readonly number[]
}

export function solveWeightedGap<T>(before: readonly T[], after: readonly T[], options: Options<T>): { steps: readonly Step[] } | { coarseReason: CoarseReason } {
	const cellCharge = before.length * after.length
	if (cellCharge > options.work.remainingCells) {
		return { coarseReason: 'comparison-limit' }
	}
	const beforeProfiles = before.map(options.profile)
	const afterProfiles = after.map(options.profile)
	const tokenCharge = weightedTokenCharge(beforeProfiles, afterProfiles)
	if (tokenCharge > BigInt(options.work.remainingTokenComparisons)) {
		return { coarseReason: 'comparison-limit' }
	}
	options.work.remainingCells -= cellCharge
	options.work.remainingTokenComparisons -= Number(tokenCharge)
	const structuralPairs = uniqueCompatiblePairs(before, after, options.compatible)
	if (before.length === after.length
		&& structuralPairs.length === before.length
		&& structuralPairs.every((pair, index) => pair.before === index && pair.after === index)) {
		return { steps: alignmentSteps(before.length, after.length, structuralPairs) }
	}

	const parents = [-1]
	const beforeOf = [-1]
	const afterOf = [-1]
	const zero: AlignmentState = {
		score: { numerator: 0n, denominator: 1n },
		signatures: [0],
	}
	let previous = Array.from<AlignmentState>({ length: after.length + 1 }).fill(zero)
	for (let beforeIndex = 1; beforeIndex <= before.length; beforeIndex++) {
		const current = Array.from<AlignmentState>({ length: after.length + 1 })
		current[0] = zero
		for (let afterIndex = 1; afterIndex <= after.length; afterIndex++) {
			let best = betterState(previous[afterIndex]!, current[afterIndex - 1]!)
			const beforeItem = before[beforeIndex - 1]!
			const afterItem = after[afterIndex - 1]!
			if (options.compatible(beforeItem, afterItem)) {
				const source = previous[afterIndex - 1]!
				best = betterState(best, {
					score: addScores(source.score, pairScore(
						beforeProfiles[beforeIndex - 1]!,
						afterProfiles[afterIndex - 1]!,
						options.fingerprint(beforeItem) === options.fingerprint(afterItem),
					)),
					signatures: source.signatures.map((parent) => {
						parents.push(parent)
						beforeOf.push(beforeIndex - 1)
						afterOf.push(afterIndex - 1)
						return parents.length - 1
					}),
				})
			}
			current[afterIndex] = best
		}
		previous = current
	}

	const signatures = previous[after.length]!.signatures
	if (signatures.length > 1) {
		return { coarseReason: 'ambiguous-attribution' }
	}
	const matches: Pair[] = []
	for (let id = signatures[0]!; id > 0; id = parents[id]!) {
		matches.push({ before: beforeOf[id]!, after: afterOf[id]! })
	}
	return { steps: alignmentSteps(before.length, after.length, matches.reverse()) }
}

function betterState(a: AlignmentState, b: AlignmentState): AlignmentState {
	const order = compareScores(a.score, b.score)
	if (order > 0) {
		return a
	}
	if (order < 0) {
		return b
	}
	return {
		score: a.score,
		signatures: [...new Set([...a.signatures, ...b.signatures])].slice(0, 2),
	}
}

function weightedTokenCharge(before: readonly (readonly string[])[], after: readonly (readonly string[])[]) {
	let charge = 0n
	for (const beforeProfile of before) {
		for (const afterProfile of after) {
			charge += BigInt(Math.min(beforeProfile.length, afterProfile.length))
		}
	}
	return charge * 2n
}

function pairScore(before: readonly string[], after: readonly string[], exact: boolean): RationalScore {
	if (exact) {
		return { numerator: 3n, denominator: 1n }
	}
	let prefix = 0
	while (prefix < before.length && prefix < after.length && before[prefix] === after[prefix]) {
		prefix++
	}
	let suffix = 0
	const maximumSuffix = Math.min(before.length, after.length) - prefix
	while (suffix < maximumSuffix
		&& before[before.length - suffix - 1] === after[after.length - suffix - 1]) {
		suffix++
	}
	const denominator = BigInt(Math.max(before.length, after.length, 1))
	return {
		numerator: denominator + BigInt(prefix + suffix),
		denominator,
	}
}

function addScores(a: RationalScore, b: RationalScore): RationalScore {
	return {
		numerator: a.numerator * b.denominator + b.numerator * a.denominator,
		denominator: a.denominator * b.denominator,
	}
}

function compareScores(a: RationalScore, b: RationalScore) {
	const difference = a.numerator * b.denominator - b.numerator * a.denominator
	return difference < 0n ? -1 : difference > 0n ? 1 : 0
}

function alignmentSteps(beforeCount: number, afterCount: number, matches: readonly Pair[]) {
	const steps: Step[] = []
	let beforeIndex = 0
	let afterIndex = 0
	for (const match of matches) {
		while (beforeIndex < match.before) {
			steps.push({ before: beforeIndex++, after: null })
		}
		while (afterIndex < match.after) {
			steps.push({ before: null, after: afterIndex++ })
		}
		steps.push({ before: beforeIndex++, after: afterIndex++ })
	}
	while (beforeIndex < beforeCount) {
		steps.push({ before: beforeIndex++, after: null })
	}
	while (afterIndex < afterCount) {
		steps.push({ before: null, after: afterIndex++ })
	}
	return steps
}
