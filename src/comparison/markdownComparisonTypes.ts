/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export type ComparisonOperation = 'insert' | 'delete' | 'replace' | 'move'

export type ComparisonDetail = 'inline' | 'block'

export type ComparisonFacet
	= | 'text'
		| 'formatting'
		| 'attribute'
		| 'structure'
		| 'unknown'

export interface ComparisonRange {
	from: number
	to: number
}

export type ComparisonContextCode
	= | 'front-matter'
		| 'paragraph'
		| 'heading'
		| 'list-item'
		| 'task'
		| 'table'
		| 'table-row'
		| 'table-cell'
		| 'code-block'
		| 'quote'
		| 'callout'
		| 'details'
		| 'footnote'
		| 'footnote-reference'
		| 'image'
		| 'mention'
		| 'mathematics'
		| 'preview'
		| 'unknown'

export interface ComparisonContextLocation {
	code: ComparisonContextCode
	path: readonly number[]
	from: number
	to: number
}

export interface ComparisonContext {
	before: ComparisonContextLocation | null
	after: ComparisonContextLocation | null
}

export type ComparisonPreviewNode
	= | 'front-matter'
		| 'image'
		| 'mention'
		| 'mathematics'
		| 'footnote-reference'
		| 'horizontal-rule'
		| 'changed-content'

export type ComparisonPreviewAtom
	= | { kind: 'text', text: string }
		| { kind: 'node', node: ComparisonPreviewNode }

export interface ComparisonPreview {
	before: ComparisonPreviewAtom | null
	after: ComparisonPreviewAtom | null
}

export type ComparisonMarkCode
	= | 'bold'
		| 'italic'
		| 'strike'
		| 'highlight'
		| 'underline'
		| 'inline-code'

export type ComparisonAttributeCode
	= | 'link'
		| 'link-target'
		| 'heading-level'
		| 'list-start'
		| 'task-state'
		| 'code-language'
		| 'text-direction'
		| 'image-target'
		| 'image-alt'
		| 'mention-identity'
		| 'mathematics'
		| 'preview-target'
		| 'footnote-reference'
		| 'callout-type'
		| 'details-state'
		| 'table-alignment'
		| 'table-span'
		| 'unknown-attribute'

export type ComparisonSignal
	= | {
		type: 'mark'
		mark: ComparisonMarkCode
		change: 'added' | 'removed' | 'changed'
	}
	| {
		type: 'attribute'
		attribute: ComparisonAttributeCode
		change: 'added' | 'removed' | 'changed'
	}
	| {
		type: 'node'
	}

export type ComparisonCoarseReason
	= | 'ambiguous-attribution'
		| 'comparison-limit'
		| 'table-evidence-conflict'
		| 'unsupported-table'

export interface ComparisonDescriptor {
	id: string
	operation: ComparisonOperation
	detail: ComparisonDetail
	facets: readonly ComparisonFacet[]
	before: ComparisonRange
	after: ComparisonRange
	context: ComparisonContext
	preview: ComparisonPreview
	signals: readonly ComparisonSignal[]
	coarseReason?: ComparisonCoarseReason
}

export type ComparisonEditKind = 'content' | 'table-column'

export interface ComparisonEdit {
	id: string
	kind: ComparisonEditKind
	primary: ComparisonDescriptor
	descriptors: readonly ComparisonDescriptor[]
}

export interface MarkdownComparisonModel {
	edits: readonly ComparisonEdit[]
}

export type ComparisonSide = 'before' | 'after'
