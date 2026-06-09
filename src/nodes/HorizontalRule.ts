/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { nodeInputRule } from '@tiptap/core'
import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule'

const HorizontalRule = TiptapHorizontalRule.extend({
	addAttributes() {
		return {
			markup: {
				default: '---',
				parseHTML: (el) => el.getAttribute('data-markup') || '---',
				renderHTML: (attrs) => {
					if (!attrs.markup || attrs.markup === '---') {
						return {}
					}
					return { 'data-markup': attrs.markup }
				},
			},
		}
	},

	// Same triggers as upsream, but capture typed marker so it can be preserved
	addInputRules() {
		return [
			nodeInputRule({
				find: /^(?:(---|—-)|(___|\*\*\*)\s)$/,
				type: this.type,
				getAttributes: (match) => ({
					markup: match[2] ?? '---',
				}),
			}),
		]
	},
})

export default HorizontalRule
