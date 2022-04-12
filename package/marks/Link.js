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
import { Plugin, PluginKey } from 'prosemirror-state'
import { domHref, parseHref, openLink } from './../helpers/links'

const Link = TipTapLink.extend({

	addOptions() {
		return {
			...this.parent?.(),
			onClick: openLink,
		}
	},

	addAttributes() {
		return {
			href: {
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
			}),
		},
	],

	renderHTML: ({ mark, HTMLAttributes }) => ['a', {
		...mark.attrs,
		href: domHref(mark),
		title: mark.attrs.href,
		rel: 'noopener noreferrer nofollow',
	}, 0],

	addProseMirrorPlugins() {
		if (!this.options.openOnClick) {
			return []
		}
		return [
			new Plugin({
				props: {
					key: new PluginKey('textLink'),
					handleClick: (_view, _pos, event) => {
						const attrs = this.editor.getAttributes('link')
						const link = event.target.closest('a')
						if (link && attrs.href && this.options.onClick) {
							return this.options.onClick(event, attrs)
						}
						return false
					},
				},
			}),
		]
	},
})

export default Link
