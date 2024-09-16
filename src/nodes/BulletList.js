/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TiptapBulletList from '@tiptap/extension-bullet-list'
import { listInputRule } from '../commands/index.js'

/* We want to allow for `* [ ]` as an input rule for bullet lists.
 * Therefore the list input rules need to check the input
 * until the first char after the space.
 * Only there we know the user is not trying to create a task list.
 */
const BulletList = TiptapBulletList.extend({
	parseHTML() {
		return this.parent().map(rule => Object.assign(rule, { preserveWhitespace: true }))
	},

	addAttributes() {
		return {
			...this.parent?.(),
			isList: {
				default: true,
				rendered: false,
			},
			bullet: {
				default: '-',
				rendered: false,
				isRequired: true,
				parseHTML: (el) => el.getAttribute('data-bullet'),
			},
		}
	},

	addInputRules() {
		return [
			listInputRule(
				/^\s*([-+*])\s([^\s[]+)$/,
				this.type,
			),
		]
	},

})

export default BulletList
