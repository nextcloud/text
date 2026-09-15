/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { AnyCommands, Editor } from '@tiptap/core'

import { expect, test, vi } from 'vitest'
import { getMenuEntries } from '../../components/Menu/entries.ts'

function getBlocksChildren() {
	const blocksEntry = getMenuEntries(false).find((entry) => entry?.key === 'blocks')
	return blocksEntry?.children ?? []
}

test('provides a Mermaid diagram block menu entry', () => {
	const mermaidEntry = getBlocksChildren().find((entry) => entry?.key === 'mermaid-diagram')

	expect(mermaidEntry).toMatchObject({
		key: 'mermaid-diagram',
		label: 'Mermaid diagram',
		isActive: { name: 'codeBlock', attributes: { language: 'mermaid' } },
	})
})

test('sets the current code block language to Mermaid', () => {
	const mermaidEntry = getBlocksChildren().find((entry) => entry?.key === 'mermaid-diagram')
	const updateAttributes = vi.fn()
	const editor = {
		isActive: vi.fn().mockReturnValue(true),
	}

	mermaidEntry?.action?.({ updateAttributes } as unknown as AnyCommands, editor as unknown as Editor)

	expect(updateAttributes).toHaveBeenCalledWith('codeBlock', { language: 'mermaid' })
})

test('inserts a Mermaid code block outside code blocks', () => {
	const mermaidEntry = getBlocksChildren().find((entry) => entry?.key === 'mermaid-diagram')
	const setCodeBlock = vi.fn()
	const editor = {
		isActive: vi.fn().mockReturnValue(false),
	}

	mermaidEntry?.action?.({ setCodeBlock } as unknown as AnyCommands, editor as unknown as Editor)

	expect(setCodeBlock).toHaveBeenCalledWith({ language: 'mermaid' })
})
