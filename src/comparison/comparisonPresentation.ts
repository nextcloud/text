/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type {
	ComparisonAttributeCode,
	ComparisonMarkCode,
	ComparisonSignal,
} from './markdownComparisonTypes.ts'

const attributePriority: Record<ComparisonAttributeCode, number> = {
	'image-target': 219,
	'image-alt': 218,
	'link-target': 217,
	link: 216,
	'mention-identity': 215,
	mathematics: 214,
	'preview-target': 213,
	'footnote-reference': 212,
	'task-state': 211,
	'heading-level': 210,
	'list-start': 209,
	'code-language': 208,
	'text-direction': 207,
	'table-span': 206,
	'table-alignment': 205,
	'callout-type': 204,
	'details-state': 203,
	'unknown-attribute': 202,
}

const markPriority: Record<ComparisonMarkCode, number> = {
	bold: 106,
	italic: 105,
	strike: 104,
	highlight: 103,
	underline: 102,
	'inline-code': 101,
}

/**
 * Select the user-facing semantic signal independently of storage order.
 *
 * @param signals Canonically stored descriptor signals
 */
export function selectComparisonSignal(signals: readonly ComparisonSignal[]): ComparisonSignal | undefined {
	return signals.reduce<ComparisonSignal | undefined>((selected, signal) => {
		return !selected || signalPriority(signal) > signalPriority(selected) ? signal : selected
	}, undefined)
}

/**
 * @param signal Comparison signal
 */
function signalPriority(signal: ComparisonSignal) {
	if (signal.type === 'attribute') {
		return attributePriority[signal.attribute]
	}
	if (signal.type === 'mark') {
		return markPriority[signal.mark]
	}
	return 150
}
