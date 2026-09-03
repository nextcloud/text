/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonAttributeCode as AttributeCode, ComparisonMarkCode as MarkCode, ComparisonSignal as Signal } from './markdownComparisonTypes.ts'

import { t } from '@nextcloud/l10n'

type Label = () => string
const attributes: Record<AttributeCode, readonly [number, Label]> = {
	'image-target': [219, () => t('text', 'Image changed')],
	'image-alt': [218, () => t('text', 'Image description changed')],
	'link-target': [217, () => t('text', 'Link target changed')],
	link: [216, () => t('text', 'Link changed')],
	'mention-identity': [215, () => t('text', 'Mention changed')],
	mathematics: [214, () => t('text', 'Mathematics changed')],
	'preview-target': [213, () => t('text', 'Link preview changed')],
	'footnote-reference': [212, () => t('text', 'Footnote changed')],
	'task-state': [211, () => t('text', 'Task state changed')],
	'heading-level': [210, () => t('text', 'Heading level changed')],
	'list-start': [209, () => t('text', 'List start changed')],
	'code-language': [208, () => t('text', 'Code language changed')],
	'text-direction': [207, () => t('text', 'Text direction changed')],
	'table-span': [206, () => t('text', 'Table structure changed')],
	'table-alignment': [205, () => t('text', 'Table alignment changed')],
	'callout-type': [204, () => t('text', 'Callout type changed')],
	'details-state': [203, () => t('text', 'Details state changed')],
	'unknown-attribute': [202, () => t('text', 'Attribute changed')],
}

const marks: Record<MarkCode, readonly [number, Label]> = {
	bold: [106, () => t('text', 'Bold')],
	italic: [105, () => t('text', 'Italic')],
	strike: [104, () => t('text', 'Strikethrough')],
	highlight: [103, () => t('text', 'Highlight')],
	underline: [102, () => t('text', 'Underline')],
	'inline-code': [101, () => t('text', 'Inline code')],
}

export function selectComparisonSignal(signals: readonly Signal[]): Signal | undefined {
	return signals.reduce<Signal | undefined>((selected, signal) => (
		!selected || signalPriority(signal) > signalPriority(selected) ? signal : selected
	), undefined)
}

export function comparisonSignalLabel(signal: Signal) {
	if (signal.type === 'attribute') {
		return attributes[signal.attribute][1]()
	}
	if (signal.type === 'mark') {
		return t('text', '{formatting} changed', { formatting: marks[signal.mark][1]() })
	}
}

function signalPriority(signal: Signal) {
	if (signal.type === 'attribute') {
		return attributes[signal.attribute][0]
	}
	if (signal.type === 'mark') {
		return marks[signal.mark][0]
	}
	return 150
}
