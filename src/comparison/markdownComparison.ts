/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'

import { createHierarchicalMarkdownComparisonModel } from './hierarchicalMarkdownComparisonModel.ts'

export { ComparisonModelLimitError } from './hierarchicalMarkdownComparisonModel.ts'
export type * from './markdownComparisonTypes.ts'

/**
 * Compare complete documents through the bounded hierarchical implementation.
 *
 * @param before Earlier document
 * @param after Later document
 */
export function createMarkdownComparisonModel(before: Node, after: Node) {
	return createHierarchicalMarkdownComparisonModel(before, after)
}
