/**
 * SPDX-FileCopyrightText: 2024 Max <max@nextcloud.com>
 * SPDX-License-Identifier: @license AGPL-3.0-or-later
 *
 */

// eslint-disable-next-line import/no-named-as-default
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

const PlainTextLowlight = CodeBlockLowlight.extend({
	name: 'PlainTextLowlight',
	toMarkdown(state, node) {
		state.write(node.textContent)
	},
})

export { PlainTextLowlight }
