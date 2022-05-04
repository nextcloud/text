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
import { clickHandler } from '../plugins/link.js'

const Link = TipTapLink.extend({

	attrs: {
		href: {
			default: null,
		},
	},

	inclusive: false,

	parseDOM: [
		{
			tag: 'a[href]',
			getAttrs: dom => ({
				href: parseHref(dom),
			}),
		},
	],

	toDOM: node => ['a', {
		...node.attrs,
		href: domHref(node),
		title: node.attrs.href,
		rel: 'noopener noreferrer nofollow',
	}, 0],

	addProseMirrorPlugins() {
		const plugins = this.parent()
			// remove original handle click
			.filter(({ key }) => {
				return !key.startsWith('handleClickLink')
			})

		if (!this.options.openOnClick) {
			return plugins
		}

		// add custom click handler
		return [...plugins, clickHandler({ editor: this.editor, type: this.type })]
	},
})

export default Link
