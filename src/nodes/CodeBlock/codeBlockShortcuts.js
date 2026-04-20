/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const codeBlockShortcuts = {
	/**
	 * <Tab> in CodeBlock
	 * Insert tab char instead of navigating the focus via Tab
	 *
	 * @param {object} object - object
	 * @param {object} object.editor - the editor
	 */
	Tab: ({ editor }) => {
		if (!editor.isActive('codeBlock')) {
			return
		}

		editor.commands.insertContent('\t')
		editor.commands.focus()

		return true
	},

	/**
	 * <Mod>-<A> in CodeBlock
	 * Select all content of current code block
	 *
	 * @param {object} object - object
	 * @param {object} object.editor - the editor
	 */
	'Mod-a': ({ editor }) => {
		if (!editor.isActive('codeBlock')) {
			return
		}

		const nodeSize = editor.state.selection.$from.node().nodeSize
		editor.commands.selectParentNode()
		const from = editor.state.selection.$from.pos
		const to = from + nodeSize
		editor.commands.setTextSelection({ from, to })

		return true
	},
}

export default codeBlockShortcuts
