/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/** Changes under one short name, the name missing when the answer gives none */
export interface SummaryGroup {
	label?: string
	paragraphs: string[]
	items: string[]
}

/** A summary as the instructions ask for it (`lib/Service/VersionSummaryPrompt.php`): the gist, then the changes in groups */
export interface SummaryParts {
	gist: string[]
	groups: SummaryGroup[]
}

const ITEM = /^[-*•]\s+/

/**
 * A line without the Markdown the instructions ask the model to leave out.
 *
 * @param line One line of the answer.
 */
function plain(line: string): string {
	return line.trim().replace(/^#{1,6}\s+/, '').replace(/(?<![\p{L}\p{N}*])\*\*(?=\S)(.+?)(?<=\S)\*\*(?![\p{L}\p{N}*])/gu, '$1')
}

/** A line that ends as a sentence does, which names no group */
const SENTENCE_END = /[.!?。！？]$/

/**
 * Split an answer into its gist and groups: lines starting with a dash are
 * the changes, a line right above them names their group unless it
 * ends as a sentence, and the lines before the first group are the gist.
 *
 * @param summary The answer as stored.
 */
export function parseSummary(summary: string): SummaryParts {
	const lines = summary.split('\n').map(plain).filter(Boolean)
	const parts: SummaryParts = { gist: [], groups: [] }
	lines.forEach((line, index) => {
		if (ITEM.test(line)) {
			let group = parts.groups.at(-1)
			if (!group) {
				group = { paragraphs: [], items: [] }
				parts.groups.push(group)
			}
			group.items.push(line.replace(ITEM, ''))
		} else if (index > 0 && ITEM.test(lines[index + 1] ?? '') && !SENTENCE_END.test(line)) {
			parts.groups.push({ label: line.replace(/:$/, ''), paragraphs: [], items: [] })
		} else if (parts.groups.length === 0) {
			parts.gist.push(line)
		} else {
			parts.groups.push({ paragraphs: [line], items: [] })
		}
	})
	return parts
}
