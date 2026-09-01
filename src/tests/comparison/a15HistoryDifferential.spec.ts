/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node as ProseMirrorNode } from '@tiptap/pm/model'

import { describe, expect, it } from 'vitest'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'
import { createHierarchicalMarkdownComparisonModel } from '../../comparison/hierarchicalMarkdownComparisonModel.ts'

interface EditorLike {
	state: { doc: ProseMirrorNode }
	destroy: () => void
}

interface ExpectedReplacement {
	operation: string
	detail: string
	before: string
	after: string
}

interface RegressionCase {
	name: string
	before: string
	after: string
	expected: readonly ExpectedReplacement[]
}

const regressionCorpus: readonly RegressionCase[] = [
	{
		name: 'keeps an exact trailing block outside earlier replacements',
		before: `# Wiki App

Old build instructions.

Shared footer.
`,
		after: `# Collective Wiki

New installation instructions.

Shared footer.
`,
		expected: [
			{ operation: 'insert', detail: 'inline', before: '', after: 'Collective ' },
			{ operation: 'delete', detail: 'inline', before: ' App', after: '' },
			{ operation: 'replace', detail: 'inline', before: 'Old build', after: 'New installation' },
		],
	},
	{
		name: 'keeps a weighted multi-block gap precise',
		before: `## Development Background: Ownership

Individual users own files. Collective pages should be owned by the collective.

## Stable anchor

This block is unchanged.
`,
		after: `## Development background: Ownership

Collective data is owned by the collective instead.

## Stable anchor

This block is unchanged.
`,
		expected: [
			{ operation: 'replace', detail: 'inline', before: 'B', after: 'b' },
			{ operation: 'delete', detail: 'inline', before: 'Individual users own files. ', after: '' },
			{ operation: 'replace', detail: 'inline', before: 'pages should be ', after: 'data is ' },
			{ operation: 'insert', detail: 'inline', before: '', after: ' instead' },
		],
	},
	{
		name: 'reports code text and language replacements directly',
		before: `\`\`\`
const value = 1
\`\`\`
`,
		after: `\`\`\`js
const value = 1 // comment
\`\`\`
`,
		expected: [
			{ operation: 'replace', detail: 'block', before: 'const value = 1', after: 'const value = 1 // comment' },
			{ operation: 'insert', detail: 'inline', before: '', after: ' // comment' },
		],
	},
	{
		name: 'reports a removed list item as a node deletion',
		before: `- Remove me
- Keep me
`,
		after: `- Keep me
`,
		expected: [
			{ operation: 'delete', detail: 'block', before: 'Remove me', after: '' },
		],
	},
	{
		name: 'does not expose parser-only Markdown syntax as a change signal',
		before: `GNU AGPL v3 or later
`,
		after: `Files: *
Copyright: Azul <azul@example.com>
License: AGPL v3 or later
`,
		expected: [
			{
				operation: 'replace',
				detail: 'inline',
				before: 'GNU',
				after: 'Files: *\nCopyright: Azul azul@example.com\nLicense:',
			},
		],
	},
]

function replacementOutput(beforeContent: string, afterContent: string) {
	const beforeEditor = createComparisonEditor(beforeContent) as EditorLike
	const afterEditor = createComparisonEditor(afterContent) as EditorLike
	try {
		const before = beforeEditor.state.doc
		const after = afterEditor.state.doc
		return createHierarchicalMarkdownComparisonModel(before, after).edits
			.flatMap(({ descriptors }) => descriptors)
			.map((descriptor) => ({
				operation: descriptor.operation,
				detail: descriptor.detail,
				facets: descriptor.facets,
				before: before.textBetween(descriptor.before.from, descriptor.before.to, '\n', '\ufffc'),
				after: after.textBetween(descriptor.after.from, descriptor.after.to, '\n', '\ufffc'),
				context: descriptor.context,
				signals: descriptor.signals,
				coarseReason: descriptor.coarseReason ?? null,
			}))
	} finally {
		beforeEditor.destroy()
		afterEditor.destroy()
	}
}

function replacementProjection(replacements: ReturnType<typeof replacementOutput>): ExpectedReplacement[] {
	return replacements.map(({ operation, detail, before, after }) => ({ operation, detail, before, after }))
}

function corpusCase(name: string) {
	return regressionCorpus.find((candidate) => candidate.name === name)!
}

describe('A15 repository-history regression corpus', () => {
	it.each(regressionCorpus)('$name', ({ before, after, expected }) => {
		const replacements = replacementOutput(before, after)

		expect(replacementProjection(replacements)).toEqual(expected)
		expect(replacements.every(({ coarseReason }) => coarseReason === null)).toBe(true)
	})

	it('keeps replacement descriptor signals observable', () => {
		const code = corpusCase('reports code text and language replacements directly')
		const codeReplacements = replacementOutput(code.before, code.after)
		expect(codeReplacements[0]).toMatchObject({
			facets: ['attribute'],
			signals: [{ type: 'attribute', attribute: 'code-language', change: 'changed' }],
		})

		const deletion = corpusCase('reports a removed list item as a node deletion')
		expect(replacementOutput(deletion.before, deletion.after)[0]).toMatchObject({
			facets: ['text', 'structure'],
			context: { before: { code: 'list-item' }, after: null },
			signals: [{ type: 'node' }],
		})

		const syntax = corpusCase('does not expose parser-only Markdown syntax as a change signal')
		expect(replacementOutput(syntax.before, syntax.after)[0]).toMatchObject({
			facets: ['text', 'attribute', 'unknown'],
			signals: [{ type: 'attribute', attribute: 'link', change: 'added' }],
		})
	})
})
