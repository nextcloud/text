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

import TipTapLink from '@tiptap/extension-link'
import { domHref, parseHref } from './../helpers/links.js'
import { linkClicking } from '../plugins/links.js'

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

	addCommands() {
		return {
			/**
			 * Update the target of existing links.
			 * Insert a link if there currently is none.
			 *
			 */
			insertOrSetLink: (active, text, attrs) => ({ state, chain, commands }) => {
				// Check if any text is selected,
				// if not insert the link using the given text property
				if (state.selection.empty) {
					if (active) {
						commands.deleteNode('paragraph')
					}
					return chain().insertContent({
						type: 'paragraph',
						content: [{
							type: 'text',
							marks: [{
								type: 'link',
								attrs,
							}],
							text,
						}],
					})
				} else {
					return commands.setLink(attrs)
				}
			},
		}
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
