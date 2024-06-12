/*
 * @copyright Copyright (c) 2019 Azul <azul@riseup.net>
 *
 * @author Azul <azul@riseup.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { markInputRule } from '@tiptap/core'
import TipTapLink from '@tiptap/extension-link'
import { domHref, parseHref } from './../helpers/links.js'
import { linkClicking } from '../plugins/links.js'

const extractHrefFromMatch = (match) => {
	return { href: match.groups.href }
}

const extractHrefFromMarkdownLink = (match) => {
	/**
	 * Removes the last capture group from the match to satisfy
	 * Tiptap markInputRule expectation of having the content as
	 * the last capture group in the match.
	 *
	 * https://github.com/ueberdosis/tiptap/blob/%40tiptap/core%402.0.0-beta.75/packages/core/src/inputRules/markInputRule.ts#L11
	 */
	match.pop()
	return extractHrefFromMatch(match)
}

const Link = TipTapLink.extend({

	addOptions() {
		return {
			...this.parent?.(),
			relativePath: null,
		}
	},

	addAttributes() {
		return {
			href: {
				default: null,
			},
			title: {
				default: null,
			},
		}
	},

	inclusive: false,

	parseHTML: [
		{
			tag: 'a[href]',
			getAttrs: dom => ({
				href: parseHref(dom),
				title: dom.getAttribute('title'),
			}),
		},
	],

	renderHTML(options) {
		const { mark } = options
		return ['a', {
			...mark.attrs,
			href: domHref(mark, this.options.relativePath),
			'data-md-href': mark.attrs.href,
			rel: 'noopener noreferrer nofollow',
		}, 0]
	},

	addInputRules() {
		const linkInputRegex = /(?:^|\s)\[([\w|\s|-]+)\]\((?<href>.+?)\)$/gm
		return [
			markInputRule({
				find: linkInputRegex,
				type: this.type,
				getAttributes: extractHrefFromMarkdownLink,
			}),
		]
	},

	addProseMirrorPlugins() {
		const plugins = this.parent()
			// remove upstream link click handle plugin
			.filter(({ key }) => {
				return !key.startsWith('handleClickLink') && !key.startsWith('textHandleClickLink')
			})

		// Custom click handler plugins
		return [
			...plugins,
			linkClicking(),
		]

	},
})

export default Link
